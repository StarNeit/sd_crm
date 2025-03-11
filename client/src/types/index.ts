export type Campaign = {
    id: string | number;
    name: string;
    start_date: string;
    end_date: string;
    bidding_strategy_type: number;
    resource_name: string;
}

export type Metrics = {
    cost_micros: number;
    clicks: number;
    impressions: number;
    all_conversions: number;
    ctr: number;
}

export type CampaignBudget = {
    amount_micros: number;
    resource_name: string;
}

export type FullCampaign = {
    campaign: Campaign,
    metrics: Metrics,
    campaign_budget: CampaignBudget,
}