import React, { useState, useEffect } from 'react';
import { Berita, Pengumuman, NavigationTab, ProfilSubTab, DataSectorTab, GaleriKegiatan } from '../types';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Handshake,
  ShieldCheck,
  Lightbulb,
  FileText,
  ExternalLink,
  Award,
  Clock,
  Sparkles,
  Camera,
  RefreshCw
} from 'lucide-react';

interface BerandaSectionProps {
  beritaList: Berita[];
  pengumumanList: Pengumuman[];
  galeriList?: GaleriKegiatan[];
  onSelectTab: (tab: NavigationTab) => void;
  onSelectProfilSubTab: (subTab: ProfilSubTab) => void;
  onSelectSector?: (sector: DataSectorTab) => void;
  onReadBerita: (berita: Berita) => void;
  onViewPengumuman: (pengumuman: Pengumuman) => void;
  onOpenPtspModal?: () => void;
}

export const BerandaSection: React.FC<BerandaSectionProps> = ({
  beritaList,
  pengumumanList,
  galeriList = [],
  onSelectTab,
  onSelectProfilSubTab,
  onSelectSector,
  onReadBerita,
  onViewPengumuman,
  onOpenPtspModal
}) => {
  const [heroAnimKey, setHeroAnimKey] = useState(0);

  // Typewriter sequential typing state (100% letter-by-letter typing)
  const FULL_LINE_1 = "Layanan";
  const FULL_LINE_2 = "Kementerian Agama";
  const FULL_LINE_3 = "Kabupaten Murung Raya";

  const [typedLine1, setTypedLine1] = useState('');
  const [typedLine2, setTypedLine2] = useState('');
  const [typedLine3, setTypedLine3] = useState('');
  const [currentActiveLine, setCurrentActiveLine] = useState<1 | 2 | 3 | 'done'>(1);

  useEffect(() => {
    let isCancelled = false;
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const runContinuousTypewriter = async () => {
      // Loop continuously letter-by-letter
      while (!isCancelled) {
        setTypedLine1('');
        setTypedLine2('');
        setTypedLine3('');
        setCurrentActiveLine(1);

        await sleep(200);
        if (isCancelled) break;

        // Line 1: "Layanan" - letter by letter
        setCurrentActiveLine(1);
        for (let i = 1; i <= FULL_LINE_1.length; i++) {
          if (isCancelled) break;
          setTypedLine1(FULL_LINE_1.slice(0, i));
          await sleep(90);
        }

        if (isCancelled) break;
        await sleep(160);

        // Line 2: "Kementerian Agama" - letter by letter
        setCurrentActiveLine(2);
        for (let i = 1; i <= FULL_LINE_2.length; i++) {
          if (isCancelled) break;
          setTypedLine2(FULL_LINE_2.slice(0, i));
          await sleep(75);
        }

        if (isCancelled) break;
        await sleep(160);

        // Line 3: "Kabupaten Murung Raya" - letter by letter
        setCurrentActiveLine(3);
        for (let i = 1; i <= FULL_LINE_3.length; i++) {
          if (isCancelled) break;
          setTypedLine3(FULL_LINE_3.slice(0, i));
          await sleep(70);
        }

        if (isCancelled) break;
        setCurrentActiveLine('done');

        // Pause so readers can comfortably read the full text
        await sleep(2600);
        if (isCancelled) break;

        // Backspace smoothly in reverse order: Line 3 -> Line 2 -> Line 1
        setCurrentActiveLine(3);
        for (let i = FULL_LINE_3.length - 1; i >= 0; i--) {
          if (isCancelled) break;
          setTypedLine3(FULL_LINE_3.slice(0, i));
          await sleep(25);
        }

        if (isCancelled) break;
        setCurrentActiveLine(2);
        for (let i = FULL_LINE_2.length - 1; i >= 0; i--) {
          if (isCancelled) break;
          setTypedLine2(FULL_LINE_2.slice(0, i));
          await sleep(25);
        }

        if (isCancelled) break;
        setCurrentActiveLine(1);
        for (let i = FULL_LINE_1.length - 1; i >= 0; i--) {
          if (isCancelled) break;
          setTypedLine1(FULL_LINE_1.slice(0, i));
          await sleep(25);
        }

        if (isCancelled) break;
        await sleep(350);
      }
    };

    runContinuousTypewriter();

    return () => {
      isCancelled = true;
    };
  }, [heroAnimKey]);

  const featuredBerita = beritaList[0];
  const secondaryBerita = beritaList.slice(1, 4);
  const latestPengumuman = pengumumanList.slice(0, 3);
  const previewGaleri = galeriList.slice(0, 4);

  const handleSectorClick = (sector: DataSectorTab) => {
    if (onSelectSector) {
      onSelectSector(sector);
    }
    onSelectTab('data-informasi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-14 pb-16">
      
      {/* ========================================================
          HERO BANNER - REPLICATING OFFICIAL IMAGE
          "Selamat Datang di Layanan Kementerian Agama"
          6 Interactive Section Cards + Golden Dayak Banner Wave
         ======================================================== */}
      <section className="relative overflow-hidden bg-slate-50 border-b border-emerald-900/10">
        
        {/* Banner Container with Clean Institutional Backdrop (NO PHOTO BACKGROUND) */}
        <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 pb-8 sm:pt-6 sm:pb-12">
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/20 bg-linear-to-br from-[#f0f9f4] via-white to-[#edf6f0] pb-10 sm:pb-14">
            
            {/* Subtle decorative vector mesh accents (non-photographic) */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-20 left-0 w-80 h-80 bg-teal-200/25 rounded-full blur-2xl pointer-events-none -ml-20" />

            {/* Top Sub-Header: Greetings & Title */}
            <div className="relative z-10 pt-8 sm:pt-12 px-4 sm:px-12 text-center max-w-5xl mx-auto space-y-3">
              <style>{`
                @keyframes kemenagLetterPop {
                  0% {
                    opacity: 0;
                    transform: translateY(22px) scale(0.65);
                    filter: blur(4px);
                  }
                  70% {
                    opacity: 1;
                    transform: translateY(-2px) scale(1.06);
                    filter: blur(0px);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: blur(0px);
                  }
                }
              `}</style>
              
              <div className="flex items-center justify-center gap-2.5">
                <span className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#0b5133] tracking-wide font-medium">
                  Selamat Datang di
                </span>
                <button
                  type="button"
                  onClick={() => setHeroAnimKey(k => k + 1)}
                  className="p-1.5 rounded-full text-emerald-800 hover:text-amber-800 hover:bg-emerald-50 bg-white border-2 border-emerald-400/50 hover:border-amber-400 transition-all hover:rotate-180 duration-500 shadow-2xs"
                  title="Ketik ulang animasi huruf satu per satu"
                  aria-label="Ketik ulang animasi huruf satu per satu"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#009b96]" />
                </button>
              </div>

              {/* 3-Line Animated Header: True Letter-by-Letter Sequential Typewriter with Color #00FFF7 */}
              <h1 
                aria-label="Layanan Kementerian Agama Kabupaten Murung Raya"
                className="flex flex-col items-center justify-center space-y-0.5 sm:space-y-1 py-0.5 select-none"
              >
                {/* Baris Pertama: Layanan */}
                <div className="min-h-[1.75rem] sm:min-h-[2.1rem] lg:min-h-[2.4rem] text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-wider flex items-center justify-center flex-wrap leading-tight">
                  {typedLine1.split('').map((char, idx) => (
                    <span
                      key={`l1-${idx}`}
                      className="inline-block transition-transform duration-150 hover:scale-110"
                      style={{
                        color: '#00FFF7',
                        WebkitTextStroke: '1px #02453b',
                        paintOrder: 'stroke fill',
                        textShadow: '0 0 8px rgba(0, 255, 247, 0.45), 0 1px 3px rgba(2, 69, 59, 0.35)',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                  {currentActiveLine === 1 && (
                    <span className="inline-block w-1 h-5 sm:h-6 lg:h-7 bg-[#00FFF7] animate-pulse ml-1 align-middle rounded-full shadow-[0_0_10px_#00FFF7]" />
                  )}
                </div>

                {/* Baris Kedua: Kementerian Agama */}
                <div className="min-h-[1.75rem] sm:min-h-[2.1rem] lg:min-h-[2.4rem] text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-wider flex items-center justify-center flex-wrap leading-tight">
                  {typedLine2.split('').map((char, idx) => (
                    <span
                      key={`l2-${idx}`}
                      className="inline-block transition-transform duration-150 hover:scale-110"
                      style={{
                        color: '#00FFF7',
                        WebkitTextStroke: '1px #02453b',
                        paintOrder: 'stroke fill',
                        textShadow: '0 0 8px rgba(0, 255, 247, 0.45), 0 1px 3px rgba(2, 69, 59, 0.35)',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                  {currentActiveLine === 2 && (
                    <span className="inline-block w-1 h-5 sm:h-6 lg:h-7 bg-[#00FFF7] animate-pulse ml-1 align-middle rounded-full shadow-[0_0_10px_#00FFF7]" />
                  )}
                </div>

                {/* Baris Ketiga: Kabupaten Murung Raya */}
                <div className="min-h-[1.75rem] sm:min-h-[2.1rem] lg:min-h-[2.4rem] text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-wider flex items-center justify-center flex-wrap leading-tight">
                  {typedLine3.split('').map((char, idx) => (
                    <span
                      key={`l3-${idx}`}
                      className="inline-block transition-transform duration-150 hover:scale-110"
                      style={{
                        color: '#00FFF7',
                        WebkitTextStroke: '1px #02453b',
                        paintOrder: 'stroke fill',
                        textShadow: '0 0 8px rgba(0, 255, 247, 0.45), 0 1px 3px rgba(2, 69, 59, 0.35)',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                  {currentActiveLine === 3 && (
                    <span className="inline-block w-1 h-5 sm:h-6 lg:h-7 bg-[#00FFF7] animate-pulse ml-1 align-middle rounded-full shadow-[0_0_10px_#00FFF7]" />
                  )}
                </div>
              </h1>

              <div className="inline-block pt-1">
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#0a5234] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md border-2 border-emerald-600/40">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Pelayanan Profesional, Transparan dan Berintegritas</span>
                </span>
              </div>
            </div>

            {/* 6 OFFICIAL SECTION CARDS (2 rows x 3 columns) */}
            <div className="relative z-10 my-8 px-4 sm:px-10 lg:px-16 max-w-6xl mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                
                {/* 1. Pendidikan Islam (Direct Integration to sipendismura.my.id) */}
                <button
                  onClick={() => handleSectorClick('pendidikan-islam')}
                  className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl border border-emerald-500/30 transition-all duration-300 flex items-center justify-between text-left hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                >
                  {/* Thematic Background Photo: Madrasah / Islamic Education */}
                  <img 
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" 
                    alt="Pendidikan Islam Background" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  {/* Rich Gradient Overlay for WCAG AA Readability */}
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-950/95 via-emerald-950/85 to-slate-950/70 group-hover:from-emerald-950/90 group-hover:via-emerald-900/80 group-hover:to-slate-900/60 transition-colors" />

                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 ring-2 ring-emerald-400/40">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 leading-tight transition-colors drop-shadow-sm">
                          Pendidikan Islam
                        </h3>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider shadow-xs">
                          Online
                        </span>
                      </div>
                      <p className="text-xs text-emerald-200 font-semibold mt-0.5 drop-shadow-xs">SI PENDIS (sipendismura.my.id)</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all shrink-0 shadow-md">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* 2. Bimas Islam */}
                <button
                  onClick={() => handleSectorClick('bimas-islam')}
                  className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl border border-blue-500/30 transition-all duration-300 flex items-center justify-between text-left hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                >
                  {/* Thematic Background Photo: Grand Mosque & Islamic Architecture */}
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" 
                    alt="Bimas Islam Background" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  {/* Rich Gradient Overlay for WCAG AA Readability */}
                  <div className="absolute inset-0 bg-linear-to-r from-blue-950/95 via-blue-950/85 to-slate-950/70 group-hover:from-blue-950/90 group-hover:via-blue-900/80 group-hover:to-slate-900/60 transition-colors" />

                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-full bg-linear-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 ring-2 ring-blue-400/40">
                      <Building2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 leading-tight transition-colors drop-shadow-sm">
                        Bimas Islam
                      </h3>
                      <p className="text-xs text-blue-200 mt-0.5 font-medium drop-shadow-xs">Masjid, Mushalla & 10 KUA</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all shrink-0 shadow-md">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* 3. Bimas Kristen */}
                <button
                  onClick={() => handleSectorClick('bimas-kristen')}
                  className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl border border-purple-500/30 transition-all duration-300 flex items-center justify-between text-left hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
                >
                  {/* Thematic Background Photo: Church Sanctuary Architecture */}
                  <img 
                    src="https://images.unsplash.com/photo-1548625361-195fe5786f4a?auto=format&fit=crop&w=800&q=80" 
                    alt="Bimas Kristen Background" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  {/* Rich Gradient Overlay for WCAG AA Readability */}
                  <div className="absolute inset-0 bg-linear-to-r from-purple-950/95 via-purple-950/85 to-slate-950/70 group-hover:from-purple-950/90 group-hover:via-purple-900/80 group-hover:to-slate-900/60 transition-colors" />

                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-full bg-linear-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 font-serif text-2xl font-black ring-2 ring-purple-400/40">
                      †
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 leading-tight transition-colors drop-shadow-sm">
                        Bimas Kristen
                      </h3>
                      <p className="text-xs text-purple-200 mt-0.5 font-medium drop-shadow-xs">Gereja & Data Umat Kristen</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all shrink-0 shadow-md">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* 4. Bimas Hindu */}
                <button
                  onClick={() => handleSectorClick('bimas-hindu')}
                  className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl border border-amber-500/30 transition-all duration-300 flex items-center justify-between text-left hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                >
                  {/* Thematic Background Photo: Balai Basarah / Hindu Kaharingan Sanctuary */}
                  <img 
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80" 
                    alt="Bimas Hindu Background" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  {/* Rich Gradient Overlay for WCAG AA Readability */}
                  <div className="absolute inset-0 bg-linear-to-r from-amber-950/95 via-amber-950/85 to-slate-950/70 group-hover:from-amber-950/90 group-hover:via-amber-900/80 group-hover:to-slate-900/60 transition-colors" />

                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-full bg-linear-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 font-bold text-2xl ring-2 ring-amber-400/40">
                      ॐ
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 leading-tight transition-colors drop-shadow-sm">
                        Bimas Hindu
                      </h3>
                      <p className="text-xs text-amber-200 mt-0.5 font-medium drop-shadow-xs">Balai Basarah & Kaharingan</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all shrink-0 shadow-md">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* 5. Bimas Budha */}
                <button
                  onClick={() => handleSectorClick('bimas-budha')}
                  className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl border border-cyan-500/30 transition-all duration-300 flex items-center justify-between text-left hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-cyan-400"
                >
                  {/* Thematic Background Photo: Serene Vihara / Buddhist Temple */}
                  <img 
                    src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80" 
                    alt="Bimas Budha Background" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  {/* Rich Gradient Overlay for WCAG AA Readability */}
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-950/95 via-cyan-950/85 to-slate-950/70 group-hover:from-cyan-950/90 group-hover:via-cyan-900/80 group-hover:to-slate-900/60 transition-colors" />

                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-full bg-linear-to-br from-cyan-500 to-cyan-700 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 font-bold text-2xl ring-2 ring-cyan-400/40">
                      ☸
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 leading-tight transition-colors drop-shadow-sm">
                        Bimas Budha
                      </h3>
                      <p className="text-xs text-cyan-200 mt-0.5 font-medium drop-shadow-xs">Vihara, Cetiya & Umat Budha</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all shrink-0 shadow-md">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* 6. Kepegawaian & Tata Usaha */}
                <button
                  onClick={() => handleSectorClick('kepegawaian')}
                  className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl border border-emerald-500/30 transition-all duration-300 flex items-center justify-between text-left hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                >
                  {/* Thematic Background Photo: Modern Administrative & Civil Service */}
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
                    alt="Kepegawaian Background" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  {/* Rich Gradient Overlay for WCAG AA Readability */}
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-950/95 via-emerald-950/85 to-slate-950/70 group-hover:from-emerald-950/90 group-hover:via-emerald-900/80 group-hover:to-slate-900/60 transition-colors" />

                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-full bg-linear-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 ring-2 ring-emerald-400/40">
                      <Users className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 leading-tight transition-colors drop-shadow-sm">
                        Kepegawaian & Tata Usaha
                      </h3>
                      <p className="text-xs text-emerald-200 mt-0.5 font-medium drop-shadow-xs">Data ASN, PPPK & PPNPN</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all shrink-0 shadow-md">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          LAYANAN PTSP TERINTEGRASI (SHOWCASE & CTA)
          Embedded live to https://ptsp-kemenag-mura.vercel.app/
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-700 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-400/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 text-amber-300 text-xs font-semibold border border-emerald-600/50">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pelayanan Terpadu Satu Pintu (PTSP) Online Resmi</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Urus Izin & Permohonan Keagamaan Kini Lebih Mudah Tanpa Antre
              </h2>

              <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-2xl">
                Akses seluruh permohonan rekomendasi nikah, izin operasional madrasah/pesantren, kalibrasi arah kiblat, bantuan rumah ibadah, hingga legalisir dokumen resmi melalui portal PTSP Kemenag Murung Raya.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectTab('ptsp')}
                  className="px-6 py-3 text-xs sm:text-sm font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Buka Layanan PTSP (Dalam Portal)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://ptsp-kemenag-mura.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>Buka di Tab Baru</span>
                  <ExternalLink className="w-4 h-4 text-emerald-300" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-xs space-y-3">
              <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Standar Mutu Pelayanan PTSP:</span>
              </div>
              <ul className="space-y-2 text-emerald-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Biaya 0 Rupiah (Gratis / Bebas Pungli)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pelacakan Status Berkas Real-time</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tanda Tangan Elektronik (TTE) Tersertifikasi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Respon Cepat Petugas & Notifikasi SMS/WA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PROFIL KEMENAG MURUNG RAYA & SAMBUTAN PIMPINAN
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Col: Sambutan Kepala Kantor */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-black text-2xl ring-4 ring-emerald-100 shrink-0">
                  MR
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    H. Marzuki Rahman, S.Ag., M.Pd.I
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    Kepala Kantor Kemenag Kab. Murung Raya
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    NIP. 197205141999031003
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p className="italic text-slate-800 font-medium">
                  "Assalamu'alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera, Shalom, Om Swastyastu, Namo Buddhaya, Salam Kebajikan."
                </p>
                <p>
                  Selamat datang di portal informasi resmi Kementerian Agama Kabupaten Murung Raya. Kami berkomitmen memberikan keterbukaan informasi publik dan mempercepat transformasi digital tata kelola data keagamaan serta pendidikan madrasah di seluruh penjuru Tira Tangka Balang.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    onSelectTab('profil');
                    onSelectProfilSubTab('pejabat');
                  }}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5"
                >
                  <span>Lihat Daftar Pejabat Eselon</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-slate-400">Puruk Cahu</span>
              </div>
            </div>
          </div>

          {/* Right Col: Visi & Misi, Motto, Struktur Organisasi Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>Profil Lembaga</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Membangun Masyarakat Saleh, Moderat, Cerdas, dan Unggul
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Kantor Kementerian Agama Kabupaten Murung Raya menaungi pembinaan kerukunan hidup beragama, bimbingan masyarakat lintas agama, pengelolaan 10 KUA Kecamatan, serta pendidikan madrasah dan pondok pesantren.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  onSelectTab('profil');
                  onSelectProfilSubTab('visi-misi');
                }}
                className="bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-2xl p-4 text-left transition-all group"
              >
                <div className="text-emerald-800 font-bold text-sm mb-1 group-hover:text-emerald-950">
                  Visi & Misi
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Arah kebijakan strategis dan 5 misi utama kementerian
                </p>
                <span className="text-[11px] font-semibold text-emerald-700 mt-2 inline-block">
                  Pelajari Visi →
                </span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('profil');
                  onSelectProfilSubTab('struktur');
                }}
                className="bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-2xl p-4 text-left transition-all group"
              >
                <div className="text-emerald-800 font-bold text-sm mb-1 group-hover:text-emerald-950">
                  Struktur Organisasi
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Bagan struktur Subbag TU, Kasi, Penyelenggara & KUA
                </p>
                <span className="text-[11px] font-semibold text-emerald-700 mt-2 inline-block">
                  Lihat Bagan →
                </span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('profil');
                  onSelectProfilSubTab('pejabat');
                }}
                className="bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-2xl p-4 text-left transition-all group"
              >
                <div className="text-emerald-800 font-bold text-sm mb-1 group-hover:text-emerald-950">
                  Daftar Pejabat Eselon
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Data pimpinan, Kasubbag TU, Kasi Pendis & Bimas
                </p>
                <span className="text-[11px] font-semibold text-emerald-700 mt-2 inline-block">
                  Daftar Nama →
                </span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          BERITA TERKINI & PENGUMUMAN RESMI
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main 8 Cols: Berita Terkini */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Berita Terkini
                </h2>
                <p className="text-xs text-slate-500">
                  Warta kegiatan keagamaan, pendidikan madrasah, dan pembinaan ASN
                </p>
              </div>
              <button
                onClick={() => onSelectTab('berita')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>Lihat Semua Berita</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Featured Lead Story */}
            {featuredBerita && (
              <div 
                onClick={() => onReadBerita(featuredBerita)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-emerald-800">{featuredBerita.kategori}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredBerita.tanggalUnggah}
                    </span>
                    <span>·</span>
                    <span>{featuredBerita.waktuBaca}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {featuredBerita.judul}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {featuredBerita.ringkasan}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>Penulis: <strong>{featuredBerita.penulis}</strong></span>
                    <span className="font-bold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Baca Selengkapnya →
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {secondaryBerita.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onReadBerita(item)}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-emerald-700">{item.kategori}</span>
                      <span>·</span>
                      <span>{item.tanggalUnggah}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                      {item.judul}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 flex items-center justify-between">
                    <span>Baca info</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 4 Cols: Pengumuman Resmi */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Pengumuman Resmi
                </h2>
                <p className="text-xs text-slate-500">
                  Surat edaran, formasi & pemberitahuan
                </p>
              </div>
              <button
                onClick={() => onSelectTab('pengumuman')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
              >
                Semua
              </button>
            </div>

            <div className="space-y-3">
              {latestPengumuman.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onViewPengumuman(item)}
                  className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer shadow-xs space-y-2 group"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono text-emerald-800 truncate max-w-[190px]">
                      {item.nomorSurat}
                    </span>
                    <span className="shrink-0">{item.tanggalUnggah}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {item.judul}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium">
                      {item.kategori}
                    </span>
                    <span className="text-emerald-700 font-semibold">Buka Dokumen</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Maklumat Pelayanan */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Maklumat Pelayanan</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Dengan ini kami segenap aparatur Kantor Kementerian Agama Kabupaten Murung Raya menyatakan sanggup menyelenggarakan pelayanan publik sesuai standar pelayanan yang telah ditetapkan."
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Zona Integritas</span>
                <span className="font-bold text-emerald-400">WBK - WBBM</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          GALERI KEGIATAN PREVIEW
         ======================================================== */}
      {previewGaleri.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>Dokumentasi Pelayanan</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Galeri Kegiatan Resmi
              </h2>
            </div>
            <button
              onClick={() => onSelectTab('galeri')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>Lihat Seluruh Galeri</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {previewGaleri.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectTab('galeri')}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-emerald-700">{item.kategori}</span>
                    <span>{item.tanggal}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {item.judul}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {item.lokasi}
                  </p>
                </div>
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{item.jumlahFoto} Foto</span>
                  <span className="font-semibold text-emerald-700">Lihat Album →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
