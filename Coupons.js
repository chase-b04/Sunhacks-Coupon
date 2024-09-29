import React, { useState } from 'react';
import { startCoupons, stopCoupons } from './Api';  // Assuming Api.js is in the same directory

const Coupons = () => {
    const [couponStatus, setCouponStatus] = useState('');  // State to track coupon session status
    const [loading, setLoading] = useState(false);  // State to handle loading state
    const [error, setError] = useState(null);  // State to capture and display errors

    const handleStartCoupons = async () => {
        try {
            setLoading(true);
            const response = await startCoupons();
            setCouponStatus('Coupon session started successfully.');
            setLoading(false);
        } catch (err) {
            setError('Failed to start coupons: ' + err.message);
            setLoading(false);
        }
    };

    const handleStopCoupons = async () => {
        try {
            setLoading(true);
            const response = await stopCoupons();
            setCouponStatus('Coupon session stopped successfully.');
            setLoading(false);
        } catch (err) {
            setError('Failed to stop coupons: ' + err.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Coupon Management</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {couponStatus && <p>{couponStatus}</p>}
            <button onClick={handleStartCoupons} disabled={loading}>
                Start Coupons
            </button>
            <button onClick={handleStopCoupons} disabled={loading}>
                Stop Coupons
            </button>
        </div>
    );
};

export default Coupons;
