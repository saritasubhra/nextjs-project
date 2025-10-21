"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const initialState = {
  fullname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function useSignup() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const router = useRouter();

  function handleFormData(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function validateInputs() {
    const { password, passwordConfirm } = formData;
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords don't match");
      return false;
    }
    return true;
  }

  async function handleFormSubmission(e) {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      const res = await axios.post("/auth/signup", formData);
      toast.success(res.data.message);
      setAuth(res.data.data);
      setFormData(initialState);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  }

  return { formData, isLoading, handleFormData, handleFormSubmission };
}

export default useSignup;
