import { FullCampaign } from "@/types"
import axios from "axios"

export const login = async (email: string, password: string) => {
    const response = await axios.post("/login", { email, password })
    return response.data
}

export const getDashboardData = async () => {
    const response = await axios.get("/dashboard")
    return response.data
}

export const getCampaigns = async (params: {
    start_date: string,
    end_date: string,
    groupId: string | null,
    status: number | null,
}) => {
    const response = await axios.get<FullCampaign[]>("/campaigns", { params });
    return response.data
}

export const getCampaignGroups = async () => {
    const response = await axios.get("/campaign-groups")
    return response.data
}

export const updateCampaignStatus = async (id: string, status: "enabled" | "paused") => {
    const response = await axios.put(`/campaigns/${id}/status`, { status })
    return response.data
}

export const updateCallExtensions = async (id: string, status: "enabled" | "paused") => {
    const response = await axios.put(`/campaigns/${id}/call-extensions`, { status })
    return response.data
}

export const updateBidModifiers = async (id: string, bidModifiers: any) => {
    const response = await axios.put(`/campaigns/${id}/bid-modifiers`, { bidModifiers })
    return response.data
}

export const uploadCSV = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await axios.post("/upload-csv", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

    return response.data
}

