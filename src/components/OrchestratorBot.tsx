import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Bot, User, Lock, Compass, BookOpen, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// CONFIGURACIÓN DE COMUNICACIONES
// Si no te llegan los correos, asegúrate de que este ID sea el de tu formulario en formspree.io
export const FORMSPREE_ID = 'xvgzbgzo';

interface Message {
    role: 'bot' | 'user';
    content: string;
}

export const OrchestratorBot = () => {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', content: language === 'es' ? 'SISTEMA_INICIALIZADO. Tienes 3 deseos que me puedes pedir. Elige tu protocolo:' : 'SYSTEM_INITIALIZED. You have 3 wishes you can ask me. Choose your protocol:' }
    ]);
    const [wishCount, setWishCount] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const wishes = [
        {
            id: 'tour',
            label: language === 'es' ? '🌐 Navegar por la Web' : '🌐 Tour the Web',
            icon: <Compass size={14} />,
            response: language === 'es' ? 'Iniciando protocolo de Reconocimiento. Desplegando Drone...' : 'Starting Reconnaissance protocol. Deploying Drone...'
        },
        {
            id: 'identity',
            label: language === 'es' ? '🤖 ¿Qué eres?' : '🤖 What are you?',
            icon: <Fingerprint size={14} />,
            response: language === 'es' ? 'Soy Orchestrator_V1, una IA táctica para coordinar activos de ciberseguridad. Mi núcleo procesa vectores de amenaza en tiempo real.' : 'I am Orchestrator_V1, a tactical AI for coordinating cybersecurity assets. My core processes threat vectors in real-time.'
        },
        {
            id: 'projects',
            label: language === 'es' ? '📁 Proyectos' : '📁 Projects',
            icon: <BookOpen size={14} />,
            response: language === 'es' ? 'He gestionado proyectos de bypass (GhostBypass), laboratorios Docker y sistemas de IA avanzados. Mi portfolio es tu arsenal.' : 'I have managed bypass projects (GhostBypass), Docker labs, and advanced AI systems. My portfolio is your arsenal.'
        }
    ];

    const emitDroneEvent = (id: string | null) => {
        const event = new CustomEvent('nexus-drone-tour', { detail: { id } });
        window.dispatchEvent(event);
    };

    const handleWish = async (wish: typeof wishes[0]) => {
        if (isLocked || isTyping || wishCount >= 3) return;

        setMessages(prev => [...prev, { role: 'user', content: wish.label }]);
        setWishCount(prev => prev + 1);
        setIsTyping(true);

        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(prev => [...prev, { role: 'bot', content: wish.response }]);
        setIsTyping(false);

        if (wish.id === 'tour') {
            executeTour();
        }

        if (wishCount + 1 >= 3) {
            setTimeout(() => {
                setIsLocked(true);
                setMessages(prev => [...prev, { role: 'bot', content: language === 'es' ? '☢️ ADVERTENCIA: Has agotado tus 3 deseos.' : '☢️ WARNING: You have used your 3 wishes.' }]);
            }, 5000);
        }
    };

    const executeTour = async () => {
        const tourSteps = [
            { id: 'nav_logo', msg: language === 'es' ? "🛡️ NEXUS_CORE: Estás en el epicentro de la red segura." : "🛡️ NEXUS_CORE: You are at the epicenter of the secure network." },
            { id: 'nav_home_link', msg: language === 'es' ? "🏠 DASHBOARD: Monitorización de sistemas y métricas vitales." : "🏠 DASHBOARD: Monitoring systems and vital metrics." },
            { id: 'nav_exp_link', msg: language === 'es' ? "📊 EXPERIENCIA: Registro de misiones y operaciones pasadas." : "📊 EXPERIENCE: Log of past missions and operations." },
            { id: 'nav_labs_link', msg: language === 'es' ? "🧪 LABS: Entorno de entrenamiento Docker para despliegue de exploits." : "🧪 LABS: Docker training environment for exploit deployment." },
            { id: 'nav_contact_btn', msg: language === 'es' ? "✉️ CONTACTO: Canal cifrado para comunicaciones directas." : "✉️ CONTACT: Encrypted channel for direct communications." },
            { id: 'nav_lang_switch', msg: language === 'es' ? "🌐 LENGUAJE: Conmutador de región para operativa global." : "🌐 LANGUAGE: Region switcher for global operations." }
        ];

        for (const step of tourSteps) {
            emitDroneEvent(step.id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsTyping(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setMessages(prev => [...prev, { role: 'bot', content: step.msg }]);
            setIsTyping(false);
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        emitDroneEvent(null); // Recoger drone
        setMessages(prev => [...prev, { role: 'bot', content: language === 'es' ? '🏁 Reconocimiento finalizado. Drone en hangar.' : '🏁 Reconnaissance finished. Drone in hangar.' }]);
    };

    return (
        <div className="flex flex-col h-[650px] w-full max-w-2xl mx-auto border border-cyan-500/30 bg-slate-950/95 backdrop-blur-3xl shadow-[0_0_100px_rgba(8,145,178,0.2)] overflow-hidden rounded-3xl group/bot">
            {/* Header */}
            <div className="p-6 border-b border-cyan-500/20 bg-cyan-950/30 flex items-center justify-between relative overflow-hidden">
                <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl border border-cyan-400 flex items-center justify-center bg-cyan-400/5 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                            <Bot className="w-7 h-7 text-cyan-400" />
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950"
                        />
                    </div>
                    <div>
                        <div className="text-[11px] font-black tracking-[0.3em] text-white uppercase">{t('bot_title')}</div>
                        <div className="text-[9px] text-cyan-600 font-bold uppercase tracking-[0.2em]">Master_Orchestration_AI</div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2 relative z-10">
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Wishes_Remaining</div>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                animate={wishCount >= i ? { scale: [1, 1.5, 1], backgroundColor: '#f43f5e', boxShadow: '0 0 10px #f43f5e' } : {}}
                                className={`w-3 h-3 rounded-full border border-white/10 ${wishCount >= i ? 'bg-red-500' : 'bg-cyan-500/20 shadow-[0_0_5px_rgba(34,211,238,0.1)]'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 scroll-smooth scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-9 h-9 rounded-xl border-2 shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]'}`}>
                                    {msg.role === 'user' ? <User size={16} className="text-cyan-400" /> : <Bot size={16} className="text-blue-400" />}
                                </div>
                                <div className={`relative px-6 py-5 text-xs leading-relaxed border backdrop-blur-md shadow-2xl ${msg.role === 'user' ? 'border-cyan-500/20 bg-cyan-950/20 text-slate-100 rounded-3xl rounded-tr-none' : 'border-blue-600/10 bg-slate-900/40 text-cyan-50 rounded-3xl rounded-tl-none'}`}>
                                    {msg.content}
                                    {msg.role === 'bot' && (
                                        <div className="absolute top-0 -left-1 w-1 h-full bg-blue-600/30 rounded-full" />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start pl-14">
                            <div className="flex gap-2 p-4 bg-cyan-950/20 rounded-full border border-cyan-500/10">
                                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="p-8 border-t border-white/5 bg-black/40">
                <AnimatePresence mode="wait">
                    {!isLocked && wishCount < 3 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            {wishes.map((wish) => (
                                <button
                                    key={wish.id}
                                    onClick={() => handleWish(wish)}
                                    disabled={isTyping}
                                    className="flex items-center gap-3 px-5 py-4 bg-slate-900/60 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-wider text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all hover:scale-[1.05] active:scale-95 disabled:opacity-50"
                                >
                                    <span className="p-2 bg-cyan-400/10 rounded-lg text-cyan-400">{wish.icon}</span>
                                    {wish.label}
                                </button>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full py-5 bg-red-950/20 border border-red-500/30 rounded-2xl flex items-center justify-center gap-4"
                        >
                            <Lock className="text-red-500" size={18} />
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">CORE_SYSTEM_LOCKED</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
