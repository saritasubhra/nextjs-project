"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "@/lib/axios";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?._id) fetchUserCart();
  }, [auth?._id]);

  const fetchUserCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/cart/${auth?._id}`);
      setCart(res.data.data.cartItems);
    } catch (err) {
      console.error(err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateCart = async (pizzaId, quantity = 1) => {
    try {
      const res = await axios.post(`/cart`, {
        userId: auth._id,
        pizzaId,
        quantity,
      });
      setCart(res.data.data.cartItems);
      toast.success("Item added to cart!");
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  const removeCartItem = async (pizzaId) => {
    try {
      const res = await axios.patch(`/cart/${auth._id}`, {
        pizzaId,
      });
      setCart(res.data.data.cartItems);
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`/cart/${auth._id}`);
      setCart([]);
      toast.success("Cart cleared!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
  };

  const subtotal = cart
    ? cart.reduce(
        (sum, item) => sum + (item.pizzaId.price || 0) * item.quantity,
        0
      )
    : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addOrUpdateCart,
        removeCartItem,
        clearCart,
        fetchUserCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartContext used outside of provider");
  return context;
}

export default CartProvider;
