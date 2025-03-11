import { useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from "@/components/Sidebar.tsx";

const PrivateLayout = () => {
    const navigate = useNavigate();

    const [verified, setVerified] = useState<boolean | null>(null);

    useEffect(() => {
        const token = window.localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_NAME);
        setVerified(!!token)
    }, []);

    useEffect(() => {
        if (verified === false) {
            navigate('/login');
        }
    }, [verified])

    if (!verified) {
        return null;
    }

    return (
        <div className="h-screen flex bg-gray-100">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default PrivateLayout;