import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, RefreshCw, AlertTriangle } from 'lucide-react';

const COMMON_PASSWORDS = [
    'password', '123456', 'admin', 'qwerty', 'letmein', 'shadow', 'hunter2', 'dragon', 'master', '12345678'
];

export const BruteForceSim = () => {
    const [targetPassword, setTargetPassword] = useState('dragon');
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(0);
    const [cracked, setCracked] = useState(false);

    const logsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logsContainerRef.current) {
            logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
        }
    }, [logs]);

    useEffect(() => {
        let interval: any;

        if (isRunning && !cracked) {
            interval = setInterval(() => {
                setAttempts(prev => prev + 1);

                const randomPass = Math.random() > 0.8
                    ? targetPassword
                    : COMMON_PASSWORDS[Math.floor(Math.random() * COMMON_PASSWORDS.length)] + Math.floor(Math.random() * 100);

                const isMatch = randomPass === targetPassword;

                setLogs(prev => {
                    const newLog = `[TRY] ${randomPass} ... ${isMatch ? 'SUCCESS!' : 'FAIL'}`;
                    return [...prev.slice(-5), newLog];
                });

                if (isMatch) {
                    setCracked(true);
                    setIsRunning(false);
                }

            }, 200);
        }

        return () => clearInterval(interval);
    }, [isRunning, cracked, targetPassword]);

    const startAttack = () => {
        setIsRunning(true);
        setCracked(false);
        setLogs([]);
        setAttempts(0);
    };

    return (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 space-y-6 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Terminal className="text-red-500" size={20} />
                <h3 className="text-lg font-black text-white uppercase tracking-wider">Brute Force Visualizer</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-red-400 font-bold uppercase">Target Password</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={targetPassword}
                                onChange={(e) => setTargetPassword(e.target.value)}
                                disabled={isRunning}
                                className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-red-500/50 outline-none font-mono"
                            />
                            <button
                                onClick={startAttack}
                                disabled={isRunning}
                                className="bg-red-500/20 text-red-500 p-3 rounded-lg hover:bg-red-500/30 disabled:opacity-50"
                            >
                                {isRunning ? <RefreshCw className="animate-spin" size={18} /> : 'Start Attack'}
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-950 rounded-lg p-4 border border-white/5 space-y-2">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                            <span>Status</span>
                            <span className={isRunning ? "text-yellow-500 animate-pulse" : "text-slate-500"}>{isRunning ? 'ATTACKING...' : 'IDLE'}</span>
                        </div>
                        <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                            <span>Attempts</span>
                            <span className="text-white">{attempts}</span>
                        </div>
                    </div>
                </div>

                <div ref={logsContainerRef} className="h-48 bg-black rounded-lg border border-red-900/30 p-4 font-mono text-xs overflow-hidden flex flex-col relative overflow-y-auto custom-scrollbar scroll-smooth">
                    <div className="text-[9px] text-red-700 mb-2 uppercase">Hydra v9.1 (Simulation)</div>
                    <div className="flex-1 space-y-1">
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={log.includes('SUCCESS') ? 'text-green-500 font-bold bg-green-900/20 px-1' : 'text-slate-500'}
                            >
                                {log}
                            </motion.div>
                        ))}
                    </div>
                    {cracked && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-0 bg-red-900/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4"
                        >
                            <AlertTriangle className="text-yellow-400 mb-2" size={32} />
                            <div className="text-white font-black text-lg uppercase">Password Cracked</div>
                            <div className="text-yellow-400 font-mono text-xl mt-2">{targetPassword}</div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
