import { useLanguage } from '../context/LanguageContext';

export const Education = () => {
    const { t } = useLanguage();

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">
            <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-cyan-500" />
                <h2 className="text-3xl font-black text-white uppercase tracking-widest">{t('edu_title')}</h2>
            </div>

            <div className="space-y-12">
                <div className="relative group p-10 border-l-2 border-cyan-500 bg-slate-900/20 hover:bg-cyan-500/5 transition-all">
                    <span className="text-xs text-cyan-500 font-bold mb-2 block tracking-widest uppercase">{t('edu_1_org')}</span>
                    <h3 className="text-2xl font-bold text-white mb-4">{t('edu_1_title')}</h3>
                    <p className="text-slate-400 leading-relaxed">
                        {t('edu_1_desc')}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        {['NetSec', 'Crypto', 'Forensics', 'EAC'].map(tag => (
                            <span key={tag} className="px-2 py-1 text-[8px] border border-cyan-500/30 text-cyan-500 uppercase font-black tracking-widest">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="relative group p-10 border-l-2 border-blue-600 bg-slate-900/20 hover:bg-blue-600/5 transition-all">
                    <span className="text-xs text-blue-500 font-bold mb-2 block tracking-widest uppercase">{t('edu_2_org')}</span>
                    <h3 className="text-2xl font-bold text-white mb-4">{t('edu_2_title')}</h3>
                    <p className="text-slate-400 leading-relaxed">
                        {t('edu_2_desc')}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        {['ML_OPS', 'DEEP_LEARNING', 'AI_STRATEGY', 'LLM_INTEGRATION'].map(tag => (
                            <span key={tag} className="px-2 py-1 text-[8px] border border-blue-600/30 text-blue-500 uppercase font-black tracking-widest">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
