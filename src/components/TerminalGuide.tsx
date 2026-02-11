import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LINUX_COMMANDS = [
    { cmd: 'ls', args: '-la', desc_es: 'Lista archivos con detalles', desc_en: 'List files with details', output: ['drwxr-xr-x  user  staff  nexus_core', '-rw-r--r--  user  staff  config.yml', '-rw-r--r--  user  staff  keys.pem'] },
    { cmd: 'grep', args: '"ERROR" logs.txt', desc_es: 'Busca texto en archivos', desc_en: 'Search text in files', output: ['[ERROR] Connection refused: 192.168.1.X', '[ERROR] Auth failed: user_admin'] },
    { cmd: 'chmod', args: '+x script.sh', desc_es: 'Hace ejecutable un archivo', desc_en: 'Make file executable', output: ['Changed mode of script.sh to 755'] },
    { cmd: 'whoami', args: '', desc_es: 'Muestra usuario actual', desc_en: 'Show current user', output: ['nexus_admin'] },
    { cmd: 'top', args: '', desc_es: 'Monitor de procesos', desc_en: 'Process monitor', output: ['PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND', '  1 root      20   0   12.5g   2.1g   1.8g S   2.3   6.8   1:23.45 nexus_svc'] },
    { cmd: 'ping', args: '8.8.8.8', desc_es: 'Prueba de conexión', desc_en: 'Test connection', output: ['PING 8.8.8.8 (8.8.8.8): 56 data bytes', '64 bytes from 8.8.8.8: icmp_seq=0 ttl=116 time=14.2 ms', '64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=15.1 ms'] },
];

export const TerminalGuide = () => {
    const { language } = useLanguage();
    const [activeCmd, setActiveCmd] = useState<number | null>(null);
    const [output, setOutput] = useState<string[]>([]);
    const [typing, setTyping] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [output, typing]);

    const runCommand = async (index: number) => {
        if (typing) return;
        setTyping(true);
        setActiveCmd(index);
        setOutput([]); // Clear previous output

        const command = LINUX_COMMANDS[index];
        const fullCmd = `${command.cmd} ${command.args}`;

        // Simulate typing delay
        for (let i = 0; i < fullCmd.length; i++) {
            await new Promise(r => setTimeout(r, 50));
            setOutput(prev => {
                const newLines = [...prev];
                if (newLines.length === 0) newLines.push('');
                newLines[0] = fullCmd.substring(0, i + 1);
                return newLines;
            });
        }

        await new Promise(r => setTimeout(r, 300));

        // Show output line by line
        for (const line of command.output) {
            setOutput(prev => [...prev, line]);
            await new Promise(r => setTimeout(r, 100));
        }

        setTyping(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-8">
            <div className="flex items-center gap-4 mb-8">
                <Terminal className="text-cyan-500 w-8 h-8" />
                <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em]">
                    {language === 'es' ? 'Simulador_Terminal_Linux' : 'Linux_Terminal_Simulator'}
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Command List */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                        {language === 'es' ? 'Comandos Disponibles' : 'Available Commands'}
                    </h3>
                    {LINUX_COMMANDS.map((cmd, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => runCommand(i)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${activeCmd === i
                                ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                : 'bg-slate-900/40 border-white/5 hover:border-cyan-500/30'
                                }`}
                        >
                            <div>
                                <div className="font-mono text-cyan-400 font-bold text-sm mb-1">
                                    {cmd.cmd} <span className="text-slate-500">{cmd.args}</span>
                                </div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                                    {language === 'es' ? cmd.desc_es : cmd.desc_en}
                                </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 text-cyan-500 transition-transform ${activeCmd === i ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                        </motion.button>
                    ))}
                </div>

                {/* Terminal Window */}
                <div className="lg:col-span-2">
                    <div className="h-[400px] bg-slate-950 rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl relative">
                        {/* Title Bar */}
                        <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            <div className="ml-auto text-[10px] font-mono text-slate-500">nexus@server:~</div>
                        </div>

                        {/* Output Area */}

                        <div ref={scrollContainerRef} className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar space-y-2 scroll-smooth">
                            <div className="text-slate-500 mb-4"># {language === 'es' ? 'Selecciona un comando para ejecutar...' : 'Select a command to execute...'}</div>

                            {activeCmd !== null && (
                                <div className="space-y-1">
                                    <div className="flex gap-2 text-white">
                                        <span className="text-green-500">nexus@server:~$</span>
                                        <span>{activeCmd !== null && LINUX_COMMANDS[activeCmd].cmd} {activeCmd !== null && LINUX_COMMANDS[activeCmd].args}</span>
                                    </div>
                                    <div className="text-slate-300 pl-0 pt-2 space-y-1">
                                        {output.map((line, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={line.includes('ERROR') ? 'text-red-400' : 'text-slate-300'}
                                            >
                                                {line}
                                            </motion.div>
                                        ))}
                                        {typing && (
                                            <motion.span
                                                animate={{ opacity: [0, 1] }}
                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                                className="inline-block w-2 h-4 bg-cyan-500 ml-1 align-middle"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                            {/* <div ref={bottomRef} /> */}
                        </div>

                        {/* Scanlines Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
