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
  phone: "",
  address: "",
};

function useSignup() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/auth/signup", formData);
      toast.success(res.data.message);
      setAuth(res.data.data);
      setFormData(initialState);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, errors, handleChange, handleSubmit };
}

export default useSignup;
