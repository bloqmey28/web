import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Globe, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ATTACKS = [
    { type: 'DDoS', from: 'CN_SHANGHAI', to: 'US_EAST_1', status: 'MITIGATING', color: 'text-red-500' },
    { type: 'SQLi', from: 'ANON_PROXY', to: 'DB_NEXUS_ALPHA', status: 'BLOCKED', color: 'text-orange-500' },
    { type: 'XSS', from: 'EU_FRANKFURT', to: 'WEB_NODE_04', status: 'INTERCEPTED', color: 'text-yellow-500' },
    { type: 'BRUTE_FORCE', from: 'RU_MOSCOW', to: 'SSH_GATED', status: 'BLACK_LISTED', color: 'text-purple-500' },
    { type: 'ZERO_DAY', from: 'UNKNOWN_VECT', to: 'CORE_KERNEL', status: 'ISOLATING', color: 'text-red-600' },
    { type: 'BOTNET_SWARM', from: 'GLOBAL_MESH', to: 'API_GATEWAY', status: 'THROTTLING', color: 'text-cyan-500' },
    { type: 'MITM', from: 'WIFI_PUBLIC', to: 'USER_PKT_09', status: 'ENCRYPT_REINFORCED', color: 'text-green-500' },
    { type: 'RANSOM_ATTEMPT', from: 'TOR_NODE', to: 'FS_STORAGE', status: 'VAULT_LOCKED', color: 'text-red-400' },
];

export const AttackTicker = () => {
    const { language } = useLanguage();
    // Duplicate for infinite scroll
    const items = [...ATTACKS, ...ATTACKS, ...ATTACKS];

    return (
        <div className="fixed bottom-[40px] left-0 right-0 h-[40px] bg-black/95 backdrop-blur-md border-t border-b border-cyan-500/10 z-[45] overflow-hidden flex items-center select-none pointer-events-auto">
            <div className="flex items-center gap-4 px-6 border-r border-cyan-500/20 bg-black/95 h-full shrink-0 z-20">
                <ShieldAlert className="w-3 h-3 text-red-500 animate-pulse" />
                <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">
                    {language === 'es' ? 'FEED_AMENAZAS_GLOBAL' : 'Global_Threat_Feed'}
                </span>
            </div>

            <motion.div
                animate={{ x: [0, -2000] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="flex items-center gap-12 whitespace-nowrap px-10 z-10"
            >
                {items.map((atk, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                        <div className="flex items-center gap-2">
                            <Zap className={`w-3 h-3 ${atk.color}`} />
                            <span className="text-[9px] font-black text-slate-100 uppercase tracking-widest">{atk.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[8px] font-bold text-slate-500">
                            <Globe className="w-2 h-2" />
                            <span className="text-cyan-700">{atk.from}</span>
                            <span className="text-slate-700">➜</span>
                            <span className="text-blue-700">{atk.to}</span>
                        </div>
                        <div className="px-2 py-0.5 bg-slate-900 border border-white/5 rounded text-[7px] font-black text-slate-400 uppercase tracking-tighter group-hover:border-cyan-500/40 transition-colors">
                            {atk.status === 'MITIGATING' && (language === 'es' ? 'MITIGANDO' : 'MITIGATING')}
                            {atk.status === 'BLOCKED' && (language === 'es' ? 'BLOQUEADO' : 'BLOCKED')}
                            {atk.status === 'INTERCEPTED' && (language === 'es' ? 'INTERCEPTADO' : 'INTERCEPTED')}
                            {atk.status === 'BLACK_LISTED' && (language === 'es' ? 'LISTA_NEGRA' : 'BLACK_LISTED')}
                            {atk.status === 'ISOLATING' && (language === 'es' ? 'AISLANDO' : 'ISOLATING')}
                            {atk.status === 'THROTTLING' && (language === 'es' ? 'LIMITANDO' : 'THROTTLING')}
                            {atk.status === 'ENCRYPT_REINFORCED' && (language === 'es' ? 'CIFRADO_REFORZADO' : 'ENCRYPT_REINFORCED')}
                            {atk.status === 'VAULT_LOCKED' && (language === 'es' ? 'BOVEDA_CERRADA' : 'VAULT_LOCKED')}
                        </div>
                        <div className="w-1 h-1 bg-white/5 rounded-full" />
                    </div>
                ))}
            </motion.div>

            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/50 to-transparent z-10" />

            <div className="flex items-center gap-3 px-6 border-l border-cyan-500/20 bg-black h-full shrink-0 ml-auto z-20">
                <Activity className="w-3 h-3 text-cyan-500" />
                <span className="text-[8px] font-black text-cyan-700 uppercase tracking-widest">
                    {language === 'es' ? 'ESTADO_VIVO' : 'Live_Status'}: 102.4 TPS
                </span>
            </div>
        </div>
    );
};
