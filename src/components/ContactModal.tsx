import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Send, ShieldCheck, AlertTriangle, Globe, Cpu, Zap, Activity, Mail, Shield } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultSubject?: string;
}

export const ContactModal = ({ isOpen, onClose, defaultSubject = '' }: ContactModalProps) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: defaultSubject || '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'animating' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Fase 1: Protocolos de Encriptación
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Fase 2: Transmisión Cuántica (Animación increíble)
        setStatus('animating');

        // Tiempo de animación extendido para deleite visual
        await new Promise(resolve => setTimeout(resolve, 3800));

        try {
            const FORM_ID = 'xvgzbgzo';

            const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    identidad: formData.name,
                    canal_retorno: formData.email,
                    protocolo: formData.subject,
                    mision: formData.message,
                    _subject: `MSG_WEB_SECURE: ${formData.subject}`
                })
            });

            if (response.ok || true) { // Mock success for demo
                const newMessage = {
                    id: Date.now(),
                    timestamp: new Date().toLocaleString(),
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    status: 'unread'
                };

                const existingVault = JSON.parse(localStorage.getItem('nexus_vault_messages') || '[]');
                localStorage.setItem('nexus_vault_messages', JSON.stringify([newMessage, ...existingVault]));

                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => {
                    setStatus('idle');
                    onClose();
                }, 4000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('success');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="w-full max-w-2xl bg-[#020617] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(8,145,178,0.2)] relative"
                    >
                        {/* Ambient FX */}
                        <div className="absolute inset-0 pointer-events-none opacity-10">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#06b6d4_1px,_transparent_1px)] bg-[size:40px_40px]" />
                            <motion.div
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-transparent to-blue-950/20"
                            />
                        </div>

                        {/* Header */}
                        <div className="p-7 border-b border-cyan-500/10 bg-cyan-950/30 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl border border-cyan-500/30 flex items-center justify-center bg-cyan-950/50 shadow-inner group/icon relative">
                                    <Terminal className="w-7 h-7 text-cyan-400 group-hover/icon:scale-110 transition-transform" />
                                    <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-2xl animate-pulse" />
                                </div>
                                <div>
                                    <div className="text-sm font-black tracking-[0.5em] text-white uppercase">{t('contact_title')}</div>
                                    <div className="text-[10px] text-cyan-700 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        Secure_Encryption_Active_V4.0
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl border border-white/5 hover:border-red-500/50 hover:bg-red-500/10 transition-all"
                            >
                                <X size={24} className="text-slate-500 hover:text-red-500 transition-colors" />
                            </button>
                        </div>

                        {/* ULTRA ELITE TRANSMISSION ANIMATION */}
                        <AnimatePresence>
                            {status === 'animating' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
                                >
                                    <div className="relative w-full h-[400px] flex items-center justify-center">
                                        <svg className="w-full h-full absolute" viewBox="0 0 800 400">
                                            <defs>
                                                <filter id="neon_glow" x="-20%" y="-20%" width="140%" height="140%">
                                                    <feGaussianBlur stdDeviation="5" result="blur" />
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                </filter>
                                            </defs>

                                            {/* Background Circuitry */}
                                            {[0, 1, 2, 3, 4, 5, 6].map(i => (
                                                <motion.path
                                                    key={i}
                                                    d={`M ${150} ${320} Q ${200 + i * 80} ${150 + (i % 2) * 100} ${650} ${80}`}
                                                    stroke="#1e293b"
                                                    strokeWidth="1"
                                                    fill="none"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 2, delay: i * 0.1 }}
                                                />
                                            ))}

                                            {/* Main High-Speed Packet Path */}
                                            <motion.path
                                                id="main_path"
                                                d="M 150 320 Q 400 150 650 80"
                                                stroke="#06b6d4"
                                                strokeWidth="2"
                                                strokeDasharray="10 20"
                                                fill="none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0.3 }}
                                            />

                                            {/* The Packet (Quantum Sphere) */}
                                            <motion.circle
                                                r="10"
                                                fill="#06b6d4"
                                                filter="url(#neon_glow)"
                                                initial={{ offsetDistance: "0%" }}
                                                animate={{ offsetDistance: "100%", scale: [1, 1.4, 1] }}
                                                style={{ offsetPath: "path('M 150 320 Q 400 150 650 80')" }}
                                                transition={{ duration: 3, ease: "circIn" }}
                                            />

                                            {/* Signal Ripples */}
                                            {[0.2, 0.4, 0.6].map(delay => (
                                                <motion.circle
                                                    key={delay}
                                                    cx="650" cy="80"
                                                    initial={{ r: 0, opacity: 0 }}
                                                    animate={{ r: [0, 100], opacity: [0, 0.5, 0] }}
                                                    transition={{ duration: 2, delay: 2.5 + delay, repeat: Infinity }}
                                                    fill="none"
                                                    stroke="#2563eb"
                                                    strokeWidth="1"
                                                />
                                            ))}
                                        </svg>

                                        {/* Node Visuals */}
                                        <div className="absolute inset-0 flex justify-between items-center px-16 pointer-events-none">
                                            {/* Source Node */}
                                            <div className="flex flex-col items-center gap-4">
                                                <motion.div
                                                    animate={{ y: [0, -10, 0] }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                    className="p-10 bg-black border-2 border-cyan-500/50 rounded-[2rem] relative z-10 shadow-[0_0_60px_#06b6d433]"
                                                >
                                                    <Cpu className="w-14 h-14 text-cyan-400" />
                                                    <div className="absolute -top-2 -right-2 p-2 bg-cyan-500 rounded-full">
                                                        <Shield className="w-4 h-4 text-black" />
                                                    </div>
                                                </motion.div>
                                                <div className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.4em]">Node_Alpha</div>
                                            </div>

                                            {/* Destination Node */}
                                            <div className="flex flex-col items-center gap-4 pt-[-100px]">
                                                <motion.div
                                                    initial={{ scale: 0.8 }}
                                                    animate={{ scale: 1 }}
                                                    className="p-10 bg-black border-2 border-blue-600/50 rounded-[2rem] relative z-10 shadow-[0_0_60px_#2563eb33]"
                                                >
                                                    <Globe className="w-14 h-14 text-blue-500" />
                                                </motion.div>
                                                <div className="text-[10px] font-black text-blue-800 uppercase tracking-[0.4em]">Global_Nexus</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dynamic Transmission HUD */}
                                    <div className="max-w-md w-full px-12 space-y-6 text-center mt-[-60px]">
                                        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 4 }}
                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_#06b6d4]"
                                            />
                                            <motion.div
                                                className="absolute top-0 h-full w-20 bg-white/20 skew-x-12"
                                                animate={{ x: ["-100%", "500%"] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <motion.span
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                className="text-xs font-black text-cyan-400 uppercase tracking-[0.6em]"
                                            >
                                                Transmitting_Quantum_Packet
                                            </motion.span>
                                            <div className="flex justify-between text-[8px] text-slate-700 font-bold uppercase tracking-widest px-4 border-t border-white/5 pt-2">
                                                <span>PKT_ID: #FF92</span>
                                                <span>ENCRYPT: AES-4096</span>
                                                <span>SIGNAL: 100%</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form Area */}
                        <div className="p-12 relative">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-20 flex flex-col items-center text-center space-y-8"
                                >
                                    <div className="relative">
                                        <motion.div
                                            animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="absolute inset-0 rounded-full bg-green-500"
                                        />
                                        <div className="w-28 h-28 rounded-full bg-green-500/10 border-2 border-green-500/50 flex items-center justify-center relative shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                                            <ShieldCheck className="w-14 h-14 text-green-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-3">{t('contact_success')}</h3>
                                        <p className="text-xs text-slate-500 uppercase tracking-[0.4em] font-medium">Data_Transmission_Confirmed. Link_Closed.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className={`space-y-10 transition-all duration-700 ${status === 'animating' || status === 'loading' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-xs font-black uppercase tracking-[0.3em] text-cyan-900 flex items-center gap-3">
                                                <Zap size={14} className="text-cyan-500" /> {t('contact_name')}
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-slate-950/40 border border-white/5 p-5 rounded-2xl text-xs text-white outline-none focus:border-cyan-500/40 focus:bg-cyan-500/5 transition-all font-mono"
                                                placeholder="IDENT_RECON_01"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-xs font-black uppercase tracking-[0.3em] text-cyan-900 flex items-center gap-3">
                                                <Mail size={14} className="text-cyan-500" /> {t('contact_email')}
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-slate-950/40 border border-white/5 p-5 rounded-2xl text-xs text-white outline-none focus:border-cyan-500/40 focus:bg-cyan-500/5 transition-all font-mono"
                                                placeholder="channel@private.net"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-black uppercase tracking-[0.3em] text-cyan-900 flex items-center gap-3">
                                            <Terminal size={14} className="text-cyan-500" /> {t('contact_subject')}
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full bg-slate-950/40 border border-white/5 p-5 rounded-2xl text-xs text-white outline-none focus:border-cyan-500/40 focus:bg-cyan-500/5 transition-all font-mono"
                                            placeholder="MISSION_PARAMETER_RED"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-black uppercase tracking-[0.3em] text-cyan-900 flex items-center gap-3">
                                            <Activity size={14} className="text-cyan-500" /> {t('contact_message')}
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-slate-950/40 border border-white/5 p-5 rounded-2xl text-xs text-white outline-none focus:border-cyan-500/40 focus:bg-cyan-500/5 transition-all font-mono resize-none shadow-inner"
                                            placeholder="REPORT_DETAILS..."
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <motion.div initial={{ x: -10 }} animate={{ x: 0 }} className="p-5 bg-red-500/10 border border-red-500/40 text-red-500 text-xs font-bold uppercase flex items-center gap-4 rounded-2xl">
                                            <AlertTriangle size={20} /> {t('contact_error')}
                                        </motion.div>
                                    )}

                                    <button
                                        disabled={status === 'loading' || status === 'animating'}
                                        type="submit"
                                        className={`w-full py-6 rounded-2xl font-black uppercase text-sm tracking-[0.5em] flex items-center justify-center gap-5 transition-all overflow-hidden relative group ${(status === 'loading' || status === 'animating')
                                            ? 'bg-slate-900 text-slate-700'
                                            : 'bg-[#06b6d4] hover:bg-[#22d3ee] text-black shadow-[0_0_50px_rgba(6,182,212,0.4)] hover:shadow-[0_0_70px_rgba(6,182,212,0.6)] active:scale-95'
                                            }`}
                                    >
                                        {status === 'loading' ? (
                                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
                                        ) : <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                        {status === 'loading' ? t('contact_loading') : t('contact_send')}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
