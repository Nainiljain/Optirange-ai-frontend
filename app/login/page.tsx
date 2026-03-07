"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
                // Normally we'd redirect to dashboard here:
                window.location.href = "/dashboard";
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Dynamic background effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-indigo-500/20 p-3 rounded-2xl border border-indigo-500/30">
                        <Zap className="h-8 w-8 text-indigo-400" />
                    </div>
                </div>
                <h2 className="text-center text-3xl font-extrabold tracking-tight">
                    Welcome back to OptiRange
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                        Sign up today
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-slate-900/60 backdrop-blur-xl py-8 px-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-slate-800 sm:rounded-2xl sm:px-10">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                <Lock className="h-8 w-8 text-green-400" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">Login Successful</h3>
                            <p className="text-slate-400">Redirecting to dashboard...</p>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                    Email address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className={`block w-full pl-10 bg-slate-950/50 border ${errors.email ? "border-red-500" : "border-slate-700"
                                            } rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) setErrors({ ...errors, email: undefined });
                                        }}
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-400 font-medium">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className={`block w-full pl-10 bg-slate-950/50 border ${errors.password ? "border-red-500" : "border-slate-700"
                                            } rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (errors.password) setErrors({ ...errors, password: undefined });
                                        }}
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-400 font-medium">{errors.password}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 bg-slate-900 border-slate-700 rounded text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign in
                                            <ArrowRight className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
