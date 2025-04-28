import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import AdjustmentsPage from "./pages/AdjustmentsPage"
import PrivateLayout from "@/components/PrivateLayout.tsx";
import NotFound from "@/pages/NotFound.tsx";
import PublicLayout from "@/components/PublicLayout.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="adjustments" element={<AdjustmentsPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/login" element={<PublicLayout />}>
                    <Route path="" element={<LoginPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    )
}

export default App

