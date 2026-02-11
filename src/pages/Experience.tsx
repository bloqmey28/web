import { useLanguage } from '../context/LanguageContext';

export const Experience = () => {
    const { t } = useLanguage();

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">
            <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-cyan-500" />
                <h2 className="text-3xl font-black text-white uppercase tracking-widest">{t('exp_title')}</h2>
            </div>

            <div className="space-y-8">
                <div className="p-10 border border-cyan-500/20 bg-slate-900/40 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <div className="text-4xl font-black">F_LAB</div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between mb-8 gap-4">
                        <div>
                            <span className="text-cyan-500 text-xs font-bold tracking-[0.2em] mb-2 block uppercase underline">FUTBOLLAB</span>
                            <h3 className="text-3xl font-black text-white">{t('exp_role')}</h3>
                        </div>
                        <div className="text-right">
                            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 text-[10px] font-black tracking-widest">ACTIVE_ROLE</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h4 className="text-[10px] text-cyan-700 font-bold uppercase tracking-[0.3em]">{t('exp_resp_title')}</h4>
                            <ul className="text-sm text-slate-400 space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0 shadow-[0_0_5px_#06b6d4]" />
                                    <span>{t('exp_resp_1')}</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0 shadow-[0_0_5px_#06b6d4]" />
                                    <span>{t('exp_resp_2')}</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0 shadow-[0_0_5px_#06b6d4]" />
                                    <span>{t('exp_resp_3')}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-[10px] text-cyan-700 font-bold uppercase tracking-[0.3em]">{t('exp_ach_title')}</h4>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-950/50 border border-slate-800">
                                    <div className="text-white text-xs font-bold mb-1">{t('exp_ach_1_t')}</div>
                                    <p className="text-[10px] text-slate-500">{t('exp_ach_1_d')}</p>
                                </div>
                                <div className="p-4 bg-slate-950/50 border border-slate-800">
                                    <div className="text-white text-xs font-bold mb-1">{t('exp_ach_2_t')}</div>
                                    <p className="text-[10px] text-slate-500">{t('exp_ach_2_d')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
