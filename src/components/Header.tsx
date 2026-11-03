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
  portalConfig
}) => {
  const [profilDropdownOpen, setProfilDropdownOpen] = useState(false);
  const [seksiDropdownOpen, setSeksiDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const theme = portalConfig?.headerTheme || 'emerald';
  const customColor = portalConfig?.customHeaderColor || '#004d34';

  // Dynamic Theme Styling with Translucent Light Green (Hijau Muda Transparan) & Iconic Kemenag Accents
  const getThemeStyles = () => {
    switch (theme) {
      case 'navy':
        return {
          brandingBg: 'bg-linear-to-r from-[#06182c] via-[#0b2742] to-[#06182c]',
          brandingBorder: 'border-b-2 border-sky-400/40',
          titleColor: 'text-amber-300',
          subTitleColor: 'text-white',
          taglineBadge: 'bg-white/10 text-sky-200 border-sky-400/40',
          subTaglineColor: 'text-emerald-200/90 font-medium',
          trustBadge: 'bg-emerald-950/70 border border-amber-400/40 text-amber-200',
          trustBadgeTitle: 'text-white',
          trustBadgeSub: 'text-amber-300',
          trustIcon: 'text-amber-400',
          navBg: 'bg-[#040e1a] border-t border-sky-900/60 shadow-md',
          navText: 'text-slate-200 hover:text-amber-300 hover:bg-white/5',
          navActive: 'text-amber-300 font-extrabold bg-white/15 shadow-inner',
          activeIndicator: 'bg-amber-400',
          navIcon: 'text-amber-400',
          chevronColor: 'text-sky-300/70',
          ctaGradient: 'from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400',
          mobileBtnBg: 'bg-amber-400 text-slate-950 border border-amber-300 hover:bg-amber-300',
          drawerBg: 'bg-[#040e1a] text-white',
          drawerActive: 'bg-sky-600 text-white',
          drawerInactive: 'text-emerald-100 hover:bg-white/10',
          drawerGroupBg: 'bg-slate-900/80 border border-sky-800/60',
          drawerGroupTitle: 'text-amber-300',
          drawerGroupBadge: 'bg-amber-400 text-slate-950'
        };
      case 'forest':
        return {
          brandingBg: 'bg-linear-to-r from-[#012018] via-[#023b28] to-[#012018]',
          brandingBorder: 'border-b-2 border-amber-400/40',
          titleColor: 'text-amber-300',
          subTitleColor: 'text-white',
          taglineBadge: 'bg-emerald-950/80 text-amber-200 border-amber-400/40',
          subTaglineColor: 'text-emerald-200/90 font-medium',
          trustBadge: 'bg-emerald-950/70 border border-amber-400/40 text-amber-200',
          trustBadgeTitle: 'text-white',
          trustBadgeSub: 'text-amber-300',
          trustIcon: 'text-amber-400',
          navBg: 'bg-[#01140e] border-t border-emerald-900/60 shadow-md',
          navText: 'text-emerald-100/90 hover:text-amber-300 hover:bg-white/5',
          navActive: 'text-amber-300 font-extrabold bg-white/15 shadow-inner',
          activeIndicator: 'bg-amber-400',
          navIcon: 'text-amber-400',
          chevronColor: 'text-emerald-300/70',
          ctaGradient: 'from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400',
          mobileBtnBg: 'bg-amber-400 text-slate-950 border border-amber-300 hover:bg-amber-300',
          drawerBg: 'bg-[#01140e] text-white',
          drawerActive: 'bg-emerald-600 text-white',
          drawerInactive: 'text-emerald-100 hover:bg-white/10',
          drawerGroupBg: 'bg-emerald-950/70 border border-emerald-800/60',
          drawerGroupTitle: 'text-amber-300',
          drawerGroupBadge: 'bg-amber-400 text-slate-950'
        };
      case 'maroon':
        return {
          brandingBg: 'bg-linear-to-r from-[#290505] via-[#4c0519] to-[#290505]',
          brandingBorder: 'border-b-2 border-amber-400/40',
          titleColor: 'text-amber-300',
          subTitleColor: 'text-white',
          taglineBadge: 'bg-white/10 text-rose-200 border-amber-400/40',
          subTaglineColor: 'text-rose-200/90 font-medium',
          trustBadge: 'bg-rose-950/70 border border-amber-400/40 text-amber-200',
          trustBadgeTitle: 'text-white',
          trustBadgeSub: 'text-amber-300',
          trustIcon: 'text-amber-400',
          navBg: 'bg-[#1a0307] border-t border-rose-900/60 shadow-md',
          navText: 'text-rose-100/90 hover:text-amber-300 hover:bg-white/5',
          navActive: 'text-amber-300 font-extrabold bg-white/15 shadow-inner',
          activeIndicator: 'bg-amber-400',
          navIcon: 'text-amber-400',
          chevronColor: 'text-rose-300/70',
          ctaGradient: 'from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400',
          mobileBtnBg: 'bg-amber-400 text-slate-950 border border-amber-300 hover:bg-amber-300',
          drawerBg: 'bg-[#1a0307] text-white',
          drawerActive: 'bg-rose-700 text-white',
          drawerInactive: 'text-rose-100 hover:bg-white/10',
          drawerGroupBg: 'bg-rose-950/70 border border-rose-800/60',
          drawerGroupTitle: 'text-amber-300',
          drawerGroupBadge: 'bg-amber-400 text-slate-950'
        };
      case 'custom':
        return {
          brandingBg: 'border-b border-emerald-400/40 text-white backdrop-blur-md',
          brandingStyle: { backgroundColor: customColor },
          brandingBorder: 'border-b border-emerald-400/40',
          titleColor: 'text-amber-300',
          subTitleColor: 'text-white',
          taglineBadge: 'bg-white/10 text-white border-white/30',
          subTaglineColor: 'text-slate-200 font-medium',
          trustBadge: 'bg-slate-950/60 border border-white/20 text-white',
          trustBadgeTitle: 'text-white',
          trustBadgeSub: 'text-amber-300',
          trustIcon: 'text-amber-400',
          navBg: 'bg-slate-950/90 backdrop-blur-md border-t border-white/20 shadow-md',
          navText: 'text-slate-200 hover:text-amber-300 hover:bg-white/5',
          navActive: 'text-amber-300 font-extrabold bg-white/15 shadow-inner',
          activeIndicator: 'bg-amber-400',
          navIcon: 'text-amber-400',
          chevronColor: 'text-slate-300/70',
          ctaGradient: 'from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400',
          mobileBtnBg: 'bg-amber-400 text-slate-950 border border-amber-300 hover:bg-amber-300',
          drawerBg: 'bg-slate-950 text-white',
          drawerActive: 'bg-emerald-600 text-white',
          drawerInactive: 'text-slate-200 hover:bg-white/10',
          drawerGroupBg: 'bg-slate-900 border border-slate-800',
          drawerGroupTitle: 'text-amber-300',
          drawerGroupBadge: 'bg-amber-400 text-slate-950'
        };
      case 'emerald':
      default:
        // Hijau Muda Transparan (Translucent Light Green with Glassmorphism)
        return {
          brandingBg: 'bg-linear-to-r from-emerald-100/75 via-emerald-50/70 to-teal-50/75 backdrop-blur-md',
          brandingBorder: 'border-b border-emerald-300/40 shadow-xs',
          titleColor: 'text-emerald-950 font-black',
          subTitleColor: 'text-emerald-900 font-extrabold',
          taglineBadge: 'bg-emerald-600/15 text-emerald-900 border-emerald-400/50 font-bold',
          subTaglineColor: 'text-emerald-800/80 font-semibold',
          trustBadge: 'bg-white/80 border border-emerald-300/60 text-slate-800 shadow-xs backdrop-blur-md',
          trustBadgeTitle: 'text-emerald-950 font-black',
          trustBadgeSub: 'text-emerald-700 font-bold',
          trustIcon: 'text-emerald-700',
          navBg: 'bg-emerald-50/75 backdrop-blur-md border-t border-emerald-200/60 shadow-xs',
          navText: 'text-emerald-950/85 hover:text-emerald-900 hover:bg-emerald-200/50 font-bold',
          navActive: 'text-emerald-950 font-black bg-emerald-200/80 shadow-xs ring-1 ring-emerald-400/40',
          activeIndicator: 'bg-emerald-700',
          navIcon: 'text-emerald-800',
          chevronColor: 'text-emerald-700/80',
          ctaGradient: 'from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400',
          mobileBtnBg: 'bg-emerald-700 text-white border border-emerald-600 hover:bg-emerald-800',
          drawerBg: 'bg-emerald-50/95 backdrop-blur-xl border-t border-emerald-300/60 text-slate-900',
          drawerActive: 'bg-emerald-700 text-white font-bold',
          drawerInactive: 'text-emerald-950 hover:bg-emerald-200/60 font-semibold',
          drawerGroupBg: 'bg-white/80 border border-emerald-300/50 shadow-xs',
          drawerGroupTitle: 'text-emerald-900 font-black',
          drawerGroupBadge: 'bg-emerald-700 text-white'
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
    <header className="sticky top-0 z-50 transition-all backdrop-blur-md shadow-xs">
      
      {/* MAIN BRANDING BAR: Translucent Light Green or Selected Theme */}
      <div 
        className={`${themeStyle.brandingBg} ${themeStyle.brandingBorder} relative overflow-hidden`}
        style={themeStyle.brandingStyle}
      >
        {/* Subtle decorative golden-emerald ambient shimmer */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-radial from-amber-400/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute left-1/3 -bottom-10 w-96 h-24 rounded-full bg-radial from-emerald-400/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between gap-4 py-3 sm:py-3.5">
            
            {/* Left Brand Lockup: Emblem + Kemenag Gold & Typography */}
            <button
              onClick={() => handleTabClick('beranda')}
              className="flex items-center gap-3.5 text-left focus:outline-hidden group shrink-0"
              title="Kembali ke Beranda Portal Kemenag Murung Raya"
            >
              {/* Emblem with crisp gold-trimmed container */}
              <div className="relative p-1 rounded-2xl bg-white shadow-md border-2 border-amber-400/50 group-hover:border-amber-300 transition-all group-hover:shadow-lg">
                <OfficialEmblem 
                  size={54} 
                  logoType={portalConfig?.logoType || 'kemenag-ri'}
                  customLogoUrl={portalConfig?.customLogoUrl}
                  className="transition-transform duration-300 group-hover:scale-105 shrink-0 drop-shadow-xs" 
                />
              </div>

              {/* Institutional Text Lockup */}
              <div className="flex flex-col">
                <span className={`text-sm sm:text-base font-black tracking-wider uppercase leading-tight font-sans ${themeStyle.titleColor} drop-shadow-xs`}>
                  {portalConfig?.namaInstansi || 'KEMENTERIAN AGAMA'}
                </span>
                <span className={`text-xs sm:text-[13px] font-black ${themeStyle.subTitleColor} tracking-wider uppercase leading-tight mt-0.5 drop-shadow-2xs`}>
                  {portalConfig?.subInstansi || 'KABUPATEN MURUNG RAYA'}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold ${themeStyle.taglineBadge} px-2.5 py-0.5 rounded-md border shadow-2xs`}>
                    {portalConfig?.tagline || 'Ikhlas Beramal'}
                  </span>
                  <span className={`text-[10px] ${themeStyle.subTaglineColor} hidden sm:inline`}>
                    · Tira Tangka Balang
                  </span>
                </div>
              </div>
            </button>

            {/* Center Trust Accent (Desktop): Zona Integritas Seal */}
            <div className={`hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full ${themeStyle.trustBadge} text-xs shadow-xs backdrop-blur-md`}>
              <ShieldCheck className={`w-4 h-4 ${themeStyle.trustIcon} shrink-0`} />
              <div className="flex flex-col text-left">
                <span className={`font-extrabold text-[11px] leading-none ${themeStyle.trustBadgeTitle}`}>Zona Integritas</span>
                <span className={`text-[9px] ${themeStyle.trustBadgeSub} font-medium leading-tight`}>WBK & WBBM Terpercaya</span>
              </div>
            </div>

            {/* Right Brand: Kemenag Droplet + BerAKHLAK Official Identity */}
            <div className="flex items-center gap-3 shrink-0">
              
              <div className="flex items-center gap-3 bg-white/95 border border-emerald-300/40 shadow-xs rounded-2xl px-3 py-1.5 backdrop-blur-xs">
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
                  className={`p-2.5 rounded-xl ${themeStyle.mobileBtnBg} transition-colors shadow-xs`}
                  aria-label="Buka navigasi menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR (DESKTOP): Characteristic Translucent Green Ribbon */}
      <div className={`hidden lg:block ${themeStyle.navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 py-2">
            
            <nav className="flex items-center gap-1 xl:gap-2 text-[13px] font-semibold">
              
              {/* Tab: Beranda */}
              <button
                onClick={() => handleTabClick('beranda')}
                className={`px-3 py-1.5 rounded-lg transition-all relative ${
                  currentTab === 'beranda' 
                    ? themeStyle.navActive 
                    : themeStyle.navText
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    currentTab === 'data-informasi' 
                      ? themeStyle.navActive 
                      : themeStyle.navText
                  }`}
                >
                  <Layers className={`w-3.5 h-3.5 ${themeStyle.navIcon}`} />
                  <span>Layanan Per Seksi</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${seksiDropdownOpen ? 'rotate-180 text-amber-500' : themeStyle.chevronColor}`} />
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
                            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-amber-400 text-slate-950">
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    currentTab === 'profil' 
                      ? themeStyle.navActive 
                      : themeStyle.navText
                  }`}
                >
                  <span>Profil Kemenag</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profilDropdownOpen ? 'rotate-180 text-amber-500' : themeStyle.chevronColor}`} />
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
                className={`px-3 py-1.5 rounded-lg transition-all relative ${
                  currentTab === 'berita' 
                    ? themeStyle.navActive 
                    : themeStyle.navText
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
                className={`px-3 py-1.5 rounded-lg transition-all relative ${
                  currentTab === 'pengumuman' 
                    ? themeStyle.navActive 
                    : themeStyle.navText
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
                className={`px-3 py-1.5 rounded-lg transition-all relative ${
                  currentTab === 'data-informasi' 
                    ? themeStyle.navActive 
                    : themeStyle.navText
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
                className={`px-3 py-1.5 rounded-lg transition-all relative ${
                  currentTab === 'galeri' 
                    ? themeStyle.navActive 
                    : themeStyle.navText
                }`}
              >
                Galeri Kegiatan
                {currentTab === 'galeri' && (
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 ${themeStyle.activeIndicator} rounded-full`} />
                )}
              </button>
            </nav>

            {/* CTA Button: Akses Layanan PTSP (Radiant Golden Gradient with Live Status) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleTabClick('ptsp')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-black rounded-xl transition-all duration-200 shadow-md ${
                  currentTab === 'ptsp'
                    ? 'bg-amber-300 text-slate-950 ring-2 ring-white shadow-amber-950/50'
                    : `bg-linear-to-r ${themeStyle.ctaGradient} text-slate-950 shadow-amber-950/40 border border-amber-300/80 hover:scale-[1.02]`
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-slate-950" />
                <span className="tracking-wide text-slate-950 font-black">Layanan PTSP</span>
                <span className="flex items-center gap-1 text-[9px] bg-slate-950/15 px-2 py-0.5 rounded-full text-slate-950 font-black border border-slate-950/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>ONLINE</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER MENU: Dynamic Theme Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden ${themeStyle.drawerBg} px-4 pt-3 pb-8 shadow-2xl animate-fadeIn`}>
          
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleTabClick('beranda')}
              className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                currentTab === 'beranda' ? themeStyle.drawerActive : themeStyle.drawerInactive
              }`}
            >
              Beranda
            </button>

            {/* Mobile Layanan Per Seksi Group */}
            <div className={`py-2 ${themeStyle.drawerGroupBg} rounded-2xl p-2.5 my-1`}>
              <div className={`px-2 pb-1.5 text-[11px] font-black uppercase tracking-wider ${themeStyle.drawerGroupTitle} flex items-center justify-between`}>
                <span>Layanan Per Seksi (Kemenag Mura)</span>
                <span className={`text-[10px] ${themeStyle.drawerGroupBadge} px-1.5 py-0.2 rounded font-black`}>6 Bidang</span>
              </div>
              <div className="space-y-1 mt-1">
                <button
                  onClick={() => handleSeksiClick('pendidikan-islam')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-800 hover:bg-emerald-100/90 flex items-center justify-between bg-white shadow-2xs"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>Pendidikan Islam (Pendis)</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-amber-300 px-1.5 py-0.5 rounded">SI PENDIS</span>
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-islam')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-800 hover:bg-blue-100/90 flex items-center gap-2 bg-white shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Bimas Islam & KUA
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-kristen')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-800 hover:bg-purple-100/90 flex items-center gap-2 bg-white shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  Bimas Kristen
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-hindu')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-800 hover:bg-amber-100/90 flex items-center gap-2 bg-white shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Bimas Hindu
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-budha')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-800 hover:bg-cyan-100/90 flex items-center gap-2 bg-white shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  Bimas Budha
                </button>
                <button
                  onClick={() => handleSeksiClick('kepegawaian')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-slate-800 hover:bg-emerald-100/90 flex items-center gap-2 bg-white shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                  Kepegawaian & Tata Usaha
                </button>
              </div>
            </div>

            {/* Mobile Profil Group */}
            <div className={`py-2 ${themeStyle.drawerGroupBg} rounded-2xl p-2.5 my-1`}>
              <div className={`px-2 pb-1.5 text-[11px] font-black uppercase tracking-wider ${themeStyle.drawerGroupTitle}`}>
                Profil Kantor Kementerian Agama
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => handleProfilSubClick('visi-misi')}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium rounded-md hover:bg-black/5"
                >
                  · Visi, Misi & Budaya Kerja
                </button>
                <button
                  onClick={() => handleProfilSubClick('struktur')}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium rounded-md hover:bg-black/5"
                >
                  · Struktur Organisasi & Tugas
                </button>
                <button
                  onClick={() => handleProfilSubClick('pejabat')}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium rounded-md hover:bg-black/5"
                >
                  · Daftar Pejabat Eselon
                </button>
              </div>
            </div>

            <button
              onClick={() => handleTabClick('berita')}
              className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                currentTab === 'berita' ? themeStyle.drawerActive : themeStyle.drawerInactive
              }`}
            >
              Berita Terkini
            </button>

            <button
              onClick={() => handleTabClick('pengumuman')}
              className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                currentTab === 'pengumuman' ? themeStyle.drawerActive : themeStyle.drawerInactive
              }`}
            >
              Pengumuman Resmi
            </button>

            <button
              onClick={() => handleTabClick('data-informasi')}
              className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                currentTab === 'data-informasi' ? themeStyle.drawerActive : themeStyle.drawerInactive
              }`}
            >
              Data dan Informasi (Perbidang)
            </button>

            <button
              onClick={() => handleTabClick('galeri')}
              className={`text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                currentTab === 'galeri' ? themeStyle.drawerActive : themeStyle.drawerInactive
              }`}
            >
              Galeri Kegiatan
            </button>

            {/* Mobile PTSP Button */}
            <div className="pt-3">
              <button
                onClick={() => handleTabClick('ptsp')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-black text-slate-950 bg-linear-to-r from-amber-400 via-amber-500 to-yellow-500 rounded-xl shadow-lg border border-amber-300/80"
              >
                <FileText className="w-4 h-4 text-slate-950" />
                <span>Akses Layanan PTSP Online</span>
                <span className="text-[10px] bg-slate-950/20 px-2 py-0.5 rounded-full text-slate-950 font-black">
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
