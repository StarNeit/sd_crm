import React, { useMemo } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FullCampaign, Metrics } from "@/types";
import { formatCurrency, formatNumber, getStatistic } from "@/utils";
import clsx from "clsx";
import { COLOR_SET } from "@/constants";

const Metrics_Keys: Array<{ id: keyof Metrics, name: string }> = [
    { id: 'cost_micros', name: 'Cost' },
    { id: 'clicks', name: 'Clicks' },
    { id: 'impressions', name: 'Impressions' },
    { id: 'all_conversions', name: 'Conversions' },
]

type Props = {
    data: FullCampaign[];
}

const StatisticChart: React.FC<Props> = ({ data }) => {
    const chartData = useMemo(() => {
        return data.map((item) => ({
            date: item.campaign.start_date,
            clicks: item.metrics.clicks,
            impressions: item.metrics.impressions,
            cost: item.metrics.cost_micros,
            all_conversions: item.metrics.all_conversions,
        }))
    }, data);

    const metrics = data.map((item) => item.metrics);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                Overview of Latest Month
            </h2>
            <div className="mb-4">
                <div className="text-sm text-gray-500">Cost</div>
                <div className="text-2xl font-bold">{formatCurrency(getStatistic(metrics, 'cost_micros').sum)}</div>
            </div>
            <div className="mb-4">
                <div className="text-sm text-gray-500">Clicks</div>
                <div className="text-2xl font-bold">{formatNumber(getStatistic(metrics, 'clicks').sum)}</div>
            </div>
            <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line
                            type="monotone"
                            dataKey="clicks"
                            stroke="#EB498A"
                            name="Clicks"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="impressions"
                            stroke="#4CC2F4"
                            name="Impressions"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="cost"
                            stroke="#865DC1"
                            name="Cost"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="all_conversions"
                            stroke="#FEB62E"
                            name="All Conversions"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
                {Metrics_Keys.map(({ id, name }, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className={clsx('w-8 h-8 rounded-full flex items-center justify-center mr-2', `${COLOR_SET[id]}`)}
                        >
                            <span className="text-white text-xs">{index + 1}</span>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">{name}</div>
                            <div className="text-sm font-bold">{formatNumber(getStatistic(metrics, id).sum)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StatisticChart;