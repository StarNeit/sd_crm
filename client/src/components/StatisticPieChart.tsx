import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const mockData = [
    { name: "Mobile with full browsers", value: 135, color: "#FF6384" },
    { name: "Computers", value: 16, color: "#9966FF" },
    { name: "Tablets with full browsers", value: 8, color: "#FFCE56" },
]

const COLORS = ["#FF6384", "#9966FF", "#FFCE56"]

const StatisticPieChart = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                Device Breakdown
            </h2>
            <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={mockData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value"
                            label={({name, value}) => `${value}`}
                        >
                            {mockData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4">
                <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
                    <span className="text-sm">mobile devices with full browsers</span>
                </div>
                <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                    <span className="text-sm">computers</span>
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    <span className="text-sm">tablets with full browsers</span>
                </div>
            </div>
        </div>
)
}

export default StatisticPieChart;