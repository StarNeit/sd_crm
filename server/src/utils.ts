import { services } from "google-ads-api";

export const addMockDataToCampaigns = (campaigns: services.IGoogleAdsRow[]) => {
  campaigns.forEach((campaign) => {
    if (campaign.campaign_budget) {
      campaign.campaign_budget.amount_micros = 160000000000;
      campaign.metrics = {
        cost_micros: Math.random() * 542 | 0,
        clicks: Math.random() * 554 | 0,
        impressions: Math.random() * 455 | 0,
        all_conversions: Math.random() * 233 | 0,
        ctr: Math.random() * 122 | 0,
      };
    }
  });
};
