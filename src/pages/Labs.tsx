import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Terminal, Box, Zap, ShieldAlert, Copy, Check, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { ContactModal } from '../components/ContactModal';

interface Lab {
    id: string;
    title: Record<string, string>;
    description: Record<string, string>;
    dockerCmd: string;
    guide: Record<string, string>;
    vulnerabilities: string[];
}

const labs_data: Lab[] = [
    {
        id: 'lab-01',
        title: { es: 'DVWA - Web Vulnerable', en: 'DVWA - Vulnerable Web App' },
        description: {
            es: 'Entorno clásico para practicar SQL Injection, XSS y CSRF.',
            en: 'Classic environment to practice SQL Injection, XSS, and CSRF.'
        },
        dockerCmd: 'docker run --rm -it -p 80:80 vulnerables/web-dvwa',
        guide: {
            es: '1. Inicia el contenedor. 2. Accede a http://localhost. 3. Login con admin/password. 4. Navega a "SQL Injection" y prueba: \' OR 1=1 --',
            en: '1. Start the container. 2. Access http://localhost. 3. Login with admin/password. 4. Navigate to "SQL Injection" and try: \' OR 1=1 --'
        },
        vulnerabilities: ['SQLi', 'XSS', 'Brute Force']
    },
    {
        id: 'lab-02',
        title: { es: 'Juice Shop - OWASP', en: 'OWASP Juice Shop' },
        description: {
            es: 'La aplicación web más moderna e insegura de OWASP.',
            en: 'The most modern and insecure OWASP web application.'
        },
        dockerCmd: 'docker run --rm -p 3000:3000 bkimminich/juice-shop',
        guide: {
            es: '1. Despliega en el puerto 3000. 2. Encuentra el "Score Board" oculto husmeando en el código JS. 3. Hackea la cuenta de administrador mediante Inyección SQL.',
            en: '1. Deploy on port 3000. 2. Find the hidden "Score Board" by snooping around JS code. 3. Hack the admin account via SQL Injection.'
        },
        vulnerabilities: ['Broken Auth', 'Security Misconfig', 'LFI']
    },
    {
        id: 'lab-03',
        title: { es: 'Metasploitable V3', en: 'Metasploitable V3 Lab' },
        description: {
            es: 'Máquina virtual vulnerable diseñada para pruebas de penetración.',
            en: 'Vulnerable virtual machine designed for penetration testing.'
        },
        dockerCmd: 'docker run --rm -p 8080:8080 metasploit/metasploitable3-linux',
        guide: {
            es: '1. Escanea puertos abiertos. 2. Explota el servicio SSH o SMTP. 3. Intenta realizar una escalada de privilegios local.',
            en: '1. Scan open ports. 2. Exploit SSH or SMTP services. 3. Attempt local privilege escalation.'
        },
        vulnerabilities: ['RCE', 'Local Privilege Escalation', 'Port Scanning']
    }
];

const LabCard = ({ lab }: { lab: Lab }) => {
    const { language, t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(lab.dockerCmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all group"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                        <Box className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="flex gap-2">
                        {lab.vulnerabilities.map(v => (
                            <span key={v} className="text-[10px] font-black uppercase tracking-widest text-cyan-700 bg-cyan-500/5 px-2 py-0.5 rounded-full border border-cyan-500/10">
                                {v}
                            </span>
                        ))}
                    </div>
                </div>

                <h3 className="text-lg font-black text-white hover:text-cyan-400 transition-colors mb-2 uppercase tracking-wide">
                    {lab.title[language]}
                </h3>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed min-h-[40px]">
                    {lab.description[language]}
                </p>

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            <span className="flex items-center gap-2"><Terminal size={12} /> {t('lab_docker_cmd')}</span>
                            <button
                                onClick={copyToClipboard}
                                className="text-cyan-500 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                        </div>
                        <div className="bg-black/60 p-3 rounded-lg border border-white/5 font-mono text-[10px] text-cyan-300 break-all">
                            {lab.dockerCmd}
                        </div>
                    </div>

                    <div className="p-4 bg-red-500/5 border-l-2 border-red-500 rounded-r-lg">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">
                            <ShieldAlert size={12} /> {t('lab_guide_title')}
                        </div>
                        <p className="text-[11px] text-slate-300 italic opacity-80">
                            {lab.guide[language]}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const Labs = () => {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 mb-4"
                >
                    <div className="w-12 h-0.5 bg-cyan-500" />
                    <span className="text-xs font-black tracking-[0.5em] text-cyan-500 uppercase">Training_Module</span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                    {t('labs_title')}
                </h1>
                <p className="text-slate-400 max-w-2xl font-mono text-sm leading-relaxed">
                    {t('labs_subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {labs_data.map((lab) => (
                    <LabCard key={lab.id} lab={lab} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-20 p-8 border border-cyan-500/10 bg-slate-900/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8"
            >
                <div className="flex gap-6 items-center">
                    <div className="p-4 bg-cyan-500/10 rounded-full">
                        <Zap className="w-8 h-8 text-cyan-500" />
                    </div>
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">{t('contact_request_lab')}</h4>
                        <p className="text-xs text-slate-500 max-w-sm">Si necesitas un entorno Docker específico para un bypass o investigación, contacta conmigo mediante el canal seguro.</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-xs tracking-[0.2em] rounded-sm transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-3"
                >
                    <MessageSquare size={16} />
                    Request_Lab
                </button>
            </motion.div>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                defaultSubject="SOLICITUD_CONTENEDOR_PERSONALIZADO"
            />
        </div>
    );
};
