import { motion } from 'framer-motion';
import { SqlInjectionSim } from '../components/attacks/SqlInjectionSim';
import { BruteForceSim } from '../components/attacks/BruteForceSim';
import { XSSSim } from '../components/attacks/XSSSim';
import { OsintLeakSim } from '../components/attacks/OsintLeakSim';
import { FlaskConical, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AttackLab = () => {
    const { language } = useLanguage();

    return (
        <div className="max-w-7xl mx-auto px-6 space-y-12 py-12">

            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-full border border-red-500/20 mb-2">
                    <FlaskConical className="text-red-500 w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                    {language === 'es' ? 'Laboratorio de Ataques' : 'Cyber Attack Lab'}
                </h1>
                <p className="text-slate-400 max-w-2xl text-lg">
                    {language === 'es'
                        ? 'Simulaciones interactivas para comprender vulnerabilidades críticas. Entorno seguro controlado.'
                        : 'Interactive simulations to understand critical vulnerabilities. Controlled safe environment.'}
                </p>
            </div>

            {/* Warning Banner */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-center gap-4 justify-center text-center">
                <ShieldAlert className="text-yellow-500 shrink-0" />
                <div className="text-xs text-yellow-200 font-mono">
                    {language === 'es'
                        ? 'ADVERTENCIA: Estas herramientas son ÚNICAMENTE con fines educativos. Todos los ataques son simulados localmente en su navegador.'
                        : 'WARNING: These tools are for EDUCATIONAL PURPOSES ONLY. All attacks are simulated locally in your browser.'}
                </div>
            </div>

            {/* Grid of Sims */}
            <div className="grid grid-cols-1 gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <SqlInjectionSim />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <BruteForceSim />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <XSSSim />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <OsintLeakSim />
                </motion.div>
            </div>

        </div>
    );
};
