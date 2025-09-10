import React, { useState, useEffect, useRef } from 'react';
import { Section } from './components/Section';
import { Carousel } from './components/Carousel';
import { 
  ArrowDownIcon,
  ChaoticEmailIcon,
  DisorderedChatIcon,
  LostDocumentIcon,
  WorkshopIcon,
  RocketIcon,
  SupportIcon,
  CrownIcon,
  TeamIcon,
  EyeIcon
} from './components/Icons';
import { ClickUpLogo } from './components/ClickUpLogo';

const App: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [scrollY, setScrollY] = useState(0);

  const responsibilitySectionRef = useRef<HTMLElement>(null);
  const responsibilityTextRef = useRef<HTMLDivElement>(null);
  const responsibilityImageRef = useRef<HTMLDivElement>(null);

  const focusSectionRef = useRef<HTMLElement>(null);
  const focusTextRef = useRef<HTMLDivElement>(null);
  const focusImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const applyParallax = (
      sectionRef: React.RefObject<HTMLElement>,
      el1Ref: React.RefObject<HTMLElement>, // Will move up
      el2Ref: React.RefObject<HTMLElement>  // Will move down
    ) => {
      if (sectionRef.current && el1Ref.current && el2Ref.current) {
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        const screenHeight = window.innerHeight;
        const scrollBottom = scrollY + screenHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Only calculate when section is in view
        if (scrollBottom >= sectionTop && scrollY <= sectionBottom) {
            const distance = scrollY + screenHeight / 2 - (sectionTop + sectionHeight / 2);
            const speed1 = -0.05;
            const speed2 = 0.05;

            el1Ref.current.style.transform = `translateY(${distance * speed1}px)`;
            el2Ref.current.style.transform = `translateY(${distance * speed2}px)`;
        }
      }
    };
    
    // For "Responsabilidad" section, text moves up, image moves down
    applyParallax(responsibilitySectionRef, responsibilityTextRef, responsibilityImageRef);
    
    // For "Foco" section, image moves up, text moves down
    applyParallax(focusSectionRef, focusImageRef, focusTextRef);

  }, [scrollY]);


  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased">
      <main>
        {/* Section 1: Hero */}
        <Section className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(229,231,235,1),rgba(255,255,255,0))]"></div>
            <div className="relative z-10">
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-gray-900">
                Simplicidad. Claridad. Control.
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Presentamos la nueva forma de gestionar nuestro trabajo.
                </p>
                <button
                onClick={() => handleScrollTo('problem')}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gray-800 px-6 py-3 text-lg font-medium text-white transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100"
                >
                Descubre Cómo
                <ArrowDownIcon className="transition-transform group-hover:translate-y-1" />
                </button>
            </div>
        </Section>

        {/* Section 2: The Problem */}
        <Section id="problem">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            Nuestro trabajo está en todas partes.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16">
            Los proyectos viven en hilos de email interminables. Las tareas importantes se pierden en chats de WhatsApp. Las planillas críticas se desactualizan en Drive. Es hora de un cambio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6">
              <ChaoticEmailIcon className="h-16 w-16 mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Email Caótico</h3>
              <p className="text-gray-500">Decisiones y archivos enterrados en conversaciones interminables.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <DisorderedChatIcon className="h-16 w-16 mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Chats Desordenados</h3>
              <p className="text-gray-500">Tareas asignadas informalmente que se olvidan con facilidad.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <LostDocumentIcon className="h-16 w-16 mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Documentos Perdidos</h3>
              <p className="text-gray-500">Versiones desactualizadas y falta de una fuente única de verdad.</p>
            </div>
          </div>
        </Section>

        {/* Section 3: The Solution */}
        <Section className="bg-white">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            Un único lugar para todo.
          </h2>
          <div className="max-w-xs mx-auto my-12">
            <ClickUpLogo />
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center">
            ClickUp es nuestro nuevo centro de operaciones digital. La plataforma que unifica nuestras tareas, documentos, y comunicación, dándonos una fuente única de la verdad.
          </p>
        </Section>

        {/* Section 4: Benefit 1 - Clarity */}
        <Section ref={responsibilitySectionRef}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={responsibilityTextRef} className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Responsabilidad Absoluta.</h2>
              <p className="text-lg md:text-xl text-gray-600">Se acabaron las dudas. Cada tarea tiene un responsable claro y una fecha de entrega precisa. Sabrás exactamente quién está a cargo de qué, en todo momento.</p>
            </div>
            <div ref={responsibilityImageRef} className="bg-white p-8 rounded-2xl shadow-xl transform rotate-3 scale-105">
              <h4 className="font-bold text-lg mb-4">Revisar propuesta de menú de verano</h4>
              <p className="text-sm text-gray-500 mb-6">Asegurarse que los costos estén alineados con el presupuesto y que los ingredientes sean de temporada.</p>
              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-left">
                  <span className="text-xs text-gray-400 block">ASIGNADO A</span>
                  <div className="flex items-center gap-2 mt-1">
                    <img src="https://picsum.photos/seed/person1/32/32" alt="Avatar" className="w-8 h-8 rounded-full" />
                    <span className="font-semibold">Ana Pérez</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">FECHA DE ENTREGA</span>
                  <span className="font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-md mt-1 inline-block">Mañana</span>
                </div>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Section 5: Benefit 2 - Visibility */}
        <Section className="bg-white">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Tu trabajo, a tu manera.</h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                No todos pensamos igual. Visualiza tus proyectos como listas ordenadas, tableros Kanban visuales o cronogramas de planificación. La misma información, múltiples perspectivas.
                </p>
            </div>
            <Carousel />
        </Section>

        {/* Section 6: Benefit 3 - Control */}
        <Section ref={focusSectionRef}>
           <div className="grid md:grid-cols-2 gap-16 items-center">
             <div ref={focusImageRef} className="bg-white p-8 rounded-2xl shadow-xl -rotate-2">
                <h4 className="font-bold text-lg mb-6">Prioridades: Lanzamiento Nuevo Local</h4>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="font-medium">Finalizar contrato de alquiler</span>
                    <span className="text-sm font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">Urgente</span>
                  </li>
                  <li className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="font-medium">Diseñar campaña de marketing</span>
                    <span className="text-sm font-bold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">Alta</span>
                  </li>
                   <li className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="font-medium">Contactar proveedores de insumos</span>
                    <span className="text-sm font-bold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">Alta</span>
                  </li>
                  <li className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="font-medium">Definir look & feel del local</span>
                    <span className="text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">Normal</span>
                  </li>
                </ul>
            </div>
            <div ref={focusTextRef} className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">El Foco es Poder.</h2>
              <p className="text-lg md:text-xl text-gray-600">Marca fácilmente qué tareas son urgentes, altas o normales. Tu equipo siempre sabrá en qué enfocarse primero, alineando el esfuerzo con las prioridades del negocio.</p>
            </div>
          </div>
        </Section>

        {/* New Section: Control y Seguridad */}
        <Section className="bg-white">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Tu equipo. Tus reglas.</h2>
              <p className="text-lg md:text-xl text-gray-600">No todo el mundo necesita ver todo. En ClickUp, cada líder de área tiene control total sobre su Espacio de trabajo. Decide quién tiene acceso, quién puede crear tareas y quién solo puede ver el progreso, asegurando que la información sensible se mantenga confidencial.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="relative border-b-2 border-gray-200 pb-2 mb-6">
                <h4 className="font-bold text-lg text-gray-800">Espacio de Marketing</h4>
                <span className="absolute -top-3 -left-4 text-xs font-semibold text-gray-400 bg-gray-50 px-1">CONTENEDOR</span>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <CrownIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Líder de Área</h5>
                    <p className="text-sm text-gray-500">Control Total</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TeamIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Miembros</h5>
                    <p className="text-sm text-gray-500">Colaboran y Crean</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <EyeIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Invitados</h5>
                    <p className="text-sm text-gray-500">Solo Pueden Ver</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 7: Implementation Plan */}
        <Section id="plan">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            Juntos en cada paso.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16">
            Este es un viaje que haremos en equipo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl">
              <WorkshopIcon className="h-16 w-16 mb-4 text-gray-500" />
              <h3 className="text-xl font-semibold mb-2">Diseño Personalizado</h3>
              <p className="text-gray-500">Nos reuniremos con cada área para diseñar un espacio de trabajo que se adapte a sus necesidades.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl">
              <RocketIcon className="h-16 w-16 mb-4 text-gray-500" />
              <h3 className="text-xl font-semibold mb-2">Lanzamiento Piloto</h3>
              <p className="text-gray-500">Empezaremos con un proyecto clave para aprender y ajustar la herramienta en un entorno real.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl">
              <SupportIcon className="h-16 w-16 mb-4 text-gray-500" />
              <h3 className="text-xl font-semibold mb-2">Soporte Continuo</h3>
              <p className="text-gray-500">Contarán con mi guía y capacitación constante para asegurar que le saquemos el máximo provecho.</p>
            </div>
          </div>
        </Section>

        {/* Section 8: Closing */}
        <Section className="text-center bg-gray-900 text-white">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4">
            Menos caos. Más impacto.
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Es hora de empezar a trabajar de una forma más inteligente.
          </p>
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400"></p>
            <p className="text-lg font-semibold text-white mt-2">
                 <span className="text-gray-500 mx-2">|</span> 
            </p>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default App;