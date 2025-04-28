import { Link, useLocation, useNavigate } from "react-router-dom"
import {
    Home,
    BarChart2,
    Users,
    Tag,
    Package,
    Award,
    Share2,
    RefreshCw,
    MapPin,
    Clock,
    HelpCircle,
    LogOut,
} from "lucide-react"
import clsx from "clsx"

const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Ad Overview", icon: BarChart2, path: "/dashboard" },
    { name: "Ad Groups", icon: Users, path: "/ad-groups" },
    { name: "KW Brand-Tail", icon: Tag, path: "/kw-brand" },
    { name: "KW Match Type", icon: Package, path: "/kw-match" },
    { name: "KW Quality Score", icon: Award, path: "/kw-quality" },
    { name: "Ad Structure", icon: Users, path: "/ad-structure" },
    { name: "Impr. Share", icon: Share2, path: "/impr-share" },
    { name: "Conversions", icon: RefreshCw, path: "/conversions" },
    { name: "GEO Location", icon: MapPin, path: "/geo-location" },
    { name: "Hourly/Monthly", icon: Clock, path: "/hourly-monthly" },
]

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        return location.pathname === path
    }

    const logout = () => {
        window.localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_NAME);
        navigate('/login');
    }

    return (
        <div className="h-screen w-64 bg-white border-r flex flex-col">
            <div className="p-6">
                <h1 className="font-bold">Google Ads Campaign</h1>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 px-2">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                                    isActive(item.path) ? "bg-gradient-to-l from-primary-700 to-primary text-white" : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                <item.icon className={clsx('h-5 w-5 mr-3', isActive(item.path) ? 'stroke-white' : 'stroke-primary')} />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t">
                <ul className="space-y-1">
                    <li>
                        <Link to="/help" className="flex items-center px-4 py-3 text-sm text-gray-600 rounded-lg hover:bg-gray-100">
                            <HelpCircle className="h-5 w-5 mr-3 text-pink-500" />
                            Help
                        </Link>
                    </li>
                    <li>
                        <button
                            className="flex items-center w-full px-4 py-3 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
                            onClick={logout}
                        >
                            <LogOut className="h-5 w-5 mr-3 text-pink-500" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar

