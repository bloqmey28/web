import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';

export const Skills = () => {
    const { t } = useLanguage();
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

    const techSkills = [
        { id: 'sys_admin', name: "skill_sys_admin", level: 98, desc_es: "Gestión experta de servidores Linux/Windows, automatización y virtualización.", desc_en: "Expert management of Linux/Windows servers, automation, and virtualization." },
        { id: 'cyber', name: "skill_cyber", level: 95, desc_es: "Pentesting, auditoría de seguridad y respuesta ante incidentes críticos.", desc_en: "Pentesting, security auditing, and critical incident response." },
        { id: 'corp_ia', name: "skill_corp_ia", level: 96, desc_es: "Diseño de arquitecturas LLM para flujos de trabajo empresariales.", desc_en: "LLM architecture design for enterprise workflows." },
        { id: 'web', name: "skill_web", level: 92, desc_es: "Desarrollo moderno con React, Tailwind y ecosistemas frontend avanzados.", desc_en: "Modern development with React, Tailwind, and advanced frontend ecosystems." },
        { id: 'net', name: "skill_net", level: 94, desc_es: "Protocolos de red, enrutamiento seguro y segmentación de infraestructuras.", desc_en: "Network protocols, secure routing, and infrastructure segmentation." }
    ];

    const analysisSkills = [
        { id: 'imp_ia', name: "skill_imp_ia", desc_es: "Estrategias de despliegue de modelos de lenguaje en producción.", desc_en: "Deployment strategies for language models in production." },
        { id: 'cre_ia', name: "skill_cre_ia", desc_es: "Entrenamiento y fine-tuning de modelos para necesidades corporativas.", desc_en: "Training and fine-tuning models for corporate needs." },
        { id: 'net_arch', name: "skill_net_arch", desc_es: "Diseño de perímetros de red de confianza cero (Zero Trust).", desc_en: "Zero Trust network perimeter design." },
        { id: 'mon_threat', name: "skill_mon_threat", desc_es: "Sistemas de monitoreo proactivo contra ataques persistentes.", desc_en: "Proactive monitoring systems against persistent attacks." },
        { id: 'soft_ia', name: "skill_soft_ia", desc_es: "Integración de componentes inteligentes en aplicaciones de software.", desc_en: "Integration of smart components into software applications." }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
            <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-cyan-500" />
                <h2 className="text-3xl font-black text-white uppercase tracking-widest">{t('skills_title')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Progress Bars Section */}
                <div className="space-y-8">
                    <h4 className="text-xs font-bold text-cyan-700 tracking-[0.4em] uppercase">{t('skills_tech_stack')}</h4>
                    <div className="space-y-8">
                        {techSkills.map((skill) => (
                            <div
                                key={skill.id}
                                className="space-y-2 cursor-pointer group"
                                onClick={() => setSelectedSkill(skill.id)}
                            >
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <span>{t(skill.name)}</span>
                                        <Info size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-cyan-500">{skill.level}%</span>
                                </div>
                                <div className="h-1 bg-slate-800 relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        className="absolute h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Intelligence Cards Section */}
                <div className="space-y-8">
                    <h4 className="text-xs font-bold text-cyan-700 tracking-[0.4em] uppercase">{t('skills_intel_analysis')}</h4>
                    <div className="grid grid-cols-1 gap-4">
                        {analysisSkills.map((skill) => (
                            <motion.div
                                key={skill.id}
                                whileHover={{ x: 10 }}
                                onClick={() => setSelectedSkill(skill.id)}
                                className="p-6 border border-cyan-900/20 bg-cyan-500/5 cursor-pointer group hover:border-cyan-500/50 transition-all flex justify-between items-center"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-cyan-500 font-black">#</span>
                                    <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors uppercase">{t(skill.name)}</span>
                                </div>
                                <Info size={12} className="text-cyan-900 group-hover:text-cyan-500 transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedSkill && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/60">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-lg bg-slate-900 border border-cyan-500/30 p-8 shadow-[0_0_50px_rgba(8,145,178,0.2)] relative"
                        >
                            <button
                                onClick={() => setSelectedSkill(null)}
                                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <span className="text-[10px] text-cyan-500 font-black tracking-widest uppercase underline">Detalles de Habilidad</span>
                                    <h3 className="text-2xl font-black text-white uppercase">
                                        {t([...techSkills, ...analysisSkills].find(s => s.id === selectedSkill)?.name || '')}
                                    </h3>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-cyan-500/30 pl-6 italic">
                                    {useLanguage().language === 'es'
                                        ? [...techSkills, ...analysisSkills].find(s => s.id === selectedSkill)?.desc_es
                                        : [...techSkills, ...analysisSkills].find(s => s.id === selectedSkill)?.desc_en}
                                </p>

                                <div className="pt-6 flex justify-end">
                                    <button
                                        onClick={() => setSelectedSkill(null)}
                                        className="px-6 py-2 border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 text-[10px] font-black tracking-widest uppercase transition-all"
                                    >
                                        _Cerrar_Módulo
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
