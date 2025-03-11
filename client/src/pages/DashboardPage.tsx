import { useEffect, useState } from "react"
import DateRangePicker from "@/components/DateRangePicker.tsx";
import Dropdown, { DropdownOption } from "@/components/Dropdown.tsx";
import { getCampaignGroups, getCampaigns } from "@/services/api.ts";
import { AdStatusOptions, AdTypeOptions } from "@/constants";
import { DateValueType } from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import RateChip from "@/components/RateChip.tsx";
import { FullCampaign, Metrics } from "@/types";
import { formatNumber, getStatistic } from "@/utils";
import StatisticChart from "@/components/StatisticChart.tsx";
import StatisticPieChart from "@/components/StatisticPieChart.tsx";

const DashboardPage = () => {
    const [adStatus, setAdStatus] = useState<number | null>(null);
    const [adGroup, setAdGroup] = useState<string | null>(null);
    const [adType, setAdType] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateValueType>({
        startDate: new Date('2025-01-01'),
        endDate: new Date('2050-01-01'),
    });
    const [metrics, setMetrics] = useState<Metrics[]>([]);
    const [lastMonthData, setLastMonthData] = useState<FullCampaign[]>();

    const [adGroupOptions, setAdGroupOptions] = useState<DropdownOption[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getCampaignGroups();
                const options = response.map((item: string) => ({ id: item, name: item }));

                setAdGroupOptions(options);
            } catch (e) {
            }
        })();
    }, []);

    const fetchCampaignData = async () => {
        const campaigns = await getCampaigns({
            start_date: dayjs(dateRange?.startDate ?? new Date()).format("YYYY-MM-DD"),
            end_date: dayjs(dateRange?.endDate ?? new Date()).format("YYYY-MM-DD"),
            status: adStatus,
            groupId: adGroup,
        });

        setMetrics(campaigns.map((item) => item.metrics));
    }

    const fetchLastMonthData = async () => {
        const campaigns = await getCampaigns({
            // start_date: dayjs().add(-1, 'month').format("YYYY-MM-DD"),
            // end_date: dayjs().format("YYYY-MM-DD"),

            // For demo purposes, we get all campaign data.
            start_date: dayjs(dateRange?.startDate ?? new Date()).format("YYYY-MM-DD"),
            end_date: dayjs(dateRange?.endDate ?? new Date()).format("YYYY-MM-DD"),
            status: adStatus,
            groupId: adGroup,
        });

        setLastMonthData(campaigns);
    }

    useEffect(() => {
        fetchCampaignData();
    }, [adStatus, adType, adGroup, dateRange]);

    useEffect(() => {
        fetchLastMonthData();
    }, []);

    return (
        <div className="flex-1 overflow-auto">
            <div className="p-6">
                {/* Filters */}
                <div className="flex items-center mb-6 space-x-4">
                    <div className="flex space-x-4">
                        <div>
                            <div className="text-sm mb-1">Ad Status:</div>
                            <Dropdown
                                options={AdStatusOptions}
                                onChange={(value) => setAdStatus(value?.id as number ?? value)}
                            />
                        </div>
                        <div>
                            <div className="text-sm mb-1">Ad Group:</div>
                            <Dropdown
                                options={adGroupOptions}
                                onChange={(value) => setAdGroup(value?.id as string ?? value)}
                            />
                        </div>
                        <div>
                            <div className="text-sm mb-1">Ad Type:</div>
                            <Dropdown
                                options={AdTypeOptions}
                                onChange={(value) => setAdType(value?.id as string ?? value)}
                            />
                        </div>
                    </div>
                    <div className="ml-auto">
                        <div className="text-sm mb-1">Date:</div>
                        <DateRangePicker value={dateRange} onChange={setDateRange} />
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="p-6 bg-gradient-to-r from-primary-700 to-primary rounded-lg text-white">
                        <div className="text-sm mb-1">Impressions</div>
                        <div className="text-2xl font-bold">{formatNumber(getStatistic(metrics, 'impressions').sum)}</div>
                        <RateChip value={getStatistic(metrics, 'impressions').rate} />
                    </div>
                    <div className="p-6 bg-gradient-to-r from-info-700 to-info rounded-lg text-white">
                        <div className="text-sm mb-1">Clicks</div>
                        <div className="text-2xl font-bold">{formatNumber(getStatistic(metrics, 'clicks').sum)}</div>
                        <RateChip value={getStatistic(metrics, 'clicks').rate} />
                    </div>
                    <div className="p-6 bg-gradient-to-r from-secondary-700 to-secondary rounded-lg text-white">
                        <div className="text-sm mb-1">Conversions</div>
                        <div className="text-2xl font-bold">{formatNumber(getStatistic(metrics, 'all_conversions').sum)}</div>
                        <RateChip value={getStatistic(metrics, 'all_conversions').rate}/>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-warning-700 to-warning rounded-lg text-white">
                        <div className="text-sm mb-1">Cost</div>
                        <div className="text-2xl font-bold">{formatNumber(getStatistic(metrics, 'cost_micros').sum)}</div>
                        <RateChip value={getStatistic(metrics, 'cost_micros').rate}/>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {lastMonthData && <StatisticChart data={lastMonthData} />}

                    <StatisticPieChart />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage

