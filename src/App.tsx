/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  NavigationTab, 
  ProfilSubTab, 
  Berita, 
  Pengumuman, 
  Pegawai, 
  LembagaPendis, 
  RumahIbadahIslam, 
  KuaKecamatan, 
  TempatIbadahKristen, 
  TempatIbadahHindu 
} from './types';

import { 
  INITIAL_PEJABAT, 
  INITIAL_PEGAWAI, 
  INITIAL_LEMBAGA_PENDIS, 
  INITIAL_RUMAH_IBADAH_ISLAM, 
  INITIAL_KUA, 
  INITIAL_GEREJA_KRISTEN, 
  INITIAL_BALAI_HINDU, 
  INITIAL_BERITA, 
  INITIAL_PENGUMUMAN, 
  INITIAL_GALERI 
} from './data/mockData';

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

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('beranda');
  const [currentProfilSubTab, setCurrentProfilSubTab] = useState<ProfilSubTab>('visi-misi');
  const [isPtspModalOpen, setIsPtspModalOpen] = useState(false);

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

  // News and circular lists
  const [beritaList] = useState<Berita[]>(INITIAL_BERITA);
  const [pengumumanList] = useState<Pengumuman[]>(INITIAL_PENGUMUMAN);
  const [pejabatList] = useState(INITIAL_PEJABAT);
  const [galeriList] = useState(INITIAL_GALERI);

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProfilSubTab = (subTab: ProfilSubTab) => {
    setCurrentProfilSubTab(subTab);
    setCurrentTab('profil');
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* 3-Zone Official Navigation Top Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        currentProfilSubTab={currentProfilSubTab}
        onSelectProfilSubTab={handleSelectProfilSubTab}
        onOpenPtspModal={() => setIsPtspModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentTab === 'beranda' && (
          <BerandaSection
            beritaList={beritaList}
            pengumumanList={pengumumanList}
            onSelectTab={handleSelectTab}
            onSelectProfilSubTab={handleSelectProfilSubTab}
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
      />

      {/* Online PTSP Service Dialog */}
      <PtspModal
        isOpen={isPtspModalOpen}
        onClose={() => setIsPtspModalOpen(false)}
        onOpenFullPortalView={() => handleSelectTab('ptsp')}
      />

    </div>
  );
}
