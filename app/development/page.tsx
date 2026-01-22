'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Shield, Lock, Zap, Terminal, AlertTriangle,
    CheckCircle, ChevronRight, Server, Activity,
    Eye, FileText, XCircle, Cloud, Radar, Bot, Brain,
    Cpu, Code, ExternalLink, Phone
} from 'lucide-react';

// --- COMPONENTES UI (ÁTOMOS) ---
const Badge = ({ text, color = 'blue' }: { text: string; color?: 'blue' | 'red' | 'green' | 'orange' }) => {
    const colors = {
        blue: 'bg-[#0071e3]/10 text-[#0071e3] border-[#0071e3]/30',
        red: 'bg-[#ff453a]/10 text-[#ff453a] border-[#ff453a]/30',
        green: 'bg-[#30d158]/10 text-[#30d158] border-[#30d158]/30',
        orange: 'bg-[#ff9f0a]/10 text-[#ff9f0a] border-[#ff9f0a]/30'
    };
    return (
        <span className={`inline-block px-4 py-1 rounded-full text-xs font-mono border ${colors[color]} mb-6`}>
            {text}
        </span>
    );
};

const Section = ({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) => (
    <section id={id} className={`py-24 relative ${className}`}>
        <div className="max-w-[1080px] mx-auto px-6 relative z-10">
            {children}
        </div>
    </section>
);

export default function DevelopmentPage() {
    const [scrolled, setScrolled] = useState(false);
    const [showNDAModal, setShowNDAModal] = useState(false);
    const [devFormData, setDevFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        niche: '',
        budgetRange: '',
        description: '',
        ndaAccepted: false
    });
    const [isDevSubmitting, setIsDevSubmitting] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDevSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDevSubmitting(true);

        try {
            const response = await fetch('/api/submit-dev-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(devFormData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            // Reset form
            setDevFormData({
                fullName: '',
                email: '',
                phone: '',
                niche: '',
                budgetRange: '',
                description: '',
                ndaAccepted: false
            });

            alert('✓ Solicitud enviada correctamente. Nos pondremos en contacto en 24-48h.');
        } catch (error) {
            console.error('Dev submission error:', error);
            alert('✗ Error al enviar. Por favor, inténtelo de nuevo.');
        } finally {
            setIsDevSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-[#f5f5f7] font-sans selection:bg-[#ff453a] selection:text-white overflow-x-hidden">

            {/* BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0071e3]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ff453a]/5 rounded-full blur-[120px]" />
            </div>

            {/* NAVBAR */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-[#333]' : 'bg-transparent'}`}>
                <div className="max-w-[1080px] mx-auto px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                        <Image src="/logo.png" alt="Blackwolfsec" width={24} height={24} className="invert" />
                        Blackwolfsec
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="text-xs font-mono text-[#86868b] hover:text-white px-4 py-2 rounded-lg hover:bg-[#1a1a1a] transition-all"
                        >
                            Ciberseguridad
                        </Link>
                        <Link
                            href="/development"
                            className="text-xs font-mono text-white border border-[#0071e3]/30 px-4 py-2 rounded-lg bg-[#0071e3]/10 transition-all"
                        >
                            Desarrollo
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <Section className="pt-32 bg-gradient-to-b from-black to-[#0a0a0a]">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
                        <span className="text-[#86868b] font-normal">Construimos el </span>
                        <span className="text-white font-bold text-6xl md:text-8xl">software</span>
                        <br />
                        <span className="text-[#86868b] font-normal text-4xl md:text-6xl">que </span>
                        <span className="text-white font-black text-7xl md:text-9xl block my-4">impulsa</span>
                        <span className="text-[#86868b] font-normal">tu </span>
                        <span className="text-white font-semibold text-5xl md:text-7xl">negocio</span>
                        <span className="text-[#86868b] font-normal">.</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-[#86868b] leading-relaxed mt-12">
                        <span className="text-[#666]">De la </span>
                        <span className="text-white font-bold text-2xl md:text-3xl">idea</span>
                        <span className="text-[#666]"> al </span>
                        <span className="text-white font-bold text-2xl md:text-3xl">código</span>
                        <span className="text-[#666]">.</span>
                        <br />
                        <span className="text-[#666]">Del </span>
                        <span className="text-white font-bold text-2xl md:text-3xl">código</span>
                        <span className="text-[#666]"> a la </span>
                        <span className="text-white font-bold text-2xl md:text-3xl">producción</span>
                        <span className="text-[#666]">.</span>
                        <br />
                        <span className="text-[#555] text-base md:text-lg mt-6 block font-light">
                            Arquitectura <span className="text-[#86868b] font-medium">escalable</span>.
                            Código <span className="text-[#86868b] font-medium">limpio</span>.
                            Propiedad intelectual <span className="text-[#86868b] font-medium">protegida</span>.
                        </span>
                    </p>
                </div>
            </Section>

            {/* INTERNAL ARSENAL */}
            <Section className="bg-[#0a0a0a]">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                        <Cpu className="text-[#0071e3]" size={32} />
                        Internal Arsenal
                    </h2>
                    <p className="text-[#86868b] text-lg max-w-2xl">
                        Proyectos reales en producción. Código que usamos internamente.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* GOL.VIEW - Flagship Project */}
                    <div className="md:col-span-2 bg-[#111] border border-[#0071e3]/30 rounded-[24px] p-8 hover:border-[#0071e3] transition-all group relative overflow-hidden">
                        <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-mono">
                            <span className="w-2 h-2 rounded-full bg-[#30d158] animate-pulse"></span>
                            <span className="text-[#30d158]">SYSTEM ONLINE</span>
                        </div>

                        <div className="mb-6">
                            <div className="text-xs font-mono text-[#0071e3] mb-2">[TACTICAL COMMAND CENTER]</div>
                            <h3 className="text-3xl font-bold text-white mb-3">GOL SYSTEM</h3>
                            <p className="text-[#86868b] leading-relaxed mb-4">
                                WITHOUT A COMMAND CENTER, YOU ARE JUST COLLATERAL DAMAGE.
                            </p>
                        </div>

                        <a
                            href="https://gol.view.blackwolfsec.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0071e3] to-[#00a8e8] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,113,227,0.4)] transition-all"
                        >
                            Acceder
                            <ExternalLink size={18} />
                        </a>
                    </div>
                </div>
            </Section>

            {/* THE FOUNDRY */}
            <Section className="bg-gradient-to-b from-[#0a0a0a] to-black">
                <div className="bg-[#0a0a0a] border border-[#333] rounded-[32px] p-8 md:p-12">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                            <Code className="text-[#0071e3]" size={36} />
                            The Foundry
                        </h2>
                        <p className="text-xl text-[#86868b] max-w-2xl mx-auto">
                            Tu Visión, Nuestra Arquitectura
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Left: Persuasive Copy */}
                        <div className="space-y-6">
                            <div className="bg-[#0071e3]/5 border border-[#0071e3]/20 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-white mb-4">Tienes la idea disruptiva...</h3>
                                <p className="text-[#86868b] leading-relaxed mb-4">
                                    Pero te falta el equipo de ingeniería de élite. Nosotros construimos tu SaaS bajo un
                                    estricto <span className="text-white font-semibold">Código de Silencio</span>.
                                </p>
                                <p className="text-[#86868b] leading-relaxed">
                                    <span className="text-white font-semibold">Tú te llevas el crédito</span>, nosotros forjamos el código.
                                </p>
                            </div>

                            <div className="bg-[#ff453a]/5 border border-[#ff453a]/20 rounded-2xl p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <Lock className="text-[#ff453a] flex-shrink-0 mt-1" size={20} />
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">Garantía de Confidencialidad</h4>
                                        <p className="text-sm text-[#86868b]">
                                            Entendemos el valor de la Propiedad Intelectual. Antes de escribir una sola línea de código,
                                            blindamos tu idea con un NDA reforzado.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-[#86868b]">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-[#30d158]" />
                                    <span>Arquitectura escalable desde día 1</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-[#30d158]" />
                                    <span>Stack moderno (Next.js, Supabase, Vercel)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-[#30d158]" />
                                    <span>Código limpio y documentado</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-[#30d158]" />
                                    <span>Propiedad intelectual 100% del cliente</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: High-Security Form */}
                        <form onSubmit={handleDevSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-xs font-mono text-[#86868b] mb-2">NOMBRE / ALIAS</label>
                                    <input
                                        type="text"
                                        required
                                        value={devFormData.fullName}
                                        onChange={(e) => setDevFormData({ ...devFormData, fullName: e.target.value })}
                                        className="w-full bg-[#000] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-[#86868b] mb-2">EMAIL CORPORATIVO</label>
                                    <input
                                        type="email"
                                        required
                                        value={devFormData.email}
                                        onChange={(e) => setDevFormData({ ...devFormData, email: e.target.value })}
                                        className="w-full bg-[#000] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#0071e3] outline-none transition-all"
                                        placeholder="founder@startup.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-[#86868b] mb-2">TELÉFONO (MÓVIL)</label>
                                    <input
                                        type="tel"
                                        required
                                        value={devFormData.phone}
                                        onChange={(e) => setDevFormData({ ...devFormData, phone: e.target.value })}
                                        className="w-full bg-[#000] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#0071e3] outline-none transition-all"
                                        placeholder="+34 600 000 000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-[#86868b] mb-2">NICHO DEL SOFTWARE</label>
                                    <select
                                        required
                                        value={devFormData.niche}
                                        onChange={(e) => setDevFormData({ ...devFormData, niche: e.target.value })}
                                        className="w-full bg-[#000] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#0071e3] outline-none transition-all"
                                    >
                                        <option value="">Selecciona un nicho...</option>
                                        <option value="Fintech">Fintech</option>
                                        <option value="Healthtech">Healthtech</option>
                                        <option value="AI/ML">AI/ML</option>
                                        <option value="SaaS B2B">SaaS B2B</option>
                                        <option value="E-commerce">E-commerce</option>
                                        <option value="EdTech">EdTech</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-[#86868b] mb-2">PRESUPUESTO ESTIMADO</label>
                                    <select
                                        required
                                        value={devFormData.budgetRange}
                                        onChange={(e) => setDevFormData({ ...devFormData, budgetRange: e.target.value })}
                                        className="w-full bg-[#000] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#0071e3] outline-none transition-all"
                                    >
                                        <option value="">Selecciona un rango...</option>
                                        <option value="<5k">&lt; 5.000€</option>
                                        <option value="5k-15k">5.000€ - 15.000€</option>
                                        <option value="15k-50k">15.000€ - 50.000€</option>
                                        <option value=">50k">&gt; 50.000€</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-[#86868b] mb-2">DESCRIPCIÓN DE LA VISIÓN</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={devFormData.description}
                                        onChange={(e) => setDevFormData({ ...devFormData, description: e.target.value })}
                                        className="w-full bg-[#000] border border-[#333] rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-[#0071e3] outline-none transition-all resize-none"
                                        placeholder="Describe tu idea de SaaS, el problema que resuelve, y tu visión..."
                                    />
                                </div>
                            </div>

                            {/* NDA Checkbox */}
                            <div className="bg-[#0071e3]/5 border border-[#0071e3]/30 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={devFormData.ndaAccepted}
                                        onChange={(e) => setDevFormData({ ...devFormData, ndaAccepted: e.target.checked })}
                                        className="w-4 h-4 accent-[#0071e3] mt-1"
                                    />
                                    <span className="text-sm text-[#86868b]">
                                        Acepto el{' '}
                                        <button
                                            type="button"
                                            onClick={() => setShowNDAModal(true)}
                                            className="text-[#0071e3] underline hover:text-[#00a8e8] transition-colors"
                                        >
                                            Acuerdo de Confidencialidad (NDA)
                                        </button>
                                        . Blackwolfsec reconoce que la IP de esta idea pertenece 100% al cliente y jamás será utilizada sin permiso.
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isDevSubmitting}
                                className="w-full bg-gradient-to-r from-[#0071e3] to-[#00a8e8] text-white font-bold text-lg px-8 py-4 rounded-xl hover:shadow-[0_0_40px_rgba(0,113,227,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDevSubmitting ? 'ENVIANDO...' : 'SOLICITAR DESARROLLO'}
                            </button>
                        </form>
                    </div>
                </div>
            </Section >

            {/* FOOTER */}
            < footer className="py-12 border-t border-[#333] bg-black" >
                <div className="max-w-[1080px] mx-auto px-6 text-center text-sm text-[#86868b]">
                    <p>© 2026 Blackwolfsec Development Division · Barcelona, España</p>
                    <p className="mt-2">Código de Silencio · Propiedad Intelectual Protegida</p>
                </div>
            </footer >

            {/* MODAL: NDA */}
            {
                showNDAModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <div className="bg-[#0a0a0a] border border-[#0071e3]/30 rounded-[24px] max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-[0_0_60px_rgba(0,113,227,0.3)]">
                            {/* Header */}
                            <div className="p-6 border-b border-[#333] flex justify-between items-center bg-gradient-to-r from-[#0071e3]/10 to-transparent">
                                <div>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                        <Lock className="text-[#0071e3]" size={24} />
                                        Acuerdo de Confidencialidad (NDA)
                                    </h2>
                                    <p className="text-sm text-[#86868b] mt-1">Non-Disclosure Agreement · Development Division</p>
                                </div>
                                <button
                                    onClick={() => setShowNDAModal(false)}
                                    className="text-[#86868b] hover:text-white transition-colors"
                                >
                                    <XCircle size={28} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(80vh-180px)]">
                                <div className="bg-[#0071e3]/5 border border-[#0071e3]/20 rounded-xl p-4">
                                    <p className="text-sm text-[#86868b] leading-relaxed">
                                        Este Acuerdo de Confidencialidad (en adelante, "NDA") se establece entre el Cliente (en adelante, "Parte Divulgadora")
                                        y Blackwolfsec Development Division (en adelante, "Parte Receptora") con el propósito de proteger la información
                                        confidencial compartida durante el proceso de desarrollo de software.
                                    </p>
                                </div>

                                <section>
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <Lock size={18} className="text-[#0071e3]" />
                                        1. Propiedad Intelectual
                                    </h3>
                                    <p className="text-sm text-[#86868b] leading-relaxed">
                                        La Parte Receptora reconoce y acepta que <span className="text-white font-semibold">toda la información, ideas, conceptos,
                                            diseños, especificaciones técnicas, modelos de negocio y cualquier otra información compartida por la Parte Divulgadora
                                            es propiedad exclusiva del Cliente al 100%</span>. La Parte Receptora no adquiere ningún derecho de propiedad sobre
                                        dicha información.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <Eye size={18} className="text-[#0071e3]" />
                                        2. Obligaciones de Confidencialidad
                                    </h3>
                                    <p className="text-sm text-[#86868b] leading-relaxed mb-3">
                                        La Parte Receptora se compromete a:
                                    </p>
                                    <ul className="space-y-2 text-sm text-[#86868b]">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={16} className="text-[#0071e3] flex-shrink-0 mt-0.5" />
                                            <span>Mantener en estricta confidencialidad toda la información recibida.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={16} className="text-[#0071e3] flex-shrink-0 mt-0.5" />
                                            <span>No divulgar, publicar, compartir o distribuir la información a terceros sin consentimiento previo por escrito.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={16} className="text-[#0071e3] flex-shrink-0 mt-0.5" />
                                            <span>Utilizar la información únicamente para los fines del proyecto de desarrollo acordado.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={16} className="text-[#0071e3] flex-shrink-0 mt-0.5" />
                                            <span>Implementar medidas de seguridad razonables para proteger la información contra acceso no autorizado.</span>
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <Code size={18} className="text-[#0071e3]" />
                                        3. Código y Entregables
                                    </h3>
                                    <p className="text-sm text-[#86868b] leading-relaxed">
                                        <span className="text-white font-semibold">Todo el código fuente, documentación, diseños, bases de datos y cualquier
                                            otro entregable desarrollado en el marco del proyecto es propiedad exclusiva del Cliente</span>. La Parte Receptora
                                        transferirá todos los derechos de propiedad intelectual al Cliente una vez completado el proyecto o en el momento
                                        acordado contractualmente.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <AlertTriangle size={18} className="text-[#ff9f0a]" />
                                        4. Prohibición de Uso No Autorizado
                                    </h3>
                                    <p className="text-sm text-[#86868b] leading-relaxed">
                                        La Parte Receptora se compromete a <span className="text-white font-semibold">NO utilizar, replicar, adaptar o
                                            comercializar la idea, concepto o cualquier derivado del proyecto sin autorización expresa y por escrito del Cliente</span>.
                                        Esta prohibición se mantiene vigente incluso después de la finalización del proyecto.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <Server size={18} className="text-[#0071e3]" />
                                        5. Duración del Acuerdo
                                    </h3>
                                    <p className="text-sm text-[#86868b] leading-relaxed">
                                        Las obligaciones de confidencialidad establecidas en este NDA permanecerán vigentes durante un período de
                                        <span className="text-white font-semibold"> 5 años desde la fecha de divulgación de la información</span>,
                                        o hasta que la información se haga pública por medios legítimos ajenos a la Parte Receptora.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <Terminal size={18} className="text-[#ff453a]" />
                                        6. Consecuencias del Incumplimiento
                                    </h3>
                                    <p className="text-sm text-[#86868b] leading-relaxed">
                                        El incumplimiento de este NDA podrá dar lugar a acciones legales, incluyendo pero no limitándose a reclamaciones
                                        por daños y perjuicios, medidas cautelares y cualquier otro remedio disponible bajo la legislación aplicable.
                                        La Parte Receptora reconoce que el incumplimiento podría causar daños irreparables al Cliente.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <FileText size={18} className="text-[#0071e3]" />
                                        7. Jurisdicción y Ley Aplicable
                                    </h3>
                                    <p className="text-sm text-[#86868b] leading-relaxed">
                                        Este acuerdo se regirá e interpretará de conformidad con las leyes de España. Cualquier disputa derivada de este
                                        NDA se someterá a la jurisdicción exclusiva de los tribunales de Barcelona, España.
                                    </p>
                                </section>

                                <div className="bg-[#0071e3]/5 border border-[#0071e3]/20 rounded-xl p-4 mt-6">
                                    <p className="text-sm text-[#86868b] leading-relaxed">
                                        <span className="text-white font-semibold">Compromiso de Blackwolfsec:</span> Entendemos que tu idea es tu activo
                                        más valioso. Este NDA es nuestra garantía de que tu propiedad intelectual está protegida desde el primer contacto.
                                        Trabajamos bajo un estricto Código de Silencio.
                                    </p>
                                </div>

                                <div className="text-xs text-[#666] mt-6 pt-4 border-t border-[#333]">
                                    <p>Blackwolfsec Development Division · Barcelona, España</p>
                                    <p className="mt-1">Última actualización: Enero 2026</p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-[#333] flex justify-end gap-4">
                                <button
                                    onClick={() => setShowNDAModal(false)}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0071e3] to-[#00a8e8] text-white font-semibold hover:shadow-[0_0_30px_rgba(0,113,227,0.4)] transition-all"
                                >
                                    Entendido
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
