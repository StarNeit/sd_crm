import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown, Upload, Download, Save } from "lucide-react"

// Mock campaign data
const mockCampaigns = [
    {
        id: 1,
        name: "Campaign 1",
        group: "Group A",
        status: "Active",
        callExtensions: true,
        bidMultipliers: { "Monday-0": 1.2, "Monday-1": 1.1 },
    },
    {
        id: 2,
        name: "Campaign 2",
        group: "Group A",
        status: "Active",
        callExtensions: true,
        bidMultipliers: { "Monday-0": 1.0, "Monday-1": 0.9 },
    },
    {
        id: 3,
        name: "Campaign 3",
        group: "Group A",
        status: "Paused",
        callExtensions: false,
        bidMultipliers: { "Monday-0": 0.8, "Monday-1": 0.7 },
    },
    {
        id: 4,
        name: "Campaign 4",
        group: "Group B",
        status: "Active",
        callExtensions: true,
        bidMultipliers: { "Monday-0": 1.3, "Monday-1": 1.2 },
    },
    {
        id: 5,
        name: "Campaign 5",
        group: "Group B",
        status: "Paused",
        callExtensions: false,
        bidMultipliers: { "Monday-0": 0.9, "Monday-1": 0.8 },
    },
]

// Days and hours for bid multipliers
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const hours = Array.from({ length: 24 }, (_, i) => i)

const AdjustmentsPage = () => {
    const navigate = useNavigate()
    const [campaigns, setCampaigns] = useState<any>(mockCampaigns)
    const [selectedGroup, setSelectedGroup] = useState("All")
    const [activeTab, setActiveTab] = useState("bidMultipliers")
    const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)
    const [bidMultipliers, setBidMultipliers] = useState<Record<string, number>>({})

    const handleGroupChange = (group: string) => {
        setSelectedGroup(group)
    }

    const handleCampaignSelect = (campaignId: number) => {
        const campaign = campaigns.find((c) => c.id === campaignId)
        if (campaign) {
            setSelectedCampaign(campaignId)
            setBidMultipliers(campaign.bidMultipliers)
        }
    }

    const handleBidMultiplierChange = (day: string, hour: number, value: number) => {
        setBidMultipliers((prev) => ({
            ...prev,
            [`${day}-${hour}`]: value,
        }))
    }

    const handleToggleStatus = (campaignId: number) => {
        setCampaigns(
            campaigns.map((campaign) => {
                if (campaign.id === campaignId) {
                    return {
                        ...campaign,
                        status: campaign.status === "Active" ? "Paused" : "Active",
                    }
                }
                return campaign
            }),
        )
    }

    const handleToggleCallExtensions = (campaignId: number) => {
        setCampaigns(
            campaigns.map((campaign) => {
                if (campaign.id === campaignId) {
                    return {
                        ...campaign,
                        callExtensions: !campaign.callExtensions,
                    }
                }
                return campaign
            }),
        )
    }

    const handleSaveChanges = () => {
        if (selectedCampaign) {
            setCampaigns(
                campaigns.map((campaign) => {
                    if (campaign.id === selectedCampaign) {
                        return {
                            ...campaign,
                            bidMultipliers,
                        }
                    }
                    return campaign
                }),
            )
            alert("Changes saved successfully!")
        }
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // In a real app, you would process the CSV file here
            alert(`File "${file.name}" uploaded. Processing would happen in a real app.`)
        }
    }

    const filteredCampaigns =
        selectedGroup === "All" ? campaigns : campaigns.filter((campaign) => campaign.group === selectedGroup)

    return (
        <div className="flex-1 overflow-auto">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Campaign Adjustments</h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => navigate("/crm/dashboard")}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm"
                        >
                            Back to Dashboard
                        </button>
                        <label
                            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm cursor-pointer flex items-center">
                            <Upload className="w-4 h-4 mr-2"/>
                            Upload CSV
                            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload}/>
                        </label>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-md text-sm flex items-center">
                            <Download className="w-4 h-4 mr-2"/>
                            Export CSV
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex mb-6">
                        <div className="mr-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Group</label>
                            <div className="relative">
                                <select
                                    value={selectedGroup}
                                    onChange={(e) => handleGroupChange(e.target.value)}
                                    className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="All">All Groups</option>
                                    <option value="Group A">Group A</option>
                                    <option value="Group B">Group B</option>
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown className="h-4 w-4"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                                <button
                                    onClick={() => setActiveTab("bidMultipliers")}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === "bidMultipliers"
                                            ? "border-pink-500 text-pink-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    Bid Multipliers
                                </button>
                                <button
                                    onClick={() => setActiveTab("callExtensions")}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === "callExtensions"
                                            ? "border-pink-500 text-pink-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    Call Extensions
                                </button>
                                <button
                                    onClick={() => setActiveTab("campaignStatus")}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === "campaignStatus"
                                            ? "border-pink-500 text-pink-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    Campaign Status
                                </button>
                            </nav>
                        </div>
                    </div>

                    {activeTab === "bidMultipliers" && (
                        <div>
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-2">Select Campaign</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {filteredCampaigns.map((campaign) => (
                                        <div
                                            key={campaign.id}
                                            onClick={() => handleCampaignSelect(campaign.id)}
                                            className={`p-4 border rounded-md cursor-pointer ${
                                                selectedCampaign === campaign.id
                                                    ? "border-pink-500 bg-pink-50"
                                                    : "border-gray-200 hover:bg-gray-50"
                                            }`}
                                        >
                                            <div className="font-medium">{campaign.name}</div>
                                            <div className="text-sm text-gray-500">{campaign.group}</div>
                                            <div
                                                className={`text-sm ${campaign.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                                                {campaign.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedCampaign && (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-medium">Hourly Bid Multipliers</h3>
                                        <button
                                            onClick={handleSaveChanges}
                                            className="px-4 py-2 bg-pink-500 text-white rounded-md text-sm flex items-center"
                                        >
                                            <Save className="w-4 h-4 mr-2"/>
                                            Save Changes
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Day / Hour
                                                </th>
                                                {hours.map((hour) => (
                                                    <th
                                                        key={hour}
                                                        className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        {hour}
                                                    </th>
                                                ))}
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {days.map((day) => (
                                                <tr key={day}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day}</td>
                                                    {hours.map((hour) => (
                                                        <td key={hour}
                                                            className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max="2"
                                                                step="0.1"
                                                                value={bidMultipliers[`${day}-${hour}`] || 1.0}
                                                                onChange={(e) =>
                                                                    handleBidMultiplierChange(day, hour, Number.parseFloat(e.target.value))
                                                                }
                                                                className="w-14 p-1 border border-gray-300 rounded-md text-center"
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "callExtensions" && (
                        <div>
                            <h3 className="text-lg font-medium mb-4">Call Extensions</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Campaign
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Group
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Call Extensions
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredCampaigns.map((campaign) => (
                                        <tr key={campaign.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.group}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                    campaign.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                            >
                              {campaign.status}
                            </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                    campaign.callExtensions ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                            >
                              {campaign.callExtensions ? "Enabled" : "Disabled"}
                            </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleToggleCallExtensions(campaign.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    {campaign.callExtensions ? "Disable" : "Enable"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "campaignStatus" && (
                        <div>
                            <h3 className="text-lg font-medium mb-4">Campaign Status</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Campaign
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Group
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredCampaigns.map((campaign) => (
                                        <tr key={campaign.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.group}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                    campaign.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                            >
                              {campaign.status}
                            </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleToggleStatus(campaign.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    {campaign.status === "Active" ? "Pause" : "Activate"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdjustmentsPage

