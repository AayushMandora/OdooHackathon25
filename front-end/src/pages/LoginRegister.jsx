import React, { useState, useEffect } from "react";
import { login, register } from "../helpers/userApi";

export default function LoginRegister() {
    const [mode, setMode] = useState("login"); // 'login' or 'register'
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            if (mode === "login") {
                const res = await login(form.email, form.password);
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    setSuccess("Login successful!");
                    window.location.href = "/";
                } else {
                    setError(res.message);
                }
            } else {
                const res = await register(form.name, form.email, form.password);
                if (res) {
                    setSuccess("Registration successful! Please login.");
                    setMode("login");
                } else {
                    setError(res.message);
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/";
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900">
            <div className="bg-neutral-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <button
                        className={`px-4 py-2 rounded-l-lg font-bold transition-colors ${mode === "login" ? "bg-blue-500 text-white" : "bg-neutral-700 text-gray-300"}`}
                        onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
                        disabled={loading}
                    >
                        Login
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-lg font-bold transition-colors ${mode === "register" ? "bg-blue-500 text-white" : "bg-neutral-700 text-gray-300"}`}
                        onClick={() => { setMode("register"); setError(""); setSuccess(""); }}
                        disabled={loading}
                    >
                        Register
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "register" && (
                        <div>
                            <label className="block mb-1 text-gray-200">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded bg-neutral-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block mb-1 text-gray-200">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-neutral-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-200">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-neutral-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {error && <div className="text-red-400 text-sm">{error}</div>}
                    {success && <div className="text-green-400 text-sm">{success}</div>}
                    <button
                        type="submit"
                        className="w-full py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold transition-colors disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? (mode === "login" ? "Logging in..." : "Registering...") : (mode === "login" ? "Login" : "Register")}
                    </button>
                </form>
            </div>
        </div>
    );
} 