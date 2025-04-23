"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
    title: string;
    by: string;
    imageUrl: string;
    discountedPrice: number;
    originalPrice: number;
    hrs: number,
    authorPicUrl: string,
    lessons: number,
    ratings: number
}

interface Bill {
    totalOriginal: number,
    totalDiscounted: number,
    discountPercentage: number
}

interface UserContextType {
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    cart: Boolean;
    setCart: React.Dispatch<React.SetStateAction<Boolean>>;
    promotion: Boolean;
    setPromotion: React.Dispatch<React.SetStateAction<Boolean>>;
    bill: Bill;
    setBill: React.Dispatch<React.SetStateAction<Bill>>;
    handleRemoveItem(index: number): void
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [bill, setBill] = useState<Bill>({ totalDiscounted: 0, totalOriginal: 0, discountPercentage: 0 });
    const [cart, setCart] = useState<Boolean>(false);
    const [promotion, setPromotion] = useState<Boolean>(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/data/cartItems.json');
                setItems(prevItems => [...prevItems, ...response.data]);
            } catch (error) {
                console.log("Internal Server Error");
            }
        }

        fetchItems();
    }, [])

    useEffect(() => {
        const calculateTotal = () => {
            try {
                let totalOriginal: number = 0, totalDiscounted: number = 0;
                for (let index: number = 0; index < items.length; index++) {
                    totalDiscounted += items[index].discountedPrice;
                    totalOriginal += items[index].originalPrice;
                }

                const discountAmount = totalOriginal - totalDiscounted;

                const discountPercentage = (discountAmount / totalOriginal) * 100;

                setBill({
                    totalDiscounted: totalDiscounted,
                    totalOriginal: totalOriginal,
                    discountPercentage: discountPercentage
                })
            } catch (error) {
                console.log("Error generating bill!");
            }
        }

        calculateTotal();
    }, [items])

    const handleRemoveItem = (index: number) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    return (
        <UserContext.Provider value={{ items, setItems, handleRemoveItem, cart, setCart, promotion, setPromotion, bill, setBill }}>
            {children}
        </UserContext.Provider>
    );
};
