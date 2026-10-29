import React, { useState } from 'react';
import { NavigationTab, ProfilSubTab } from '../types';
import { OfficialEmblem } from './OfficialEmblem';
import { ChevronDown, Menu, X, FileText, PhoneCall } from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentProfilSubTab: ProfilSubTab;
  onSelectProfilSubTab: (subTab: ProfilSubTab) => void;
  onOpenPtspModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onSelectProfilSubTab,
  onOpenPtspModal
}) => {
  const [profilDropdownOpen, setProfilDropdownOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-bar for institutional trust & contact */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-900 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs tracking-normal">
          <div className="flex items-center gap-3">
            <span className="font-medium text-emerald-300">Portal Resmi</span>
            <span className="text-emerald-700">|</span>
            <span>Kantor Wilayah Kemenag Prov. Kalimantan Tengah</span>
            <span className="text-emerald-700">|</span>
            <span className="italic">"Tira Tangka Balang - Ikhlas Beramal"</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              (0528) 31445
            </span>
            <span className="text-emerald-700">|</span>
            <span>Puruk Cahu, Kalimantan Tengah</span>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleTabClick('beranda')}
            className="flex items-center gap-3.5 text-left focus:outline-hidden group shrink-0"
          >
            <OfficialEmblem size={46} className="transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-800">
                Kementerian Agama RI
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                Kabupaten Murung Raya
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:block">
                Ikhlas Beramal · Kalimantan Tengah
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            {/* Beranda */}
            <button
              onClick={() => handleTabClick('beranda')}
              className={`whitespace-nowrap shrink-0 py-2 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'beranda' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Beranda
              {currentTab === 'beranda' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            {/* Profil with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProfilDropdownOpen(true)}
              onMouseLeave={() => setProfilDropdownOpen(false)}
            >
              <button
                onClick={() => handleTabClick('profil')}
                className={`flex items-center gap-1 whitespace-nowrap shrink-0 py-2 transition-colors hover:text-emerald-700 ${
                  currentTab === 'profil' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                <span>Profil</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profilDropdownOpen ? 'rotate-180 text-emerald-700' : ''}`} />
                {currentTab === 'profil' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                )}
              </button>

              {/* Sub-menu Dropdown */}
              {profilDropdownOpen && (
                <div className="absolute left-0 top-full w-56 pt-2 z-50">
                  <div className="bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 overflow-hidden">
                    <button
                      onClick={() => handleProfilSubClick('visi-misi')}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                    >
                      <span>Visi dan Misi</span>
                      <span className="text-[10px] text-emerald-600">Motto & Nilai</span>
                    </button>
                    <button
                      onClick={() => handleProfilSubClick('struktur')}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                    >
                      <span>Struktur Organisasi</span>
                      <span className="text-[10px] text-emerald-600">Bagan Tugas</span>
                    </button>
                    <button
                      onClick={() => handleProfilSubClick('pejabat')}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                    >
                      <span>Daftar Pejabat Eselon</span>
                      <span className="text-[10px] text-emerald-600">Pimpinan & Kasi</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Berita Terkini */}
            <button
              onClick={() => handleTabClick('berita')}
              className={`whitespace-nowrap shrink-0 py-2 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'berita' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Berita Terkini
              {currentTab === 'berita' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            {/* Pengumuman */}
            <button
              onClick={() => handleTabClick('pengumuman')}
              className={`whitespace-nowrap shrink-0 py-2 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'pengumuman' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Pengumuman
              {currentTab === 'pengumuman' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            {/* Data dan Informasi */}
            <button
              onClick={() => handleTabClick('data-informasi')}
              className={`whitespace-nowrap shrink-0 py-2 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'data-informasi' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Data & Informasi
              {currentTab === 'data-informasi' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            {/* Galeri Kegiatan */}
            <button
              onClick={() => handleTabClick('galeri')}
              className={`whitespace-nowrap shrink-0 py-2 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'galeri' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Galeri Kegiatan
              {currentTab === 'galeri' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            {/* Layanan PTSP Online */}
            <button
              onClick={() => handleTabClick('ptsp')}
              className={`whitespace-nowrap shrink-0 py-2 transition-colors relative hover:text-emerald-700 ${
                currentTab === 'ptsp' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Layanan PTSP
              {currentTab === 'ptsp' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleTabClick('ptsp')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs whitespace-nowrap shrink-0 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Akses Layanan PTSP</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-md animate-fadeIn">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleTabClick('beranda')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentTab === 'beranda' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Beranda
            </button>

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
                currentTab === 'berita' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Berita Terkini
            </button>

            <button
              onClick={() => handleTabClick('pengumuman')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentTab === 'pengumuman' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Pengumuman Resmi
            </button>

            <button
              onClick={() => handleTabClick('data-informasi')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentTab === 'data-informasi' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Data dan Informasi (Perbidang)
            </button>

            <button
              onClick={() => handleTabClick('galeri')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentTab === 'galeri' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Galeri Kegiatan
            </button>

            <button
              onClick={() => handleTabClick('ptsp')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md flex items-center justify-between ${
                currentTab === 'ptsp' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Akses Layanan PTSP (Online)</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">Live</span>
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
