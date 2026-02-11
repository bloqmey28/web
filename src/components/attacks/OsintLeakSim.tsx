import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, AlertTriangle, Eye, Database, Lock, ShieldAlert } from 'lucide-react';

const MOCK_BREACHES = [
    { service: 'LinkedIn', date: '2021-06', data: 'Email, Phone, Job Title', risk: 'HIGH' },
    { service: 'Adobe', date: '2013-10', data: 'Email, Password Hint', risk: 'MEDIUM' },
    { service: 'Canva', date: '2019-05', data: 'Email, Name, City', risk: 'LC' },
    { service: 'Dropbox', date: '2012-07', data: 'Email, Hashed Password', risk: 'CRITICAL' },
    { service: 'Twitter', date: '2023-01', data: 'Email, Handle', risk: 'MEDIUM' },
];

export const OsintLeakSim = () => {
    const [target, setTarget] = useState('');
    const [scanning, setScanning] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [results, setResults] = useState<any[]>([]);
    const [progress, setProgress] = useState(0);

    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const startScan = () => {
        if (!target) return;
        setScanning(true);
        setLogs([]);
        setResults([]);
        setProgress(0);

        const steps = [
            `Initializing OSINT search for: ${target}`,
            'Connecting to TOR nodes...',
            'Querying DeHashed API...',
            'Scanning Pastebin dumps...',
            'Analyzing dark web market listings...',
            'Cross-referencing with BreachDirectory...',
            'Decryping hash samples...',
        ];

        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex >= steps.length) {
                clearInterval(interval);
                finishScan();
                return;
            }

            const currentStep = steps[stepIndex];
            setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${currentStep}`]);
            setProgress(prev => prev + (100 / steps.length));
            stepIndex++;

            // Randomly "find" a breach during scan
            if (Math.random() > 0.5 && results.length < 3) {
                const randomBreach = MOCK_BREACHES[Math.floor(Math.random() * MOCK_BREACHES.length)];
                // Avoid duplicates
                setResults(prev => {
                    if (prev.find(b => b.service === randomBreach.service)) return prev;
                    return [...prev, randomBreach];
                });
            }

        }, 800);
    };

    const finishScan = () => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] SCAN COMPLETE. ${results.length} LEAKS FOUND.`]);
        setScanning(false);
        setProgress(100);
    };

    return (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 space-y-6 relative overflow-hidden group hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Eye className="text-purple-500" size={20} />
                <h3 className="text-lg font-black text-white uppercase tracking-wider">OSINT / Leak Checker</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Control Panel */}
                <div className="space-y-4">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Target Identity</div>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                            <input
                                type="text"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                placeholder="Enter email or username..."
                                className="w-full bg-slate-950 border border-white/10 rounded-lg py-3 pl-10 pr-3 text-sm text-white focus:border-purple-500/50 outline-none font-mono"
                                disabled={scanning}
                            />
                        </div>
                        <button
                            onClick={startScan}
                            disabled={scanning || !target}
                            className={`px-6 rounded-lg font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2 ${scanning ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-purple-900/20 text-purple-400 hover:bg-purple-900/40 border border-purple-500/30'}`}
                        >
                            {scanning ? <div className="w-3 h-3 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" /> : <Globe size={14} />}
                            {scanning ? 'Scanning...' : 'Scan'}
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Terminal Output */}
                    <div ref={logContainerRef} className="h-40 bg-black rounded-lg border border-purple-900/30 p-4 font-mono text-[10px] overflow-y-auto custom-scrollbar">
                        <div className="text-purple-700 mb-2 uppercase opacity-50">DeepSearch v4.0.1 (Connected via Proxy)</div>
                        {logs.map((log, i) => (
                            <div key={i} className="text-slate-400 mb-1">
                                <span className="text-purple-500 mr-2">{'>'}</span>
                                {log}
                            </div>
                        ))}
                        {scanning && <div className="animate-pulse text-purple-500 mt-1">_</div>}
                    </div>
                </div>

                {/* Results Visualizer */}
                <div className="space-y-4">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold flex justify-between items-center">
                        <span>Breach Intelligence</span>
                        <span className="text-purple-500">{results.length} Matches</span>
                    </div>

                    <div className="space-y-3 h-64 overflow-y-auto custom-scrollbar pr-2">
                        <AnimatePresence>
                            {results.map((breach, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-slate-950/50 border border-white/5 rounded-lg p-3 relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <Database size={14} className="text-slate-500" />
                                            <span className="font-bold text-white">{breach.service}</span>
                                        </div>
                                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${breach.risk === 'CRITICAL' ? 'bg-red-900/30 text-red-500' :
                                                breach.risk === 'HIGH' ? 'bg-orange-900/30 text-orange-500' :
                                                    'bg-yellow-900/30 text-yellow-500'
                                            }`}>
                                            {breach.risk}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-mono">
                                        <div>
                                            <div className="opacity-50 uppercase">Date</div>
                                            <div>{breach.date}</div>
                                        </div>
                                        <div>
                                            <div className="opacity-50 uppercase">Compromised Data</div>
                                            <div className="text-slate-300">{breach.data}</div>
                                        </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2 text-[10px] text-red-400">
                                        <Lock size={10} />
                                        <span>Password Hash: $2a$12$R9h/cIPz0gi...</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {!scanning && results.length === 0 && logs.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 opacity-50">
                                <ShieldAlert size={32} />
                                <div className="text-xs text-center">Ready to verify identities.<br />Enter a target to begin passive reconnaissance.</div>
                            </div>
                        )}
                        {!scanning && results.length === 0 && logs.length > 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-green-600 space-y-2">
                                <ShieldAlert size={32} />
                                <div className="text-xs text-center font-bold">No public leaks found.<br />Target appears clean (for now).</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
