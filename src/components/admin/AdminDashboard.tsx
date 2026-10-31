import React, { useState } from 'react';
import { AdminUser, AdminTab, AuditLog, PtspPermohonan } from '../../types/admin';
import { 
  Berita, 
  Pengumuman, 
  GaleriKegiatan, 
  Pegawai, 
  LembagaPendis, 
  RumahIbadahIslam, 
  KuaKecamatan, 
  TempatIbadahKristen, 
  TempatIbadahHindu,
  TempatIbadahBudha 
} from '../../types';
import { OfficialEmblem } from '../OfficialEmblem';
import { 
  LayoutDashboard, 
  Newspaper, 
  FileText, 
  Image as ImageIcon, 
  Database, 
  Inbox, 
  Settings, 
  LogOut, 
  Eye, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Users, 
  Building2, 
  ShieldCheck, 
  Save, 
  ExternalLink,
  GraduationCap,
  Sparkles,
  RefreshCw,
  Lock
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: AdminUser;
  onLogout: () => void;
  onViewPublicSite: () => void;
  // Shared state references
  beritaList: Berita[];
  setBeritaList: React.Dispatch<React.SetStateAction<Berita[]>>;
  pengumumanList: Pengumuman[];
  setPengumumanList: React.Dispatch<React.SetStateAction<Pengumuman[]>>;
  galeriList: GaleriKegiatan[];
  setGaleriList: React.Dispatch<React.SetStateAction<GaleriKegiatan[]>>;
  pegawaiData: Pegawai[];
  setPegawaiData: React.Dispatch<React.SetStateAction<Pegawai[]>>;
  lembagaPendisData: LembagaPendis[];
  setLembagaPendisData: React.Dispatch<React.SetStateAction<LembagaPendis[]>>;
  rumahIbadahIslamData: RumahIbadahIslam[];
  setRumahIbadahIslamData: React.Dispatch<React.SetStateAction<RumahIbadahIslam[]>>;
  kuaData: KuaKecamatan[];
  setKuaData: React.Dispatch<React.SetStateAction<KuaKecamatan[]>>;
  tempatIbadahKristenData: TempatIbadahKristen[];
  setTempatIbadahKristenData: React.Dispatch<React.SetStateAction<TempatIbadahKristen[]>>;
  tempatIbadahHinduData: TempatIbadahHindu[];
  setTempatIbadahHinduData: React.Dispatch<React.SetStateAction<TempatIbadahHindu[]>>;
  tempatIbadahBudhaData?: TempatIbadahBudha[];
  setTempatIbadahBudhaData?: React.Dispatch<React.SetStateAction<TempatIbadahBudha[]>>;
  auditLogs: AuditLog[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;
  ptspRequests: PtspPermohonan[];
  setPtspRequests: React.Dispatch<React.SetStateAction<PtspPermohonan[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onLogout,
  onViewPublicSite,
  beritaList,
  setBeritaList,
  pengumumanList,
  setPengumumanList,
  galeriList,
  setGaleriList,
  pegawaiData,
  setPegawaiData,
  lembagaPendisData,
  setLembagaPendisData,
  rumahIbadahIslamData,
  setRumahIbadahIslamData,
  kuaData,
  setKuaData,
  tempatIbadahKristenData,
  setTempatIbadahKristenData,
  tempatIbadahHinduData,
  setTempatIbadahHinduData,
  tempatIbadahBudhaData = [],
  setTempatIbadahBudhaData,
  auditLogs,
  setAuditLogs,
  ptspRequests,
  setPtspRequests
}) => {
  // Determine default tab based on user role
  const getDefaultTab = (): AdminTab => {
    if (currentUser.roleType === 'humas') {
      return 'kelola-berita';
    }
    if (currentUser.roleType === 'operator_seksi') {
      if (currentUser.operatorSeksi === 'pendis') {
        return 'sipendis-mura';
      }
      return 'kelola-data-keagamaan';
    }
    return 'ringkasan';
  };

  const [currentAdminTab, setCurrentAdminTab] = useState<AdminTab>(getDefaultTab());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal states for creating/editing content
  const [isBeritaModalOpen, setIsBeritaModalOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState<Berita | null>(null);
  const [beritaFormData, setBeritaFormData] = useState<Partial<Berita>>({});

  const [isPengumumanModalOpen, setIsPengumumanModalOpen] = useState(false);
  const [editingPengumuman, setEditingPengumuman] = useState<Pengumuman | null>(null);
  const [pengumumanFormData, setPengumumanFormData] = useState<Partial<Pengumuman>>({});

  const [isGaleriModalOpen, setIsGaleriModalOpen] = useState(false);
  const [galeriFormData, setGaleriFormData] = useState<Partial<GaleriKegiatan>>({});

  // Operator CRUD modals for their section
  const [isSeksiAddModalOpen, setIsSeksiAddModalOpen] = useState(false);
  const [seksiFormData, setSeksiFormData] = useState<Record<string, any>>({});

  const [selectedPtspTicket, setSelectedPtspTicket] = useState<PtspPermohonan | null>(null);
  const [ticketStatusForm, setTicketStatusForm] = useState<PtspPermohonan['status']>('Menunggu Verifikasi');
  const [ticketCatatanForm, setTicketCatatanForm] = useState('');

  // Operator sub-tab for Bimas Islam
  const [bimasIslamSubTab, setBimasIslamSubTab] = useState<'rumah-ibadah' | 'kua'>('rumah-ibadah');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addAuditLog = (aksi: string, modul: string, keterangan: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      waktu: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      adminName: `${currentUser.nama}, ${currentUser.gelar}`,
      aksi,
      modul,
      keterangan,
      ipAddress: "182.253.14.92 (Puruk Cahu)"
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // RBAC checks
  const canAccessAll = currentUser.roleType === 'super_admin';
  const canAccessHumas = currentUser.roleType === 'super_admin' || currentUser.roleType === 'humas';
  const isOperator = currentUser.roleType === 'operator_seksi';
  const opSeksi = currentUser.operatorSeksi;

  // --- BERITA CRUD ---
  const handleOpenAddBerita = () => {
    if (!canAccessHumas) {
      showToast('Akses ditolak: Hanya Admin Super dan Humas yang berwenang menulis berita.');
      return;
    }
    setEditingBerita(null);
    setBeritaFormData({
      kategori: 'Kegiatan Kemenag',
      penulis: currentUser.nama,
      jabatanPenulis: currentUser.jabatan,
      waktuBaca: '3 menit',
      tags: ['Kemenag Mura', 'Puruk Cahu']
    });
    setIsBeritaModalOpen(true);
  };

  const handleOpenEditBerita = (item: Berita) => {
    if (!canAccessHumas) {
      showToast('Akses ditolak: Hanya Admin Super dan Humas yang berwenang mengedit berita.');
      return;
    }
    setEditingBerita(item);
    setBeritaFormData({ ...item });
    setIsBeritaModalOpen(true);
  };

  const handleDeleteBerita = (id: string, judul: string) => {
    if (!canAccessHumas) {
      showToast('Akses ditolak.');
      return;
    }
    if (!window.confirm(`Hapus warta berita: "${judul}"?`)) return;
    setBeritaList(prev => prev.filter(b => b.id !== id));
    addAuditLog('Hapus Berita', 'Humas & Berita', `Menghapus artikel "${judul}"`);
    showToast('Berita berhasil dihapus dari portal.');
  };

  const handleSaveBerita = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBerita) {
      setBeritaList(prev => prev.map(b => b.id === editingBerita.id ? { ...b, ...beritaFormData } as Berita : b));
      addAuditLog('Edit Berita', 'Humas & Berita', `Memperbarui artikel "${beritaFormData.judul}"`);
      showToast('Perubahan berita berhasil disimpan.');
    } else {
      const newBerita: Berita = {
        id: `berita-${Date.now()}`,
        judul: beritaFormData.judul || 'Judul Berita',
        ringkasan: beritaFormData.ringkasan || 'Ringkasan berita...',
        konten: beritaFormData.konten || 'Konten lengkap warta berita...',
        kategori: beritaFormData.kategori as any || 'Kegiatan Kemenag',
        penulis: beritaFormData.penulis || currentUser.nama,
        jabatanPenulis: beritaFormData.jabatanPenulis || currentUser.jabatan,
        tanggalUnggah: new Date().toISOString().slice(0, 10),
        waktuBaca: beritaFormData.waktuBaca || '3 menit',
        dibaca: 1,
        tags: beritaFormData.tags || ['Kemenag Mura'],
        featured: Boolean(beritaFormData.featured)
      };
      setBeritaList(prev => [newBerita, ...prev]);
      addAuditLog('Terbitkan Berita', 'Humas & Berita', `Menerbitkan warta baru "${newBerita.judul}"`);
      showToast('Berita baru berhasil diterbitkan ke publik.');
    }
    setIsBeritaModalOpen(false);
  };

  // --- PENGUMUMAN CRUD ---
  const handleOpenAddPengumuman = () => {
    if (!canAccessHumas) return;
    setEditingPengumuman(null);
    setPengumumanFormData({
      nomorSurat: `B-${Math.floor(100 + Math.random() * 900)}/Kk.15.11/1/KP.01/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      kategori: 'Surat Edaran',
      dikeluarkanOleh: 'Kantor Kementerian Agama Kab. Murung Raya',
      status: 'Aktif',
      fileLampiranNama: 'Surat_Edaran_Resmi_Mura.pdf',
      ukuranFile: '1.4 MB'
    });
    setIsPengumumanModalOpen(true);
  };

  const handleOpenEditPengumuman = (item: Pengumuman) => {
    if (!canAccessHumas) return;
    setEditingPengumuman(item);
    setPengumumanFormData({ ...item });
    setIsPengumumanModalOpen(true);
  };

  const handleDeletePengumuman = (id: string, judul: string) => {
    if (!canAccessHumas) return;
    if (!window.confirm(`Hapus pengumuman: "${judul}"?`)) return;
    setPengumumanList(prev => prev.filter(p => p.id !== id));
    addAuditLog('Hapus Pengumuman', 'Pengumuman', `Menghapus surat "${judul}"`);
    showToast('Pengumuman berhasil dihapus.');
  };

  const handleSavePengumuman = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPengumuman) {
      setPengumumanList(prev => prev.map(p => p.id === editingPengumuman.id ? { ...p, ...pengumumanFormData } as Pengumuman : p));
      addAuditLog('Edit Pengumuman', 'Pengumuman', `Memperbarui pengumuman "${pengumumanFormData.judul}"`);
      showToast('Pengumuman berhasil diperbarui.');
    } else {
      const newPengumuman: Pengumuman = {
        id: `peng-${Date.now()}`,
        nomorSurat: pengumumanFormData.nomorSurat || 'B-888/Kk.15.11/1/2026',
        judul: pengumumanFormData.judul || 'Judul Pengumuman',
        ringkasan: pengumumanFormData.ringkasan || 'Ringkasan surat...',
        isiLengkap: pengumumanFormData.isiLengkap || 'Isi lengkap surat dinas...',
        kategori: pengumumanFormData.kategori as any || 'Surat Edaran',
        tanggalUnggah: new Date().toISOString().slice(0, 10),
        batasWaktu: pengumumanFormData.batasWaktu,
        fileLampiranNama: pengumumanFormData.fileLampiranNama || 'Dokumen_Resmi.pdf',
        ukuranFile: pengumumanFormData.ukuranFile || '1.2 MB',
        dikeluarkanOleh: pengumumanFormData.dikeluarkanOleh || 'Kantor Kemenag Mura',
        status: pengumumanFormData.status as any || 'Aktif'
      };
      setPengumumanList(prev => [newPengumuman, ...prev]);
      addAuditLog('Terbitkan Pengumuman', 'Pengumuman', `Menerbitkan pengumuman "${newPengumuman.judul}"`);
      showToast('Pengumuman resmi berhasil dipublikasikan.');
    }
    setIsPengumumanModalOpen(false);
  };

  // --- GALERI CRUD ---
  const handleSaveGaleri = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAccessHumas) return;
    const newGaleri: GaleriKegiatan = {
      id: `gal-${Date.now()}`,
      judul: galeriFormData.judul || 'Kegiatan Kemenag Murung Raya',
      kategori: galeriFormData.kategori as any || 'Pembinaan ASN',
      tanggal: galeriFormData.tanggal || new Date().toISOString().slice(0, 10),
      lokasi: galeriFormData.lokasi || 'Puruk Cahu, Kab. Murung Raya',
      deskripsi: galeriFormData.deskripsi || 'Dokumentasi kegiatan kedinasan.',
      fotografer: galeriFormData.fotografer || currentUser.nama,
      jumlahFoto: Number(galeriFormData.jumlahFoto || 6),
      tags: ['Kemenag Mura', 'Dokumentasi']
    };
    setGaleriList(prev => [newGaleri, ...prev]);
    addAuditLog('Unggah Galeri', 'Galeri', `Menambahkan album dokumentasi "${newGaleri.judul}"`);
    setIsGaleriModalOpen(false);
    showToast('Dokumentasi galeri berhasil ditambahkan.');
  };

  // --- OPERATOR SEKSI CRUD HANDLER ---
  const handleAddSeksiData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opSeksi && !canAccessAll) return;

    const targetSeksi = opSeksi || 'kepegawaian';

    if (targetSeksi === 'kepegawaian') {
      const newPegawai: Pegawai = {
        id: `peg-${Date.now()}`,
        nip: seksiFormData.nip || `199${Math.floor(10000000000000 + Math.random() * 9000000000000)}`,
        nama: seksiFormData.nama || 'Pegawai Baru',
        gelar: seksiFormData.gelar || 'S.Ag',
        jabatan: seksiFormData.jabatan || 'Pelaksana',
        status: seksiFormData.status || 'PNS',
        golongan: seksiFormData.golongan || 'III/a',
        unitKerja: seksiFormData.unitKerja || 'Subbag TU',
        pendidikanTerakhir: seksiFormData.pendidikanTerakhir || 'S1',
        masaKerjaTahun: Number(seksiFormData.masaKerjaTahun || 5),
        kontak: seksiFormData.kontak || '08123456789',
        email: seksiFormData.email || 'pegawai@kemenag.go.id'
      };
      setPegawaiData(prev => [newPegawai, ...prev]);
      addAuditLog('Tambah Pegawai', 'Kepegawaian', `Menambahkan pegawai ${newPegawai.nama}`);
      showToast('Data pegawai baru berhasil ditambahkan.');
    } else if (targetSeksi === 'bimas-islam') {
      if (bimasIslamSubTab === 'rumah-ibadah') {
        const newMasjid: RumahIbadahIslam = {
          id: `ri-${Date.now()}`,
          nama: seksiFormData.nama || 'Masjid Baru',
          jenis: seksiFormData.jenis || 'Masjid Jami',
          kecamatan: seksiFormData.kecamatan || 'Murung',
          alamat: seksiFormData.alamat || 'Puruk Cahu',
          kapasitasJamaah: Number(seksiFormData.kapasitasJamaah || 300),
          luasTanahM2: Number(seksiFormData.luasTanahM2 || 400),
          statusTanah: seksiFormData.statusTanah || 'Wakaf',
          namaPengurus: seksiFormData.namaPengurus || 'BKM',
          tahunBerdiri: Number(seksiFormData.tahunBerdiri || 2015)
        };
        setRumahIbadahIslamData(prev => [newMasjid, ...prev]);
        addAuditLog('Tambah Masjid', 'Bimas Islam', `Menambahkan masjid ${newMasjid.nama}`);
        showToast('Data rumah ibadah Islam berhasil ditambahkan.');
      } else {
        const newKua: KuaKecamatan = {
          id: `kua-${Date.now()}`,
          kodeKua: seksiFormData.kodeKua || '62.12.11',
          namaKua: seksiFormData.namaKua || 'KUA Kecamatan',
          kecamatan: seksiFormData.kecamatan || 'Murung',
          namaKepala: seksiFormData.namaKepala || 'Kepala KUA',
          nipKepala: seksiFormData.nipKepala || '198000000000000000',
          alamat: seksiFormData.alamat || 'Kecamatan',
          kontak: seksiFormData.kontak || '08123456789',
          email: seksiFormData.email || 'kua@kemenag.go.id',
          jumlahPeristiwaNikahTahun: Number(seksiFormData.jumlahPeristiwaNikahTahun || 30),
          statusGedung: seksiFormData.statusGedung || 'SBSN'
        };
        setKuaData(prev => [newKua, ...prev]);
        addAuditLog('Tambah KUA', 'Bimas Islam', `Menambahkan KUA ${newKua.namaKua}`);
        showToast('Data KUA berhasil ditambahkan.');
      }
    } else if (targetSeksi === 'bimas-kristen') {
      const newGereja: TempatIbadahKristen = {
        id: `gr-${Date.now()}`,
        namaGereja: seksiFormData.namaGereja || 'Gereja Baru',
        denominasi: seksiFormData.denominasi || 'GKE',
        kecamatan: seksiFormData.kecamatan || 'Murung',
        alamat: seksiFormData.alamat || 'Puruk Cahu',
        namaPendetaPastor: seksiFormData.namaPendetaPastor || 'Pdt. Johanes, S.Th',
        jumlahJemaat: Number(seksiFormData.jumlahJemaat || 200),
        tahunBerdiri: Number(seksiFormData.tahunBerdiri || 1998),
        statusBangunan: seksiFormData.statusBangunan || 'Permanen',
        kontak: seksiFormData.kontak || '08123456789'
      };
      setTempatIbadahKristenData(prev => [newGereja, ...prev]);
      addAuditLog('Tambah Gereja', 'Bimas Kristen', `Menambahkan tempat ibadah ${newGereja.namaGereja}`);
      showToast('Data tempat ibadah Kristen berhasil ditambahkan.');
    } else if (targetSeksi === 'bimas-hindu') {
      const newBalai: TempatIbadahHindu = {
        id: `hd-${Date.now()}`,
        namaTempatIbadah: seksiFormData.namaTempatIbadah || 'Balai Basarah Baru',
        jenis: seksiFormData.jenis || 'Balai Basarah',
        sekteTradisi: seksiFormData.sekteTradisi || 'Hindu Kaharingan',
        kecamatan: seksiFormData.kecamatan || 'Murung',
        alamat: seksiFormData.alamat || 'Puruk Cahu',
        namaBasirPemimpin: seksiFormData.namaBasirPemimpin || 'Basir Upu',
        jumlahUmat: Number(seksiFormData.jumlahUmat || 180),
        tahunBerdiri: Number(seksiFormData.tahunBerdiri || 1990),
        kegiatanRutin: seksiFormData.kegiatanRutin || 'Ibadah Basarah',
        kontak: seksiFormData.kontak || '08123456789'
      };
      setTempatIbadahHinduData(prev => [newBalai, ...prev]);
      addAuditLog('Tambah Balai', 'Bimas Hindu', `Menambahkan Balai Basarah ${newBalai.namaTempatIbadah}`);
      showToast('Data Balai Basarah Hindu berhasil ditambahkan.');
    } else if (targetSeksi === 'bimas-budha' && setTempatIbadahBudhaData) {
      const newVihara: TempatIbadahBudha = {
        id: `bd-${Date.now()}`,
        namaVihara: seksiFormData.namaVihara || 'Cetiya Baru',
        jenis: seksiFormData.jenis || 'Cetiya',
        sekteTradisi: seksiFormData.sekteTradisi || 'Mahayana',
        kecamatan: seksiFormData.kecamatan || 'Murung',
        alamat: seksiFormData.alamat || 'Puruk Cahu',
        namaPanditaRomo: seksiFormData.namaPanditaRomo || 'Pandita Romo',
        jumlahUmat: Number(seksiFormData.jumlahUmat || 40),
        tahunBerdiri: Number(seksiFormData.tahunBerdiri || 2018),
        kegiatanRutin: seksiFormData.kegiatanRutin || 'Puja Bakti',
        kontak: seksiFormData.kontak || '08123456789'
      };
      setTempatIbadahBudhaData(prev => [newVihara, ...prev]);
      addAuditLog('Tambah Vihara', 'Bimas Budha', `Menambahkan tempat ibadah Budha ${newVihara.namaVihara}`);
      showToast('Data tempat ibadah Budha berhasil ditambahkan.');
    }

    setIsSeksiAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-950 text-white p-3.5 rounded-xl shadow-xl border border-emerald-800 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white ml-2">✕</button>
        </div>
      )}

      {/* Top Application Bar for Admin */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <OfficialEmblem size={36} />
            <div>
              <div className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                Panel Pengelola Portal Web
              </div>
              <div className="text-sm font-bold text-white tracking-tight">
                Kemenag Kabupaten Murung Raya
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* User Profile Badge with Role Pill */}
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/80 px-3 py-1.5 rounded-xl">
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {currentUser.nama[0]}
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-bold text-slate-100 leading-tight">
                  {currentUser.nama}, {currentUser.gelar}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    currentUser.roleType === 'super_admin' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                    currentUser.roleType === 'humas' ? 'bg-purple-950 text-purple-300 border border-purple-700' :
                    'bg-blue-950 text-blue-300 border border-blue-700'
                  }`}>
                    {currentUser.roleType === 'super_admin' ? 'Admin Super' : 
                     currentUser.roleType === 'humas' ? 'Humas & Protokoler' : 
                     `Operator Seksi ${currentUser.operatorSeksi || ''}`}
                  </span>
                </div>
              </div>
            </div>

            {/* View Public Portal */}
            <button
              onClick={onViewPublicSite}
              className="flex items-center gap-1.5 px-3 py-1.5 font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              title="Lihat Tampilan Web Publik"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Tinjau Web Publik</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800/50 rounded-lg transition-colors"
              title="Keluar dari sesi administrator"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* RBAC Notice Banner */}
      <div className="bg-emerald-950 text-emerald-100 border-b border-emerald-900/60 px-4 sm:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Kewenangan Akun ({currentUser.roleLabel}):</strong> {currentUser.kewenanganDeskripsi}
            </span>
          </div>
          <span className="text-[11px] text-emerald-300 font-mono">
            IP: 182.253.14.92 · Akses Terotorisasi
          </span>
        </div>
      </div>

      {/* Main Admin Workspace with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Menu Berdasarkan Kewenangan
              </div>

              {/* TAB: RINGKASAN (Super Admin & Humas) */}
              {(canAccessAll || currentUser.roleType === 'humas') && (
                <button
                  onClick={() => setCurrentAdminTab('ringkasan')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    currentAdminTab === 'ringkasan'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Ringkasan & Metrik</span>
                </button>
              )}

              {/* TABS: HUMAS & BERITA (Super Admin & Humas) */}
              {canAccessHumas && (
                <>
                  <button
                    onClick={() => setCurrentAdminTab('kelola-berita')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      currentAdminTab === 'kelola-berita'
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Newspaper className="w-4 h-4" />
                      <span>Warta Berita Terkini</span>
                    </div>
                    <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                      currentAdminTab === 'kelola-berita' ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {beritaList.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setCurrentAdminTab('kelola-pengumuman')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      currentAdminTab === 'kelola-pengumuman'
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4" />
                      <span>Pengumuman Resmi</span>
                    </div>
                    <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                      currentAdminTab === 'kelola-pengumuman' ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {pengumumanList.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setCurrentAdminTab('kelola-galeri')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      currentAdminTab === 'kelola-galeri'
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ImageIcon className="w-4 h-4" />
                      <span>Galeri Kegiatan</span>
                    </div>
                    <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                      currentAdminTab === 'kelola-galeri' ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {galeriList.length}
                    </span>
                  </button>
                </>
              )}

              {/* TABS: DATA SEKSI (Super Admin OR Operator Seksi) */}
              {(canAccessAll || (isOperator && opSeksi !== 'pendis')) && (
                <button
                  onClick={() => setCurrentAdminTab('kelola-data-keagamaan')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    currentAdminTab === 'kelola-data-keagamaan'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>
                    {isOperator ? `Data ${currentUser.seksiLabel || 'Seksi Anda'}` : 'Master Data Perbidang'}
                  </span>
                </button>
              )}

              {/* TAB: SIPENDIS MURA (Super Admin OR Operator Pendis) */}
              {(canAccessAll || (isOperator && opSeksi === 'pendis')) && (
                <button
                  onClick={() => setCurrentAdminTab('sipendis-mura')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    currentAdminTab === 'sipendis-mura'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span>SI PENDIS MURA</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900">
                    Live
                  </span>
                </button>
              )}

              {/* TAB: PTSP (Super Admin) */}
              {canAccessAll && (
                <button
                  onClick={() => setCurrentAdminTab('antrean-ptsp')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    currentAdminTab === 'antrean-ptsp'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Inbox className="w-4 h-4" />
                    <span>Antrean Tiket PTSP</span>
                  </div>
                  <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    currentAdminTab === 'antrean-ptsp' 
                      ? 'bg-emerald-900 text-emerald-200' 
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {ptspRequests.filter(p => p.status === 'Menunggu Verifikasi').length} Baru
                  </span>
                </button>
              )}

              {/* TAB: PENGATURAN (Super Admin Only) */}
              {canAccessAll && (
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentAdminTab('pengaturan')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      currentAdminTab === 'pengaturan'
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Pengaturan Portal</span>
                  </button>
                </div>
              )}
            </div>

            {/* Operator Restriction Card */}
            {isOperator && (
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Akses Terisolasi Seksi</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Sesuai kebijakan pengamanan data Kemenag, Anda hanya dapat melihat dan memperbarui data yang menjadi kewenangan seksi Anda ({currentUser.seksiLabel}).
                </p>
              </div>
            )}
          </aside>

          {/* Main Work Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* 1. RINGKASAN & OVERVIEW */}
            {currentAdminTab === 'ringkasan' && (canAccessAll || currentUser.roleType === 'humas') && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900">
                        Selamat Datang, {currentUser.nama}, {currentUser.gelar}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {currentUser.roleLabel} · Kantor Kementerian Agama Kabupaten Murung Raya.
                      </p>
                    </div>
                    {canAccessHumas && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleOpenAddBerita}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tulis Warta</span>
                        </button>
                        <button
                          onClick={handleOpenAddPengumuman}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Terbitkan SE</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                      <div className="text-xs font-semibold text-emerald-800">Total Berita Terbit</div>
                      <div className="text-2xl font-bold font-mono text-emerald-950 mt-1 tabular-nums">{beritaList.length}</div>
                      <div className="text-[10px] text-emerald-700 mt-1">Dipublikasi ke Publik</div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="text-xs font-semibold text-blue-800">Pengumuman & SE</div>
                      <div className="text-2xl font-bold font-mono text-blue-950 mt-1 tabular-nums">{pengumumanList.length}</div>
                      <div className="text-[10px] text-blue-700 mt-1">Dokumen Kedinasan</div>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                      <div className="text-xs font-semibold text-purple-800">Album Galeri</div>
                      <div className="text-2xl font-bold font-mono text-purple-950 mt-1 tabular-nums">{galeriList.length}</div>
                      <div className="text-[10px] text-purple-700 mt-1">Dokumentasi Foto</div>
                    </div>

                    {canAccessAll ? (
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                        <div className="text-xs font-semibold text-amber-800">Antrean PTSP</div>
                        <div className="text-2xl font-bold font-mono text-amber-950 mt-1 tabular-nums">{ptspRequests.length}</div>
                        <div className="text-[10px] text-amber-700 mt-1">Permohonan Warga</div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
                        <div className="text-xs font-semibold text-teal-800">Kewenangan</div>
                        <div className="text-base font-bold text-teal-950 mt-1 truncate">Humas & Warta</div>
                        <div className="text-[10px] text-teal-700 mt-1">Publikasi Terbuka</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Audit Logs Table */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Catatan Aktivitas Kedinasan Terbaru (Audit Trail)
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400">Log waktu riil</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                          <th className="py-2.5 px-3">Waktu</th>
                          <th className="py-2.5 px-3">Pengelola</th>
                          <th className="py-2.5 px-3">Modul</th>
                          <th className="py-2.5 px-3">Aksi</th>
                          <th className="py-2.5 px-3">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {auditLogs.slice(0, 6).map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">{log.waktu}</td>
                            <td className="py-2.5 px-3 font-medium text-slate-900 whitespace-nowrap">{log.adminName}</td>
                            <td className="py-2.5 px-3 font-semibold text-emerald-800">{log.modul}</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-semibold">
                                {log.aksi}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">{log.keterangan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 2. KELOLA BERITA (Humas & Super Admin) */}
            {currentAdminTab === 'kelola-berita' && canAccessHumas && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Kelola Warta & Berita Terkini
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Publikasi artikel resmi kegiatan keagamaan Kemenag Murung Raya (Kewenangan Humas & Super Admin).
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddBerita}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tulis Berita Baru</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <th className="py-3 px-3 w-12 text-center">No</th>
                        <th className="py-3 px-3">Judul Berita</th>
                        <th className="py-3 px-3 w-36">Kategori</th>
                        <th className="py-3 px-3 w-32">Tanggal</th>
                        <th className="py-3 px-3 w-32">Penulis</th>
                        <th className="py-3 px-3 text-center w-24">Featured</th>
                        <th className="py-3 px-3 text-right w-24">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {beritaList.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 text-center font-mono text-slate-400">{idx + 1}</td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900 line-clamp-1">{item.judul}</div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">{item.ringkasan}</div>
                          </td>
                          <td className="py-3 px-3 font-semibold text-emerald-800">{item.kategori}</td>
                          <td className="py-3 px-3 text-slate-600">{item.tanggalUnggah}</td>
                          <td className="py-3 px-3 text-slate-600 truncate max-w-[120px]">{item.penulis}</td>
                          <td className="py-3 px-3 text-center">
                            {item.featured ? (
                              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[10px]">Utama</span>
                            ) : (
                              <span className="text-slate-400 text-[10px]">Standar</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleOpenEditBerita(item)}
                              className="p-1.5 text-slate-500 hover:text-emerald-800 mr-1"
                              title="Edit Berita"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBerita(item.id, item.judul)}
                              className="p-1.5 text-slate-500 hover:text-rose-700"
                              title="Hapus Berita"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. KELOLA PENGUMUMAN (Humas & Super Admin) */}
            {currentAdminTab === 'kelola-pengumuman' && canAccessHumas && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Kelola Pengumuman & Surat Edaran
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Penerbitan surat edaran dan warta resmi Kemenag Murung Raya.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddPengumuman}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Terbitkan Pengumuman</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <th className="py-3 px-3 w-12 text-center">No</th>
                        <th className="py-3 px-3 w-48">Nomor Surat Dinas</th>
                        <th className="py-3 px-3">Perihal / Judul</th>
                        <th className="py-3 px-3 w-36">Kategori</th>
                        <th className="py-3 px-3 w-28">Tanggal</th>
                        <th className="py-3 px-3 text-center w-20">Status</th>
                        <th className="py-3 px-3 text-right w-24">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pengumumanList.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 text-center font-mono text-slate-400">{idx + 1}</td>
                          <td className="py-3 px-3 font-mono font-medium text-emerald-800">{item.nomorSurat}</td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900 line-clamp-1">{item.judul}</div>
                            <div className="text-[11px] text-slate-500">{item.dikeluarkanOleh}</div>
                          </td>
                          <td className="py-3 px-3 text-slate-700 font-medium">{item.kategori}</td>
                          <td className="py-3 px-3 text-slate-600">{item.tanggalUnggah}</td>
                          <td className="py-3 px-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                              item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleOpenEditPengumuman(item)}
                              className="p-1.5 text-slate-500 hover:text-emerald-800 mr-1"
                              title="Edit Pengumuman"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePengumuman(item.id, item.judul)}
                              className="p-1.5 text-slate-500 hover:text-rose-700"
                              title="Hapus Pengumuman"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. KELOLA GALERI (Humas & Super Admin) */}
            {currentAdminTab === 'kelola-galeri' && canAccessHumas && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Kelola Dokumentasi Galeri Kegiatan
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Dokumentasi foto kegiatan kedinasan, HAB Kemenag, dan pembinaan ASN.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setGaleriFormData({
                        kategori: 'Pembinaan ASN',
                        lokasi: 'Puruk Cahu, Kab. Murung Raya',
                        fotografer: currentUser.nama,
                        jumlahFoto: 8
                      });
                      setIsGaleriModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Galeri Baru</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galeriList.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-800">
                          <span>{item.kategori}</span>
                          <span>·</span>
                          <span>{item.tanggal}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.judul}</h4>
                        <p className="text-[11px] text-slate-500">{item.lokasi}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus galeri: "${item.judul}"?`)) {
                            setGaleriList(prev => prev.filter(g => g.id !== item.id));
                            addAuditLog('Hapus Galeri', 'Galeri', `Menghapus album "${item.judul}"`);
                            showToast('Galeri dihapus.');
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-700"
                        title="Hapus album"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. MASTER DATA SEKSI (Super Admin OR Operator Seksi) */}
            {currentAdminTab === 'kelola-data-keagamaan' && (canAccessAll || (isOperator && opSeksi !== 'pendis')) && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {isOperator ? `Pengelolaan Data: ${currentUser.seksiLabel}` : 'Master Data Keagamaan Perbidang'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isOperator 
                        ? `Anda memiliki hak akses khusus untuk mengelola data ${currentUser.seksiLabel}.` 
                        : 'Akses penuh sebagai Admin Super untuk mengedit seluruh data seksi.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSeksiFormData({});
                        setIsSeksiAddModalOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Data {isOperator ? currentUser.seksiLabel : ''}</span>
                    </button>
                    <button
                      onClick={onViewPublicSite}
                      className="px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                    >
                      Buka di Tab Data Informasi →
                    </button>
                  </div>
                </div>

                {/* Seksi Display based on role */}
                {(canAccessAll || opSeksi === 'kepegawaian') && (
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-700" />
                        <span className="font-bold text-slate-900 text-xs">Seksi Kepegawaian & Tata Usaha</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-800">{pegawaiData.length} Pegawai</span>
                    </div>
                    <div className="overflow-x-auto max-h-60 custom-scrollbar">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-200/60 text-slate-700">
                            <th className="p-2">NIP</th>
                            <th className="p-2">Nama</th>
                            <th className="p-2">Jabatan</th>
                            <th className="p-2">Status</th>
                            <th className="p-2 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {pegawaiData.slice(0, 10).map((p) => (
                            <tr key={p.id}>
                              <td className="p-2 font-mono text-slate-500">{p.nip}</td>
                              <td className="p-2 font-semibold text-slate-900">{p.nama}, {p.gelar}</td>
                              <td className="p-2 text-slate-600">{p.jabatan}</td>
                              <td className="p-2"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px]">{p.status}</span></td>
                              <td className="p-2 text-right">
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Hapus pegawai: ${p.nama}?`)) {
                                      setPegawaiData(prev => prev.filter(item => item.id !== p.id));
                                      addAuditLog('Hapus Pegawai', 'Kepegawaian', `Hapus ${p.nama}`);
                                      showToast('Pegawai dihapus.');
                                    }
                                  }}
                                  className="text-rose-600 hover:text-rose-800 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {(canAccessAll || opSeksi === 'bimas-islam') && (
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-700" />
                        <span className="font-bold text-slate-900 text-xs">Seksi Bimas Islam (Rumah Ibadah & 10 KUA)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setBimasIslamSubTab('rumah-ibadah')}
                          className={`px-2.5 py-1 rounded text-xs font-semibold ${bimasIslamSubTab === 'rumah-ibadah' ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'}`}
                        >
                          Masjid ({rumahIbadahIslamData.length})
                        </button>
                        <button 
                          onClick={() => setBimasIslamSubTab('kua')}
                          className={`px-2.5 py-1 rounded text-xs font-semibold ${bimasIslamSubTab === 'kua' ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'}`}
                        >
                          KUA ({kuaData.length})
                        </button>
                      </div>
                    </div>

                    {bimasIslamSubTab === 'rumah-ibadah' ? (
                      <div className="overflow-x-auto max-h-60 custom-scrollbar">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-200/60 text-slate-700">
                              <th className="p-2">Nama Rumah Ibadah</th>
                              <th className="p-2">Kecamatan</th>
                              <th className="p-2">Kapasitas</th>
                              <th className="p-2 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {rumahIbadahIslamData.slice(0, 10).map((r) => (
                              <tr key={r.id}>
                                <td className="p-2 font-semibold text-slate-900">{r.nama}</td>
                                <td className="p-2 text-slate-600">{r.kecamatan}</td>
                                <td className="p-2 font-mono">{r.kapasitasJamaah} Jamaah</td>
                                <td className="p-2 text-right">
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Hapus: ${r.nama}?`)) {
                                        setRumahIbadahIslamData(prev => prev.filter(item => item.id !== r.id));
                                        showToast('Data dihapus.');
                                      }
                                    }}
                                    className="text-rose-600 hover:text-rose-800 p-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="overflow-x-auto max-h-60 custom-scrollbar">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-200/60 text-slate-700">
                              <th className="p-2">Nama KUA</th>
                              <th className="p-2">Kepala KUA</th>
                              <th className="p-2">Kecamatan</th>
                              <th className="p-2 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {kuaData.map((k) => (
                              <tr key={k.id}>
                                <td className="p-2 font-semibold text-slate-900">{k.namaKua}</td>
                                <td className="p-2 text-slate-600">{k.namaKepala}</td>
                                <td className="p-2 text-slate-600">{k.kecamatan}</td>
                                <td className="p-2 text-right">
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Hapus KUA: ${k.namaKua}?`)) {
                                        setKuaData(prev => prev.filter(item => item.id !== k.id));
                                        showToast('KUA dihapus.');
                                      }
                                    }}
                                    className="text-rose-600 hover:text-rose-800 p-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {(canAccessAll || opSeksi === 'bimas-kristen') && (
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">Penyelenggara Bimas Kristen</span>
                      <span className="text-xs font-mono font-bold text-purple-800">{tempatIbadahKristenData.length} Gereja</span>
                    </div>
                    <div className="overflow-x-auto max-h-60 custom-scrollbar">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-200/60 text-slate-700">
                            <th className="p-2">Nama Gereja</th>
                            <th className="p-2">Denominasi</th>
                            <th className="p-2">Pendeta / Pastor</th>
                            <th className="p-2">Jemaat</th>
                            <th className="p-2 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {tempatIbadahKristenData.slice(0, 10).map((g) => (
                            <tr key={g.id}>
                              <td className="p-2 font-semibold text-slate-900">{g.namaGereja}</td>
                              <td className="p-2 text-slate-600">{g.denominasi}</td>
                              <td className="p-2 text-slate-600">{g.namaPendetaPastor}</td>
                              <td className="p-2 font-mono">{g.jumlahJemaat} Jiwa</td>
                              <td className="p-2 text-right">
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Hapus: ${g.namaGereja}?`)) {
                                      setTempatIbadahKristenData(prev => prev.filter(item => item.id !== g.id));
                                      showToast('Data dihapus.');
                                    }
                                  }}
                                  className="text-rose-600 hover:text-rose-800 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {(canAccessAll || opSeksi === 'bimas-hindu') && (
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">Penyelenggara Bimas Hindu (Kaharingan)</span>
                      <span className="text-xs font-mono font-bold text-amber-800">{tempatIbadahHinduData.length} Balai Basarah</span>
                    </div>
                    <div className="overflow-x-auto max-h-60 custom-scrollbar">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-200/60 text-slate-700">
                            <th className="p-2">Nama Balai Basarah</th>
                            <th className="p-2">Kecamatan</th>
                            <th className="p-2">Basir / Pemimpin</th>
                            <th className="p-2">Umat</th>
                            <th className="p-2 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {tempatIbadahHinduData.slice(0, 10).map((h) => (
                            <tr key={h.id}>
                              <td className="p-2 font-semibold text-slate-900">{h.namaTempatIbadah}</td>
                              <td className="p-2 text-slate-600">{h.kecamatan}</td>
                              <td className="p-2 text-slate-600">{h.namaBasirPemimpin}</td>
                              <td className="p-2 font-mono">{h.jumlahUmat} Jiwa</td>
                              <td className="p-2 text-right">
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Hapus: ${h.namaTempatIbadah}?`)) {
                                      setTempatIbadahHinduData(prev => prev.filter(item => item.id !== h.id));
                                      showToast('Data dihapus.');
                                    }
                                  }}
                                  className="text-rose-600 hover:text-rose-800 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {(canAccessAll || opSeksi === 'bimas-budha') && (
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">Penyelenggara Bimas Budha</span>
                      <span className="text-xs font-mono font-bold text-cyan-800">{tempatIbadahBudhaData.length} Vihara / Cetiya</span>
                    </div>
                    <div className="overflow-x-auto max-h-60 custom-scrollbar">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-200/60 text-slate-700">
                            <th className="p-2">Nama Tempat Ibadah</th>
                            <th className="p-2">Jenis</th>
                            <th className="p-2">Pandita / Romo</th>
                            <th className="p-2">Umat</th>
                            <th className="p-2 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {tempatIbadahBudhaData.map((b) => (
                            <tr key={b.id}>
                              <td className="p-2 font-semibold text-slate-900">{b.namaVihara}</td>
                              <td className="p-2 text-slate-600">{b.jenis}</td>
                              <td className="p-2 text-slate-600">{b.namaPanditaRomo}</td>
                              <td className="p-2 font-mono">{b.jumlahUmat} Jiwa</td>
                              <td className="p-2 text-right">
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Hapus: ${b.namaVihara}?`)) {
                                      if (setTempatIbadahBudhaData) {
                                        setTempatIbadahBudhaData(prev => prev.filter(item => item.id !== b.id));
                                        showToast('Data dihapus.');
                                      }
                                    }
                                  }}
                                  className="text-rose-600 hover:text-rose-800 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 6. INTEGRASI SI PENDIS MURA (Super Admin OR Operator Pendis) */}
            {currentAdminTab === 'sipendis-mura' && (canAccessAll || (isOperator && opSeksi === 'pendis')) && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-800 text-white flex items-center justify-center shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-900">
                          Integrasi SI PENDIS MURA
                        </h2>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                          sipendismura.my.id
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Sistem Informasi Pendidikan Islam Kabupaten Murung Raya. Terintegrasi penuh tanpa duplikasi data.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://sipendismura.my.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Buka SI PENDIS (Tab Baru)</span>
                    </a>
                  </div>
                </div>

                {/* Embedded Frame of sipendismura.my.id */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900">
                  <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-300 border-b border-slate-700">
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                      <span>https://sipendismura.my.id</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-slate-400">Portal Layanan Pendis Mura</span>
                    </div>
                  </div>
                  <div className="w-full h-[600px] bg-white">
                    <iframe
                      src="https://sipendismura.my.id"
                      title="SI PENDIS MURA Official System"
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 7. ANTREAN PTSP ONLINE (Super Admin Only) */}
            {currentAdminTab === 'antrean-ptsp' && canAccessAll && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Pusat Antrean Layanan PTSP Online
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Permohonan masuk dari warga, sekolah, dan rumah ibadah di Murung Raya.
                    </p>
                  </div>
                  <div className="text-xs text-slate-500">
                    Total: <strong className="text-slate-900">{ptspRequests.length}</strong> tiket
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <th className="py-3 px-3 w-32">Nomor Tiket</th>
                        <th className="py-3 px-3">Nama Pemohon</th>
                        <th className="py-3 px-3">Jenis Layanan</th>
                        <th className="py-3 px-3">Kecamatan</th>
                        <th className="py-3 px-3 w-32">Status</th>
                        <th className="py-3 px-3 text-right w-24">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ptspRequests.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 font-mono font-bold text-emerald-800">{item.nomorTiket}</td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900">{item.namaPemohon}</div>
                            <div className="text-[11px] text-slate-500 font-mono">NIK: {item.nik}</div>
                          </td>
                          <td className="py-3 px-3 text-slate-700">{item.jenisLayanan}</td>
                          <td className="py-3 px-3 text-slate-600">{item.asalKecamatan}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              item.status === 'Selesai / Terbit' ? 'bg-emerald-100 text-emerald-800' :
                              item.status === 'Diproses Seksi Teknis' ? 'bg-blue-100 text-blue-800' :
                              item.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-900'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedPtspTicket(item);
                                setTicketStatusForm(item.status);
                                setTicketCatatanForm(item.catatanPetugas || '');
                              }}
                              className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                            >
                              Proses
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. PENGATURAN PORTAL (Super Admin Only) */}
            {currentAdminTab === 'pengaturan' && canAccessAll && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-fadeIn">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">
                    Pengaturan Identitas & Kontak Portal
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Informasi kedinasan Kantor Kementerian Agama Kabupaten Murung Raya.
                  </p>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    addAuditLog('Simpan Pengaturan', 'Pengaturan', 'Memperbarui profil kontak kedinasan');
                    showToast('Pengaturan identitas portal berhasil disimpan.');
                  }}
                  className="space-y-4 text-xs max-w-xl"
                >
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nama Instansi</label>
                    <input
                      type="text"
                      defaultValue="Kantor Kementerian Agama Kabupaten Murung Raya"
                      className="w-full p-2.5 border border-slate-300 rounded-xl bg-slate-50 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Telepon Kedinasan</label>
                      <input
                        type="text"
                        defaultValue="(0528) 31445"
                        className="w-full p-2.5 border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email Resmi</label>
                      <input
                        type="email"
                        defaultValue="kemenag.murungraya@kemenag.go.id"
                        className="w-full p-2.5 border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Tautan Aplikasi PTSP Online</label>
                    <input
                      type="text"
                      defaultValue="https://ptsp-kemenag-mura.vercel.app/"
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Tautan SI PENDIS MURA</label>
                    <input
                      type="text"
                      defaultValue="https://sipendismura.my.id"
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-mono text-[11px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Pengaturan</span>
                  </button>
                </form>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* MODAL: TULIS / EDIT BERITA */}
      {isBeritaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingBerita ? 'Edit Berita Terkini' : 'Tulis Warta Berita Baru'}
              </h3>
              <button onClick={() => setIsBeritaModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">✕</button>
            </div>

            <form onSubmit={handleSaveBerita} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Judul Berita</label>
                <input
                  type="text"
                  required
                  value={beritaFormData.judul || ''}
                  onChange={(e) => setBeritaFormData({ ...beritaFormData, judul: e.target.value })}
                  placeholder="Judul artikel berita resmi..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kategori</label>
                  <select
                    value={beritaFormData.kategori || 'Kegiatan Kemenag'}
                    onChange={(e) => setBeritaFormData({ ...beritaFormData, kategori: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Kegiatan Kemenag">Kegiatan Kemenag</option>
                    <option value="Pendidikan Islam">Pendidikan Islam</option>
                    <option value="Bimas Islam">Bimas Islam</option>
                    <option value="Haji & Umrah">Haji & Umrah</option>
                    <option value="Kerukunan Umat">Kerukunan Umat</option>
                    <option value="Kepegawaian">Kepegawaian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Penulis</label>
                  <input
                    type="text"
                    value={beritaFormData.penulis || currentUser.nama}
                    onChange={(e) => setBeritaFormData({ ...beritaFormData, penulis: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Ringkasan Singkat (Lead)</label>
                <textarea
                  rows={2}
                  required
                  value={beritaFormData.ringkasan || ''}
                  onChange={(e) => setBeritaFormData({ ...beritaFormData, ringkasan: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu depan..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Isi Lengkap Berita</label>
                <textarea
                  rows={6}
                  required
                  value={beritaFormData.konten || ''}
                  onChange={(e) => setBeritaFormData({ ...beritaFormData, konten: e.target.value })}
                  placeholder="Tuliskan berita lengkap..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-sans"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={Boolean(beritaFormData.featured)}
                  onChange={(e) => setBeritaFormData({ ...beritaFormData, featured: e.target.checked })}
                  className="rounded text-emerald-700"
                />
                <label htmlFor="featured-check" className="text-slate-700 font-medium">
                  Jadikan Berita Utama di Beranda (Featured)
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBeritaModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
                >
                  Simpan & Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TERBITKAN PENGUMUMAN */}
      {isPengumumanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full my-8 p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingPengumuman ? 'Edit Pengumuman' : 'Terbitkan Pengumuman / SE'}
              </h3>
              <button onClick={() => setIsPengumumanModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">✕</button>
            </div>

            <form onSubmit={handleSavePengumuman} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nomor Surat Dinas</label>
                  <input
                    type="text"
                    required
                    value={pengumumanFormData.nomorSurat || ''}
                    onChange={(e) => setPengumumanFormData({ ...pengumumanFormData, nomorSurat: e.target.value })}
                    placeholder="B-xxx/Kk.15.11/..."
                    className="w-full p-2.5 border border-slate-300 rounded-lg font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kategori</label>
                  <select
                    value={pengumumanFormData.kategori || 'Surat Edaran'}
                    onChange={(e) => setPengumumanFormData({ ...pengumumanFormData, kategori: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Surat Edaran">Surat Edaran</option>
                    <option value="Beasiswa & Guru">Beasiswa & Guru</option>
                    <option value="PPDB & Madrasah">PPDB & Madrasah</option>
                    <option value="Lelang & Pengadaan">Lelang & Pengadaan</option>
                    <option value="Formasi & Kepegawaian">Formasi & Kepegawaian</option>
                    <option value="Haji & Umrah">Haji & Umrah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Judul / Perihal</label>
                <input
                  type="text"
                  required
                  value={pengumumanFormData.judul || ''}
                  onChange={(e) => setPengumumanFormData({ ...pengumumanFormData, judul: e.target.value })}
                  placeholder="Perihal surat atau pengumuman..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Ringkasan</label>
                <textarea
                  rows={2}
                  required
                  value={pengumumanFormData.ringkasan || ''}
                  onChange={(e) => setPengumumanFormData({ ...pengumumanFormData, ringkasan: e.target.value })}
                  placeholder="Ringkasan poin surat edaran..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Isi Surat / Petunjuk Teknis</label>
                <textarea
                  rows={5}
                  required
                  value={pengumumanFormData.isiLengkap || ''}
                  onChange={(e) => setPengumumanFormData({ ...pengumumanFormData, isiLengkap: e.target.value })}
                  placeholder="Ketikkan isi surat edaran..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPengumumanModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
                >
                  Simpan & Terbitkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH DATA SEKSI OPERATOR */}
      {isSeksiAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full my-8 p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Tambah Data {currentUser.seksiLabel || 'Seksi'}
              </h3>
              <button onClick={() => setIsSeksiAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">✕</button>
            </div>

            <form onSubmit={handleAddSeksiData} className="space-y-4 text-xs">
              {(canAccessAll || opSeksi === 'kepegawaian') && (
                <>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Muhammad Ridwan, S.AP"
                      onChange={(e) => setSeksiFormData({ ...seksiFormData, nama: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">NIP</label>
                      <input
                        type="text"
                        placeholder="1990..."
                        onChange={(e) => setSeksiFormData({ ...seksiFormData, nip: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Status Kepegawaian</label>
                      <select
                        onChange={(e) => setSeksiFormData({ ...seksiFormData, status: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="PNS">PNS</option>
                        <option value="PPPK">PPPK</option>
                        <option value="PPNPN">PPNPN</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Jabatan / Posisi</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Pengelola Kepegawaian"
                      onChange={(e) => setSeksiFormData({ ...seksiFormData, jabatan: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                </>
              )}

              {(canAccessAll || opSeksi === 'bimas-islam') && (
                <>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nama Rumah Ibadah / KUA</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Masjid Jami Al-Hidayah"
                      onChange={(e) => setSeksiFormData({ ...seksiFormData, nama: e.target.value, namaKua: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Kecamatan</label>
                      <select
                        onChange={(e) => setSeksiFormData({ ...seksiFormData, kecamatan: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="Murung">Murung</option>
                        <option value="Tanah Siang">Tanah Siang</option>
                        <option value="Laung Tuhup">Laung Tuhup</option>
                        <option value="Permata Intan">Permata Intan</option>
                        <option value="Sumber Barito">Sumber Barito</option>
                        <option value="Barito Tuhup Raya">Barito Tuhup Raya</option>
                        <option value="Tanah Siang Selatan">Tanah Siang Selatan</option>
                        <option value="Seribu Riam">Seribu Riam</option>
                        <option value="Uut Murung">Uut Murung</option>
                        <option value="Sungai Babuat">Sungai Babuat</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Kapasitas / Tahun</label>
                      <input
                        type="number"
                        placeholder="350"
                        onChange={(e) => setSeksiFormData({ ...seksiFormData, kapasitasJamaah: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </>
              )}

              {(canAccessAll || opSeksi === 'bimas-kristen') && (
                <>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nama Gereja</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: GKE Eklesia Puruk Cahu"
                      onChange={(e) => setSeksiFormData({ ...seksiFormData, namaGereja: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Denominasi</label>
                      <input
                        type="text"
                        placeholder="GKE / GPdI / Katolik"
                        onChange={(e) => setSeksiFormData({ ...seksiFormData, denominasi: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Jumlah Jemaat</label>
                      <input
                        type="number"
                        placeholder="250"
                        onChange={(e) => setSeksiFormData({ ...seksiFormData, jumlahJemaat: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </>
              )}

              {(canAccessAll || opSeksi === 'bimas-hindu') && (
                <>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nama Balai Basarah</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Balai Basarah Penyang Hinje Simpei"
                      onChange={(e) => setSeksiFormData({ ...seksiFormData, namaTempatIbadah: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Basir / Pemimpin</label>
                      <input
                        type="text"
                        placeholder="Nama Basir Upu..."
                        onChange={(e) => setSeksiFormData({ ...seksiFormData, namaBasirPemimpin: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Jumlah Umat</label>
                      <input
                        type="number"
                        placeholder="200"
                        onChange={(e) => setSeksiFormData({ ...seksiFormData, jumlahUmat: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </>
              )}

              {(canAccessAll || opSeksi === 'bimas-budha') && (
                <>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nama Vihara / Cetiya</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Cetiya Maitreya Puruk Cahu"
                      onChange={(e) => setSeksiFormData({ ...seksiFormData, namaVihara: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Pandita / Romo</label>
                      <input
                        type="text"
                        placeholder="Nama Pandita..."
                        onChange={(e) => setSeksiFormData({ ...seksiFormData, namaPanditaRomo: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Jumlah Umat</label>
                      <input
                        type="number"
                        placeholder="45"
                        onChange={(e) => setSeksiFormData({ ...seksiFormData, jumlahUmat: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSeksiAddModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PROSES TIKET PTSP */}
      {selectedPtspTicket && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Proses Tiket {selectedPtspTicket.nomorTiket}
              </h3>
              <button onClick={() => setSelectedPtspTicket(null)} className="text-slate-400 p-1">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div><strong>Pemohon:</strong> {selectedPtspTicket.namaPemohon} ({selectedPtspTicket.nik})</div>
                <div><strong>Layanan:</strong> {selectedPtspTicket.jenisLayanan}</div>
                <div><strong>Kecamatan:</strong> {selectedPtspTicket.asalKecamatan}</div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Status Permohonan</label>
                <select
                  value={ticketStatusForm}
                  onChange={(e) => setTicketStatusForm(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                  <option value="Diproses Seksi Teknis">Diproses Seksi Teknis</option>
                  <option value="Selesai / Terbit">Selesai / Terbit</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Catatan Petugas</label>
                <textarea
                  rows={3}
                  value={ticketCatatanForm}
                  onChange={(e) => setTicketCatatanForm(e.target.value)}
                  placeholder="Ketik catatan tindak lanjut..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPtspTicket(null)}
                  className="px-4 py-2 font-medium text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPtspRequests(prev => prev.map(t => 
                      t.id === selectedPtspTicket.id 
                        ? { ...t, status: ticketStatusForm, catatanPetugas: ticketCatatanForm } 
                        : t
                    ));
                    addAuditLog('Update PTSP', 'PTSP', `Update ${selectedPtspTicket.nomorTiket} status ${ticketStatusForm}`);
                    showToast('Status tiket diperbarui.');
                    setSelectedPtspTicket(null);
                  }}
                  className="px-5 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
