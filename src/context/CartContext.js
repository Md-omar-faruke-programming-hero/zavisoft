"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const storedCart = localStorage.getItem("kicks_cart");
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        } catch (e) {
            console.error("Failed to load cart from local storage", e);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem("kicks_cart", JSON.stringify(cartItems));
            } catch (e) {
                console.error("Failed to save cart to local storage", e);
            }
        }
    }, [cartItems, isLoaded]);

    const addToCart = (product, size = "41", color = "black", quantity = 1) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === product.id && item.size === size && item.color === color
            );

            if (existingItemIndex >= 0) {
                // If it exists, we do nothing and return the same array
                // The user can only increase quantity from the cart page itself
                return prevItems;
            }

            return [...prevItems, { ...product, size, color, quantity: Math.max(1, quantity) }];
        });
    };

    const removeFromCart = (productId, size, color) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.id === productId && item.size === size && item.color === color))
        );
    };

    const updateQuantity = (productId, size, color, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId && item.size === size && item.color === color
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price || 130) * item.quantity, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                getCartTotal,
                getCartCount,
                isLoaded
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
