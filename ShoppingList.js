import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getShoppingList, updateShoppingList, getCoupons } from './Api';

const API_BASE_URL = 'http://localhost:5000';

const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [totalSavings, setTotalSavings] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchShoppingList();
    }, []);

    const fetchShoppingList = async () => {
        setLoading(true);
        try {
            const listData = await getShoppingList();
            setShoppingList(listData);
            calculateSavings(listData);
        } catch (error) {
            console.error('Failed to fetch shopping list:', error);
        }
        setLoading(false);
    };

    const handleUpdateList = async (newItem) => {
        const updatedList = [...shoppingList, newItem];
        try {
            await updateShoppingList(updatedList);
            setShoppingList(updatedList);
            calculateSavings(updatedList);
        } catch (error) {
            console.error('Failed to update shopping list:', error);
        }
    };

    const calculateSavings = async (listItems) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/calculate-savings`, { items: listItems });
            setTotalSavings(response.data.totalSavings);
        } catch (error) {
            console.error('Failed to calculate savings:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Shopping List</h2>
            <ul>
                {shoppingList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={() => handleUpdateList('New Item')}>Add New Item</button>
            <h3>Total Savings: ${totalSavings.toFixed(2)}</h3>
        </div>
    );
};

export default ShoppingList;
