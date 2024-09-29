import React from 'react';
import { startCoupons, stopCoupons } from './Api';

function App() {
    const handleStart = async () => {
        try {
            const data = await startCoupons();
            console.log(data.message);
        } catch (error) {
            console.error('Failed to start coupons:', error);
        }
    };

    const handleStop = async () => {
        try {
            const data = await stopCoupons();
            console.log(data.message);
        } catch (error) {
            console.error('Failed to stop coupons:', error);
        }
    };

    return (
        <div>
            <h1>Safeway Coupons Manager</h1>
            <button onClick={handleStart}>Start Coupons</button>
            <button onClick={handleStop}>Stop Coupons</button>
        </div>
    );
}

export default App;