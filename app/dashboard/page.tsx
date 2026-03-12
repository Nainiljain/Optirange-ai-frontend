"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Map, Battery, Clock, ChevronRight, Activity, Calendar, ArrowRight } from "lucide-react";

export default function Dashboard() {
    const defaultTrips = [
        { id: 1, from: "Toronto, ON", to: "Montreal, QC", date: "Oct 24, 2026", status: "Completed", rangeUsed: "85%" },
        { id: 2, from: "Detroit, MI", to: "Chicago, IL", date: "Sep 12, 2026", status: "Completed", rangeUsed: "60%" },
        { id: 3, from: "Vancouver, BC", to: "Seattle, WA", date: "Aug 05, 2026", status: "Completed", rangeUsed: "40%" },
    ];

    const [recentTrips, setRecentTrips] = useState<any[]>(defaultTrips);

    useEffect(() => {
        try {
            const savedTrips = JSON.parse(localStorage.getItem('recentTrips') || '[]');
            if (savedTrips && savedTrips.length > 0) {
                setRecentTrips(savedTrips);
            } else {
                // Initialize default trips if none exist
                localStorage.setItem('recentTrips', JSON.stringify(defaultTrips));
            }
        } catch (e) {
            console.error("Failed to load trips from local storage", e);
        }
    }, [defaultTrips]);

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
            {/* Sidebar sidebar (Desktop) */}
            <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6">
                <div className="flex items-center gap-2 mb-12">
                    <Zap className="h-6 w-6 text-indigo-400" />
                    <span className="text-xl font-bold tracking-tight">OptiRange</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20">
                        <Activity className="h-5 w-5" />
                        Overview
                    </Link>
                    <Link href="/trip-planner" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                        <Map className="h-5 w-5" />
                        Trip Planner
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                        <Battery className="h-5 w-5" />
                        My Vehicles
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                        <Calendar className="h-5 w-5" />
                        History
                    </Link>
                </nav>

                <div className="mt-auto">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                            <span className="font-semibold text-indigo-300">JD</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-slate-400">Settings</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto relative">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-2">
                        <Zap className="h-6 w-6 text-indigo-400" />
                        <span className="text-xl font-bold">OptiRange</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <span className="font-semibold text-indigo-300">JD</span>
                    </div>
                </div>

                <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-4 relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Welcome back, John</h1>
                        <p className="text-slate-400">Here's your EV routing overview for today.</p>
                    </div>
                    <Link
                        href="/trip-planner"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] font-medium"
                    >
                        <Map className="h-4 w-4" />
                        New Trip Plan
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:bg-slate-800/60 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-400">Total Distance Saved</h3>
                            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                                <Map className="h-5 w-5 text-indigo-400" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold">1,240</p>
                            <span className="text-sm text-slate-500">km</span>
                        </div>
                        <p className="text-xs text-emerald-400 mt-3 flex items-center gap-1 font-medium bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
                            <Activity className="h-3 w-3" />
                            +14% from last month
                        </p>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:bg-slate-800/60 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-400">Estimated Battery Saved</h3>
                            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                <Battery className="h-5 w-5 text-cyan-400" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold">320</p>
                            <span className="text-sm text-slate-500">kWh</span>
                        </div>
                        <p className="text-xs text-emerald-400 mt-3 flex items-center gap-1 font-medium bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
                            <Activity className="h-3 w-3" />
                            +8% from last month
                        </p>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:bg-slate-800/60 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-400">Time Saved Charging</h3>
                            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                <Clock className="h-5 w-5 text-purple-400" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold">4.5</p>
                            <span className="text-sm text-slate-500">hours</span>
                        </div>
                        <p className="text-xs text-emerald-400 mt-3 flex items-center gap-1 font-medium bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
                            <Activity className="h-3 w-3" />
                            +2% from last month
                        </p>
                    </div>
                </div>

                {/* Recent Trips */}
                <div className="relative z-10 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Recent Trips</h2>
                        <Link href="/trip-planner" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center transition-colors">
                            Plan New Trip <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                        <div className="divide-y divide-slate-800/60">
                            {recentTrips.length > 0 ? recentTrips.map((trip) => (
                                <div key={trip.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="p-3 bg-slate-800/80 rounded-xl group-hover:bg-slate-800 transition-colors border border-slate-700/50">
                                            <Map className="h-6 w-6 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white flex items-center gap-2 text-sm sm:text-base">
                                                {trip.from} <ArrowRight className="h-3 w-3 text-slate-500" /> {trip.to}
                                            </p>
                                            <p className="text-sm text-slate-400 mt-0.5">{trip.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 mt-2 sm:mt-0">
                                        <div className="text-right w-full sm:w-auto">
                                            <div className="flex items-center justify-between sm:justify-end gap-3 mb-1.5">
                                                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Range Used</p>
                                                <span className="text-sm font-bold bg-slate-800 px-2 py-0.5 rounded text-white">{trip.rangeUsed}</span>
                                            </div>
                                            <div className="flex items-center justify-end">
                                                <div className="w-full sm:w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                                                        style={{ width: trip.rangeUsed }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border shrink-0 ${trip.status === "Completed"
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                            }`}>
                                            {trip.status}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-8 text-center flex flex-col items-center justify-center">
                                    <Map className="h-12 w-12 text-slate-700 mb-4" />
                                    <p className="text-lg font-medium text-white mb-2">No recent trips</p>
                                    <p className="text-slate-400 text-sm max-w-sm mb-6">You haven't planned any trips yet. Generate your first eco-route completely dynamically.</p>
                                    <Link href="/trip-planner" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
                                        Plan a Trip
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
