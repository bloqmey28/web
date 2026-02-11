import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CPUMonitor = () => {
    const { t } = useLanguage();
    const [usage, setUsage] = useState(45);
    const [history, setHistory] = useState<number[]>(new Array(20).fill(0));

    useEffect(() => {
        const interval = setInterval(() => {
            const newVal = Math.floor(Math.random() * 40) + 30;
            setUsage(newVal);
            setHistory(prev => [...prev.slice(1), newVal]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 border border-cyan-500/20 bg-slate-950/50 rounded-sm font-mono">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">{t('cpu_usage')}</span>
                <span className="text-xs text-white">{usage}%</span>
            </div>
            <div className="flex items-end gap-[2px] h-12">
                {history.map((val, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-cyan-500/30 border-t border-cyan-500/50"
                        style={{ height: `${val}%` }}
                    />
                ))}
            </div>
        </div>
    );
};

export const CyberMap = () => {
    const { t, language } = useLanguage();
    const [selectedAttack, setSelectedAttack] = useState<null | number>(null);

    const attackNodes = [
        { id: 1, x: '25%', y: '30%', label: 'NODE_ALPHA', info_es: 'Ataque de fuerza bruta detectado en el puerto 22 SSH desde IP anonimizada.', info_en: 'Brute force attack detected on SSH port 22 from anonymized IP.' },
        { id: 2, x: '65%', y: '45%', label: 'NODE_SIGMA', info_es: 'Inyección SQL detectada en el firewall de aplicaciones web (WAF).', info_en: 'SQL Injection detected in the Web Application Firewall (WAF).' },
        { id: 3, x: '45%', y: '70%', label: 'NODE_OMEGA', info_es: 'Escaneo de vulnerabilidades Nmap detectado en el segmento de red interna.', info_en: 'Nmap vulnerability scan detected in the internal network segment.' }
    ];

    return (
        <div className="relative aspect-video w-full bg-slate-950 rounded-sm border border-cyan-900/30 overflow-hidden cursor-crosshair">
            <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/1000px-World_map_blank_without_borders.svg.png')] bg-center bg-no-repeat bg-contain filter invert" />

            {/* HUD Grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {/* Interactive Nodes */}
            {attackNodes.map((node) => (
                <div key={node.id}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ left: node.x, top: node.y }}
                        className="absolute w-4 h-4 -ml-2 -mt-2 bg-red-500/20 rounded-full border border-red-500 z-10"
                    />
                    <button
                        style={{ left: node.x, top: node.y }}
                        onClick={() => setSelectedAttack(node.id)}
                        className="absolute w-6 h-6 -ml-3 -mt-3 z-20 flex items-center justify-center text-red-500 hover:text-white transition-colors"
                    >
                        <Target size={14} />
                    </button>
                </div>
            ))}

            {/* Modal / Overlay Info */}
            <AnimatePresence>
                {selectedAttack && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-4 right-4 left-4 p-4 bg-red-950/90 border border-red-500 backdrop-blur-sm z-30"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-black tracking-widest text-red-500 uppercase underline">
                                {t('attack_detected')} {attackNodes.find(n => n.id === selectedAttack)?.label}
                            </span>
                            <button onClick={() => setSelectedAttack(null)}><X size={12} className="text-red-500 hover:text-white" /></button>
                        </div>
                        <p className="text-[10px] text-white leading-tight">
                            {language === 'es' ? attackNodes.find(n => n.id === selectedAttack)?.info_es : attackNodes.find(n => n.id === selectedAttack)?.info_en}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
