import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const PublicLayout = () => {
    const navigate = useNavigate();

    const [verified, setVerified] = useState<boolean | null>(null);

    useEffect(() => {
        const token = window.localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_NAME);
        setVerified(!!token);
    }, []);

    useEffect(() => {
        if (verified === true) {
            navigate('/dashboard');
        }
    }, [verified])

    if (verified || verified === null) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Outlet />
        </div>
    )
}

export default PublicLayout;