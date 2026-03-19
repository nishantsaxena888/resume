"use client";

import { useClient } from "@/providers/ClientProvider";
import React, { useState, useEffect } from "react";

export default function SettingsPage() {
    const { activeClient, setActiveClient, adminToken, setAdminToken } = useClient();
    const [tokenInput, setTokenInput] = useState("");
    const [config, setConfig] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState<string[]>([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
                const url = new URL(base);
                const endpoint = `${url.origin}/clients`;
                const res = await fetch(endpoint);
                if (res.ok) {
                    const list = await res.json();
                    setClients(list);
                }
            } catch (err) {
                console.error("Failed to fetch clients:", err);
            }
        };
        fetchClients();
    }, []);

    const fetchConfig = async (token: string) => {
        setLoading(true);
        setError(null);
        try {
            let base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
            if (base.endsWith('/')) base = base.slice(0, -1);
            if (!base.endsWith('/api')) base += '/api';

            const endpoint = `${base}/admin/source-config-all/${activeClient}?token=${encodeURIComponent(token)}`;

            const res = await fetch(endpoint);
            if (res.ok) {
                const data = await res.json();
                setConfig(data);
                setAdminToken(token); // Save token internally if successful
            } else {
                const errorData = await res.json();
                setError(errorData.detail || "Invalid Token or Permission Denied");
                setAdminToken(null);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to connect to backend configuration service.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (adminToken && activeClient) {
            fetchConfig(adminToken);
        } else {
            setConfig(null); // Reset when switching clients without token
        }
    }, [adminToken, activeClient]);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (tokenInput.trim()) {
            fetchConfig(tokenInput.trim());
        }
    };

    const handleLock = () => {
        setAdminToken(null);
        setTokenInput("");
        setConfig(null);
    };

    const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

    const togglePassword = (envKey: string) => {
        setRevealedPasswords(prev => ({ ...prev, [envKey]: !prev[envKey] }));
    };

    if (!adminToken || !config) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4">
                <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl shadow-xl max-w-sm w-full">
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-2xl">🔒</span> Protected Area
                    </h2>
                    <p className="text-sm text-slate-400 mb-6">
                        Enter the SuperAdmin Master Token to view the database connection and source routing configurations for <strong>{activeClient}</strong>.
                    </p>

                    <form onSubmit={handleUnlock} className="flex flex-col gap-3">
                        <input
                            type="password"
                            value={tokenInput}
                            onChange={e => setTokenInput(e.target.value)}
                            placeholder="e.g. studio_admin_token_..."
                            className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white outline-none focus:border-blue-500"
                        />
                        {error && <div className="text-red-400 text-xs font-medium">{error}</div>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors disabled:opacity-50"
                        >
                            {loading ? "Verifying..." : "Unlock Configuration"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center bg-slate-900 p-5 rounded-lg border border-slate-800 shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold text-white">Global Infrastructure Mappings</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-slate-400">
                            Viewing deployments for Tenant Base:
                        </span>
                        {clients.length > 0 ? (
                            <select
                                className="bg-slate-950/80 border border-slate-700 text-emerald-400 font-bold uppercase tracking-wider rounded px-2 py-1 outline-none focus:border-emerald-500 text-sm cursor-pointer hover:bg-slate-900 transition-colors"
                                value={activeClient}
                                onChange={(e) => {
                                    setActiveClient(e.target.value);
                                    window.location.reload();
                                }}
                            >
                                {clients.map(c => (
                                    <option key={c} value={c} className="bg-slate-900 text-slate-200 uppercase">{c}</option>
                                ))}
                            </select>
                        ) : (
                            <strong className="text-emerald-400 uppercase tracking-wider">{config.client}</strong>
                        )}
                    </div>
                </div>
                <button
                    onClick={handleLock}
                    className="text-sm font-medium text-slate-400 hover:text-white border border-slate-700 px-4 py-2 rounded transition-colors bg-slate-950"
                >
                    Lock Area
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {['dev', 'test', 'stage', 'prod'].map((envKey) => {
                    const envData = config.environments[envKey];
                    const isActive = envData?.status === "Active";

                    // Style config per env
                    const styles: Record<string, string> = {
                        dev: "border-blue-500/30 bg-blue-500/5",
                        test: "border-purple-500/30 bg-purple-500/5",
                        stage: "border-amber-500/30 bg-amber-500/5",
                        prod: "border-emerald-500/30 bg-emerald-500/5"
                    };

                    const badgeColors: Record<string, string> = {
                        dev: "bg-blue-600 text-white",
                        test: "bg-purple-600 text-white",
                        stage: "bg-amber-600 text-white",
                        prod: "bg-emerald-600 text-white"
                    };

                    return (
                        <div key={envKey} className={`rounded-xl border ${styles[envKey] || 'border-slate-800 bg-slate-900/50'} overflow-hidden shadow-md flex flex-col`}>
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-slate-800/50 bg-slate-900/50">
                                <div className="flex items-center gap-3">
                                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${badgeColors[envKey] || 'bg-slate-700 text-white'}`}>
                                        {envKey}
                                    </span>
                                    <h2 className="text-lg font-semibold text-white">
                                        {config.client}_{envKey}
                                    </h2>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded ${isActive ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500 bg-slate-800'}`}>
                                    {envData?.status || "Unknown"}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex-1">
                                {!isActive ? (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-500 py-8">
                                        <div className="text-3xl mb-2 opacity-50">⏸️</div>
                                        <p className="text-sm font-medium">Environment currently offline</p>
                                        <p className="text-xs mt-1">No database routing enabled in bootstrapper.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 font-mono text-sm text-slate-300">
                                        <div className="flex justify-between items-center bg-slate-950/50 p-2.5 rounded border border-slate-800/50">
                                            <span className="text-slate-500">Database Engine:</span>
                                            <span className="text-blue-400 font-semibold flex items-center gap-2">
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 4.02 2 6.5C2 8.98 6.48 11 12 11C17.52 11 22 8.98 22 6.5C22 4.02 17.52 2 12 2ZM12 9C7.45 9 4 7.37 4 6.5C4 5.63 7.45 4 12 4C16.55 4 20 5.63 20 6.5C20 7.37 16.55 9 12 9ZM2 11.5V17.5C2 19.98 6.48 22 12 22C17.52 22 22 19.98 22 17.5V11.5C22 13.98 17.52 16 12 16C6.48 16 2 13.98 2 11.5ZM12 20C7.45 20 4 18.37 4 17.5V14.28C5.93 15.35 8.78 16 12 16C15.22 16 18.07 15.35 20 14.28V17.5C20 18.37 16.55 20 12 20Z"></path>
                                                </svg>
                                                {envData.database?.type}
                                            </span>
                                        </div>

                                        <div className="space-y-2 px-1">
                                            <div className="flex justify-between items-end border-b border-slate-800/50 pb-2">
                                                <span className="text-slate-500 text-xs uppercase tracking-wider">Host URL</span>
                                                <span className="text-slate-200">{envData.database?.host}</span>
                                            </div>
                                            <div className="flex justify-between items-end border-b border-slate-800/50 pb-2">
                                                <span className="text-slate-500 text-xs uppercase tracking-wider">DB Name</span>
                                                <span className="text-white font-bold">{envData.database?.name}</span>
                                            </div>
                                            <div className="flex justify-between items-end border-b border-slate-800/50 pb-2">
                                                <span className="text-slate-500 text-xs uppercase tracking-wider">Username</span>
                                                <span className="text-slate-200">{envData.database?.user}</span>
                                            </div>
                                            <div className="flex justify-between items-end pt-1">
                                                <span className="text-slate-500 text-xs uppercase tracking-wider mt-1.5">Password</span>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-slate-400 ${!revealedPasswords[envKey] && 'blur-[4px] select-none'} transition-all`}>
                                                        {envData.database?.pass}
                                                    </span>
                                                    <button
                                                        onClick={() => togglePassword(envKey)}
                                                        className="text-slate-500 hover:text-white ml-2 p-1"
                                                        aria-label="Toggle password visibility"
                                                    >
                                                        {revealedPasswords[envKey] ? '👁️‍🗨️' : '👁️'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
