import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Lock, ShieldAlert, Trash2, LogOut, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: number;
    timestamp: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'unread' | 'read';
}

export const AdminTerminal = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);

    useEffect(() => {
        const vault = JSON.parse(localStorage.getItem('nexus_vault_messages') || '[]');
        setMessages(vault);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (user === 'bloqmey' && pass === 'cj@6785.fut') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('CREDENTIALS_REJECTED. ACCESS_DENIED.');
        }
    };

    const deleteMessage = (id: number) => {
        const newMsgs = messages.filter(m => m.id !== id);
        setMessages(newMsgs);
        localStorage.setItem('nexus_vault_messages', JSON.stringify(newMsgs));
        if (selectedMsg?.id === id) setSelectedMsg(null);
    };

    const markAsRead = (id: number) => {
        const newMsgs = messages.map(m => m.id === id ? { ...m, status: 'read' as const } : m);
        setMessages(newMsgs);
        localStorage.setItem('nexus_vault_messages', JSON.stringify(newMsgs));
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-mono relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_70%)]" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-black border-2 border-cyan-500/30 p-10 rounded-3xl relative z-10 shadow-[0_0_50px_rgba(6,182,212,0.15)]"
                >
                    <div className="flex flex-col items-center gap-6 mb-10">
                        <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/40 rounded-2xl flex items-center justify-center">
                            <Lock className="w-10 h-10 text-cyan-500" />
                        </div>
                        <h1 className="text-xl font-black text-white tracking-[0.4em] uppercase">Nexus_Admin_Gate</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-cyan-700 font-bold uppercase tracking-widest pl-1">Ident_Key</label>
                            <input
                                type="text"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                className="w-full bg-slate-900/50 border border-cyan-500/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="USER_ID"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-cyan-700 font-bold uppercase tracking-widest pl-1">Vault_Coded_Key</label>
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                className="w-full bg-slate-900/50 border border-cyan-500/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="PASSWORD"
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl text-red-500 text-[10px] font-bold text-center uppercase tracking-widest"
                            >
                                <ShieldAlert className="w-4 h-4 inline mr-2" />
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-[0.3em] rounded-xl transition-all shadow-[0_4px_20px_rgba(8,145,178,0.3)] active:scale-95"
                        >
                            Execute_Login
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 font-mono text-slate-300 flex flex-col pt-20">
            {/* Admin Header */}
            <div className="p-8 border-b border-cyan-500/20 bg-slate-900/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/40 rounded-lg flex items-center justify-center">
                        <Terminal className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Nexus_Command_Center</h2>
                        <p className="text-[9px] text-cyan-700 font-bold uppercase tracking-widest">Operator: bloqmey // Status: Authorized</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-950/20 border border-red-500/30 rounded-lg text-red-500 text-[10px] font-bold uppercase hover:bg-red-500 hover:text-white transition-all"
                >
                    <LogOut size={14} /> Close_Session
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Message List */}
                <div className="w-1/3 border-r border-cyan-500/10 flex flex-col bg-slate-950/40">
                    <div className="p-6 border-b border-cyan-500/5 flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Inbox ({messages.length})</span>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[8px] text-green-700 font-bold uppercase">Live_Sync</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 custom-scrollbar">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-20 gap-4">
                                <Mail size={40} className="text-cyan-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">No_Intercepts_Found</span>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <button
                                    key={msg.id}
                                    onClick={() => { setSelectedMsg(msg); markAsRead(msg.id); }}
                                    className={`w-full p-6 border rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden ${selectedMsg?.id === msg.id ? 'bg-cyan-500/10 border-cyan-500' : 'bg-slate-900/40 border-white/5 hover:border-cyan-500/30'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[8px] font-black uppercase tracking-tighter ${msg.status === 'unread' ? 'text-cyan-400' : 'text-slate-600'}`}>
                                            {msg.status === 'unread' && <span>● </span>}{msg.timestamp}
                                        </span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500 rounded-md transition-all text-red-500 hover:text-white"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                    <div className="text-[11px] font-black text-white uppercase tracking-wider truncate mb-1">{msg.name}</div>
                                    <div className="text-[9px] text-cyan-600 font-bold uppercase tracking-widest truncate">{msg.subject}</div>
                                    {selectedMsg?.id === msg.id && (
                                        <div className="absolute top-0 right-0 w-1 h-full bg-cyan-500" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Message Detail */}
                <div className="flex-1 p-12 bg-black/60 relative">
                    <AnimatePresence mode="wait">
                        {selectedMsg ? (
                            <motion.div
                                key={selectedMsg.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-4xl mx-auto space-y-10"
                            >
                                <div className="flex justify-between items-start border-b border-cyan-500/10 pb-10">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center">
                                                <User className="text-cyan-500" size={24} />
                                            </div>
                                            <div>
                                                <div className="text-xl font-black text-white uppercase tracking-[0.2em]">{selectedMsg.name}</div>
                                                <div className="text-[10px] text-cyan-600 font-bold uppercase tracking-widest">{selectedMsg.email}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="px-3 py-1 bg-cyan-500/5 border border-cyan-500/20 rounded text-[8px] font-black text-cyan-400 uppercase tracking-widest">
                                                ID: {selectedMsg.id}
                                            </span>
                                            <span className="px-3 py-1 bg-green-500/5 border border-green-500/20 rounded text-[8px] font-black text-green-400 uppercase tracking-widest">
                                                STATUS: {selectedMsg.status === 'read' ? 'PROCESSED' : 'NEW_INTEL'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">Transmission_Time</div>
                                        <div className="text-xs font-black text-slate-400">{selectedMsg.timestamp}</div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="text-[10px] text-cyan-700 font-bold uppercase tracking-[0.5em]">Intel_Content</div>
                                    <div className="p-8 bg-slate-900/40 border border-cyan-500/10 rounded-3xl text-sm leading-relaxed text-slate-100 shadow-2xl">
                                        {selectedMsg.message}
                                    </div>
                                </div>

                                <div className="pt-10 flex gap-4">
                                    <a
                                        href={`mailto:${selectedMsg.email}?subject=RE: ${selectedMsg.subject}`}
                                        className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all flex items-center gap-3"
                                    >
                                        <Mail size={16} /> RE_ENGAGE_TARGET
                                    </a>
                                    <button
                                        onClick={() => deleteMessage(selectedMsg.id)}
                                        className="px-8 py-4 bg-red-950/20 border border-red-500/30 hover:bg-red-500 text-red-500 hover:text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all flex items-center gap-3"
                                    >
                                        <Trash2 size={16} /> PURGE_RECORD
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-10 gap-6">
                                <Terminal size={100} className="text-cyan-500" />
                                <div className="text-2xl font-black uppercase tracking-[1em]">Awaiting_Selection</div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(8, 145, 178, 0.2); border-radius: 10px; }
            `}</style>
        </div>
    );
};
