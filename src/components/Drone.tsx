import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

interface DroneProps {
    activeStep: string | null;
}

export const Drone = ({ activeStep }: DroneProps) => {
    const [position, setPosition] = useState({ top: 300, left: 200, opacity: 0 });

    useEffect(() => {
        if (!activeStep) {
            setPosition(prev => ({ ...prev, opacity: 0 }));
            return;
        }

        const target = document.getElementById(activeStep);
        if (target) {
            const rect = target.getBoundingClientRect();
            setPosition({
                top: rect.top + rect.height + 20,
                left: rect.left + rect.width / 2,
                opacity: 1
            });
        }
    }, [activeStep]);

    return (
        <AnimatePresence>
            {activeStep && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: position.opacity,
                        scale: 1,
                        top: position.top,
                        left: position.left,
                        x: "-50%"
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="fixed z-[200] pointer-events-none"
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                    {/* Drone Visual Body */}
                    <div className="relative">
                        <div className="w-12 h-12 bg-slate-950 border-2 border-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] relative overflow-hidden">
                            <Bot className="w-6 h-6 text-cyan-400" />
                            <motion.div
                                animate={{ opacity: [0.1, 0.5, 0.1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="absolute inset-0 bg-cyan-500/10"
                            />
                        </div>

                        {/* Scanners & Rotors */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-1 -left-1 w-4 h-4 border border-cyan-500/40 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-1 -right-1 w-4 h-4 border border-cyan-500/40 rounded-full"
                        />

                        {/* Scan Beam */}
                        <motion.div
                            animate={{ height: [0, 60, 0], opacity: [0, 0.4, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-full left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b from-cyan-500/40 to-transparent blur-sm"
                        />

                        {/* Tag */}
                        <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 whitespace-nowrap bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded text-[6px] font-black text-white uppercase tracking-widest shadow-2xl">
                            ORCH_DRONE_MOD: RECON
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
