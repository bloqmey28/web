import { useLanguage } from '../context/LanguageContext';
import { CPUMonitor, CyberMap } from '../components/DashboardWidgets';
import { OrchestratorBot } from '../components/OrchestratorBot';
import { TerminalGuide } from '../components/TerminalGuide';
import { motion } from 'framer-motion';
import { Newspaper, Zap, ShieldCheck, BrainCircuit, Activity } from 'lucide-react';

const ShieldAlert = ({ size, className }: { size: number, className: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

export const Home = () => {
    const { t, language } = useLanguage();

    const translatedNews = [
        {
            title: language === 'es' ? 'Despliegue Nexus_Core 4.2.0' : 'Nexus_Core 4.2.0 Deploy',
            tag: 'SYSTEM',
            desc: language === 'es' ? 'Nueva capa de cifrado cuántico activa. Latencia reducida en 14ms.' : 'New quantum encryption layer active on all network endpoints. Latency reduced by 14ms.',
            icon: <ShieldCheck size={18} className="text-green-500" />
        },
        {
            title: language === 'es' ? 'Zero-Day Interceptado' : 'Zero-Day Intercepted',
            tag: 'ALERT',
            desc: language === 'es' ? 'Ataque sofisticado a la cadena de suministro bloqueado. Origen: Desconocido.' : 'Sophisticated supply chain attack blocked at edge level. Origin: Unknown_Vector.',
            icon: <ShieldAlert size={18} className="text-red-500" />
        },
        {
            title: language === 'es' ? 'Enlace Neural Optimizado' : 'Neural Link Optimized',
            tag: 'AI',
            desc: language === 'es' ? 'Motor NLP del bot sincronizado con fuentes de inteligencia globales.' : 'Orchestrator bot NLP engine synchronized with global threat intelligence feeds.',
            icon: <BrainCircuit size={18} className="text-cyan-500" />
        }
    ];

    const translatedExploits = [
        {
            name: 'CVE-2024-INTEL',
            risk: 'CRITICAL',
            type: language === 'es' ? 'Ejecución de Código Remota' : 'Remote Code Execution',
            desc: language === 'es' ? 'Campaña activa contra módulos de kernel antiguos. Parche obligatorio.' : 'Active campaign targeting legacy kernel modules. Patch mandatory.'
        },
        {
            name: 'X-VORTEX-SQL',
            risk: 'HIGH',
            type: language === 'es' ? 'Inyección Automatizada' : 'Automated Injection',
            desc: language === 'es' ? 'Botnet escaneando entradas no escapadas en infraestructuras bancarias.' : 'New botnet scanning for unescaped input on banking infrastructure.'
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 space-y-24 py-12">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center px-4 py-1 rounded-sm border border-cyan-500/30 bg-cyan-500/5 text-cyan-500 text-[10px] font-black tracking-[0.3em] uppercase">
                        {t('hero_status')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
                        {t('hero_title_1')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                            {t('hero_title_2')}
                        </span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                        {t('hero_desc')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        {[
                            { label: 'NETWORK_LINK', value: 'STABLE', color: 'text-green-500' },
                            { label: 'IA_PROCESSING', value: 'OPTIMIZED', color: 'text-cyan-500' },
                            { label: 'FIREWALL_LVL', value: 'MAX_ENFORCED', color: 'text-blue-500' }
                        ].map((stat, i) => (
                            <div key={i} className="p-4 border border-white/5 bg-slate-900/40 flex flex-col items-center">
                                <span className="text-[8px] text-slate-500 mb-1">{stat.label}</span>
                                <span className={`text-xs font-black tracking-widest ${stat.color}`}>{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 w-full max-w-md space-y-4">
                    <CPUMonitor />
                    <div className="p-4 border border-cyan-500/10 bg-slate-900/20 shadow-[0_0_20px_rgba(8,145,178,0.05)]">
                        <div className="text-[10px] text-cyan-600 font-bold mb-4 tracking-widest uppercase">{t('cyber_map_title')}</div>
                        <CyberMap />
                    </div>
                </div>
            </div>

            {/* Linux Terminal Simulator */}
            <TerminalGuide />

            {/* Intel & News Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-4 border-b border-cyan-500/20 pb-4">
                        <Newspaper className="text-cyan-500" size={24} />
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.3em]">
                            {language === 'es' ? 'FEED_INTELIGENCIA_NEXUS' : 'Nexus_Intelligence_Feed'}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {translatedNews.map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(34, 211, 238, 0.05)' }}
                                className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl space-y-4 transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="p-3 bg-black rounded-xl border border-white/5">{item.icon}</div>
                                    <span className="text-[8px] font-black px-2 py-0.5 border border-cyan-500/30 text-cyan-500 rounded uppercase">{item.tag}</span>
                                </div>
                                <h3 className="text-sm font-black text-white uppercase tracking-wider">{item.title}</h3>
                                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-red-500/20 pb-4">
                        <Zap className="text-red-500" size={24} />
                        <h2 className="text-lg font-black text-white uppercase tracking-[0.2em]">
                            {language === 'es' ? 'RESUMEN_EXPLOITS' : 'Exploit_Digest'}
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {translatedExploits.map((exp, i) => (
                            <div key={i} className="p-6 bg-red-950/5 border border-red-500/10 rounded-3xl space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-red-500 uppercase">{exp.name}</span>
                                    <span className="text-[8px] font-black text-red-700 bg-red-500/10 px-2 py-0.5 rounded">{exp.risk}</span>
                                </div>
                                <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">{exp.type}</div>
                                <p className="text-[10px] text-slate-600 leading-tight italic">{exp.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bot Section */}
            <div className="pt-20 border-t border-cyan-900/30">
                <div className="flex flex-col items-center space-y-8">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center gap-2 text-cyan-500 mb-2">
                            <Activity size={16} className="animate-pulse" />
                            <span className="text-[8px] font-black uppercase tracking-[0.4em]">Neural_Link_Standby</span>
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-[0.4em]">{t('bot_title')}</h2>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">{t('bot_desc')}</p>
                    </div>
                    <OrchestratorBot />
                </div>
            </div>
        </div>
    );
};

