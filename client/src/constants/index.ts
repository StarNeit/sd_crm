import { DropdownOption } from "@/components/Dropdown.tsx";

export const AdStatusOptions: DropdownOption[] = [
    {
        id: 'UNSPECIFIED',
        name: 'UNSPECIFIED'
    },
    {
        id: 'UNKNOWN',
        name: 'UNKNOWN'
    },
    {
        id: 'ENABLED',
        name: 'ENABLED'
    },
    {
        id: 'PAUSED',
        name: 'PAUSED'
    },
    {
        id: 'REMOVED',
        name: 'REMOVED'
    },
];


export const AdCampaignGroupOptions: DropdownOption[] = [
    {
        id: 0,
        name: 'UNSPECIFIED',
    },
    {
        id: 1,
        name: 'UNKNOWN',
    },
    {
        id: 2,
        name: 'ENABLED',
    },
    {
        id: 3,
        name: 'REMOVED',
    }
]

export const AdTypeOptions: DropdownOption[] = [
    {
        id: 0,
        name: 'UNSPECIFIED'
    },
    {
        id: 1,
        name: 'UNKNOWN'
    },
    {
        id: 2,
        name: 'SEARCH_STANDARD'
    },
    {
        id: 3,
        name: 'DISPLAY_STANDARD'
    },
    {
        id: 4,
        name: 'SHOPPING_PRODUCT_ADS'
    },
    {
        id: 5,
        name: 'HOTEL_ADS'
    },
    {
        id: 6,
        name: 'UNKNOWN'
    },
    {
        id: 7,
        name: 'ENABLED'
    },
    {
        id: 8,
        name: 'PAUSED'
    },
    {
        id: 9,
        name: 'REMOVED'
    },
    {
        id: 10,
        name: 'UNSPECIFIED'
    },
    {
        id: 11,
        name: 'UNKNOWN'
    },
    {
        id: 12,
        name: 'ENABLED'
    },
    {
        id: 13,
        name: 'PAUSED'
    },
    {
        id: 14,
        name: 'REMOVED'
    },
    {
        id: 15,
        name: 'UNSPECIFIED'
    },
    {
        id: 16,
        name: 'UNKNOWN'
    },
    {
        id: 17,
        name: 'ENABLED'
    },
    {
        id: 18,
        name: 'PAUSED'
    },
    {
        id: 19,
        name: 'REMOVED'
    },
];

export const COLOR_SET = {
    cost_micros: 'bg-primary',
    clicks: 'bg-secondary',
    impressions: 'bg-info',
    all_conversions: 'bg-warning',
    ctr: 'bg-grey'
}