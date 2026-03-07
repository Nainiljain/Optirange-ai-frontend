import Link from "next/link";
import { ArrowRight, MapPin, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans text-slate-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-indigo-400" />
          <span className="text-xl font-bold tracking-tight">OptiRange</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-indigo-400 transition-colors">
            Log in
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(79,70,229,0.5)]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
          <Zap className="h-4 w-4" />
          <span>Smart EV Routing is here</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          Optimize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">EV Journey</span> with precision.
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Plan long trips with confidence. OptiRange calculates the perfect route matching your vehicle's range to optimal charging stations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/trip-planner"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-medium px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]"
          >
            Plan a Trip Now
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 text-slate-200 text-lg font-medium px-8 py-4 rounded-full border border-slate-700 transition-all backdrop-blur-sm"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto text-left">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Routing</h3>
            <p className="text-slate-400">Discover the most efficient routes dynamically adjusted for elevation and weather.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Charging Integration</h3>
            <p className="text-slate-400">Seamlessly locate available fast chargers along your exact pathway.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
            <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Range Assurance</h3>
            <p className="text-slate-400">Never worry about range anxiety with real-time accurate battery estimates.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
