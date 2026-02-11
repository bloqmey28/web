import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Globe2, X, Terminal, Cpu, Database, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactModal } from './ContactModal';
import { Drone } from './Drone';
import { AttackTicker } from './AttackTicker';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const { language, setLanguage, t } = useLanguage();
    const location = useLocation();
    const [showTrap, setShowTrap] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [droneTarget, setDroneTarget] = useState<string | null>(null);

    const [clickCount, setClickCount] = useState(0);
    const navigate = useNavigate();

    const handleSecretClick = () => {
        setClickCount(prev => prev + 1);
        if (clickCount + 1 >= 5) {
            navigate('/nexus-terminal-v8');
            setClickCount(0);
        }
        // Reset count after 2 seconds of inactivity
        setTimeout(() => setClickCount(0), 2000);
    };

    useEffect(() => {
        if (location.pathname === '/admin') setShowTrap(true);

        const handleTour = (e: CustomEvent) => {
            setDroneTarget(e.detail.id);
            if (e.detail.id === null) {
                // Tour finished or drone recalled
            }
        };

        window.addEventListener('nexus-drone-tour' as any, handleTour as any);

        const logInterval = setInterval(() => {
            const actions = ['CHECKING_INTEGRITY', 'MEM_SCAN_COMPLETE', 'ENCRYPTING_UDP_PACKET', 'FIREWALL_NOMINAL', 'IA_NUCLEUS_ACTIVE'];
            const newLog = `[${new Date().toLocaleTimeString()}] ${actions[Math.floor(Math.random() * actions.length)]}...`;
            setLogs(prev => [newLog, ...prev].slice(0, 3));
        }, 4000);

        return () => {
            clearInterval(logInterval);
            window.removeEventListener('nexus-drone-tour' as any, handleTour as any);
        };
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-mono selection:bg-cyan-500/30 overflow-x-hidden pt-20 pb-24">
            <Drone activeStep={droneTarget} />
            <AttackTicker />

            {/* Background HUD */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(8,145,178,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(13,71,161,0.1),transparent_50%)]" />
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-200" />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(18, 116, 128, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 116, 128, 0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-cyan-500/10 bg-slate-950/60 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" id="nav_logo" className="flex items-center gap-4 group">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-sm border border-cyan-500/30 flex items-center justify-center transition-all group-hover:border-cyan-500">
                                <Shield className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="absolute -inset-1 bg-cyan-500/10 blur-md rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-[0.2em] text-white uppercase group-hover:text-cyan-400 transition-colors">Sec_Nexus</span>
                            <span className="text-[8px] text-cyan-700 font-bold uppercase tracking-[0.3em]">Protocol_v4.2.0</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em]">
                        {[
                            { to: '/', key: 'nav_home', id: 'nav_home_link' },
                            { to: '/experience', key: 'nav_exp', id: 'nav_exp_link' },
                            { to: '/education', key: 'nav_edu', id: 'nav_edu_link' },
                            { to: '/skills', key: 'nav_skills', id: 'nav_skills_link' },
                            { to: '/skills', key: 'nav_skills', id: 'nav_skills_link' },
                            { to: '/labs', key: 'nav_labs', id: 'nav_labs_link' },
                            { to: '/lab', key: 'nav_attack_lab', id: 'nav_attack_lab_link' }
                        ].map((link_obj) => (
                            <Link
                                key={link_obj.to}
                                to={link_obj.to}
                                id={link_obj.id}
                                className={`relative px-2 py-1 transition-all whitespace-nowrap ${location.pathname === link_obj.to
                                    ? (link_obj.to === '/lab' ? 'text-red-500' : 'text-cyan-400')
                                    : (link_obj.to === '/lab' ? 'text-red-500/70 hover:text-red-400' : 'text-slate-500 hover:text-white')
                                    }`}
                            >
                                {t(link_obj.key)}
                                {location.pathname === link_obj.to && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className={`absolute -bottom-1 left-0 right-0 h-px shadow-[0_0_10px_currentColor] ${link_obj.to === '/lab' ? 'bg-red-500' : 'bg-cyan-400'}`}
                                    />
                                )}
                            </Link>
                        ))}

                        <div className="h-4 w-px bg-white/5" />

                        <button
                            id="nav_contact_btn"
                            onClick={() => setIsContactOpen(true)}
                            className="px-4 py-1.5 border border-cyan-500/30 rounded-sm text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center gap-2 group"
                        >
                            <Mail size={12} className="group-hover:scale-110 transition-transform" />
                            <span>CONTACT_SECURE</span>
                        </button>

                        <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-sm border border-white/5" id="nav_lang_switch">
                            <Globe2 className="w-3 h-3 text-cyan-900" />
                            <div className="flex gap-2">
                                <button onClick={() => setLanguage('es')} className={`${language === 'es' ? 'text-cyan-400 font-bold' : 'text-slate-600 hover:text-white'}`}>ES</button>
                                <div className="w-px h-3 bg-slate-800" />
                                <button onClick={() => setLanguage('en')} className={`${language === 'en' ? 'text-cyan-400 font-bold' : 'text-slate-600 hover:text-white'}`}>EN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 transition-all duration-500 pb-12">
                {children}
            </main>

            {/* Footer / Status Bar */}
            <div className="fixed bottom-0 left-0 right-0 h-[40px] border-t border-cyan-500/10 bg-slate-950 z-50 px-6 flex items-center justify-between pointer-events-none shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                <div className="flex gap-4">
                    {logs.map((log, i) => (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={log}
                            className="text-[7px] text-cyan-800 font-bold tracking-widest hidden sm:block"
                            style={{ opacity: 1 - i * 0.3 }}
                        >
                            {log}
                        </motion.span>
                    ))}
                </div>
                <div className="flex gap-6 items-center">
                    <div
                        onClick={handleSecretClick}
                        className="flex items-center gap-2 text-[7px] text-green-700 font-black tracking-[0.2em] cursor-pointer pointer-events-auto hover:text-green-500 transition-colors"
                    >
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                        SESSION_ENCRYPTED_AES256
                    </div>
                    <div className="flex gap-6 items-center text-[7px] font-black text-slate-700 tracking-widest">
                        <span className="flex items-center gap-1.5 uppercase"><Cpu size={10} className="text-cyan-900" /> 12% USAGE</span>
                        <span className="flex items-center gap-1.5 uppercase"><Database size={10} className="text-cyan-900" /> 44ms LAT</span>
                    </div>
                </div>
            </div>

            {/* Security Trap Modal */}
            <AnimatePresence>
                {showTrap && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-lg bg-[#c0c0c0] border-2 border-slate-100 shadow-[20px_20px_0_rgba(0,0,0,0.8)] font-sans text-black overflow-hidden"
                        >
                            <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold text-sm">
                                <div className="flex items-center gap-2">
                                    <Terminal size={14} />
                                    <span>WINDOWS_ERROR_TRAP.EXE</span>
                                </div>
                                <button onClick={() => { setShowTrap(false); window.location.href = '/'; }} className="bg-[#c0c0c0] text-black w-5 h-5 flex items-center justify-center border-t border-l border-white border-b border-r border-black font-black hover:bg-red-500 hover:text-white transition-colors">
                                    <X size={12} />
                                </button>
                            </div>
                            <div className="p-10 flex gap-6 italic">
                                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg border-2 border-white shrink-0">!</div>
                                <div className="space-y-6">
                                    <p className="font-black text-lg underline decoration-red-600 uppercase tracking-tighter">ALERTA_DE_INTRUSIÓN_DETECTADA</p>
                                    <div className="space-y-2 p-4 bg-black/5 border-l-4 border-red-600 text-xs">
                                        <p>Su huella digital ha sido firmada por el núcleo de seguridad de FutbolLab.</p>
                                        <p className="font-bold text-red-700 mt-2 uppercase">Localización: COORDINADAS_ENVIADAS_A_UNIDAD_MOVIL.</p>
                                    </div>
                                    <p className="text-sm font-black text-red-600 animate-bounce bg-red-100 p-2 border border-red-200 text-center uppercase tracking-widest leading-tight">
                                        ⚠️ LA FURGONETA NEGRA YA ESTÁ EN TU PUERTA. NO TE MUEVAS. ⚠️
                                    </p>
                                    <button
                                        onClick={() => { setShowTrap(false); window.location.href = '/'; }}
                                        className="w-full py-3 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-4 border-r-4 border-black active:border-t-4 active:border-l-4 active:border-b-2 active:border-r-2 font-black uppercase text-xs"
                                    >
                                        [ ACEPTO_MI_DESTINO ]
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                defaultSubject="GENERAL_CONTACT_PROTOCOL"
            />
        </div>
    );
};
