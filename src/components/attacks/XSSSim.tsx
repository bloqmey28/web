import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, AlertCircle, X } from 'lucide-react';

export const XSSSim = () => {
    const [comments, setComments] = useState<{ user: string, text: string }[]>([
        { user: 'Alice', text: 'Great website!' },
        { user: 'Bob', text: 'I love the design.' }
    ]);
    const [input, setInput] = useState('');
    const [xssTriggered, setXssTriggered] = useState(false);

    const handlePost = () => {
        if (!input.trim()) return;

        // Simulate XSS vulnerability check
        if (input.includes('<script>') || input.includes('javascript:')) {
            setXssTriggered(true);
        }

        setComments(prev => [...prev, { user: 'Guest', text: input }]);
        setInput('');
    };

    return (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 space-y-6 hover:border-cyan-500/30 transition-all relative">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Code className="text-yellow-500" size={20} />
                <h3 className="text-lg font-black text-white uppercase tracking-wider">XSS Playground (Reflected)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 h-64 overflow-y-auto space-y-3 shadow-inner">
                        {comments.map((c, i) => (
                            <div key={i} className="bg-slate-100 p-3 rounded-lg border border-slate-200">
                                <div className="font-bold text-xs text-slate-700 mb-1">{c.user} says:</div>
                                <div className="text-sm text-slate-800 break-words font-mono">
                                    {c.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Post a Comment</div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-32 bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-yellow-500/50 outline-none font-mono resize-none"
                        placeholder="Type a comment..."
                    />
                    <div className="text-[10px] text-slate-600">
                        Try injecting: <span className="text-yellow-500 cursor-pointer hover:underline" onClick={() => setInput("<script>alert('HACKED')</script>")}>&lt;script&gt;alert('HACKED')&lt;/script&gt;</span>
                    </div>
                    <button
                        onClick={handlePost}
                        className="w-full py-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 rounded-lg font-black uppercase tracking-widest text-xs transition-colors"
                    >
                        Post Comment
                    </button>
                </div>
            </div>

            {/* XSS Alert Popup Simulation */}
            <AnimatePresence>
                {xssTriggered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <div className="bg-white rounded shadow-2xl overflow-hidden max-w-sm w-full">
                            <div className="bg-slate-100 px-4 py-2 border-b flex justify-between items-center text-xs text-slate-500">
                                <span>localhost says</span>
                                <button onClick={() => setXssTriggered(false)}><X size={14} /></button>
                            </div>
                            <div className="p-6 flex gap-4 items-center">
                                <AlertCircle className="text-yellow-600 w-8 h-8 shrink-0" />
                                <div>
                                    <div className="font-bold text-slate-800">XSS EXECUTED!</div>
                                    <div className="text-xs text-slate-600 mt-1">The browser executed the injected script because the input wasn't sanitized.</div>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-3 flex justify-end">
                                <button
                                    onClick={() => setXssTriggered(false)}
                                    className="bg-blue-500 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-blue-600"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
