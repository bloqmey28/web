import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Lock, Unlock, ShieldAlert } from 'lucide-react';

export const SqlInjectionSim = () => {
    const [username, setUsername] = useState('');
    const [isHacked, setIsHacked] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Simple check for basic SQLi pattern
        if (username.includes("' OR '1'='1")) {
            setIsHacked(true);
        } else {
            setIsHacked(false);
            setShowSuccess(false);
        }
    }, [username]);

    const handleLogin = () => {
        if (isHacked) {
            setShowSuccess(true);
        } else {
            // Shake effect for failed login could be added here
            alert("Acceso denegado: Usuario no encontrado");
        }
    };

    return (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 space-y-6 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Database className="text-cyan-500" size={20} />
                <h3 className="text-lg font-black text-white uppercase tracking-wider">SQL Injection Lab</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vulnerable Form */}
                <div className="space-y-4">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Vulnerable Login Portal</div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-cyan-400 font-bold uppercase">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-cyan-500/50 outline-none font-mono"
                            placeholder="Enter username..."
                        />
                        <div className="text-[10px] text-slate-600">Try inserting: <span className="text-yellow-500 cursor-pointer hover:underline" onClick={() => setUsername("' OR '1'='1")}>' OR '1'='1</span></div>
                    </div>
                    <button
                        onClick={handleLogin}
                        className={`w-full py-2 rounded-lg font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${isHacked ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-cyan-900/20 text-cyan-700 hover:bg-cyan-900/40'}`}
                    >
                        {isHacked ? <Unlock size={14} /> : <Lock size={14} />}
                        {isHacked ? 'Execute Injection' : 'Login'}
                    </button>
                </div>

                {/* Backend Visualization */}
                <div className="bg-black/50 rounded-lg p-4 border border-dashed border-slate-700 font-mono text-xs space-y-2 relative">
                    <div className="text-[9px] text-slate-500 uppercase flex justify-between">
                        <span>Backend Query Log</span>
                        {isHacked && <span className="text-red-500 font-bold animate-pulse">CRITICAL SYNTAX ERROR IGNORED</span>}
                    </div>

                    <div className="p-3 bg-slate-950 rounded border border-white/5 text-slate-400 break-words">
                        <span className="text-purple-400">SELECT</span> * <span className="text-purple-400">FROM</span> users <span className="text-purple-400">WHERE</span> username = '<span className={isHacked ? "text-red-400 font-bold bg-red-900/20 px-1 rounded" : "text-green-400"}>{username}</span>'
                    </div>

                    <AnimatePresence>
                        {isHacked && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 p-2 bg-red-950/30 border border-red-500/20 rounded text-red-400"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <ShieldAlert size={12} />
                                    <span className="font-bold">Logic Bypass Detected</span>
                                </div>
                                <div className="text-[10px] opacity-80">The condition <span className="font-bold">'1'='1'</span> is always TRUE. The database returns ALL users.</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-10"
                    >
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="p-4 bg-green-500/10 rounded-full border border-green-500/50 mb-4"
                        >
                            <Unlock className="text-green-500 w-8 h-8" />
                        </motion.div>
                        <h4 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Access Granted</h4>
                        <p className="text-sm text-slate-400 max-w-xs mb-6">You successfully bypassed authentication using SQL Injection. You are now logged in as <span className="text-green-400 font-mono">admin</span>.</p>
                        <button
                            onClick={() => { setUsername(''); setShowSuccess(false); }}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded text-xs font-bold uppercase tracking-widest text-white transition-colors"
                        >
                            Reset Simulation
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
