'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield, Lock, Zap, Terminal, AlertTriangle,
  CheckCircle, ChevronRight, Server, Activity,
  Eye, FileText, XCircle, Cloud, Radar, Bot, Brain,
  Cpu, Code, ExternalLink, Phone
} from 'lucide-react';

// --- COMPONENTES UI (ÁTOMOS) ---

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-24 px-6 relative z-10 ${className}`}>
    <div className="max-w-[1080px] mx-auto">
      {children}
    </div>
  </section>
);

const Badge = ({ text, color = "blue" }: { text: string; color?: "blue" | "red" | "green" }) => {
  const colors = {
    blue: "bg-[#0071e3]/10 text-[#2997ff] border-[#0071e3]/30",
    red: "bg-[#ff453a]/10 text-[#ff453a] border-[#ff453a]/30",
    green: "bg-[#30d158]/10 text-[#30d158] border-[#30d158]/30",
  };
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wide uppercase mb-6 ${colors[color]}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
      </span>
      {text}
    </span>
  );
};

// --- PÁGINA PRINCIPAL DE SEGURIDAD ---

export default function SecurityLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<'bounty' | 'redteam' | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formData, setFormData] = useState({
    organization: '',
    technicalResponsible: '',
    corporateEmail: '',
    assets: '',
    scopeTypes: [] as string[],
    intrusionLevel: '',
    emergencyContact: '',
    termsAccepted: false,
    selectedService: '' as 'bounty' | 'redteam' | ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScopeTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      scopeTypes: prev.scopeTypes.includes(type)
        ? prev.scopeTypes.filter(t => t !== type)
        : [...prev.scopeTypes, type]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-authorization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        organization: '',
        technicalResponsible: '',
        corporateEmail: '',
        assets: '',
        scopeTypes: [],
        intrusionLevel: '',
        emergencyContact: '',
        termsAccepted: false,
        selectedService: ''
      });
      setSelectedService(null);

      // Show success message for 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
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
            <Shield className="text-white fill-white" size={20} />
            Blackwolfsec
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-mono text-white border border-[#ff453a]/30 px-4 py-2 rounded-lg bg-[#ff453a]/10 transition-all"
            >
              Ciberseguridad
            </Link>
            <Link
              href="/development"
              className="text-xs font-mono text-[#86868b] hover:text-white px-4 py-2 rounded-lg hover:bg-[#1a1a1a] transition-all"
            >
              Desarrollo
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-40 pb-20 md:pt-52 md:pb-32 text-center px-6 z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          <span className="text-white font-bold text-6xl md:text-8xl">Seguridad</span>
          <span className="text-[#86868b] font-normal text-4xl md:text-6xl">.</span>
          <br />
          <span className="text-[#86868b] font-normal text-4xl md:text-6xl">Sin </span>
          <span className="text-white font-black text-7xl md:text-9xl block my-4">Piedad</span>
          <span className="text-[#86868b] font-normal text-4xl md:text-6xl">.</span>
        </h1>

        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-[#86868b] leading-relaxed mb-12 mt-12">
          <span className="text-[#666]">No somos </span>
          <span className="text-white font-bold text-2xl md:text-3xl">auditores</span>
          <span className="text-[#666]"> de papel.</span>
          <br />
          <span className="text-[#666]">Somos el </span>
          <span className="text-white font-bold text-2xl md:text-3xl">adversario</span>
          <span className="text-[#666]"> que esperas </span>
          <span className="text-white font-semibold">no tener</span>
          <span className="text-[#666]">.</span>
          <br />
          <span className="text-[#555] text-base md:text-lg mt-4 block font-light">
            Encontramos la <span className="text-[#86868b] font-medium">grieta</span> antes de que se convierta en <span className="text-[#ff453a] font-medium">noticia</span>.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <a href="#authorize" className="group bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all flex items-center shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Autorizar Intrusión <Zap className="ml-2 group-hover:fill-black" size={18} />
          </a>
          <a href="#metodo" className="text-[#f5f5f7] px-8 py-4 rounded-full font-medium hover:text-white flex items-center gap-2 transition-all">
            Ver Metodología <ChevronRight size={18} />
          </a>
        </div>
      </header>

      {/* --- FILOSOFÍA (THE MANIFESTO) --- */}
      <Section className="border-t border-[#333]/50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Skin in the Game.</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1"><XCircle className="text-[#ff453a]" /></div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Sin Humo.</h4>
                  <p className="text-[#86868b]">La ciberseguridad tradicional vende miedo e informes PDF. Nosotros vendemos la realidad técnica de tu infraestructura.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><CheckCircle className="text-[#30d158]" /></div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Resultados o Nada.</h4>
                  <p className="text-[#86868b]">Si el sistema es seguro, lo certificamos. Si no lo es, solo cobramos por demostrar dónde falla (Modelo Bounty).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual de Código */}
          <div className="bg-[#111] border border-[#333] rounded-2xl p-6 font-mono text-xs md:text-sm text-[#30d158] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-8 bg-[#1d1d1f] border-b border-[#333] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff453a]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ff9f0a]"></div>
              <div className="w-3 h-3 rounded-full bg-[#30d158]"></div>
              <span className="ml-2 text-[#666]">root@blackwolfsec:~</span>
            </div>
            <div className="mt-8 space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
              <p className="text-white">$ nmap -sV -p- target.com</p>
              <p>Scanning ports...</p>
              <p>[+] Port 80 open (HTTP)</p>
              <p>[+] Port 443 open (HTTPS)</p>
              <p className="text-[#ff453a]">[!] CRITICAL: SQL Injection found in /login</p>
              <p className="text-[#ff453a]">[!] Exploit verified.</p>
              <p className="animate-pulse">_</p>
            </div>
          </div>
        </div>
      </Section>

      {/* --- METODOLOGÍA (THE METHOD) --- */}
      <Section id="metodo" className="bg-[#0a0a0a]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
            <span className="text-[#86868b] font-normal text-3xl md:text-5xl">Más allá del </span>
            <span className="text-white font-bold text-5xl md:text-7xl">escaneo</span>
            <br />
            <span className="text-[#86868b] font-normal text-3xl md:text-5xl">automático: </span>
            <span className="text-white font-black text-6xl md:text-8xl block my-4">Pentesting</span>
            <span className="text-[#86868b] font-normal text-3xl md:text-5xl">de </span>
            <span className="text-white font-semibold text-4xl md:text-6xl">Precisión Quirúrgica</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-[#86868b] leading-relaxed mt-8">
            <span className="text-[#666]">En un mundo donde los ciberataques evolucionan a diario, un </span>
            <span className="text-white font-semibold">escáner automático</span>
            <span className="text-[#666]"> no es suficiente.</span>
            <br />
            <span className="text-[#666]">En </span>
            <span className="text-white font-bold text-xl md:text-2xl">Blackwolfsec</span>
            <span className="text-[#666]">, combinamos la </span>
            <span className="text-white font-semibold">potencia</span>
            <span className="text-[#666]"> de procesamiento de la nube con la </span>
            <span className="text-white font-semibold">intuición</span>
            <span className="text-[#666]"> de un equipo Red Team experimentado.</span>
            <br />
            <span className="text-[#555] text-base md:text-lg mt-4 block font-light">
              Nuestra metodología <span className="text-[#2997ff] font-medium">Hybrid Stealth Ops</span> garantiza que encontramos lo que otros pasan por alto.
            </span>
          </p>
        </div>

        {/* Los 4 Pilares */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          {/* Pilar 1: Arquitectura Blindada */}
          <div className="bg-[#111] border border-[#333] rounded-[24px] p-8 hover:border-[#0071e3] transition-all group">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-[#0071e3]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0071e3]/20 transition-all">
                <Cloud className="text-[#0071e3]" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">🛡️ Arquitectura Blindada y Anónima</h3>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  La seguridad empieza por nosotros. Operamos a través de una infraestructura de servidores cifrados
                  (VPS tunneling) que garantiza la confidencialidad total de las pruebas. Simulamos ataques reales
                  desde ubicaciones globales sin comprometer la integridad de tu red.
                </p>
              </div>
            </div>
            <div className="border-t border-[#333] pt-4">
              <p className="text-xs text-[#666] font-mono">
                → VPS Distribuidos · Túneles Cifrados · Anonimato Total
              </p>
            </div>
          </div>

          {/* Pilar 2: Reconocimiento */}
          <div className="bg-[#111] border border-[#333] rounded-[24px] p-8 hover:border-[#30d158] transition-all group">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-[#30d158]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#30d158]/20 transition-all">
                <Radar className="text-[#30d158]" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">📡 Reconocimiento de Espectro Completo</h3>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  No solo miramos tu web principal. Mapeamos toda tu huella digital, desde subdominios olvidados
                  hasta servidores de desarrollo expuestos. Usamos inteligencia OSINT y Fuzzing avanzado para
                  descubrir activos que ni siquiera sabías que tenías expuestos.
                </p>
              </div>
            </div>
            <div className="border-t border-[#333] pt-4">
              <p className="text-xs text-[#666] font-mono">
                → OSINT · Subdomain Enumeration · Asset Discovery
              </p>
            </div>
          </div>

          {/* Pilar 3: Automatización */}
          <div className="bg-[#111] border border-[#333] rounded-[24px] p-8 hover:border-[#ff9f0a] transition-all group">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-[#ff9f0a]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff9f0a]/20 transition-all">
                <Bot className="text-[#ff9f0a]" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">🤖 Automatización Inteligente</h3>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  Desplegamos motores de escaneo de última generación (basados en Nuclei y FFUF) para detectar
                  miles de vulnerabilidades conocidas en minutos. Nuestro sistema de alertas en tiempo real nos
                  permite identificar brechas críticas al instante.
                </p>
              </div>
            </div>
            <div className="border-t border-[#333] pt-4">
              <p className="text-xs text-[#666] font-mono">
                → Nuclei Engine · FFUF · Real-time Alerts
              </p>
            </div>
          </div>

          {/* Pilar 4: Validación Manual */}
          <div className="bg-[#111] border border-[#333] rounded-[24px] p-8 hover:border-[#ff453a] transition-all group">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-[#ff453a]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff453a]/20 transition-all">
                <Brain className="text-[#ff453a]" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">🧠 Validación Manual y Lógica de Negocio</h3>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  Aquí es donde nos diferenciamos. Las máquinas no entienden el contexto; nosotros sí.
                  Nuestros expertos utilizan Burp Suite y técnicas manuales para encontrar fallos lógicos
                  (IDORs, Fraude, Escalada de Privilegios) que ningún software automático puede detectar.
                  Garantizamos <span className="text-[#ff453a] font-bold">0% de falsos positivos</span>.
                </p>
              </div>
            </div>
            <div className="border-t border-[#333] pt-4">
              <p className="text-xs text-[#666] font-mono">
                → Burp Suite Pro · Manual Testing · Zero False Positives
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center bg-gradient-to-r from-[#0071e3]/5 to-[#ff453a]/5 border border-[#333] rounded-[24px] p-12">
          <h3 className="text-3xl font-bold text-white mb-4">¿Listo para una auditoría real?</h3>
          <p className="text-[#86868b] mb-8 max-w-2xl mx-auto">
            Protege tu infraestructura con la metodología que usan los profesionales.
          </p>
          <a
            href="#authorize"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0071e3] to-[#2997ff] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(0,113,227,0.4)] transition-all transform hover:scale-[1.02]"
          >
            Iniciar Protocolo de Seguridad
            <ChevronRight size={20} />
          </a>
        </div>
      </Section>

      {/* --- SERVICIOS (THE MENU) --- */}
      <Section id="servicios">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Modos de Operación</h2>
          <p className="text-[#86868b]">Elige cómo quieres que ataquemos.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Bounty */}
          <div className="bg-[#161617] p-8 md:p-10 rounded-[30px] border border-[#333] hover:border-[#0071e3] transition-all group">
            <div className="w-12 h-12 bg-[#0071e3]/10 rounded-2xl flex items-center justify-center mb-8">
              <Terminal className="text-[#0071e3]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Bounty Model</h3>
            <p className="text-[#86868b] mb-6">El modelo disruptivo. Pagas por cada vulnerabilidad válida encontrada.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex justify-between text-sm border-b border-[#333] pb-2">
                <span className="text-white">Crítica</span>
                <span className="text-[#ff453a] font-mono">Tarifa Alta</span>
              </li>
              <li className="flex justify-between text-sm border-b border-[#333] pb-2">
                <span className="text-white">Media/Alta</span>
                <span className="text-[#ff9f0a] font-mono">Tarifa Estándar</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-white">Sin hallazgos</span>
                <span className="text-[#30d158] font-mono">Coste 0€</span>
              </li>
            </ul>
            <button
              onClick={() => {
                setSelectedService('bounty');
                setFormData({ ...formData, selectedService: 'bounty' });
                document.getElementById('authorize')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full py-3 rounded-xl border transition-all font-medium ${selectedService === 'bounty'
                ? 'bg-[#0071e3] text-white border-[#0071e3]'
                : 'border-[#333] text-white hover:bg-white hover:text-black'
                }`}
            >
              {selectedService === 'bounty' ? '✓ Bounty Seleccionado' : 'Seleccionar Bounty'}
            </button>
          </div>

          {/* Card 2: PTaaS */}
          <div className="bg-[#161617] p-8 md:p-10 rounded-[30px] border border-[#333] hover:border-[#ff453a] transition-all group">
            <div className="w-12 h-12 bg-[#ff453a]/10 rounded-2xl flex items-center justify-center mb-8">
              <Activity className="text-[#ff453a]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Red Team / PTaaS</h3>
            <p className="text-[#86868b] mb-6">Simulación completa de adversario. Auditoría profunda de infraestructura y SaaS.</p>
            <ul className="space-y-3 mb-8 text-sm text-[#86868b]">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#ff453a]" /> Pivoting & Movimiento Lateral</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#ff453a]" /> Ingeniería Social (Opcional)</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#ff453a]" /> Informe Ejecutivo & Técnico</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#ff453a]" /> Re-testing incluido</li>
            </ul>
            <button
              onClick={() => {
                setSelectedService('redteam');
                setFormData({ ...formData, selectedService: 'redteam' });
                document.getElementById('authorize')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full py-3 rounded-xl transition-all font-medium ${selectedService === 'redteam'
                ? 'bg-[#ff453a] text-white border-2 border-white'
                : 'bg-[#ff453a] text-white hover:bg-[#ff3b30]'
                }`}
            >
              {selectedService === 'redteam' ? '✓ Red Team Seleccionado' : 'Seleccionar Red Team'}
            </button>
          </div>
        </div>
      </Section>


      {/* --- FORMULARIO DE AUTORIZACIÓN (LEGAL & TÉCNICO) --- */}
      <section id="authorize" className="py-24 bg-[#0a0a0a] relative">
        <div className="max-w-[980px] mx-auto px-6">

          <div className="mb-12">
            <Badge text="Secure Connection: TLS 1.3" color="green" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Protocolo de Autorización</h2>
            <p className="text-[#86868b] text-lg max-w-2xl">
              Este documento sirve como autorización legal para la intrusión controlada.
              <br /><span className="text-[#ff453a]">Advertencia:</span> Cualquier activo no listado está fuera del alcance.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* 1. Datos de Contacto */}
            <div className="bg-[#1d1d1f] p-8 rounded-[20px] border border-[#333]">
              <div className="flex items-center gap-3 mb-6 border-b border-[#333] pb-4">
                <FileText className="text-[#2997ff]" size={20} />
                <h3 className="text-xl font-bold text-white">Identidad del Cliente</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-[#86868b] mb-2">ORGANIZACIÓN</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-[#000] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff] outline-none transition-all"
                    placeholder="Blackwolfsec Inc."
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#86868b] mb-2">RESPONSABLE TÉCNICO</label>
                  <input
                    type="text"
                    required
                    value={formData.technicalResponsible}
                    onChange={(e) => setFormData({ ...formData, technicalResponsible: e.target.value })}
                    className="w-full bg-[#000] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#2997ff] outline-none transition-all"
                    placeholder="CTO / CISO"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-mono text-[#86868b] mb-2">EMAIL CORPORATIVO</label>
                  <input
                    type="email"
                    required
                    value={formData.corporateEmail}
                    onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                    className="w-full bg-[#000] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#2997ff] outline-none transition-all"
                    placeholder="security@empresa.com"
                  />
                </div>
              </div>
            </div>

            {/* 2. Alcance (Scope) */}
            <div className="bg-[#1d1d1f] p-8 rounded-[20px] border border-[#333]">
              <div className="flex items-center gap-3 mb-6 border-b border-[#333] pb-4">
                <Server className="text-[#30d158]" size={20} />
                <h3 className="text-xl font-bold text-white">Alcance & Activos (Scope)</h3>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-mono text-[#86868b] mb-2">LISTADO DE ACTIVOS (IPs, URLs, Rangos)</label>
                <textarea
                  rows={4}
                  required
                  value={formData.assets}
                  onChange={(e) => setFormData({ ...formData, assets: e.target.value })}
                  className="w-full bg-[#000] border border-[#333] rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-[#30d158] outline-none transition-all"
                  placeholder="https://app.miempresa.com&#10;192.168.1.0/24"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Web Externa', 'Red Interna', 'API', 'Mobile App'].map((item) => (
                  <label key={item} className="flex items-center p-3 bg-[#000] rounded-lg border border-[#333] cursor-pointer hover:border-[#30d158] transition-all">
                    <input
                      type="checkbox"
                      checked={formData.scopeTypes.includes(item)}
                      onChange={() => handleScopeTypeToggle(item)}
                      className="accent-[#30d158] w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-[#f5f5f7]">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Intensidad & Kill Switch */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1d1d1f] p-8 rounded-[20px] border border-[#333]">
                <h3 className="text-lg font-bold text-white mb-4">Nivel de Intrusión</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border border-[#333] rounded-xl cursor-pointer bg-[#000] hover:border-[#ff453a] has-[:checked]:border-[#ff453a]">
                    <span className="text-white font-medium">Red Team (Full)</span>
                    <input
                      type="radio"
                      name="level"
                      value="Red Team (Full)"
                      checked={formData.intrusionLevel === 'Red Team (Full)'}
                      onChange={(e) => setFormData({ ...formData, intrusionLevel: e.target.value })}
                      className="accent-[#ff453a]"
                      required
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 border border-[#333] rounded-xl cursor-pointer bg-[#000] hover:border-[#ff9f0a] has-[:checked]:border-[#ff9f0a]">
                    <span className="text-white font-medium">PoC (Standard)</span>
                    <input
                      type="radio"
                      name="level"
                      value="PoC (Standard)"
                      checked={formData.intrusionLevel === 'PoC (Standard)'}
                      onChange={(e) => setFormData({ ...formData, intrusionLevel: e.target.value })}
                      className="accent-[#ff9f0a]"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 border border-[#333] rounded-xl cursor-pointer bg-[#000] hover:border-[#0071e3] has-[:checked]:border-[#0071e3]">
                    <span className="text-white font-medium">Vuln Scan (Pasivo)</span>
                    <input
                      type="radio"
                      name="level"
                      value="Vuln Scan (Pasivo)"
                      checked={formData.intrusionLevel === 'Vuln Scan (Pasivo)'}
                      onChange={(e) => setFormData({ ...formData, intrusionLevel: e.target.value })}
                      className="accent-[#0071e3]"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-[#1d1d1f] p-8 rounded-[20px] border border-[#ff453a]/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#ff453a] text-white text-[10px] font-bold px-2 py-1 uppercase">Emergency</div>
                <h3 className="text-lg font-bold text-[#ff453a] mb-2 flex items-center gap-2"><AlertTriangle size={18} /> Kill Switch</h3>
                <p className="text-xs text-[#86868b] mb-4">
                  Defina un contacto disponible 24/7 para detener las pruebas inmediatamente en caso de degradación del servicio.
                </p>
                <input
                  type="tel"
                  required
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  placeholder="Teléfono de Emergencia (+34...)"
                  className="w-full bg-[#000] border border-[#ff453a]/50 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-[#ff453a] outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-8 text-center border-t border-[#333]">
              <div className="flex items-center justify-center gap-2 mb-6">
                <input
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="w-4 h-4 accent-[#0071e3]"
                />
                <span className="text-sm text-[#86868b]">
                  Certifico autoridad sobre los activos y acepto los{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-[#2997ff] underline hover:text-[#0071e3] transition-colors"
                  >
                    Términos de Servicio
                  </button>.
                </span>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-[#30d158]/10 border border-[#30d158] rounded-lg text-[#30d158]">
                  ✓ Autorización enviada correctamente. Nos pondremos en contacto pronto.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-[#ff453a]/10 border border-[#ff453a] rounded-lg text-[#ff453a]">
                  ✗ Error al enviar. Por favor, inténtelo de nuevo.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0071e3] hover:bg-[#0077ED] text-white font-bold text-lg px-12 py-4 rounded-full shadow-[0_0_30px_rgba(0,113,227,0.3)] hover:shadow-[0_0_50px_rgba(0,113,227,0.5)] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'ENVIANDO...' : 'AUTORIZAR PENTEST'}
              </button>
            </div>

          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] py-12 border-t border-[#333] text-center text-[#424245] text-xs">
        <p>BLACKWOLFSEC © 2025. BARCELONA.</p>
        <p className="mt-2">SECURE INFRASTRUCTURE DIVISION.</p>
      </footer>

      {/* TERMS OF SERVICE MODAL */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1d1d1f] border border-[#333] rounded-[24px] max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#333]">
              <div>
                <h2 className="text-2xl font-bold text-white">Términos de Servicio</h2>
                <p className="text-sm text-[#86868b] mt-1">Blackwolfsec Security Division</p>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-10 h-10 rounded-full bg-[#333] hover:bg-[#444] flex items-center justify-center transition-colors"
              >
                <XCircle className="text-white" size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6 space-y-6 text-[#f5f5f7]">

              <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Shield size={18} className="text-[#0071e3]" />
                  1. Alcance de la Autorización
                </h3>
                <p className="text-sm text-[#86868b] leading-relaxed">
                  El Cliente autoriza expresamente a Blackwolfsec ("el Proveedor") a realizar pruebas de penetración
                  (pentesting) y auditorías de seguridad sobre los activos digitales especificados en el formulario de
                  autorización. Esta autorización es limitada exclusivamente a los activos listados y durante el período
                  acordado. Cualquier activo no incluido expresamente queda fuera del alcance y no podrá ser objeto de pruebas.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Lock size={18} className="text-[#30d158]" />
                  2. Confidencialidad y Protección de Datos
                </h3>
                <p className="text-sm text-[#86868b] leading-relaxed mb-2">
                  El Proveedor se compromete a:
                </p>
                <ul className="text-sm text-[#86868b] space-y-2 ml-4">
                  <li className="flex gap-2">
                    <span className="text-[#30d158]">•</span>
                    <span>Mantener la confidencialidad absoluta de toda la información obtenida durante las pruebas.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#30d158]">•</span>
                    <span>No divulgar vulnerabilidades encontradas a terceros sin autorización expresa del Cliente.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#30d158]">•</span>
                    <span>Eliminar todos los datos sensibles obtenidos al finalizar el proyecto, salvo lo necesario para el informe final.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#30d158]">•</span>
                    <span>Cumplir con el RGPD (Reglamento General de Protección de Datos) y legislación aplicable.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-[#ff453a]" />
                  3. Limitación de Responsabilidad
                </h3>
                <p className="text-sm text-[#86868b] leading-relaxed mb-2">
                  El Cliente reconoce y acepta que:
                </p>
                <ul className="text-sm text-[#86868b] space-y-2 ml-4">
                  <li className="flex gap-2">
                    <span className="text-[#ff453a]">•</span>
                    <span>Las pruebas de penetración pueden causar interrupciones temporales en los servicios, aunque el Proveedor tomará medidas razonables para minimizar el impacto.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#ff453a]">•</span>
                    <span>El Proveedor no será responsable de daños indirectos, pérdida de datos o lucro cesante derivados de las pruebas autorizadas.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#ff453a]">•</span>
                    <span>El Cliente debe disponer de copias de seguridad actualizadas antes del inicio de las pruebas.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#ff453a]">•</span>
                    <span>El contacto de emergencia (Kill Switch) debe estar disponible 24/7 durante el período de pruebas.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <FileText size={18} className="text-[#2997ff]" />
                  4. Propiedad Intelectual y Entregables
                </h3>
                <p className="text-sm text-[#86868b] leading-relaxed">
                  El informe final y todos los hallazgos documentados son propiedad exclusiva del Cliente.
                  El Proveedor podrá utilizar datos anonimizados con fines estadísticos o de investigación,
                  siempre que no permitan la identificación del Cliente ni de sus activos.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#0071e3]" />
                  5. Cumplimiento Legal
                </h3>
                <p className="text-sm text-[#86868b] leading-relaxed">
                  El Cliente certifica que tiene plena autoridad legal sobre los activos listados y que la realización
                  de estas pruebas no viola ninguna ley, contrato o acuerdo con terceros. El Cliente exime al Proveedor
                  de cualquier responsabilidad derivada de reclamaciones de terceros relacionadas con la autorización de las pruebas.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-3">6. Modelo de Pago (Bounty)</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">
                  En el modelo Bounty, el Cliente solo paga por vulnerabilidades válidas encontradas y verificadas.
                  El Proveedor se reserva el derecho de clasificar la severidad de las vulnerabilidades según estándares
                  de la industria (CVSS). Si no se encuentran vulnerabilidades, el coste es 0€. Las tarifas específicas
                  se acordarán antes del inicio de las pruebas.
                </p>
              </section>

              <section className="bg-[#ff453a]/5 border border-[#ff453a]/30 rounded-lg p-4">
                <h3 className="text-lg font-bold text-[#ff453a] mb-2 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  Advertencia Legal
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  Al aceptar estos términos, el Cliente reconoce haber leído, comprendido y aceptado todas las condiciones
                  establecidas. Este documento constituye un acuerdo legalmente vinculante entre el Cliente y Blackwolfsec.
                  Para cualquier disputa, las partes se someten a la jurisdicción de los tribunales de Barcelona, España.
                </p>
              </section>

              <div className="text-center text-xs text-[#666] pt-4 border-t border-[#333]">
                <p>Última actualización: Enero 2025</p>
                <p className="mt-1">Blackwolfsec Security Division · Barcelona, España</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#333] flex justify-end gap-4">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-3 rounded-xl bg-[#0071e3] text-white font-semibold hover:bg-[#0077ED] transition-all"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
