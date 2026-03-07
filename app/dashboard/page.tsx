import Link from "next/link";
import { Zap, Map, Battery, Clock, ChevronRight, Activity, Calendar, ArrowRight } from "lucide-react";

export default function Dashboard() {
    const recentTrips = [
        { id: 1, from: "Toronto, ON", to: "Montreal, QC", date: "Oct 24, 2026", status: "Completed", rangeUsed: "85%" },
        { id: 2, from: "Detroit, MI", to: "Chicago, IL", date: "Sep 12, 2026", status: "Completed", rangeUsed: "60%" },
        { id: 3, from: "Vancouver, BC", to: "Seattle, WA", date: "Aug 05, 2026", status: "Completed", rangeUsed: "40%" },
    ];

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
            {/* Sidebar sidebar (Desktop) */}
            <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6">
                <div className="flex items-center gap-2 mb-12">
                    <Zap className="h-6 w-6 text-indigo-400" />
                    <span className="text-xl font-bold tracking-tight">OptiRange</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium">
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
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                            <span className="font-semibold text-indigo-300">JD</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-slate-400">Tesla Model 3 LR</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <Zap className="h-6 w-6 text-indigo-400" />
                        <span className="text-xl font-bold">OptiRange</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <span className="font-semibold text-indigo-300">JD</span>
                    </div>
                </div>

                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Welcome back, John</h1>
                        <p className="text-slate-400">Here's your EV routing overview for today.</p>
                    </div>
                    <Link
                        href="/trip-planner"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                    >
                        <Map className="h-4 w-4" />
                        New Trip Plan
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-400">Total Distance Saved</h3>
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                                <Map className="h-5 w-5 text-indigo-400" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold">1,240</p>
                            <span className="text-sm text-slate-500">km</span>
                        </div>
                        <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            +14% from last month
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-400">Estimated Battery Saved</h3>
                            <div className="p-2 bg-cyan-500/10 rounded-lg">
                                <Battery className="h-5 w-5 text-cyan-400" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold">320</p>
                            <span className="text-sm text-slate-500">kWh</span>
                        </div>
                        <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            +8% from last month
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-400">Time Saved Charging</h3>
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Clock className="h-5 w-5 text-purple-400" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold">4.5</p>
                            <span className="text-sm text-slate-500">hours</span>
                        </div>
                        <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            +2% from last month
                        </p>
                    </div>
                </div>

                {/* Recent Trips */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Recent Trips</h2>
                        <Link href="#" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center">
                            View All <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="divide-y divide-slate-800">
                            {recentTrips.map((trip) => (
                                <div key={trip.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="p-3 bg-slate-800 rounded-xl">
                                            <Map className="h-6 w-6 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white flex items-center gap-2">
                                                {trip.from} <ArrowRight className="h-3 w-3 text-slate-500" /> {trip.to}
                                            </p>
                                            <p className="text-sm text-slate-400">{trip.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 mt-2 sm:mt-0">
                                        <div className="text-right">
                                            <p className="text-sm text-slate-400 mb-1">Range Used</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                                                        style={{ width: trip.rangeUsed }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium">{trip.rangeUsed}</span>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                            {trip.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
