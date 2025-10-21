"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const initialState = {
  email: "",
  password: "",
};

function useLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const router = useRouter();

  function handleFormData(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function handleFormSubmission(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post("/auth/login", formData);
      toast.success(res?.data?.message);
      setAuth(res?.data?.data);
      setFormData(initialState);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return { formData, isLoading, handleFormData, handleFormSubmission };
}

export default useLogin;
