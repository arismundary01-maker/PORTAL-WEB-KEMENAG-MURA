/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  ProfilSubTab, 
  DataSectorTab,
  Berita, 
  Pengumuman, 
  Pegawai, 
  LembagaPendis, 
  RumahIbadahIslam, 
  KuaKecamatan, 
  TempatIbadahKristen, 
  TempatIbadahHindu,
  TempatIbadahBudha 
} from './types';

import { 
  AdminUser, 
  AuditLog, 
  PtspPermohonan 
} from './types/admin';

import { 
  INITIAL_PEJABAT, 
  INITIAL_PEGAWAI, 
  INITIAL_LEMBAGA_PENDIS, 
  INITIAL_RUMAH_IBADAH_ISLAM, 
  INITIAL_KUA, 
  INITIAL_GEREJA_KRISTEN, 
  INITIAL_BALAI_HINDU,
  INITIAL_VIHARA_BUDHA, 
  INITIAL_BERITA, 
  INITIAL_PENGUMUMAN, 
  INITIAL_GALERI 
} from './data/mockData';

import { 
  DEFAULT_ADMIN, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_PTSP_PERMOHONAN 
} from './data/adminMockData';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BerandaSection } from './components/BerandaSection';
import { ProfilSection } from './components/ProfilSection';
import { BeritaSection } from './components/BeritaSection';
import { PengumumanSection } from './components/PengumumanSection';
import { DataInformasiSection } from './components/DataInformasiSection';
import { GaleriSection } from './components/GaleriSection';
import { PtspModal } from './components/PtspModal';
import { PtspEmbeddedView } from './components/PtspEmbeddedView';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Shield, ArrowRight, LogOut, LayoutDashboard } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('beranda');
  const [currentProfilSubTab, setCurrentProfilSubTab] = useState<ProfilSubTab>('visi-misi');
  const [selectedSector, setSelectedSector] = useState<DataSectorTab>('kepegawaian');
  const [isPtspModalOpen, setIsPtspModalOpen] = useState(false);

  // Admin Management States
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(null);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [ptspRequests, setPtspRequests] = useState<PtspPermohonan[]>(INITIAL_PTSP_PERMOHONAN);

  // Modal inspection state for Berita & Pengumuman
  const [activeBeritaModal, setActiveBeritaModal] = useState<Berita | null>(null);
  const [activePengumumanModal, setActivePengumumanModal] = useState<Pengumuman | null>(null);

  // Sector Data States (with full interactivity, CRUD, import & export)
  const [pegawaiData, setPegawaiData] = useState<Pegawai[]>(INITIAL_PEGAWAI);
  const [lembagaPendisData, setLembagaPendisData] = useState<LembagaPendis[]>(INITIAL_LEMBAGA_PENDIS);
  const [rumahIbadahIslamData, setRumahIbadahIslamData] = useState<RumahIbadahIslam[]>(INITIAL_RUMAH_IBADAH_ISLAM);
  const [kuaData, setKuaData] = useState<KuaKecamatan[]>(INITIAL_KUA);
  const [tempatIbadahKristenData, setTempatIbadahKristenData] = useState<TempatIbadahKristen[]>(INITIAL_GEREJA_KRISTEN);
  const [tempatIbadahHinduData, setTempatIbadahHinduData] = useState<TempatIbadahHindu[]>(INITIAL_BALAI_HINDU);
  const [tempatIbadahBudhaData, setTempatIbadahBudhaData] = useState<TempatIbadahBudha[]>(INITIAL_VIHARA_BUDHA);

  // News, circular, and gallery lists with setters for Admin manipulation
  const [beritaList, setBeritaList] = useState<Berita[]>(INITIAL_BERITA);
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>(INITIAL_PENGUMUMAN);
  const [pejabatList] = useState(INITIAL_PEJABAT);
  const [galeriList, setGaleriList] = useState(INITIAL_GALERI);

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProfilSubTab = (subTab: ProfilSubTab) => {
    setCurrentProfilSubTab(subTab);
    setCurrentTab('profil');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSector = (sector: DataSectorTab) => {
    setSelectedSector(sector);
    setCurrentTab('data-informasi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadBerita = (berita: Berita) => {
    setActiveBeritaModal(berita);
    setCurrentTab('berita');
  };

  const handleViewPengumuman = (pengumuman: Pengumuman) => {
    setActivePengumumanModal(pengumuman);
    setCurrentTab('pengumuman');
  };

  // Admin access handlers
  const handleOpenAdminTrigger = () => {
    if (isAdminLoggedIn && currentAdminUser) {
      setViewMode('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  // Global Keyboard Shortcut Listener: Ctrl + Shift + A (Opens Admin Login Dialog)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const key = e.key ? e.key.toLowerCase() : '';
      const code = e.code;

      if (isCtrlOrMeta && isShift && (key === 'a' || code === 'KeyA')) {
        e.preventDefault();
        setIsAdminLoginModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLoginSuccess = (user: AdminUser) => {
    setIsAdminLoggedIn(true);
    setCurrentAdminUser(user);
    setViewMode('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentAdminUser(null);
    setViewMode('public');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Admin Management Mode
  if (viewMode === 'admin' && currentAdminUser) {
    return (
      <AdminDashboard
        currentUser={currentAdminUser}
        onLogout={handleLogout}
        onViewPublicSite={() => {
          setViewMode('public');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        beritaList={beritaList}
        setBeritaList={setBeritaList}
        pengumumanList={pengumumanList}
        setPengumumanList={setPengumumanList}
        galeriList={galeriList}
        setGaleriList={setGaleriList}
        pegawaiData={pegawaiData}
        setPegawaiData={setPegawaiData}
        lembagaPendisData={lembagaPendisData}
        setLembagaPendisData={setLembagaPendisData}
        rumahIbadahIslamData={rumahIbadahIslamData}
        setRumahIbadahIslamData={setRumahIbadahIslamData}
        kuaData={kuaData}
        setKuaData={setKuaData}
        tempatIbadahKristenData={tempatIbadahKristenData}
        setTempatIbadahKristenData={setTempatIbadahKristenData}
        tempatIbadahHinduData={tempatIbadahHinduData}
        setTempatIbadahHinduData={setTempatIbadahHinduData}
        tempatIbadahBudhaData={tempatIbadahBudhaData}
        setTempatIbadahBudhaData={setTempatIbadahBudhaData}
        auditLogs={auditLogs}
        setAuditLogs={setAuditLogs}
        ptspRequests={ptspRequests}
        setPtspRequests={setPtspRequests}
      />
    );
  }

  // Standard Public Portal View
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Banner when Admin is logged in in public mode */}
      {isAdminLoggedIn && currentAdminUser && (
        <div className="bg-amber-400 text-slate-900 px-4 py-2 text-xs border-b border-amber-500 shadow-xs z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-950 shrink-0" />
              <span>
                <strong>Sesi Pengelola Aktif:</strong> {currentAdminUser.nama}, {currentAdminUser.gelar} ({currentAdminUser.roleLabel})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setViewMode('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1 font-bold text-emerald-950 hover:underline"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Buka Panel Dashboard Admin</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <span>·</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-slate-800 hover:text-rose-900"
              >
                <LogOut className="w-3 h-3" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Navigation Top Bar (Admin login button removed from header, replaced with Ctrl keyboard shortcut) */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        currentProfilSubTab={currentProfilSubTab}
        onSelectProfilSubTab={handleSelectProfilSubTab}
        onSelectSector={handleSelectSector}
        onOpenPtspModal={() => setIsPtspModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentTab === 'beranda' && (
          <BerandaSection
            beritaList={beritaList}
            pengumumanList={pengumumanList}
            galeriList={galeriList}
            onSelectTab={handleSelectTab}
            onSelectProfilSubTab={handleSelectProfilSubTab}
            onSelectSector={handleSelectSector}
            onReadBerita={handleReadBerita}
            onViewPengumuman={handleViewPengumuman}
            onOpenPtspModal={() => setIsPtspModalOpen(true)}
          />
        )}

        {currentTab === 'profil' && (
          <ProfilSection
            currentSubTab={currentProfilSubTab}
            onSelectSubTab={setCurrentProfilSubTab}
            pejabatList={pejabatList}
          />
        )}

        {currentTab === 'berita' && (
          <BeritaSection
            beritaList={beritaList}
            activeBeritaModal={activeBeritaModal}
            onOpenBeritaModal={setActiveBeritaModal}
            onCloseBeritaModal={() => setActiveBeritaModal(null)}
          />
        )}

        {currentTab === 'pengumuman' && (
          <PengumumanSection
            pengumumanList={pengumumanList}
            activePengumumanModal={activePengumumanModal}
            onOpenPengumumanModal={setActivePengumumanModal}
            onClosePengumumanModal={() => setActivePengumumanModal(null)}
          />
        )}

        {currentTab === 'data-informasi' && (
          <DataInformasiSection
            pegawaiData={pegawaiData}
            setPegawaiData={setPegawaiData}
            lembagaPendisData={lembagaPendisData}
            setLembagaPendisData={setLembagaPendisData}
            rumahIbadahIslamData={rumahIbadahIslamData}
            setRumahIbadahIslamData={setRumahIbadahIslamData}
            kuaData={kuaData}
            setKuaData={setKuaData}
            tempatIbadahKristenData={tempatIbadahKristenData}
            setTempatIbadahKristenData={setTempatIbadahKristenData}
            tempatIbadahHinduData={tempatIbadahHinduData}
            setTempatIbadahHinduData={setTempatIbadahHinduData}
            tempatIbadahBudhaData={tempatIbadahBudhaData}
            setTempatIbadahBudhaData={setTempatIbadahBudhaData}
            initialSectorTab={selectedSector}
          />
        )}

        {currentTab === 'galeri' && (
          <GaleriSection galeriList={galeriList} />
        )}

        {currentTab === 'ptsp' && (
          <PtspEmbeddedView 
            onBackToHome={() => handleSelectTab('beranda')} 
          />
        )}
      </main>

      {/* Institutional Official Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onSelectProfilSubTab={handleSelectProfilSubTab}
        onOpenAdmin={handleOpenAdminTrigger}
      />

      {/* Online PTSP Service Dialog */}
      <PtspModal
        isOpen={isPtspModalOpen}
        onClose={() => setIsPtspModalOpen(false)}
        onOpenFullPortalView={() => handleSelectTab('ptsp')}
      />

      {/* Admin Login Dialog (Triggered via Ctrl + Shift + A or Ctrl + Alt + A) */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
