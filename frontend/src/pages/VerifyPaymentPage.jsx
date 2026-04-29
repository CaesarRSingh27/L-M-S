import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:4000";

const VerifyPaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {getToken} =  useAuth();

    useEffect(() => {
        let cancelled = false;
        const verifyAndRedirect = async ()  => {
            const params = new URLSearchParams(location.search || "");
            const rawSession = params.get("session_id");
            const session__id = rawSession ? rawSession.trim() : null;
            const payment_status = params.get("payment_status");

            if(payment_status === 'cancel') {
                if(!cancelled) navigate('/checkout', {replace: true});
                return;
            }

            if(!session__id) {
                if(!cancelled) 
                    navigate('/mycourses?payment_status=Unpaid', {replace: true});
                return;
            }

            let clerkToken = null;
            try{
                clerkToken = await getToken();
            }

            catch(e){
                    clerkToken = null;
            }

            const headers = {};
            if(clerkToken) headers["Authorization"] = `Bearer ${clerkToken}`;

            try {
                const res = await axios.get(`${API_BASE}/api/bookings/confirm`, {
                    params: {session__id},
                    headers,
                    withCredentials: true,
                    timeout: 15000,
                });

                if(!cancelled) {
                    if(res?.data?.success) {
                        navigate("/mycourses?payment_status=Paid", {replace: true});
                    } else{
                        navigate("/my-courses?payment_status=Unpaid", {replace: true});
                    }
                }
            } catch(err) {
                if(!cancelled)  navigate("/mycourses?payment_status=Unpaid", {replace: true});
            }
        };

        verifyAndRedirect();
        return () => {
            cancelled = true;
        };
    }, [location.search, navigate, getToken]);

    return null; // For UI 
}

export default VerifyPaymentPage