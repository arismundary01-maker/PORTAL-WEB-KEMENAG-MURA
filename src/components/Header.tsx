import React, { useState } from 'react';
import { NavigationTab, ProfilSubTab, DataSectorTab } from '../types';
import { OfficialEmblem } from './OfficialEmblem';
import { 
  ChevronDown, 
  Menu, 
  X, 
  FileText, 
  PhoneCall, 
  GraduationCap, 
  Building2, 
  Users, 
  Layers
} from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentProfilSubTab: ProfilSubTab;
  onSelectProfilSubTab: (subTab: ProfilSubTab) => void;
  onSelectSector?: (sector: DataSectorTab) => void;
  onOpenPtspModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onSelectProfilSubTab,
  onSelectSector,
  onOpenPtspModal
}) => {
  const [profilDropdownOpen, setProfilDropdownOpen] = useState(false);
  const [seksiDropdownOpen, setSeksiDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top micro-bar for institutional trust & contact (NO ADMIN LOGIN BUTTON AS REQUESTED) */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-900 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs tracking-normal">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-emerald-300">Portal Resmi</span>
            <span className="text-emerald-700">|</span>
            <span>Kantor Wilayah Kementerian Agama Prov. Kalimantan Tengah</span>
            <span className="text-emerald-700">|</span>
            <span className="italic">"Tira Tangka Balang - Ikhlas Beramal"</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              (0528) 31445
            </span>
            <span className="text-emerald-700">|</span>
            <span>Puruk Cahu, Kab. Murung Raya</span>
          </div>
        </div>
      </div>

      {/* Main Branding Bar (Replicating Official Banner Header) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3 sm:py-3.5 border-b border-slate-100">
          
          {/* Left Brand: Emblem + KEMENTERIAN AGAMA KABUPATEN MURUNG RAYA */}
          <button
            onClick={() => handleTabClick('beranda')}
            className="flex items-center gap-3 text-left focus:outline-hidden group shrink-0"
          >
            <OfficialEmblem size={52} className="transition-transform group-hover:scale-105 shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold text-[#0f5132] tracking-wide uppercase leading-tight font-sans">
                KEMENTERIAN AGAMA
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wider uppercase leading-tight">
                KABUPATEN MURUNG RAYA
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Provinsi Kalimantan Tengah · Ikhlas Beramal
              </span>
            </div>
          </button>

          {/* Right Brand: Kemenag Droplet + BerAKHLAK Logo lockup as in banner */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Kemenag Droplet Badge */}
            <div className="flex items-center gap-1.5" title="Kementerian Agama RI">
              <svg viewBox="0 0 48 58" className="w-8 h-10 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Teardrop droplet */}
                <path 
                  d="M24 2C24 2 44 26 44 38C44 49.0457 35.0457 58 24 58C12.9543 58 4 49.0457 4 38C4 26 24 2 24 2Z" 
                  fill="url(#dropletGradient)"
                />
                {/* Inner white droplet */}
                <path 
                  d="M24 16C24 16 35 29 35 37C35 43.0751 30.0751 48 24 48C17.9249 48 13 43.0751 13 37C13 29 24 16 24 16Z" 
                  fill="#ffffff"
                />
                <defs>
                  <linearGradient id="dropletGradient" x1="4" y1="2" x2="44" y2="58" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#eab308" />
                    <stop offset="40%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* BerAKHLAK Typography Lockup */}
            <div className="flex flex-col border-l border-slate-200 pl-3">
              <span className="text-sm sm:text-base font-black text-rose-700 tracking-tight leading-none">
                BerAKHLAK
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-rose-700 font-black text-xs leading-none">#</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700 leading-tight">
                  bangga melayani bangsa
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden ml-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Buka navigasi menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Navigation Bar (Desktop Menus) */}
        <div className="hidden lg:flex items-center justify-between gap-6 py-2.5">
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
            {/* Beranda */}
            <button
              onClick={() => handleTabClick('beranda')}
              className={`whitespace-nowrap py-1 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'beranda' ? 'text-emerald-700 font-bold' : ''
              }`}
            >
              Beranda
              {currentTab === 'beranda' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            {/* Layanan Per Seksi (From Banner) */}
            <div 
              className="relative"
              onMouseEnter={() => setSeksiDropdownOpen(true)}
              onMouseLeave={() => setSeksiDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 whitespace-nowrap py-1 transition-colors hover:text-emerald-700 ${
                  currentTab === 'data-informasi' ? 'text-emerald-700 font-bold' : ''
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Layanan Per Seksi</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${seksiDropdownOpen ? 'rotate-180 text-emerald-700' : ''}`} />
              </button>

              {/* Seksi Dropdown Menu */}
              {seksiDropdownOpen && (
                <div className="absolute left-0 top-full w-64 pt-2 z-50">
                  <div className="bg-white border border-slate-200 rounded-xl shadow-xl py-2 overflow-hidden">
                    <button
                      onClick={() => handleSeksiClick('pendidikan-islam')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <span>Pendidikan Islam</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                            Online
                          </span>
                        </div>
                        <div className="text-[10px] text-emerald-700 font-medium">SI PENDIS (sipendismura.my.id)</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSeksiClick('bimas-islam')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0">
                        <Building2 className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">Bimas Islam</div>
                        <div className="text-[10px] text-slate-500">Masjid, Mushalla & 10 KUA</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSeksiClick('bimas-kristen')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                        †
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">Bimas Kristen</div>
                        <div className="text-[10px] text-slate-500">Gereja & Data Umat Kristen</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSeksiClick('bimas-hindu')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] shrink-0 font-bold">
                        ॐ
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">Bimas Hindu</div>
                        <div className="text-[10px] text-slate-500">Balai Basarah & Umat Kaharingan</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSeksiClick('bimas-budha')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[11px] shrink-0 font-bold">
                        ☸
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">Bimas Budha</div>
                        <div className="text-[10px] text-slate-500">Vihara, Cetiya & Umat Budha</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSeksiClick('kepegawaian')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] shrink-0">
                        <Users className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">Kepegawaian & Tata Usaha</div>
                        <div className="text-[10px] text-slate-500">Data Pegawai ASN & Non-ASN</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profil with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProfilDropdownOpen(true)}
              onMouseLeave={() => setProfilDropdownOpen(false)}
            >
              <button
                onClick={() => handleTabClick('profil')}
                className={`flex items-center gap-1 whitespace-nowrap py-1 transition-colors hover:text-emerald-700 ${
                  currentTab === 'profil' ? 'text-emerald-700 font-bold' : ''
                }`}
              >
                <span>Profil Kemenag</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profilDropdownOpen ? 'rotate-180 text-emerald-700' : ''}`} />
                {currentTab === 'profil' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                )}
              </button>

              {/* Sub-menu Dropdown */}
              {profilDropdownOpen && (
                <div className="absolute left-0 top-full w-56 pt-2 z-50">
                  <div className="bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 overflow-hidden">
                    <button
                      onClick={() => handleProfilSubClick('visi-misi')}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                    >
                      <span className="font-semibold">Visi dan Misi</span>
                      <span className="text-[10px] text-emerald-600">Motto & Nilai</span>
                    </button>
                    <button
                      onClick={() => handleProfilSubClick('struktur')}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                    >
                      <span className="font-semibold">Struktur Organisasi</span>
                      <span className="text-[10px] text-emerald-600">Bagan Tugas</span>
                    </button>
                    <button
                      onClick={() => handleProfilSubClick('pejabat')}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                    >
                      <span className="font-semibold">Daftar Pejabat Eselon</span>
                      <span className="text-[10px] text-emerald-600">Pimpinan & Kasi</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Berita Terkini */}
            <button
              onClick={() => handleTabClick('berita')}
              className={`whitespace-nowrap py-1 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'berita' ? 'text-emerald-700 font-bold' : ''
              }`}
            >
              Berita Terkini
              {currentTab === 'berita' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            {/* Pengumuman Resmi */}
            <button
              onClick={() => handleTabClick('pengumuman')}
              className={`whitespace-nowrap py-1 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'pengumuman' ? 'text-emerald-700 font-bold' : ''
              }`}
            >
              Pengumuman Resmi
              {currentTab === 'pengumuman' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            {/* Data dan Informasi */}
            <button
              onClick={() => handleTabClick('data-informasi')}
              className={`whitespace-nowrap py-1 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'data-informasi' ? 'text-emerald-700 font-bold' : ''
              }`}
            >
              Data & Informasi
              {currentTab === 'data-informasi' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            {/* Galeri Kegiatan */}
            <button
              onClick={() => handleTabClick('galeri')}
              className={`whitespace-nowrap py-1 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'galeri' ? 'text-emerald-700 font-bold' : ''
              }`}
            >
              Galeri Kegiatan
              {currentTab === 'galeri' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>
          </nav>

          {/* Action CTA: Akses Layanan PTSP (Direct) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabClick('ptsp')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all shadow-xs ${
                currentTab === 'ptsp'
                  ? 'bg-emerald-900 text-white ring-2 ring-emerald-500'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Akses Layanan PTSP</span>
              <span className="text-[10px] bg-emerald-950/60 px-1.5 py-0.5 rounded text-emerald-200">Online</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleTabClick('beranda')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentTab === 'beranda' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Beranda
            </button>

            {/* Layanan Per Seksi for Mobile */}
            <div className="py-1">
              <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Layanan Per Seksi (Kemenag Mura)
              </div>
              <div className="pl-3 space-y-1">
                <button
                  onClick={() => handleSeksiClick('pendidikan-islam')}
                  className="w-full text-left px-3 py-1.5 text-xs rounded-md text-slate-700 hover:bg-emerald-50 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Pendidikan Islam
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-islam')}
                  className="w-full text-left px-3 py-1.5 text-xs rounded-md text-slate-700 hover:bg-emerald-50 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Bimas Islam
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-kristen')}
                  className="w-full text-left px-3 py-1.5 text-xs rounded-md text-slate-700 hover:bg-emerald-50 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  Bimas Kristen
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-hindu')}
                  className="w-full text-left px-3 py-1.5 text-xs rounded-md text-slate-700 hover:bg-emerald-50 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Bimas Hindu
                </button>
                <button
                  onClick={() => handleSeksiClick('bimas-budha')}
                  className="w-full text-left px-3 py-1.5 text-xs rounded-md text-slate-700 hover:bg-emerald-50 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  Bimas Budha
                </button>
                <button
                  onClick={() => handleSeksiClick('kepegawaian')}
                  className="w-full text-left px-3 py-1.5 text-xs rounded-md text-slate-700 hover:bg-emerald-50 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                  Kepegawaian & Tata Usaha
                </button>
              </div>
            </div>

            {/* Profil Sub-items Accordion */}
            <div className="py-1">
              <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Profil Kemenag Murung Raya
              </div>
              <div className="pl-3 space-y-1">
                <button
                  onClick={() => handleProfilSubClick('visi-misi')}
                  className="w-full text-left px-3 py-1.5 text-sm rounded-md text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  · Visi dan Misi
                </button>
                <button
                  onClick={() => handleProfilSubClick('struktur')}
                  className="w-full text-left px-3 py-1.5 text-sm rounded-md text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  · Struktur Organisasi
                </button>
                <button
                  onClick={() => handleProfilSubClick('pejabat')}
                  className="w-full text-left px-3 py-1.5 text-sm rounded-md text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  · Daftar Pejabat Eselon
                </button>
              </div>
            </div>

            <button
              onClick={() => handleTabClick('berita')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentTab === 'berita' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Berita Terkini
            </button>

            <button
              onClick={() => handleTabClick('pengumuman')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentTab === 'pengumuman' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Pengumuman Resmi
            </button>

            <button
              onClick={() => handleTabClick('data-informasi')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentTab === 'data-informasi' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Data dan Informasi (Perbidang)
            </button>

            <button
              onClick={() => handleTabClick('galeri')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentTab === 'galeri' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Galeri Kegiatan
            </button>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => handleTabClick('ptsp')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>Akses Layanan PTSP Online</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
