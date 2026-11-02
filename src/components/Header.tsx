import React, { useState } from 'react';
import { NavigationTab, ProfilSubTab, DataSectorTab } from '../types';
import { PortalConfig } from '../types/admin';
import { OfficialEmblem } from './OfficialEmblem';
import { 
  ChevronDown, 
  Menu, 
  X, 
  FileText, 
  GraduationCap, 
  Building2, 
  Users, 
  Layers,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentProfilSubTab: ProfilSubTab;
  onSelectProfilSubTab: (subTab: ProfilSubTab) => void;
  onSelectSector?: (sector: DataSectorTab) => void;
  onOpenPtspModal?: () => void;
  portalConfig?: PortalConfig;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onSelectProfilSubTab,
  onSelectSector,
  onOpenPtspModal,
  portalConfig
}) => {
  const [profilDropdownOpen, setProfilDropdownOpen] = useState(false);
  const [seksiDropdownOpen, setSeksiDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const theme = portalConfig?.headerTheme || 'emerald';
  const customColor = portalConfig?.customHeaderColor || '#064e3b';

  // Dynamic Theme Styling with Rich Gradients & Micro-Bar Palettes
  const getThemeStyles = () => {
    switch (theme) {
      case 'navy':
        return {
          microBar: 'bg-linear-to-r from-slate-950 via-slate-900 to-blue-950 text-sky-100 border-slate-800',
          titleGradient: 'from-slate-950 via-blue-900 to-indigo-950',
          activeIndicator: 'bg-blue-600',
          accentText: 'text-blue-700',
          ctaGradient: 'from-blue-700 via-blue-800 to-slate-900 hover:from-blue-600 hover:to-slate-800',
          navHover: 'hover:text-blue-700'
        };
      case 'forest':
        return {
          microBar: 'bg-linear-to-r from-[#012018] via-[#022c22] to-[#064e3b] text-emerald-100 border-[#064e3b]/50',
          titleGradient: 'from-[#022c22] via-[#064e3b] to-teal-900',
          activeIndicator: 'bg-teal-700',
          accentText: 'text-teal-800',
          ctaGradient: 'from-teal-800 via-emerald-800 to-[#022c22] hover:from-teal-700 hover:to-emerald-900',
          navHover: 'hover:text-teal-800'
        };
      case 'maroon':
        return {
          microBar: 'bg-linear-to-r from-[#290505] via-[#3b0707] to-[#4c0519] text-rose-100 border-rose-900/50',
          titleGradient: 'from-[#4c0519] via-[#881337] to-[#9f1239]',
          activeIndicator: 'bg-rose-700',
          accentText: 'text-rose-800',
          ctaGradient: 'from-rose-700 via-rose-800 to-[#4c0519] hover:from-rose-600 hover:to-rose-900',
          navHover: 'hover:text-rose-800'
        };
      case 'custom':
        return {
          microBar: 'text-white border-white/20',
          microBarStyle: { backgroundColor: customColor },
          titleGradient: 'from-slate-900 to-slate-800',
          activeIndicator: 'bg-emerald-600',
          accentText: 'text-emerald-700',
          ctaGradient: 'from-emerald-700 to-emerald-800 hover:from-emerald-600',
          navHover: 'hover:text-emerald-700'
        };
      case 'emerald':
      default:
        return {
          microBar: 'bg-linear-to-r from-[#022c22] via-[#064e3b] to-[#043d2e] text-emerald-100/95 border-emerald-800/60',
          titleGradient: 'from-emerald-950 via-[#0b5133] to-teal-950',
          activeIndicator: 'bg-emerald-600',
          accentText: 'text-emerald-800',
          ctaGradient: 'from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-500 hover:to-teal-700',
          navHover: 'hover:text-emerald-700'
        };
    }
  };

  const themeStyle = getThemeStyles();

  const handleTabClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const handleProfilSubClick = (subTab: ProfilSubTab) => {
    onSelectTab('profil');
    onSelectProfilSubTab(subTab);
    setProfilDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSeksiClick = (sector: DataSectorTab) => {
    if (onSelectSector) {
      onSelectSector(sector);
    }
    onSelectTab('data-informasi');
    setSeksiDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-sm transition-all">
      
      {/* MAIN BRANDING BAR: Fresh Luminous Backdrop + Pristine Logo + BerAKHLAK */}
      <div className="bg-linear-to-b from-white via-emerald-50/25 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3 sm:py-3.5">
            
            {/* Left Brand Lockup: Emblem + High Contrast Typography */}
            <button
              onClick={() => handleTabClick('beranda')}
              className="flex items-center gap-3.5 text-left focus:outline-hidden group shrink-0"
              title="Kembali ke Beranda Portal Kemenag Murung Raya"
            >
              {/* Emblem with subtle golden-emerald ambient glow */}
              <div className="relative p-1 rounded-2xl bg-white shadow-xs border border-emerald-100/80 group-hover:border-emerald-300 transition-all group-hover:shadow-md">
                <OfficialEmblem 
                  size={54} 
                  logoType={portalConfig?.logoType || 'kemenag-ri'}
                  customLogoUrl={portalConfig?.customLogoUrl}
                  className="transition-transform duration-300 group-hover:scale-105 shrink-0 drop-shadow-xs" 
                />
              </div>

              {/* Institutional Text Lockup */}
              <div className="flex flex-col">
                <span className={`text-sm sm:text-base font-black tracking-wide uppercase leading-tight font-sans bg-linear-to-r ${themeStyle.titleGradient} bg-clip-text text-transparent`}>
                  {portalConfig?.namaInstansi || 'KEMENTERIAN AGAMA'}
                </span>
                <span className="text-xs sm:text-[13px] font-black text-slate-900 tracking-wider uppercase leading-tight mt-0.5">
                  {portalConfig?.subInstansi || 'KABUPATEN MURUNG RAYA'}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    {portalConfig?.tagline || 'Ikhlas Beramal'}
                  </span>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">
                    · Tira Tangka Balang
                  </span>
                </div>
              </div>
            </button>

            {/* Center Trust Accent (Desktop): Zona Integritas Seal */}
            <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/70 text-emerald-900 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-[11px] leading-none text-emerald-950">Zona Integritas</span>
                <span className="text-[9px] text-emerald-700 font-medium leading-tight">WBK & WBBM Terpercaya</span>
              </div>
            </div>

            {/* Right Brand: Kemenag Droplet + BerAKHLAK Official Identity */}
            <div className="flex items-center gap-3 shrink-0">
              
              <div className="flex items-center gap-3 bg-white/90 border border-slate-200/90 shadow-xs rounded-2xl px-3 py-1.5">
                {/* Official Kemenag Droplet Teardrop Badge */}
                <div className="flex items-center gap-1.5" title="Kementerian Agama RI">
                  <svg viewBox="0 0 48 58" className="w-7 h-9 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M24 2C24 2 44 26 44 38C44 49.0457 35.0457 58 24 58C12.9543 58 4 49.0457 4 38C4 26 24 2 24 2Z" 
                      fill="url(#dropletGradientHeader)"
                    />
                    <path 
                      d="M24 16C24 16 35 29 35 37C35 43.0751 30.0751 48 24 48C17.9249 48 13 43.0751 13 37C13 29 24 16 24 16Z" 
                      fill="#ffffff"
                    />
                    <defs>
                      <linearGradient id="dropletGradientHeader" x1="4" y1="2" x2="44" y2="58" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#eab308" />
                        <stop offset="40%" stopColor="#0284c7" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* BerAKHLAK Typography Lockup */}
                <div className="flex flex-col border-l border-slate-200 pl-2.5">
                  <span className="text-sm sm:text-base font-black text-rose-700 tracking-tight leading-none">
                    BerAKHLAK
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-rose-700 font-black text-[11px] leading-none">#</span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 leading-tight">
                      bangga melayani bangsa
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Toggle Button */}
              <div className="flex items-center lg:hidden ml-1">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100 transition-colors shadow-xs"
                  aria-label="Buka navigasi menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-900" /> : <Menu className="w-5 h-5 text-emerald-900" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR (DESKTOP): Fresh Ribbon with Vibrant Underlines & Rich Dropdowns */}
      <div className="hidden lg:block border-t border-slate-200/80 bg-linear-to-r from-emerald-50/50 via-white to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 py-2">
            
            <nav className="flex items-center gap-1 xl:gap-2 text-[13px] font-semibold text-slate-700">
              
              {/* Tab: Beranda */}
              <button
                onClick={() => handleTabClick('beranda')}
                className={`px-3 py-1.5 rounded-lg transition-all relative ${themeStyle.navHover} ${
                  currentTab === 'beranda' 
                    ? 'text-emerald-900 font-bold bg-emerald-100/70 shadow-xs' 
                    : 'hover:bg-slate-100/80'
                }`}
              >
                Beranda
                {currentTab === 'beranda' && (
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 ${themeStyle.activeIndicator} rounded-full`} />
                )}
              </button>

              {/* Dropdown: Layanan Per Seksi */}
              <div 
                className="relative"
                onMouseEnter={() => setSeksiDropdownOpen(true)}
                onMouseLeave={() => setSeksiDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${themeStyle.navHover} ${
                    currentTab === 'data-informasi' 
                      ? 'text-emerald-900 font-bold bg-emerald-100/70 shadow-xs' 
                      : 'hover:bg-slate-100/80'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Layanan Per Seksi</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${seksiDropdownOpen ? 'rotate-180 text-emerald-700' : 'text-slate-400'}`} />
                  {currentTab === 'data-informasi' && (
                    <span className={`absolute bottom-0 left-2 right-2 h-0.5 ${themeStyle.activeIndicator} rounded-full`} />
                  )}
                </button>

                {/* Seksi Dropdown Menu with Fresh Cards */}
                {seksiDropdownOpen && (
                  <div className="absolute left-0 top-full w-72 pt-2 z-50 animate-fadeIn">
                    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-2 space-y-1 backdrop-blur-xl">
                      
                      {/* Pendidikan Islam (Integrated with SI PENDIS MURA) */}
                      <button
                        onClick={() => handleSeksiClick('pendidikan-islam')}
                        className="w-full text-left p-2.5 rounded-xl text-xs text-slate-700 hover:bg-emerald-50/90 hover:text-emerald-900 transition-colors flex items-center gap-3 border border-transparent hover:border-emerald-200"
                      >
                        <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <GraduationCap className="w-4 h-4" />
                        </span>
                        <div className="flex-1">
                          <div className="font-bold text-slate-900 flex items-center justify-between">
                            <span>Pendidikan Islam</span>
                            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-emerald-600 text-white">
                              ONLINE
                            </span>
                          </div>
                          <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                            <span>SI PENDIS (sipendismura.my.id)</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </div>
                        </div>
                      </button>

                      {/* Bimas Islam & KUA */}
                      <button
                        onClick={() => handleSeksiClick('bimas-islam')}
                        className="w-full text-left p-2.5 rounded-xl text-xs text-slate-700 hover:bg-blue-50/90 hover:text-blue-900 transition-colors flex items-center gap-3 border border-transparent hover:border-blue-200"
                      >
                        <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Building2 className="w-4 h-4" />
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">Bimas Islam</div>
                          <div className="text-[10px] text-slate-500">Masjid, Mushalla & 10 KUA Kecamatan</div>
                        </div>
                      </button>

                      {/* Bimas Kristen */}
                      <button
                        onClick={() => handleSeksiClick('bimas-kristen')}
                        className="w-full text-left p-2.5 rounded-xl text-xs text-slate-700 hover:bg-purple-50/90 hover:text-purple-900 transition-colors flex items-center gap-3 border border-transparent hover:border-purple-200"
                      >
                        <span className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                          †
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">Bimas Kristen</div>
                          <div className="text-[10px] text-slate-500">Gereja & Layanan Umat Kristen</div>
                        </div>
                      </button>

                      {/* Bimas Hindu */}
                      <button
                        onClick={() => handleSeksiClick('bimas-hindu')}
                        className="w-full text-left p-2.5 rounded-xl text-xs text-slate-700 hover:bg-amber-50/90 hover:text-amber-900 transition-colors flex items-center gap-3 border border-transparent hover:border-amber-200"
                      >
                        <span className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                          ॐ
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">Bimas Hindu</div>
                          <div className="text-[10px] text-slate-500">Balai Basarah & Umat Kaharingan</div>
                        </div>
                      </button>

                      {/* Bimas Budha */}
                      <button
                        onClick={() => handleSeksiClick('bimas-budha')}
                        className="w-full text-left p-2.5 rounded-xl text-xs text-slate-700 hover:bg-cyan-50/90 hover:text-cyan-900 transition-colors flex items-center gap-3 border border-transparent hover:border-cyan-200"
                      >
                        <span className="w-7 h-7 rounded-lg bg-cyan-500 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                          ☸
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">Bimas Budha</div>
                          <div className="text-[10px] text-slate-500">Vihara, Cetiya & Umat Budha</div>
                        </div>
                      </button>

                      {/* Kepegawaian & TU */}
                      <button
                        onClick={() => handleSeksiClick('kepegawaian')}
                        className="w-full text-left p-2.5 rounded-xl text-xs text-slate-700 hover:bg-emerald-50/90 hover:text-emerald-900 transition-colors flex items-center gap-3 border border-transparent hover:border-emerald-200"
                      >
                        <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Users className="w-4 h-4" />
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">Kepegawaian & Tata Usaha</div>
                          <div className="text-[10px] text-slate-500">Data Pegawai ASN & Non-ASN</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown: Profil Kemenag */}
              <div 
                className="relative"
                onMouseEnter={() => setProfilDropdownOpen(true)}
                onMouseLeave={() => setProfilDropdownOpen(false)}
              >
                <button
                  onClick={() => handleTabClick('profil')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${themeStyle.navHover} ${
                    currentTab === 'profil' 
                      ? 'text-emerald-900 font-bold bg-emerald-100/70 shadow-xs' 
                      : 'hover:bg-slate-100/80'
                  }`}
                >
                  <span>Profil Kemenag</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profilDropdownOpen ? 'rotate-180 text-emerald-700' : 'text-slate-400'}`} />
                  {currentTab === 'profil' && (
                    <span className={`absolute bottom-0 left-2 right-2 h-0.5 ${themeStyle.activeIndicator} rounded-full`} />
                  )}
                </button>

                {/* Profil Sub-menu Dropdown */}
                {profilDropdownOpen && (
                  <div className="absolute left-0 top-full w-60 pt-2 z-50 animate-fadeIn">
                    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-2 space-y-1 backdrop-blur-xl">
                      <button
                        onClick={() => handleProfilSubClick('visi-misi')}
                        className="w-full text-left p-2.5 rounded-xl text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold block text-slate-900">Visi dan Misi</span>
                          <span className="text-[10px] text-slate-500">Motto & 5 Nilai Budaya</span>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">Tujuan</span>
                      </button>
                      <button
                        onClick={() => handleProfilSubClick('struktur')}
                        className="w-full text-left p-2.5 rounded-xl text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold block text-slate-900">Struktur Organisasi</span>
                          <span className="text-[10px] text-slate-500">Bagan Tata Kerja Kankemenag</span>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">Bagan</span>
                      </button>
                      <button
                        onClick={() => handleProfilSubClick('pejabat')}
                        className="w-full text-left p-2.5 rounded-xl text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold block text-slate-900">Daftar Pejabat Eselon</span>
                          <span className="text-[10px] text-slate-500">Kepala Kantor & Kasi Seksi</span>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">Pejabat</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tab: Berita Terkini */}
              <button
                onClick={() => handleTabClick('berita')}
                className={`px-3 py-1.5 rounded-lg transition-all relative ${themeStyle.navHover} ${
                  currentTab === 'berita' 
                    ? 'text-emerald-900 font-bold bg-emerald-100/70 shadow-xs' 
                    : 'hover:bg-slate-100/80'
                }`}
              >
                Berita Terkini
                {currentTab === 'berita' && (
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 ${themeStyle.activeIndicator} rounded-full`} />
                )}
              </button>

              {/* Tab: Pengumuman Resmi */}
              <button
                onClick={() => handleTabClick('pengumuman')}
                className={`px-3 py-1.5 rounded-lg transition-all relative ${themeStyle.navHover} ${
                  currentTab === 'pengumuman' 
                    ? 'text-emerald-900 font-bold bg-emerald-100/70 shadow-xs' 
                    : 'hover:bg-slate-100/80'
                }`}
              >
                Pengumuman Resmi
                {currentTab === 'pengumuman' && (
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 ${themeStyle.activeIndicator} rounded-full`} />
                )}
              </button>

              {/* Tab: Data & Informasi */}
              <button
                onClick={() => handleTabClick('data-informasi')}
                className={`px-3 py-1.5 rounded-lg transition-all relative ${themeStyle.navHover} ${
                  currentTab === 'data-informasi' 
                    ? 'text-emerald-900 font-bold bg-emerald-100/70 shadow-xs' 
                    : 'hover:bg-slate-100/80'
                }`}
              >
                Data & Informasi
                {currentTab === 'data-informasi' && (
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 ${themeStyle.activeIndicator} rounded-full`} />
                )}
              </button>

              {/* Tab: Galeri Kegiatan */}
              <button
                onClick={() => handleTabClick('galeri')}
                className={`px-3 py-1.5 rounded-lg transition-all relative ${themeStyle.navHover} ${
                  currentTab === 'galeri' 
                    ? 'text-emerald-900 font-bold bg-emerald-100/70 shadow-xs' 
                    : 'hover:bg-slate-100/80'
                }`}
              >
                Galeri Kegiatan
                {currentTab === 'galeri' && (
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 ${themeStyle.activeIndicator} rounded-full`} />
                )}
              </button>
            </nav>

            {/* CTA Button: Akses Layanan PTSP (Vibrant Gradient with Live Status) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleTabClick('ptsp')}
                className={`flex items-center gap-2.5 px-4 py-2 text-xs font-extrabold rounded-xl transition-all duration-200 shadow-md ${
                  currentTab === 'ptsp'
                    ? 'bg-emerald-950 text-white ring-2 ring-emerald-400 shadow-emerald-900/40'
                    : `bg-linear-to-r ${themeStyle.ctaGradient} text-white shadow-emerald-700/25 hover:scale-[1.02]`
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-200" />
                <span className="tracking-wide">Layanan PTSP</span>
                <span className="flex items-center gap-1 text-[9px] bg-black/25 px-2 py-0.5 rounded-full text-emerald-200 border border-emerald-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER MENU: Fresh Organized Sections & Smooth Controls */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-8 shadow-2xl animate-fadeIn">
          
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleTabClick('beranda')}
              className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                currentTab === 'beranda' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Beranda
            </button>

            {/* Mobile Layanan Per Seksi Group */}
            <div className="py-2 bg-slate-50/80 rounded-2xl p-2.5 my-1 border border-slate-100">
              <div className="px-2 pb-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-800 flex items-center justify-between">
                <span>Layanan Per Seksi (Kemenag Mura)</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">6 Bidang</span>
              </div>
              <div className="space-y-1 mt-1">
                <button
                  onClick={() => handleSeksiClick('pendidikan-islam')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 hover:bg-emerald-100/70 flex items-center justify-between bg-white shadow-2xs"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>Pendidikan Islam (Pendis)</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">SI PENDIS</span>
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-islam')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 hover:bg-blue-100/70 flex items-center gap-2 bg-white shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Bimas Islam & KUA
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-kristen')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 hover:bg-purple-100/70 flex items-center gap-2 bg-white shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  Bimas Kristen
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-hindu')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 hover:bg-amber-100/70 flex items-center gap-2 bg-white shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Bimas Hindu
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-budha')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 hover:bg-cyan-100/70 flex items-center gap-2 bg-white shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  Bimas Budha
                </button>
                <button
                  onClick={() => handleSeksiClick('kepegawaian')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 hover:bg-emerald-100/70 flex items-center gap-2 bg-white shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                  Kepegawaian & Tata Usaha
                </button>
              </div>
            </div>

            {/* Mobile Profil Group */}
            <div className="py-2 bg-slate-50/80 rounded-2xl p-2.5 my-1 border border-slate-100">
              <div className="px-2 pb-1.5 text-[11px] font-black uppercase tracking-wider text-slate-700">
                Profil Kantor Kementerian Agama
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => handleProfilSubClick('visi-misi')}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium rounded-md text-slate-700 hover:bg-white"
                >
                  · Visi, Misi & Budaya Kerja
                </button>
                <button
                  onClick={() => handleProfilSubClick('struktur')}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium rounded-md text-slate-700 hover:bg-white"
                >
                  · Struktur Organisasi & Tugas
                </button>
                <button
                  onClick={() => handleProfilSubClick('pejabat')}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium rounded-md text-slate-700 hover:bg-white"
                >
                  · Daftar Pejabat Eselon
                </button>
              </div>
            </div>

            <button
              onClick={() => handleTabClick('berita')}
              className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                currentTab === 'berita' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Berita Terkini
            </button>

            <button
              onClick={() => handleTabClick('pengumuman')}
              className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                currentTab === 'pengumuman' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Pengumuman Resmi
            </button>

            <button
              onClick={() => handleTabClick('data-informasi')}
              className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                currentTab === 'data-informasi' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Data dan Informasi (Perbidang)
            </button>

            <button
              onClick={() => handleTabClick('galeri')}
              className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                currentTab === 'galeri' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Galeri Kegiatan
            </button>

            {/* Mobile PTSP Button */}
            <div className="pt-3">
              <button
                onClick={() => handleTabClick('ptsp')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-extrabold text-white bg-linear-to-r from-emerald-600 via-emerald-700 to-teal-800 rounded-xl shadow-md hover:from-emerald-500 hover:to-teal-700"
              >
                <FileText className="w-4 h-4" />
                <span>Akses Layanan PTSP Online</span>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full text-emerald-200 font-bold">
                  24 JAM
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
