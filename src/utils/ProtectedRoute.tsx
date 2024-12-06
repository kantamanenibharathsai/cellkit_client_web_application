import Cookies from "js-cookie";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
export const SecureRouting = (OriginalComponent: React.FC) => {
    const safeRoute = () => {
        let getToken = Cookies.get("token");
        if (getToken === undefined) {
            return <OriginalComponent />;
        } else {
            return <Navigate to={"/dashboard"} />;
        }
    };
    return safeRoute;
};
const ProtectedRoute = () => {
    const getToken = Cookies.get("token");
    
    useEffect(() => {
        if (!getToken) {
        }
    }, [getToken]);
    return getToken ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;