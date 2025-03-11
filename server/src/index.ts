import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import csv from "csv-parser";
import jwt from "jsonwebtoken";

import { GoogleAdsApi } from "google-ads-api";

import { TEST_USER, SECRET_KEY } from "./constants";
import { addMockDataToCampaigns } from "./utils";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const client_id = process.env.GOOGLE_CLIENT_ID || "";
const client_secret = process.env.GOOGLE_CLIENT_SECRET || "";
const developer_token = process.env.GOOGLE_DEVELOPER_TOKEN || "";
const login_customer_id = process.env.GOOGLE_LOGIN_CUSTOMER_ID || "";
const refresh_token = process.env.GOOGLE_REFRESH_TOKEN || "";
const customer_id = process.env.GOOGLE_CUSTOMER_ID || "";

const client = new GoogleAdsApi({
  client_id: client_id,
  client_secret: client_secret,
  developer_token: developer_token,
});

const defaultCustomer = client.Customer({
  customer_id,
  login_customer_id,
  refresh_token,
});

async function updateFromCSV(csvFile: fs.PathLike) {
  const campaigns: any[] = [];

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row: any) => {
      campaigns.push(row);
    })
    .on("end", async () => {
      for (const campaign of campaigns) {
        await updateCallExtensionStatus(
          campaign.campaign_id,
          campaign.call_extension_status
        );
        await updateCampaignStatus(
          campaign.campaign_id,
          campaign.campaign_status
        );
      }
    });
}

async function updateCallExtensionStatus(campaignId: string, status: string) {
  try {
    const customer = client.Customer({
      customer_id: customer_id,
      refresh_token: refresh_token,
      login_customer_id: login_customer_id,
    });

    const query = `
        SELECT asset.resource_name, asset.id
        FROM asset
        WHERE asset.type = 'CALL'
    `;

    const rows = await customer.query(query);

    if (rows.length === 0) {
      console.log(`Not found Call Extension for Campaign ${campaignId}`);
      return;
    }

    const assetId = rows[0].asset?.id;

    await customer.campaignAssets.update([
      {
        resource_name: `customers/${customer_id}/campaignAssets/${campaignId}~${assetId}~CALL`,
        status: status.toUpperCase() as any,
      },
    ]);

    return "OK";
  } catch (error) {
    console.error(error);
  }
}

async function updateCampaignStatus(campaignId: string, status: string) {
  try {
    const customer = client.Customer({
      customer_id: customer_id,
      refresh_token: refresh_token,
      login_customer_id: login_customer_id,
    });

    return "OK";
  } catch (error) {
    console.error(error);
  }
}

app.get("/campaign-groups", async (req, res) => {
  try {
    const customers = await client.listAccessibleCustomers(refresh_token);
    const customerDetails = [];

    for (const customerId of customers.resource_names) {
      const formattedCustomerId = customerId.replace("customers/", "");

      customerDetails.push(formattedCustomerId);
    }
    customerDetails.push(customer_id);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(customerDetails));
  } catch (error) {
    console.error("Error:", error);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify([]));
  }
});

app.get("/campaigns", async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const campaigns = await defaultCustomer.query(`
      SELECT 
        campaign.id, 
        campaign.name,
        campaign.bidding_strategy_type,
        campaign_budget.amount_micros,
        campaign.start_date,
        campaign.end_date,
        metrics.cost_micros,
        metrics.clicks,
        metrics.impressions,
        metrics.all_conversions,
        metrics.ctr
      FROM
        campaign
      WHERE
        campaign.start_date >= "${start_date}" AND
        campaign.end_date <= "${end_date}"
    `);

    res.setHeader("Content-Type", "application/json");

    // For demo purposes as we don't have necessary data in actual Google Ads account
    addMockDataToCampaigns(campaigns);

    return res.json(campaigns);
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);

    res.setHeader("Content-Type", "application/json");
    return res.json([]);
  }
});

app.post("/campaign-adjustment", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload CSV file" });
    }

    const csvFilePath = req.file.path;
    await updateFromCSV(csvFilePath);

    res.json({ message: "Update success!" });
  } catch (error) {
    console.error("Error on update:", error);
    res.status(500).json({ error: "Error on update" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const exist = TEST_USER.email === email && TEST_USER.password === password;

  if (exist) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    return res.json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
