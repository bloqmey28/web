import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'es' | 'en';

interface TranslationSet {
    [key: string]: string;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, TranslationSet> = {
    es: {
        nav_home: 'Inicio',
        nav_exp: 'Experiencia',
        nav_edu: 'Formación',
        nav_skills: 'Habilidades',
        nav_labs: 'Laboratorios',
        nav_attack_lab: 'Attack Lab',

        // Home
        hero_status: 'SISTEMA_OPERATIVO_ACTIVO',
        hero_title_1: 'INGENIERO DE',
        hero_title_2: 'SISTEMAS E IA',
        hero_desc: 'Especialista en Orquestación de Ciberseguridad, Automatización de Procesos y Entrenamiento de Modelos de IA. Forjando el futuro de la seguridad digital.',
        cyber_map_title: 'MAPA_DE_AMENAZAS_GLOBALES',

        // Experience
        exp_title: 'Experiencia_Profesional',
        exp_role: 'Administrador de Sistemas Jefe & Arquitecto IA',
        exp_resp_title: 'Responsabilidades_Clave',
        exp_resp_1: 'Diseño y despliegue de infraestructuras críticas bajo arquitectura Zero-Trust.',
        exp_resp_2: 'Coordinación de agentes inteligentes para la automatización de auditorías de seguridad.',
        exp_resp_3: 'Mantenimiento preventivo y reactivo de clusters de servidores de alto rendimiento.',
        exp_ach_title: 'Logros_Operativos',
        exp_ach_1_t: 'Optimización de Latencia',
        exp_ach_1_d: 'Reducción del 40% en tiempos de respuesta de servidores mediante balanceo inteligente.',
        exp_ach_2_t: 'Bypass de Seguridad',
        exp_ach_2_d: 'Despliegue exitoso de protocolos de evasión para pruebas de penetración controladas.',

        // Education
        edu_title: 'Protocolos_de_Formación',
        edu_1_org: 'Academia de Ciberseguridad Avanzada',
        edu_1_title: 'Máster en Seguridad Ofensiva & Hacking',
        edu_1_desc: 'Especialización técnica en explotación de binarios, ingeniería inversa y análisis preventivo de vulnerabilidades.',
        edu_2_org: 'Instituto de IA FutbolLab',
        edu_2_title: 'Certificación en Ingeniería de Prompts & LLM',
        edu_2_desc: 'Entrenamiento avanzado de modelos de lenguaje aplicados a la automatización de flujos de trabajo científicos.',

        // Skills
        skills_title: 'Matriz_de_Habilidades',
        skills_tech_stack: 'Stack_Tecnológico_Núcleo',
        skills_intel_analysis: 'Análisis_de_Inteligencia',
        skill_sys_admin: 'Administración de Sistemas',
        skill_cyber: 'Ciberseguridad Ofensiva',
        skill_corp_ia: 'IA Corporativa',
        skill_web: 'Desarrollo Web Next-Gen',
        skill_net: 'Arquitectura de Redes',
        skill_imp_ia: 'Implementación de Modelos',
        skill_cre_ia: 'Creación de Agentes IA',
        skill_net_arch: 'Diseño de Redes Seguras',
        skill_mon_threat: 'Monitorización de Amenazas',
        skill_soft_ia: 'Software Inteligente',

        // Labs
        labs_title: 'Laboratorios de Aprendizaje',
        labs_subtitle: 'Entornos Docker Explotables para Entrenamiento',
        lab_card_launch: 'Iniciar Contenedor',
        lab_guide_title: 'Guía de Explotación',
        lab_docker_cmd: 'Comando Docker',

        // Bot
        bot_title: 'GAME_HACKING_ORCHESTRATOR_V1',
        bot_desc: 'SISTEMA MAESTRO DE COORDINACIÓN DE AGENTES.',
        bot_placeholder: 'ESCRIBE UNA CONSULTA AL ORQUESTADOR...',
        bot_limit: 'SESIÓN AGOTADA. Tienes que pagar para seguir usándome, pobre.',

        // Contact
        contact_title: 'Canal de Comunicación Seguro',
        contact_subtitle: 'Envía una solicitud interna al administrador',
        contact_name: 'Identidad / Operativo',
        contact_email: 'Canal de Retorno (Tu Correo)',
        contact_subject: 'Asunto / Protocolo',
        contact_message: 'Detalles de la Misión / Mensaje',
        contact_send: 'Transmitir Paquete',
        contact_success: 'TRANSMISIÓN EXITOSA. El administrador revisará tu solicitud.',
        contact_error: 'ERROR DE TRANSMISIÓN. Reintenta la conexión.',
        contact_loading: 'ENCRIPTANDO Y TRANSMITIENDO...',
        contact_request_lab: 'Solicitar Contenedor Personalizado',

        footer_status: 'SISTEMA OPERATIVO - TODO NOMINAL',
    },
    en: {
        nav_home: 'Home',
        nav_exp: 'Experience',
        nav_edu: 'Education',
        nav_skills: 'Skills',
        nav_labs: 'Labs',
        nav_attack_lab: 'Attack Lab',

        // Home
        hero_status: 'OS_SYSTEM_ACTIVE',
        hero_title_1: 'SYSTEMS & AI',
        hero_title_2: 'ENGINEER',
        hero_desc: 'Specialist in Cybersecurity Orchestration, Process Automation, and AI Model Training. Forging the future of digital security.',
        cyber_map_title: 'GLOBAL_THREAT_MAP',

        // Experience
        exp_title: 'Professional_Experience',
        exp_role: 'Chief Systems Administrator & AI Architect',
        exp_resp_title: 'Key_Responsibilities',
        exp_resp_1: 'Design and deployment of critical infrastructure under Zero-Trust architecture.',
        exp_resp_2: 'Coordination of intelligent agents for security audit automation.',
        exp_resp_3: 'Preventive and reactive maintenance of high-performance server clusters.',
        exp_ach_title: 'Operational_Achievements',
        exp_ach_1_t: 'Latency Optimization',
        exp_ach_1_d: '40% reduction in server response times through intelligent balancing.',
        exp_ach_2_t: 'Security Bypass',
        exp_ach_2_d: 'Successful deployment of evasion protocols for controlled penetration testing.',

        // Education
        edu_title: 'Training_Protocols',
        edu_1_org: 'Advanced Cybersecurity Academy',
        edu_1_title: 'Master in Offensive Security & Hacking',
        edu_1_desc: 'Technical specialization in binary exploitation, reverse engineering, and preventive vulnerability analysis.',
        edu_2_org: 'FutbolLab AI Institute',
        edu_2_title: 'Prompt Engineering & LLM Certification',
        edu_2_desc: 'Advanced training of language models applied to the automation of scientific workflows.',

        // Skills
        skills_title: 'Skills_Matrix',
        skills_tech_stack: 'Core_Tech_Stack',
        skills_intel_analysis: 'Intelligence_Analysis',
        skill_sys_admin: 'Systems Administration',
        skill_cyber: 'Offensive Cybersecurity',
        skill_corp_ia: 'Corporate AI',
        skill_web: 'Next-Gen Web Development',
        skill_net: 'Network Architecture',
        skill_imp_ia: 'Model Implementation',
        skill_cre_ia: 'AI Agent Creation',
        skill_net_arch: 'Secure Network Design',
        skill_mon_threat: 'Threat Monitoring',
        skill_soft_ia: 'Intelligent Software',

        // Labs
        labs_title: 'Learning Laboratories',
        labs_subtitle: 'Exploitable Docker Environments for Training',
        lab_card_launch: 'Launch Container',
        lab_guide_title: 'Exploitation Guide',
        lab_docker_cmd: 'Docker Command',

        // Bot
        bot_title: 'GAME_HACKING_ORCHESTRATOR_V1',
        bot_desc: 'MASTER AGENT COORDINATION SYSTEM.',
        bot_placeholder: 'TYPE A QUERY TO THE ORCHESTRATOR...',
        bot_limit: 'SESSION EXPIRED. You have to pay to keep using me, poor guy.',

        // Contact
        contact_title: 'Secure Communication Channel',
        contact_subtitle: 'Send an internal request to the administrator',
        contact_name: 'Identity / Operative',
        contact_email: 'Return Channel (Your Email)',
        contact_subject: 'Subject / Protocol',
        contact_message: 'Mission Details / Message',
        contact_send: 'Transmit Packet',
        contact_success: 'TRANSMISSION SUCCESSFUL. The administrator will review your request.',
        contact_error: 'TRANSMISSION ERROR. Retry connection.',
        contact_loading: 'ENCRYPTING AND TRANSMITTING...',
        contact_request_lab: 'Request Custom Container',

        footer_status: 'SYSTEM OPERATIONAL - ALL NOMINAL',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('es');

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
