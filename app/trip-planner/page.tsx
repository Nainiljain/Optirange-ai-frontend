"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, MapPin, Navigation, Battery, Activity, Loader2, ArrowRight, Map, Settings, Calendar, Car } from "lucide-react";

// Using the data directly since we want it client-side without an async fetch complexity for the UI prototype
import vehiclesData from "../../data/vehicle.json";

export default function TripPlanner() {
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [battery, setBattery] = useState("80");
    const [vehicle, setVehicle] = useState("");

    // Type definition inferred from our data
    const [vehicles, setVehicles] = useState<any[]>([]);

    useEffect(() => {
        // Load the vehicles list
        setVehicles(vehiclesData);
    }, []);

    const [errors, setErrors] = useState<{ start?: string; destination?: string; battery?: string; vehicle?: string }>({});
    const [loading, setLoading] = useState(false);
    const [routePlanned, setRoutePlanned] = useState(false);

    const validateForm = () => {
        const newErrors: { start?: string; destination?: string; battery?: string; vehicle?: string } = {};

        if (!start.trim()) newErrors.start = "Start location is required";
        if (!destination.trim()) newErrors.destination = "Destination is required";
        if (!battery) newErrors.battery = "Current battery is required";
        else {
            const num = parseInt(battery);
            if (isNaN(num) || num < 5 || num > 100) {
                newErrors.battery = "Must be between 5-100";
            }
        }
        if (!vehicle) newErrors.vehicle = "Please select a vehicle";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlanTrip = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            setRoutePlanned(false);
            // Simulate API calculation
            setTimeout(() => {
                setLoading(false);
                setRoutePlanned(true);
            }, 2000);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6">
                <div className="flex items-center gap-2 mb-12">
                    <Zap className="h-6 w-6 text-indigo-400" />
                    <span className="text-xl font-bold tracking-tight">OptiRange</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                        <Activity className="h-5 w-5" />
                        Overview
                    </Link>
                    <Link href="/trip-planner" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20">
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

                <header className="mb-8 md:mb-10 flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                        <MapPin className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-1">Plan Your Trip</h1>
                        <p className="text-sm md:text-base text-slate-400">Enter your route details to find the optimal charging stops.</p>
                    </div>
                </header>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Controls Panel */}
                    <div className="w-full xl:w-1/3 shrink-0">
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                            <form onSubmit={handlePlanTrip} className="space-y-5">
                                {/* Route Section */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Route Details</h3>

                                    <div className="relative">
                                        <div className="absolute top-3 left-3 flex flex-col items-center gap-1 pointer-events-none">
                                            <div className="w-3 h-3 rounded-full border-2 border-indigo-500 bg-slate-950" />
                                            <div className="w-0.5 h-10 bg-slate-700" />
                                            <MapPin className="h-4 w-4 text-emerald-500" />
                                        </div>

                                        <div className="space-y-3 pl-10">
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Starting location (e.g., Toronto, ON)"
                                                    value={start}
                                                    onChange={(e) => {
                                                        setStart(e.target.value);
                                                        if (errors.start) setErrors({ ...errors, start: undefined });
                                                    }}
                                                    className={`w-full bg-slate-950/50 border ${errors.start ? 'border-red-500' : 'border-slate-700'} rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                                />
                                                {errors.start && <p className="mt-1 text-xs text-red-400">{errors.start}</p>}
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Destination (e.g., Montreal, QC)"
                                                    value={destination}
                                                    onChange={(e) => {
                                                        setDestination(e.target.value);
                                                        if (errors.destination) setErrors({ ...errors, destination: undefined });
                                                    }}
                                                    className={`w-full bg-slate-950/50 border ${errors.destination ? 'border-red-500' : 'border-slate-700'} rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                                />
                                                {errors.destination && <p className="mt-1 text-xs text-red-400">{errors.destination}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-slate-800" />

                                {/* Vehicle Details */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Vehicle Configuration</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-2">
                                            <Car className="h-4 w-4 text-slate-400" />
                                            Select Vehicle
                                        </label>
                                        <select
                                            value={vehicle}
                                            onChange={(e) => {
                                                setVehicle(e.target.value);
                                                if (errors.vehicle) setErrors({ ...errors, vehicle: undefined });
                                            }}
                                            className={`w-full bg-slate-950/50 border ${errors.vehicle ? 'border-red-500' : 'border-slate-700'} rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none`}
                                        >
                                            <option value="" disabled>Choose an EV...</option>
                                            {vehicles.map(v => (
                                                <option key={v.id} value={v.id}>{v.make} {v.model} ({v.year}) - {v.base_range_km}km</option>
                                            ))}
                                        </select>
                                        {errors.vehicle && <p className="mt-1 text-xs text-red-400">{errors.vehicle}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Battery className="h-4 w-4 text-slate-400" />
                                                Current Battery Level
                                            </div>
                                            <span className="text-indigo-400 font-bold">{battery}%</span>
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range"
                                                min="5"
                                                max="100"
                                                value={battery}
                                                onChange={(e) => {
                                                    setBattery(e.target.value);
                                                    if (errors.battery) setErrors({ ...errors, battery: undefined });
                                                }}
                                                className="w-full accent-indigo-500"
                                            />
                                            <input
                                                type="number"
                                                value={battery}
                                                onChange={(e) => {
                                                    setBattery(e.target.value);
                                                    if (errors.battery) setErrors({ ...errors, battery: undefined });
                                                }}
                                                className={`w-20 bg-slate-950/50 border ${errors.battery ? 'border-red-500' : 'border-slate-700'} rounded-lg py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                            />
                                        </div>
                                        {errors.battery && <p className="mt-1 text-xs text-red-400">{errors.battery}</p>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Calculating Initial Route...
                                        </>
                                    ) : (
                                        <>
                                            <Navigation className="h-5 w-5" />
                                            Generate Eco Route
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Map & Results Placeholder area */}
                    <div className="w-full xl:w-2/3 flex flex-col gap-6">
                        {loading ? (
                            <div className="flex-1 bg-slate-900/30 border border-slate-800/50 rounded-2xl flex flex-col items-center justify-center min-h-[400px] border-dashed">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
                                    <Zap className="h-12 w-12 text-indigo-400 animate-bounce relative z-10" />
                                </div>
                                <p className="mt-6 text-slate-400 font-medium">Analyzing terrain, weather, and charging stations...</p>
                                <div className="w-64 h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full w-2/3 animate-[pulse_1s_ease-in-out_infinite]" />
                                </div>
                            </div>
                        ) : routePlanned ? (
                            <>
                                {/* Mock Map Area */}
                                <div className="h-[400px] bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden group">
                                    {/* Simulated map graphic using CSS background */}
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
                                    <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] z-10" />
                                    <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10" />
                                    <div className="absolute top-[40%] left-[45%] w-6 h-6 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center z-10">
                                        <Zap className="h-3 w-3 text-cyan-400" />
                                    </div>
                                    <div className="absolute top-[30%] left-[65%] w-6 h-6 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center z-10">
                                        <Zap className="h-3 w-3 text-cyan-400" />
                                    </div>

                                    {/* Mock Route Line */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                                        <path d="M 25% 50% Q 35% 20% 45% 40% T 65% 30% T 75% 25%" stroke="rgba(99,102,241,0.6)" strokeWidth="4" fill="none" strokeDasharray="8 8" className="animate-[dash_20s_linear_infinite]" />
                                    </svg>

                                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="text-xs text-slate-400">Total Distance</p>
                                                <p className="font-bold text-lg">542 km</p>
                                            </div>
                                            <div className="w-px h-8 bg-slate-800" />
                                            <div>
                                                <p className="text-xs text-slate-400">Est. Time</p>
                                                <p className="font-bold text-lg">6h 15m</p>
                                            </div>
                                        </div>
                                        <button className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-emerald-500/20 flex items-center gap-2">
                                            <Navigation className="h-4 w-4" /> Start
                                        </button>
                                    </div>
                                </div>

                                {/* Mock Stops */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg">Recommended Charging Stops</h3>

                                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
                                                <Zap className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">Electrify Canada Station</h4>
                                                <p className="text-sm text-slate-400">Kingston, ON • Arrive with 18%</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-emerald-400">35 mins</p>
                                            <p className="text-xs text-slate-400 text-right">Charge to 80%</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
                                                <Zap className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">Ivy Charging Network</h4>
                                                <p className="text-sm text-slate-400">Cornwall, ON • Arrive with 22%</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-emerald-400">20 mins</p>
                                            <p className="text-xs text-slate-400 text-right">Charge to 65%</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 bg-slate-900/30 border border-slate-800/40 rounded-2xl flex flex-col items-center justify-center min-h-[400px] border-dashed p-12 text-center">
                                <Map className="h-16 w-16 text-slate-700 mb-6" />
                                <h3 className="text-xl font-bold text-slate-300 mb-2">No Route Planned Yet</h3>
                                <p className="text-slate-500 max-w-md">Enter your starting point, destination, and vehicle details to generate an optimized route with recommended charging stops.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
