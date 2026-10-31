import React, { useState, useRef, useEffect } from 'react';
import { 
  DataSectorTab, 
  Pegawai, 
  LembagaPendis, 
  RumahIbadahIslam, 
  KuaKecamatan, 
  TempatIbadahKristen, 
  TempatIbadahHindu,
  TempatIbadahBudha 
} from '../types';
import { 
  exportToExcel, 
  exportToCSV, 
  exportToOfficialPDF 
} from '../utils/exportUtils';
import { 
  parseSpreadsheetFile, 
  downloadImportTemplate 
} from '../utils/importUtils';
import { 
  FileSpreadsheet, 
  FileText, 
  Upload, 
  Plus, 
  Search, 
  Download, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Users, 
  GraduationCap, 
  Building2, 
  Church, 
  Landmark,
  X,
  FileCheck2,
  RefreshCw,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface DataInformasiSectionProps {
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
  initialSectorTab?: DataSectorTab;
}

export const DataInformasiSection: React.FC<DataInformasiSectionProps> = ({
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
  initialSectorTab = 'kepegawaian'
}) => {
  const [activeSector, setActiveSector] = useState<DataSectorTab>(initialSectorTab);

  useEffect(() => {
    if (initialSectorTab) {
      setActiveSector(initialSectorTab);
      setSearchTable('');
      setFilterKecamatan('all');
    }
  }, [initialSectorTab]);
  const [bimasIslamSubTab, setBimasIslamSubTab] = useState<'rumah-ibadah' | 'kua'>('rumah-ibadah');
  const [searchTable, setSearchTable] = useState('');
  const [filterKecamatan, setFilterKecamatan] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Import Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreviewData, setImportPreviewData] = useState<Record<string, unknown>[]>([]);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [isProcessingImport, setIsProcessingImport] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add & Edit Modal State
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Reset search when sector switches
  const handleSectorChange = (sector: DataSectorTab) => {
    setActiveSector(sector);
    setSearchTable('');
    setFilterKecamatan('all');
  };

  // --- EXPORT HANDLERS ---
  const handleExportExcel = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    if (activeSector === 'kepegawaian') {
      const data = pegawaiData.map(p => ({
        NIP: p.nip,
        Nama: p.nama,
        Gelar: p.gelar,
        Jabatan: p.jabatan,
        Status: p.status,
        Golongan: p.golongan,
        UnitKerja: p.unitKerja,
        Pendidikan: p.pendidikanTerakhir,
        MasaKerjaTahun: p.masaKerjaTahun,
        Kontak: p.kontak,
        Email: p.email
      }));
      exportToExcel(data, `Data_Kepegawaian_Kemenag_Murung_Raya_${timestamp}`, 'Kepegawaian');
    } else if (activeSector === 'pendidikan-islam') {
      const data = lembagaPendisData.map(l => ({
        NSM: l.nsm,
        NPSN: l.npsn,
        NamaLembaga: l.namaLembaga,
        Jenjang: l.jenjang,
        Status: l.status,
        Kecamatan: l.kecamatan,
        Alamat: l.alamat,
        KepalaLembaga: l.kepalaLembaga,
        JumlahSiswa: l.jumlahSiswa,
        JumlahGuru: l.jumlahGuru,
        Akreditasi: l.akreditasi,
        Kontak: l.kontak
      }));
      exportToExcel(data, `Data_Lembaga_Pendis_Kemenag_Mura_${timestamp}`, 'Pendidikan Islam');
    } else if (activeSector === 'bimas-islam') {
      if (bimasIslamSubTab === 'rumah-ibadah') {
        const data = rumahIbadahIslamData.map(r => ({
          NamaMasjid: r.nama,
          Jenis: r.jenis,
          Kecamatan: r.kecamatan,
          Alamat: r.alamat,
          KapasitasJamaah: r.kapasitasJamaah,
          LuasTanahM2: r.luasTanahM2,
          StatusTanah: r.statusTanah,
          Pengurus: r.namaPengurus,
          TahunBerdiri: r.tahunBerdiri
        }));
        exportToExcel(data, `Data_Rumah_Ibadah_Islam_Mura_${timestamp}`, 'Masjid & Mushalla');
      } else {
        const data = kuaData.map(k => ({
          KodeKUA: k.kodeKua,
          NamaKUA: k.namaKua,
          Kecamatan: k.kecamatan,
          KepalaKUA: k.namaKepala,
          NIP: k.nipKepala,
          Alamat: k.alamat,
          Kontak: k.kontak,
          Email: k.email,
          PeristiwaNikahTahun: k.jumlahPeristiwaNikahTahun,
          StatusGedung: k.statusGedung
        }));
        exportToExcel(data, `Data_KUA_Kecamatan_Mura_${timestamp}`, 'KUA Kecamatan');
      }
    } else if (activeSector === 'bimas-kristen') {
      const data = tempatIbadahKristenData.map(k => ({
        NamaGereja: k.namaGereja,
        Denominasi: k.denominasi,
        Kecamatan: k.kecamatan,
        Alamat: k.alamat,
        PendetaPastor: k.namaPendetaPastor,
        JumlahJemaat: k.jumlahJemaat,
        TahunBerdiri: k.tahunBerdiri,
        StatusBangunan: k.statusBangunan,
        Kontak: k.kontak
      }));
      exportToExcel(data, `Data_Tempat_Ibadah_Kristen_Mura_${timestamp}`, 'Bimas Kristen');
    } else if (activeSector === 'bimas-hindu') {
      const data = tempatIbadahHinduData.map(h => ({
        NamaTempatIbadah: h.namaTempatIbadah,
        Jenis: h.jenis,
        SekteTradisi: h.sekteTradisi,
        Kecamatan: h.kecamatan,
        Alamat: h.alamat,
        BasirPemimpin: h.namaBasirPemimpin,
        JumlahUmat: h.jumlahUmat,
        TahunBerdiri: h.tahunBerdiri,
        KegiatanRutin: h.kegiatanRutin,
        Kontak: h.kontak
      }));
      exportToExcel(data, `Data_Tempat_Ibadah_Hindu_Mura_${timestamp}`, 'Bimas Hindu');
    } else if (activeSector === 'bimas-budha') {
      const data = (tempatIbadahBudhaData || []).map(b => ({
        NamaTempatIbadah: b.namaVihara,
        Jenis: b.jenis,
        SekteTradisi: b.sekteTradisi,
        Kecamatan: b.kecamatan,
        Alamat: b.alamat,
        PanditaRomo: b.namaPanditaRomo,
        JumlahUmat: b.jumlahUmat,
        TahunBerdiri: b.tahunBerdiri,
        KegiatanRutin: b.kegiatanRutin,
        Kontak: b.kontak
      }));
      exportToExcel(data, `Data_Tempat_Ibadah_Budha_Mura_${timestamp}`, 'Bimas Budha');
    }
    showToast('File Excel (.xlsx) berhasil digenerate dan diunduh.');
  };

  const handleExportCSV = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    if (activeSector === 'kepegawaian') {
      exportToCSV(pegawaiData as any, `Data_Kepegawaian_Kemenag_Mura_${timestamp}`);
    } else if (activeSector === 'pendidikan-islam') {
      exportToCSV(lembagaPendisData as any, `Data_Lembaga_Pendis_Mura_${timestamp}`);
    } else if (activeSector === 'bimas-islam') {
      if (bimasIslamSubTab === 'rumah-ibadah') {
        exportToCSV(rumahIbadahIslamData as any, `Data_Rumah_Ibadah_Islam_Mura_${timestamp}`);
      } else {
        exportToCSV(kuaData as any, `Data_KUA_Kecamatan_Mura_${timestamp}`);
      }
    } else if (activeSector === 'bimas-kristen') {
      exportToCSV(tempatIbadahKristenData as any, `Data_Gereja_Kristen_Mura_${timestamp}`);
    } else if (activeSector === 'bimas-hindu') {
      exportToCSV(tempatIbadahHinduData as any, `Data_Balai_Hindu_Mura_${timestamp}`);
    } else if (activeSector === 'bimas-budha') {
      exportToCSV((tempatIbadahBudhaData || []) as any, `Data_Vihara_Budha_Mura_${timestamp}`);
    }
    showToast('File CSV berhasil diunduh.');
  };

  const handleExportPDF = () => {
    const timestamp = new Date().toISOString().slice(0, 10);

    if (activeSector === 'kepegawaian') {
      const headers = ['No', 'NIP', 'Nama & Gelar', 'Jabatan', 'Status', 'Gol', 'Unit Kerja', 'Pendidikan'];
      const rows = pegawaiData.map((p, idx) => [
        idx + 1,
        p.nip,
        `${p.nama}, ${p.gelar}`,
        p.jabatan,
        p.status,
        p.golongan,
        p.unitKerja,
        p.pendidikanTerakhir
      ]);
      exportToOfficialPDF({
        title: 'DAFTAR REKAPITULASI DATA APARATUR DAN PEGAWAI',
        subTitle: 'KANTOR KEMENTERIAN AGAMA KABUPATEN MURUNG RAYA',
        sectorName: 'Kepegawaian',
        headers,
        rows,
        fileName: `Laporan_Data_Kepegawaian_Kemenag_Mura_${timestamp}.pdf`
      });
    } else if (activeSector === 'pendidikan-islam') {
      const headers = ['No', 'NSM/NPSN', 'Nama Lembaga', 'Jenjang', 'Status', 'Kecamatan', 'Kepala Lembaga', 'Siswa', 'Guru', 'Akred'];
      const rows = lembagaPendisData.map((l, idx) => [
        idx + 1,
        `${l.nsm} / ${l.npsn}`,
        l.namaLembaga,
        l.jenjang,
        l.status,
        l.kecamatan,
        l.kepalaLembaga,
        l.jumlahSiswa,
        l.jumlahGuru,
        l.akreditasi
      ]);
      exportToOfficialPDF({
        title: 'DATA LEMBAGA PENDIDIKAN ISLAM BINAAN (MADRASAH & PESANTREN)',
        subTitle: 'SEKSI PENDIDIKAN ISLAM KEMENAG KABUPATEN MURUNG RAYA',
        sectorName: 'Pendidikan Islam',
        headers,
        rows,
        fileName: `Laporan_Data_Pendis_Kemenag_Mura_${timestamp}.pdf`
      });
    } else if (activeSector === 'bimas-islam') {
      if (bimasIslamSubTab === 'rumah-ibadah') {
        const headers = ['No', 'Nama Rumah Ibadah', 'Kategori', 'Kecamatan', 'Alamat', 'Kapasitas', 'Luas Tanah', 'Status Tanah', 'Ketua / Imam'];
        const rows = rumahIbadahIslamData.map((r, idx) => [
          idx + 1,
          r.nama,
          r.jenis,
          r.kecamatan,
          r.alamat,
          `${r.kapasitasJamaah} Jamaah`,
          `${r.luasTanahM2} m²`,
          r.statusTanah,
          r.namaPengurus
        ]);
        exportToOfficialPDF({
          title: 'DATA RUMAH IBADAH ISLAM (MASJID & MUSHALLA)',
          subTitle: 'SEKSI BIMBINGAN MASYARAKAT ISLAM KEMENAG KABUPATEN MURUNG RAYA',
          sectorName: 'Bimas Islam',
          headers,
          rows,
          fileName: `Laporan_Rumah_Ibadah_Islam_Mura_${timestamp}.pdf`
        });
      } else {
        const headers = ['No', 'Kode KUA', 'Nama KUA', 'Kecamatan', 'Kepala KUA', 'NIP Kepala', 'Alamat', 'Kontak', 'Nikah/Thn', 'Gedung'];
        const rows = kuaData.map((k, idx) => [
          idx + 1,
          k.kodeKua,
          k.namaKua,
          k.kecamatan,
          k.namaKepala,
          k.nipKepala,
          k.alamat,
          k.kontak,
          `${k.jumlahPeristiwaNikahTahun} psg`,
          k.statusGedung
        ]);
        exportToOfficialPDF({
          title: 'DATA KANTOR URUSAN AGAMA (KUA) KECAMATAN SE-KABUPATEN MURUNG RAYA',
          subTitle: 'SEKSI BIMBINGAN MASYARAKAT ISLAM KEMENAG KABUPATEN MURUNG RAYA',
          sectorName: 'Bimas Islam',
          headers,
          rows,
          fileName: `Laporan_Data_KUA_Kecamatan_Mura_${timestamp}.pdf`
        });
      }
    } else if (activeSector === 'bimas-kristen') {
      const headers = ['No', 'Nama Tempat Ibadah Gereja', 'Denominasi', 'Kecamatan', 'Alamat', 'Pendeta / Pastor', 'Jumlah Umat/Jemaat', 'Th Berdiri', 'Bangunan'];
      const rows = tempatIbadahKristenData.map((k, idx) => [
        idx + 1,
        k.namaGereja,
        k.denominasi,
        k.kecamatan,
        k.alamat,
        k.namaPendetaPastor,
        `${k.jumlahJemaat.toLocaleString('id-ID')} Jiwa`,
        k.tahunBerdiri,
        k.statusBangunan
      ]);
      exportToOfficialPDF({
        title: 'DATA TEMPAT IBADAH & JUMLAH UMAT KRISTIANI KABUPATEN MURUNG RAYA',
        subTitle: 'PENYELENGGARA BIMAS KRISTEN KEMENAG KABUPATEN MURUNG RAYA',
        sectorName: 'Bimas Kristen',
        headers,
        rows,
        fileName: `Laporan_Tempat_Ibadah_Kristen_Mura_${timestamp}.pdf`
      });
    } else if (activeSector === 'bimas-hindu') {
      const headers = ['No', 'Nama Balai / Tempat Ibadah', 'Jenis', 'Tradisi', 'Kecamatan', 'Alamat', 'Basir / Pemimpin', 'Jumlah Umat', 'Kegiatan Rutin'];
      const rows = tempatIbadahHinduData.map((h, idx) => [
        idx + 1,
        h.namaTempatIbadah,
        h.jenis,
        h.sekteTradisi,
        h.kecamatan,
        h.alamat,
        h.namaBasirPemimpin,
        `${h.jumlahUmat.toLocaleString('id-ID')} Jiwa`,
        h.kegiatanRutin
      ]);
      exportToOfficialPDF({
        title: 'DATA RUMAH IBADAH & JUMLAH UMAT HINDU KAHARINGAN KABUPATEN MURUNG RAYA',
        subTitle: 'PENYELENGGARA BIMAS HINDU KEMENAG KABUPATEN MURUNG RAYA',
        sectorName: 'Bimas Hindu',
        headers,
        rows,
        fileName: `Laporan_Rumah_Ibadah_Hindu_Mura_${timestamp}.pdf`
      });
    } else if (activeSector === 'bimas-budha') {
      const headers = ['No', 'Nama Vihara / Cetiya', 'Jenis', 'Sekte / Tradisi', 'Kecamatan', 'Alamat', 'Pandita / Romo', 'Jumlah Umat', 'Th Berdiri'];
      const rows = (tempatIbadahBudhaData || []).map((b, idx) => [
        idx + 1,
        b.namaVihara,
        b.jenis,
        b.sekteTradisi,
        b.kecamatan,
        b.alamat,
        b.namaPanditaRomo,
        `${b.jumlahUmat.toLocaleString('id-ID')} Jiwa`,
        b.tahunBerdiri
      ]);
      exportToOfficialPDF({
        title: 'DATA TEMPAT IBADAH & JUMLAH UMAT BUDDHA KABUPATEN MURUNG RAYA',
        subTitle: 'PENYELENGGARA BIMAS BUDDHA KEMENAG KABUPATEN MURUNG RAYA',
        sectorName: 'Bimas Buddha',
        headers,
        rows,
        fileName: `Laporan_Tempat_Ibadah_Budha_Mura_${timestamp}.pdf`
      });
    }

    showToast('Laporan PDF resmi dengan Kop Surat Kemenag Mura berhasil digenerate.');
  };

  // --- IMPORT HANDLERS ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportFile(file);
    setIsProcessingImport(true);
    setImportErrors([]);

    const result = await parseSpreadsheetFile(file);
    setIsProcessingImport(false);

    if (!result.success) {
      setImportErrors(result.errors);
      setImportPreviewData([]);
      return;
    }

    setImportPreviewData(result.data.slice(0, 10)); // preview first 10 rows
  };

  const handleConfirmImport = () => {
    if (!importFile || importPreviewData.length === 0) return;

    const count = importPreviewData.length;

    if (activeSector === 'kepegawaian') {
      const newItems: Pegawai[] = importPreviewData.map((row, idx) => ({
        id: `peg-imp-${Date.now()}-${idx}`,
        nip: String(row['NIP'] || row['nip'] || `199${Math.floor(10000000000000 + Math.random() * 9000000000000)}`),
        nama: String(row['Nama'] || row['nama'] || 'Pegawai Baru'),
        gelar: String(row['Gelar'] || row['gelar'] || 'S.Ag'),
        jabatan: String(row['Jabatan'] || row['jabatan'] || 'Pelaksana'),
        status: (String(row['Status'] || 'PNS') as any),
        golongan: String(row['Golongan'] || row['golongan'] || 'III/a'),
        unitKerja: String(row['UnitKerja'] || row['unitKerja'] || 'Subbag TU'),
        pendidikanTerakhir: String(row['Pendidikan'] || row['pendidikan'] || 'S1'),
        masaKerjaTahun: Number(row['MasaKerjaTahun'] || 5),
        kontak: String(row['Kontak'] || '08123456789'),
        email: String(row['Email'] || 'pegawai@kemenag.go.id')
      }));
      setPegawaiData(prev => [...prev, ...newItems]);
    } else if (activeSector === 'pendidikan-islam') {
      const newItems: LembagaPendis[] = importPreviewData.map((row, idx) => ({
        id: `lem-imp-${Date.now()}-${idx}`,
        nsm: String(row['NSM'] || row['nsm'] || '111262120000'),
        npsn: String(row['NPSN'] || row['npsn'] || '69000000'),
        namaLembaga: String(row['NamaLembaga'] || row['namaLembaga'] || 'Madrasah Binaan Baru'),
        jenjang: (String(row['Jenjang'] || 'MI') as any),
        status: (String(row['Status'] || 'Swasta') as any),
        kecamatan: String(row['Kecamatan'] || 'Murung'),
        alamat: String(row['Alamat'] || 'Kab. Murung Raya'),
        kepalaLembaga: String(row['KepalaLembaga'] || 'Kepala Madrasah'),
        jumlahSiswa: Number(row['JumlahSiswa'] || 100),
        jumlahGuru: Number(row['JumlahGuru'] || 10),
        akreditasi: (String(row['Akreditasi'] || 'B') as any),
        kontak: String(row['Kontak'] || '08123456789')
      }));
      setLembagaPendisData(prev => [...prev, ...newItems]);
    } else if (activeSector === 'bimas-islam') {
      if (bimasIslamSubTab === 'rumah-ibadah') {
        const newItems: RumahIbadahIslam[] = importPreviewData.map((row, idx) => ({
          id: `ri-imp-${Date.now()}-${idx}`,
          nama: String(row['NamaMasjid'] || row['nama'] || 'Masjid Baru'),
          jenis: (String(row['Jenis'] || 'Masjid Jami') as any),
          kecamatan: String(row['Kecamatan'] || 'Murung'),
          alamat: String(row['Alamat'] || 'Puruk Cahu'),
          kapasitasJamaah: Number(row['KapasitasJamaah'] || 300),
          luasTanahM2: Number(row['LuasTanahM2'] || 500),
          statusTanah: (String(row['StatusTanah'] || 'Wakaf') as any),
          namaPengurus: String(row['NamaPengurus'] || 'Pengurus BKM'),
          tahunBerdiri: Number(row['TahunBerdiri'] || 2010)
        }));
        setRumahIbadahIslamData(prev => [...prev, ...newItems]);
      } else {
        const newItems: KuaKecamatan[] = importPreviewData.map((row, idx) => ({
          id: `kua-imp-${Date.now()}-${idx}`,
          kodeKua: String(row['KodeKUA'] || '62.12.00'),
          namaKua: String(row['NamaKUA'] || 'KUA Baru'),
          kecamatan: String(row['Kecamatan'] || 'Murung'),
          namaKepala: String(row['NamaKepala'] || 'Kepala KUA'),
          nipKepala: String(row['NIPKepala'] || '198000000000000000'),
          alamat: String(row['Alamat'] || 'Puruk Cahu'),
          kontak: String(row['Kontak'] || '08123456789'),
          email: String(row['Email'] || 'kua@kemenag.go.id'),
          jumlahPeristiwaNikahTahun: Number(row['JumlahNikahTahun'] || 50),
          statusGedung: 'SBSN (Milik Sendiri)'
        }));
        setKuaData(prev => [...prev, ...newItems]);
      }
    } else if (activeSector === 'bimas-kristen') {
      const newItems: TempatIbadahKristen[] = importPreviewData.map((row, idx) => ({
        id: `gr-imp-${Date.now()}-${idx}`,
        namaGereja: String(row['NamaGereja'] || 'Gereja Baru'),
        denominasi: (String(row['Denominasi'] || 'GKE') as any),
        kecamatan: String(row['Kecamatan'] || 'Murung'),
        alamat: String(row['Alamat'] || 'Puruk Cahu'),
        namaPendetaPastor: String(row['NamaPendetaPastor'] || 'Pendeta Jemaat'),
        jumlahJemaat: Number(row['JumlahJemaat'] || 200),
        tahunBerdiri: Number(row['TahunBerdiri'] || 2000),
        statusBangunan: 'Permanen',
        kontak: String(row['Kontak'] || '08123456789')
      }));
      setTempatIbadahKristenData(prev => [...prev, ...newItems]);
    } else if (activeSector === 'bimas-hindu') {
      const newItems: TempatIbadahHindu[] = importPreviewData.map((row, idx) => ({
        id: `hd-imp-${Date.now()}-${idx}`,
        namaTempatIbadah: String(row['NamaTempatIbadah'] || 'Balai Basarah Baru'),
        jenis: (String(row['Jenis'] || 'Balai Basarah') as any),
        sekteTradisi: (String(row['SekteTradisi'] || 'Hindu Kaharingan') as any),
        kecamatan: String(row['Kecamatan'] || 'Murung'),
        alamat: String(row['Alamat'] || 'Kab. Murung Raya'),
        namaBasirPemimpin: String(row['NamaBasirPemimpin'] || 'Basir Upu'),
        jumlahUmat: Number(row['JumlahUmat'] || 150),
        tahunBerdiri: Number(row['TahunBerdiri'] || 1990),
        kegiatanRutin: String(row['KegiatanRutin'] || 'Ibadah Basarah berkala'),
        kontak: String(row['Kontak'] || '08123456789')
      }));
      setTempatIbadahHinduData(prev => [...prev, ...newItems]);
    } else if (activeSector === 'bimas-budha' && setTempatIbadahBudhaData) {
      const newItems: TempatIbadahBudha[] = importPreviewData.map((row, idx) => ({
        id: `bd-imp-${Date.now()}-${idx}`,
        namaVihara: String(row['NamaVihara'] || row['namaVihara'] || 'Cetiya Baru'),
        jenis: (String(row['Jenis'] || 'Cetiya') as any),
        sekteTradisi: (String(row['SekteTradisi'] || 'Mahayana') as any),
        kecamatan: String(row['Kecamatan'] || 'Murung'),
        alamat: String(row['Alamat'] || 'Puruk Cahu'),
        namaPanditaRomo: String(row['NamaPanditaRomo'] || 'Pandita Romo'),
        jumlahUmat: Number(row['JumlahUmat'] || 50),
        tahunBerdiri: Number(row['TahunBerdiri'] || 2015),
        kegiatanRutin: String(row['KegiatanRutin'] || 'Puja Bakti'),
        kontak: String(row['Kontak'] || '08123456789')
      }));
      setTempatIbadahBudhaData(prev => [...prev, ...newItems]);
    }

    setIsImportModalOpen(false);
    setImportFile(null);
    setImportPreviewData([]);
    showToast(`Berhasil mengimpor ${count} data baru ke dalam sistem!`);
  };

  // --- CRUD HANDLERS ---
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({});
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsAddEditModalOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data ini dari sistem?')) return;

    if (activeSector === 'kepegawaian') {
      setPegawaiData(prev => prev.filter(p => p.id !== id));
    } else if (activeSector === 'pendidikan-islam') {
      setLembagaPendisData(prev => prev.filter(l => l.id !== id));
    } else if (activeSector === 'bimas-islam') {
      if (bimasIslamSubTab === 'rumah-ibadah') {
        setRumahIbadahIslamData(prev => prev.filter(r => r.id !== id));
      } else {
        setKuaData(prev => prev.filter(k => k.id !== id));
      }
    } else if (activeSector === 'bimas-kristen') {
      setTempatIbadahKristenData(prev => prev.filter(k => k.id !== id));
    } else if (activeSector === 'bimas-hindu') {
      setTempatIbadahHinduData(prev => prev.filter(h => h.id !== id));
    } else if (activeSector === 'bimas-budha' && setTempatIbadahBudhaData) {
      setTempatIbadahBudhaData(prev => prev.filter(b => b.id !== id));
    }
    showToast('Data berhasil dihapus.');
  };

  const handleSaveFormData = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeSector === 'kepegawaian') {
      if (editingItem) {
        setPegawaiData(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...formData } : p));
      } else {
        const newItem: Pegawai = {
          id: `peg-${Date.now()}`,
          nip: formData.nip || '198501012015011001',
          nama: formData.nama || 'Pegawai Kemenag',
          gelar: formData.gelar || 'S.Ag',
          jabatan: formData.jabatan || 'Staf Pelaksana',
          status: formData.status || 'PNS',
          golongan: formData.golongan || 'III/a',
          unitKerja: formData.unitKerja || 'Subbag TU',
          pendidikanTerakhir: formData.pendidikanTerakhir || 'S1',
          masaKerjaTahun: Number(formData.masaKerjaTahun || 5),
          kontak: formData.kontak || '08123456789',
          email: formData.email || 'pegawai@kemenag.go.id'
        };
        setPegawaiData(prev => [newItem, ...prev]);
      }
    } else if (activeSector === 'pendidikan-islam') {
      if (editingItem) {
        setLembagaPendisData(prev => prev.map(l => l.id === editingItem.id ? { ...l, ...formData } : l));
      } else {
        const newItem: LembagaPendis = {
          id: `lem-${Date.now()}`,
          nsm: formData.nsm || '111262120000',
          npsn: formData.npsn || '69000000',
          namaLembaga: formData.namaLembaga || 'Madrasah Binaan',
          jenjang: formData.jenjang || 'MI',
          status: formData.status || 'Swasta',
          kecamatan: formData.kecamatan || 'Murung',
          alamat: formData.alamat || 'Puruk Cahu',
          kepalaLembaga: formData.kepalaLembaga || 'Kepala Madrasah',
          jumlahSiswa: Number(formData.jumlahSiswa || 120),
          jumlahGuru: Number(formData.jumlahGuru || 12),
          akreditasi: formData.akreditasi || 'B',
          kontak: formData.kontak || '08123456789'
        };
        setLembagaPendisData(prev => [newItem, ...prev]);
      }
    } else if (activeSector === 'bimas-islam') {
      if (bimasIslamSubTab === 'rumah-ibadah') {
        if (editingItem) {
          setRumahIbadahIslamData(prev => prev.map(r => r.id === editingItem.id ? { ...r, ...formData } : r));
        } else {
          const newItem: RumahIbadahIslam = {
            id: `ri-${Date.now()}`,
            nama: formData.nama || 'Masjid Baitul Izzah',
            jenis: formData.jenis || 'Masjid Jami',
            kecamatan: formData.kecamatan || 'Murung',
            alamat: formData.alamat || 'Puruk Cahu',
            kapasitasJamaah: Number(formData.kapasitasJamaah || 500),
            luasTanahM2: Number(formData.luasTanahM2 || 800),
            statusTanah: formData.statusTanah || 'Wakaf',
            namaPengurus: formData.namaPengurus || 'H. Syarkawi',
            tahunBerdiri: Number(formData.tahunBerdiri || 2012)
          };
          setRumahIbadahIslamData(prev => [newItem, ...prev]);
        }
      } else {
        if (editingItem) {
          setKuaData(prev => prev.map(k => k.id === editingItem.id ? { ...k, ...formData } : k));
        } else {
          const newItem: KuaKecamatan = {
            id: `kua-${Date.now()}`,
            kodeKua: formData.kodeKua || '62.12.11',
            namaKua: formData.namaKua || 'KUA Baru',
            kecamatan: formData.kecamatan || 'Murung',
            namaKepala: formData.namaKepala || 'Kepala KUA Baru',
            nipKepala: formData.nipKepala || '198000000000000000',
            alamat: formData.alamat || 'Jl. Trans',
            kontak: formData.kontak || '08123456789',
            email: formData.email || 'kua@kemenag.go.id',
            jumlahPeristiwaNikahTahun: Number(formData.jumlahPeristiwaNikahTahun || 40),
            statusGedung: formData.statusGedung || 'SBSN (Milik Sendiri)'
          };
          setKuaData(prev => [newItem, ...prev]);
        }
      }
    } else if (activeSector === 'bimas-kristen') {
      if (editingItem) {
        setTempatIbadahKristenData(prev => prev.map(k => k.id === editingItem.id ? { ...k, ...formData } : k));
      } else {
        const newItem: TempatIbadahKristen = {
          id: `gr-${Date.now()}`,
          namaGereja: formData.namaGereja || 'Gereja Baru',
          denominasi: formData.denominasi || 'GKE',
          kecamatan: formData.kecamatan || 'Murung',
          alamat: formData.alamat || 'Puruk Cahu',
          namaPendetaPastor: formData.namaPendetaPastor || 'Pdt. Johanes, S.Th',
          jumlahJemaat: Number(formData.jumlahJemaat || 250),
          tahunBerdiri: Number(formData.tahunBerdiri || 1995),
          statusBangunan: formData.statusBangunan || 'Permanen',
          kontak: formData.kontak || '08123456789'
        };
        setTempatIbadahKristenData(prev => [newItem, ...prev]);
      }
    } else if (activeSector === 'bimas-hindu') {
      if (editingItem) {
        setTempatIbadahHinduData(prev => prev.map(h => h.id === editingItem.id ? { ...h, ...formData } : h));
      } else {
        const newItem: TempatIbadahHindu = {
          id: `hd-${Date.now()}`,
          namaTempatIbadah: formData.namaTempatIbadah || 'Balai Basarah Baru',
          jenis: formData.jenis || 'Balai Basarah',
          sekteTradisi: formData.sekteTradisi || 'Hindu Kaharingan',
          kecamatan: formData.kecamatan || 'Murung',
          alamat: formData.alamat || 'Kab. Murung Raya',
          namaBasirPemimpin: formData.namaBasirPemimpin || 'Basir Upu',
          jumlahUmat: Number(formData.jumlahUmat || 220),
          tahunBerdiri: Number(formData.tahunBerdiri || 1985),
          kegiatanRutin: formData.kegiatanRutin || 'Ibadah Basarah',
          kontak: formData.kontak || '08123456789'
        };
        setTempatIbadahHinduData(prev => [newItem, ...prev]);
      }
    } else if (activeSector === 'bimas-budha' && setTempatIbadahBudhaData) {
      if (editingItem) {
        setTempatIbadahBudhaData(prev => prev.map(b => b.id === editingItem.id ? { ...b, ...formData } : b));
      } else {
        const newItem: TempatIbadahBudha = {
          id: `bd-${Date.now()}`,
          namaVihara: formData.namaVihara || formData.nama || 'Cetiya Baru',
          jenis: formData.jenis || 'Cetiya',
          sekteTradisi: formData.sekteTradisi || 'Mahayana',
          kecamatan: formData.kecamatan || 'Murung',
          alamat: formData.alamat || 'Puruk Cahu',
          namaPanditaRomo: formData.namaPanditaRomo || 'Pandita Romo',
          jumlahUmat: Number(formData.jumlahUmat || 45),
          tahunBerdiri: Number(formData.tahunBerdiri || 2015),
          kegiatanRutin: formData.kegiatanRutin || 'Puja Bakti',
          kontak: formData.kontak || '08123456789'
        };
        setTempatIbadahBudhaData(prev => [newItem, ...prev]);
      }
    }

    setIsAddEditModalOpen(false);
    showToast(editingItem ? 'Perubahan data berhasil disimpan.' : 'Data baru berhasil ditambahkan.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
          <span>Satu Data Kemenag</span>
          <span>·</span>
          <span>Sistem Informasi Terpadu</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Data dan Informasi Perbidang
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Pengelolaan data statistik resmi aparatur kepegawaian, lembaga pendidikan madrasah, rumah ibadah, KUA, serta peribadatan umat beragama di Kabupaten Murung Raya.
        </p>

        {/* 5 Sector Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          <button
            onClick={() => handleSectorChange('kepegawaian')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeSector === 'kepegawaian'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>1. Kepegawaian</span>
          </button>

          <button
            onClick={() => handleSectorChange('pendidikan-islam')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeSector === 'pendidikan-islam'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
            <span>2. Pendidikan Islam (SI PENDIS MURA)</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400 text-emerald-950 uppercase">
              Online
            </span>
          </button>

          <button
            onClick={() => handleSectorChange('bimas-islam')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeSector === 'bimas-islam'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>3. Bimas Islam (Masjid & KUA)</span>
          </button>

          <button
            onClick={() => handleSectorChange('bimas-kristen')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeSector === 'bimas-kristen'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Church className="w-3.5 h-3.5" />
            <span>4. Bimas Kristen</span>
          </button>

          <button
            onClick={() => handleSectorChange('bimas-hindu')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeSector === 'bimas-hindu'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>5. Bimas Hindu (Kaharingan)</span>
          </button>

          <button
            onClick={() => handleSectorChange('bimas-budha')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeSector === 'bimas-budha'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="font-bold text-sm">☸</span>
            <span>6. Bimas Budha</span>
          </button>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="bg-emerald-900 text-white p-3.5 rounded-xl flex items-center justify-between text-xs shadow-md animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-300 hover:text-white">✕</button>
        </div>
      )}

      {/* ACTION BAR: SEARCH, IMPORT, EXPORT EXCEL, EXPORT PDF, TAMBAH DATA */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        
        {/* Sub-tab if Bimas Islam is selected */}
        {activeSector === 'bimas-islam' && (
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Pilih Data Bimas:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setBimasIslamSubTab('rumah-ibadah')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  bimasIslamSubTab === 'rumah-ibadah'
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Rumah Ibadah (Masjid & Mushalla)
              </button>
              <button
                onClick={() => setBimasIslamSubTab('kua')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  bimasIslamSubTab === 'kua'
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Data 10 KUA Kecamatan
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Table Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari dalam tabel..."
              value={searchTable}
              onChange={(e) => setSearchTable(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Action Buttons: Import, Export, Add */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Download Template */}
            <button
              onClick={() => downloadImportTemplate(activeSector, bimasIslamSubTab)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="Unduh Contoh Template Format Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Template Excel</span>
            </button>

            {/* Import Button */}
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-700" />
              <span>Impor Data (.xlsx / .csv)</span>
            </button>

            {/* Export Excel */}
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200 rounded-lg transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ekspor Excel</span>
            </button>

            {/* Export PDF */}
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-rose-700" />
              <span>Ekspor PDF Resmi</span>
            </button>

            {/* Tambah Data Baru */}
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-2xs transition-colors ml-auto sm:ml-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Data</span>
            </button>
          </div>

        </div>
      </div>

      {/* SECTOR 1: DATA KEPEGAWAIAN */}
      {activeSector === 'kepegawaian' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Total Pegawai Terdata</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{pegawaiData.length} Orang</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Pegawai Negeri Sipil (PNS)</div>
              <div className="text-2xl font-bold text-emerald-800 mt-1 font-mono tabular-nums">
                {pegawaiData.filter(p => p.status === 'PNS').length} Orang
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">PPPK & PPNPN</div>
              <div className="text-2xl font-bold text-blue-800 mt-1 font-mono tabular-nums">
                {pegawaiData.filter(p => p.status !== 'PNS').length} Orang
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-semibold">
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4 w-44">NIP</th>
                    <th className="py-3 px-4">Nama Lengkap & Gelar</th>
                    <th className="py-3 px-4">Jabatan</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Gol</th>
                    <th className="py-3 px-4">Unit Kerja</th>
                    <th className="py-3 px-4">Pendidikan</th>
                    <th className="py-3 px-4 text-center">Masa Kerja</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pegawaiData
                    .filter(p => 
                      !searchTable ||
                      p.nama.toLowerCase().includes(searchTable.toLowerCase()) ||
                      p.nip.includes(searchTable) ||
                      p.jabatan.toLowerCase().includes(searchTable.toLowerCase()) ||
                      p.unitKerja.toLowerCase().includes(searchTable.toLowerCase())
                    )
                    .map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4 font-mono font-medium text-slate-800">{item.nip}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{item.nama}, {item.gelar}</td>
                        <td className="py-3 px-4 text-slate-700">{item.jabatan}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                            item.status === 'PNS' ? 'bg-emerald-100 text-emerald-800' :
                            item.status === 'PPPK' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">{item.golongan}</td>
                        <td className="py-3 px-4 text-slate-700">{item.unitKerja}</td>
                        <td className="py-3 px-4 text-slate-600">{item.pendidikanTerakhir}</td>
                        <td className="py-3 px-4 text-center font-mono">{item.masaKerjaTahun} Thn</td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1 text-slate-400 hover:text-emerald-700 mr-1"
                            title="Edit Data"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-700"
                            title="Hapus Data"
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
        </div>
      )}

      {/* SECTOR 2: INTEGRASI RESMI SI PENDIS MURA (sipendismura.my.id) */}
      {activeSector === 'pendidikan-islam' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Integration Banner */}
          <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-amber-300 text-xs font-semibold border border-emerald-600/50">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sistem Informasi Terpadu Seksi Pendidikan Islam</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  SI PENDIS MURA (sipendismura.my.id)
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  Pengelolaan data kelembagaan madrasah (RA, MI, MTs, MA, Pondok Pesantren), data guru pendidik, siswa, serta perizinan operasional kini dikelola secara terpusat melalui portal resmi <strong>sipendismura.my.id</strong>.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://sipendismura.my.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Buka sipendismura.my.id di Tab Baru</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-xs text-emerald-200">
                    Sistem aktif & tersinkronisasi 24/7
                  </span>
                </div>
              </div>

              {/* 3 Core Services of SI PENDIS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 min-w-[260px]">
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <div className="font-bold text-amber-300 text-xs">EMIS Madrasah 4.0</div>
                  <div className="text-[11px] text-emerald-100 mt-0.5">Pendataan Kelembagaan & Siswa</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <div className="font-bold text-amber-300 text-xs">SIMPATIKA Kemenag</div>
                  <div className="text-[11px] text-emerald-100 mt-0.5">Tunjangan Profesi & Sertifikasi Guru</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <div className="font-bold text-amber-300 text-xs">Izin Operasional LPQ / Pontren</div>
                  <div className="text-[11px] text-emerald-100 mt-0.5">Verifikasi & Penerbitan Rekomendasi</div>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Interactive Viewer for sipendismura.my.id */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between border-b border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span className="font-mono text-emerald-300 text-[11px] sm:text-xs">
                  https://sipendismura.my.id
                </span>
                <span className="hidden sm:inline text-slate-500">|</span>
                <span className="hidden sm:inline text-slate-300 text-[11px]">
                  Jendela Aplikasi Resmi Terbuka di Portal
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://sipendismura.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-white rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1.5"
                  title="Buka di peramban penuh"
                >
                  <span>Layar Penuh</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="w-full h-[680px] bg-slate-100 relative">
              <iframe
                src="https://sipendismura.my.id"
                title="Sistem Informasi Pendidikan Islam Kab. Murung Raya (SI PENDIS MURA)"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTOR 3: BIMAS ISLAM (RUMAH IBADAH & KUA) */}
      {activeSector === 'bimas-islam' && (
        <div className="space-y-4 animate-fadeIn">
          {bimasIslamSubTab === 'rumah-ibadah' ? (
            <div>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-semibold">
                        <th className="py-3 px-4 w-12 text-center">No</th>
                        <th className="py-3 px-4">Nama Rumah Ibadah</th>
                        <th className="py-3 px-4">Jenis</th>
                        <th className="py-3 px-4">Kecamatan</th>
                        <th className="py-3 px-4">Alamat</th>
                        <th className="py-3 px-4 text-center">Kapasitas</th>
                        <th className="py-3 px-4 text-center">Luas Tanah</th>
                        <th className="py-3 px-4">Status Tanah</th>
                        <th className="py-3 px-4">Pengurus / BKM</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rumahIbadahIslamData
                        .filter(r => 
                          !searchTable ||
                          r.nama.toLowerCase().includes(searchTable.toLowerCase()) ||
                          r.kecamatan.toLowerCase().includes(searchTable.toLowerCase()) ||
                          r.jenis.toLowerCase().includes(searchTable.toLowerCase())
                        )
                        .map((item, idx) => (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                            <td className="py-3 px-4 font-bold text-slate-900">{item.nama}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                                {item.jenis}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-700">{item.kecamatan}</td>
                            <td className="py-3 px-4 text-slate-600 truncate max-w-[200px]">{item.alamat}</td>
                            <td className="py-3 px-4 text-center font-mono">{item.kapasitasJamaah} org</td>
                            <td className="py-3 px-4 text-center font-mono">{item.luasTanahM2} m²</td>
                            <td className="py-3 px-4 text-slate-700">{item.statusTanah}</td>
                            <td className="py-3 px-4 text-slate-700">{item.namaPengurus}</td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleOpenEditModal(item)}
                                className="p-1 text-slate-400 hover:text-emerald-700 mr-1"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="p-1 text-slate-400 hover:text-rose-700"
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
            </div>
          ) : (
            <div>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-semibold">
                        <th className="py-3 px-4 w-12 text-center">No</th>
                        <th className="py-3 px-4 w-32">Kode KUA</th>
                        <th className="py-3 px-4">Nama Kantor Urusan Agama</th>
                        <th className="py-3 px-4">Kecamatan</th>
                        <th className="py-3 px-4">Kepala KUA</th>
                        <th className="py-3 px-4">NIP Kepala</th>
                        <th className="py-3 px-4">Kontak / Telepon</th>
                        <th className="py-3 px-4 text-center">Nikah / Thn</th>
                        <th className="py-3 px-4">Status Gedung</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {kuaData
                        .filter(k => 
                          !searchTable ||
                          k.namaKua.toLowerCase().includes(searchTable.toLowerCase()) ||
                          k.kecamatan.toLowerCase().includes(searchTable.toLowerCase()) ||
                          k.namaKepala.toLowerCase().includes(searchTable.toLowerCase())
                        )
                        .map((item, idx) => (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                            <td className="py-3 px-4 font-mono font-medium text-emerald-800">{item.kodeKua}</td>
                            <td className="py-3 px-4 font-bold text-slate-900">{item.namaKua}</td>
                            <td className="py-3 px-4 text-slate-700">{item.kecamatan}</td>
                            <td className="py-3 px-4 text-slate-900 font-medium">{item.namaKepala}</td>
                            <td className="py-3 px-4 font-mono text-slate-500">{item.nipKepala}</td>
                            <td className="py-3 px-4 font-mono text-slate-600">{item.kontak}</td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-emerald-800">
                              {item.jumlahPeristiwaNikahTahun} psg
                            </td>
                            <td className="py-3 px-4 text-slate-700">{item.statusGedung}</td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleOpenEditModal(item)}
                                className="p-1 text-slate-400 hover:text-emerald-700 mr-1"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="p-1 text-slate-400 hover:text-rose-700"
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
            </div>
          )}
        </div>
      )}

      {/* SECTOR 4: BIMAS KRISTEN */}
      {activeSector === 'bimas-kristen' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Total Gereja Terdaftar</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{tempatIbadahKristenData.length} Tempat Ibadah</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Total Jumlah Jemaat / Umat</div>
              <div className="text-2xl font-bold text-emerald-800 mt-1 font-mono tabular-nums">
                {tempatIbadahKristenData.reduce((acc, curr) => acc + curr.jumlahJemaat, 0).toLocaleString('id-ID')} Jiwa
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Denominasi Mayoritas</div>
              <div className="text-2xl font-bold text-blue-800 mt-1">GKE & Katolik</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-semibold">
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4">Nama Gereja / Tempat Ibadah</th>
                    <th className="py-3 px-4">Denominasi</th>
                    <th className="py-3 px-4">Kecamatan</th>
                    <th className="py-3 px-4">Alamat</th>
                    <th className="py-3 px-4">Pendeta / Pastor</th>
                    <th className="py-3 px-4 text-center">Jumlah Umat</th>
                    <th className="py-3 px-4 text-center">Th Berdiri</th>
                    <th className="py-3 px-4">Bangunan</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tempatIbadahKristenData
                    .filter(k => 
                      !searchTable ||
                      k.namaGereja.toLowerCase().includes(searchTable.toLowerCase()) ||
                      k.denominasi.toLowerCase().includes(searchTable.toLowerCase()) ||
                      k.kecamatan.toLowerCase().includes(searchTable.toLowerCase())
                    )
                    .map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{item.namaGereja}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-semibold text-[10px]">
                            {item.denominasi}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{item.kecamatan}</td>
                        <td className="py-3 px-4 text-slate-600">{item.alamat}</td>
                        <td className="py-3 px-4 text-slate-800">{item.namaPendetaPastor}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-emerald-800">
                          {item.jumlahJemaat.toLocaleString('id-ID')} Jiwa
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-slate-600">{item.tahunBerdiri}</td>
                        <td className="py-3 px-4 text-slate-700">{item.statusBangunan}</td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1 text-slate-400 hover:text-emerald-700 mr-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-700"
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
        </div>
      )}

      {/* SECTOR 5: BIMAS HINDU (KAHARINGAN) */}
      {activeSector === 'bimas-hindu' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Balai Basarah & Pura</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{tempatIbadahHinduData.length} Rumah Ibadah</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Total Umat Hindu Kaharingan</div>
              <div className="text-2xl font-bold text-amber-700 mt-1 font-mono tabular-nums">
                {tempatIbadahHinduData.reduce((acc, curr) => acc + curr.jumlahUmat, 0).toLocaleString('id-ID')} Jiwa
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Pusat Peribadatan Adat</div>
              <div className="text-2xl font-bold text-emerald-800 mt-1">Kec. Tanah Siang & Murung</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-semibold">
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4">Nama Balai Basarah / Pura</th>
                    <th className="py-3 px-4">Jenis</th>
                    <th className="py-3 px-4">Sekte / Tradisi</th>
                    <th className="py-3 px-4">Kecamatan</th>
                    <th className="py-3 px-4">Alamat</th>
                    <th className="py-3 px-4">Basir / Pemimpin Upacara</th>
                    <th className="py-3 px-4 text-center">Jumlah Umat</th>
                    <th className="py-3 px-4">Kegiatan Rutin</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tempatIbadahHinduData
                    .filter(h => 
                      !searchTable ||
                      h.namaTempatIbadah.toLowerCase().includes(searchTable.toLowerCase()) ||
                      h.kecamatan.toLowerCase().includes(searchTable.toLowerCase()) ||
                      h.namaBasirPemimpin.toLowerCase().includes(searchTable.toLowerCase())
                    )
                    .map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{item.namaTempatIbadah}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-semibold text-[10px]">
                            {item.jenis}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{item.sekteTradisi}</td>
                        <td className="py-3 px-4 text-slate-700">{item.kecamatan}</td>
                        <td className="py-3 px-4 text-slate-600">{item.alamat}</td>
                        <td className="py-3 px-4 text-slate-900 font-medium">{item.namaBasirPemimpin}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-amber-800">
                          {item.jumlahUmat.toLocaleString('id-ID')} Jiwa
                        </td>
                        <td className="py-3 px-4 text-slate-600 truncate max-w-[180px]">{item.kegiatanRutin}</td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1 text-slate-400 hover:text-emerald-700 mr-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-700"
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
        </div>
      )}

      {/* 6. TAB DATA BIMAS BUDHA */}
      {activeSector === 'bimas-budha' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Total Vihara & Cetiya</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
                {tempatIbadahBudhaData.length} Lembaga
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Estimasi Jumlah Umat</div>
              <div className="text-2xl font-bold text-cyan-700 mt-1 font-mono">
                {tempatIbadahBudhaData.reduce((acc, curr) => acc + curr.jumlahUmat, 0).toLocaleString('id-ID')} Jiwa
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Tradisi Terdaftar</div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                Mahayana, Buddhayana, Theravada, Maitreya
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Pusat Peribadatan</div>
              <div className="text-sm font-bold text-cyan-800 mt-1">
                Puruk Cahu & Muara Laung
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-semibold">
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4">Nama Vihara / Cetiya</th>
                    <th className="py-3 px-4">Jenis</th>
                    <th className="py-3 px-4">Sekte / Tradisi</th>
                    <th className="py-3 px-4">Kecamatan</th>
                    <th className="py-3 px-4">Alamat</th>
                    <th className="py-3 px-4">Pandita / Romo</th>
                    <th className="py-3 px-4 text-center">Jumlah Umat</th>
                    <th className="py-3 px-4">Kegiatan Rutin</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tempatIbadahBudhaData
                    .filter(b => 
                      !searchTable ||
                      b.namaVihara.toLowerCase().includes(searchTable.toLowerCase()) ||
                      b.kecamatan.toLowerCase().includes(searchTable.toLowerCase()) ||
                      b.namaPanditaRomo.toLowerCase().includes(searchTable.toLowerCase())
                    )
                    .map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{item.namaVihara}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-800 font-semibold text-[10px]">
                            {item.jenis}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{item.sekteTradisi}</td>
                        <td className="py-3 px-4 text-slate-700">{item.kecamatan}</td>
                        <td className="py-3 px-4 text-slate-600">{item.alamat}</td>
                        <td className="py-3 px-4 text-slate-900 font-medium">{item.namaPanditaRomo}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-cyan-800">
                          {item.jumlahUmat.toLocaleString('id-ID')} Jiwa
                        </td>
                        <td className="py-3 px-4 text-slate-600 truncate max-w-[180px]">{item.kegiatanRutin}</td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1 text-slate-400 hover:text-cyan-700 mr-1"
                            title="Edit Data"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-700"
                            title="Hapus Data"
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
        </div>
      )}

      {/* IMPORT SPREADSHEET MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-emerald-700" />
                  <span>Impor Data Spreadsheet ({activeSector.toUpperCase()})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Unggah berkas Excel (.xlsx, .xls) atau CSV untuk memasukkan data secara massal.
                </p>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* Template Download Prompt */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-xs">
              <div className="text-emerald-900">
                Gunakan template resmi Kemenag Mura agar kolom otomatis terpetakan:
              </div>
              <button
                onClick={() => downloadImportTemplate(activeSector, bimasIslamSubTab)}
                className="px-3 py-1.5 font-semibold text-emerald-950 bg-emerald-200 hover:bg-emerald-300 rounded-md transition-colors shrink-0"
              >
                Unduh Template
              </button>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors bg-slate-50">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                className="hidden"
                id="spreadsheet-file-upload"
              />
              <label 
                htmlFor="spreadsheet-file-upload"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  {importFile ? importFile.name : 'Klik untuk memilih file Excel atau CSV'}
                </div>
                <div className="text-[11px] text-slate-400">
                  Format yang didukung: Microsoft Excel (.xlsx, .xls) atau .csv
                </div>
              </label>
            </div>

            {/* Parsing Errors */}
            {importErrors.length > 0 && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs space-y-1">
                {importErrors.map((err, idx) => (
                  <div key={idx}>· {err}</div>
                ))}
              </div>
            )}

            {/* Live Data Preview */}
            {importPreviewData.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    Pratinjau Data ({importPreviewData.length} baris terdeteksi):
                  </span>
                  <span className="text-emerald-700 font-medium">Validasi Berhasil</span>
                </div>
                <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg text-[11px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 sticky top-0">
                      <tr>
                        {Object.keys(importPreviewData[0]).slice(0, 5).map((k) => (
                          <th key={k} className="p-2 border-b border-slate-200">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {importPreviewData.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100">
                          {Object.values(row).slice(0, 5).map((v: any, cIdx) => (
                            <td key={cIdx} className="p-2 truncate max-w-[120px]">{String(v)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmImport}
                disabled={importPreviewData.length === 0}
                className={`px-5 py-2 text-xs font-semibold text-white rounded-lg transition-colors ${
                  importPreviewData.length > 0
                    ? 'bg-emerald-800 hover:bg-emerald-900'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                Simpan & Gabungkan Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD & EDIT FORM MODAL */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full my-8 p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingItem ? 'Edit Data Terpilih' : 'Tambah Data Baru'} ({activeSector})
              </h3>
              <button
                onClick={() => setIsAddEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFormData} className="space-y-4 text-xs">
              
              {/* Form fields based on Sector */}
              {activeSector === 'kepegawaian' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">NIP</label>
                      <input
                        type="text"
                        required
                        value={formData.nip || ''}
                        onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="198501012015011001"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={formData.nama || ''}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="Nama Pegawai"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Gelar</label>
                      <input
                        type="text"
                        value={formData.gelar || ''}
                        onChange={(e) => setFormData({ ...formData, gelar: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="S.Ag., M.Pd"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Jabatan</label>
                      <input
                        type="text"
                        required
                        value={formData.jabatan || ''}
                        onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="Jabatan Kedinasan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Status</label>
                      <select
                        value={formData.status || 'PNS'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="PNS">PNS</option>
                        <option value="PPPK">PPPK</option>
                        <option value="PPNPN">PPNPN</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Golongan</label>
                      <input
                        type="text"
                        value={formData.golongan || ''}
                        onChange={(e) => setFormData({ ...formData, golongan: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="III/a atau IX"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Masa Kerja (Thn)</label>
                      <input
                        type="number"
                        value={formData.masaKerjaTahun || ''}
                        onChange={(e) => setFormData({ ...formData, masaKerjaTahun: Number(e.target.value) })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Unit Kerja</label>
                    <input
                      type="text"
                      value={formData.unitKerja || ''}
                      onChange={(e) => setFormData({ ...formData, unitKerja: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                      placeholder="Subbag TU / Seksi Pendis / KUA"
                    />
                  </div>
                </>
              )}

              {activeSector === 'pendidikan-islam' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">NSM</label>
                      <input
                        type="text"
                        required
                        value={formData.nsm || ''}
                        onChange={(e) => setFormData({ ...formData, nsm: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="111262120001"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">NPSN</label>
                      <input
                        type="text"
                        value={formData.npsn || ''}
                        onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="69787123"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nama Lembaga Binaan</label>
                    <input
                      type="text"
                      required
                      value={formData.namaLembaga || ''}
                      onChange={(e) => setFormData({ ...formData, namaLembaga: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                      placeholder="Contoh: MTs Darul Ulum"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Jenjang</label>
                      <select
                        value={formData.jenjang || 'MI'}
                        onChange={(e) => setFormData({ ...formData, jenjang: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="RA">RA</option>
                        <option value="MI">MI</option>
                        <option value="MTs">MTs</option>
                        <option value="MA">MA</option>
                        <option value="Pondok Pesantren">Pesantren</option>
                        <option value="TPQ/MDTA">TPQ/MDTA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Kecamatan</label>
                      <input
                        type="text"
                        value={formData.kecamatan || ''}
                        onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="Murung / Saripoi"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Akreditasi</label>
                      <select
                        value={formData.akreditasi || 'B'}
                        onChange={(e) => setFormData({ ...formData, akreditasi: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="Belum Terakreditasi">Belum</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Jumlah Siswa</label>
                      <input
                        type="number"
                        value={formData.jumlahSiswa || ''}
                        onChange={(e) => setFormData({ ...formData, jumlahSiswa: Number(e.target.value) })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Jumlah Guru</label>
                      <input
                        type="number"
                        value={formData.jumlahGuru || ''}
                        onChange={(e) => setFormData({ ...formData, jumlahGuru: Number(e.target.value) })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="12"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Other sectors default simple inputs */}
              {activeSector !== 'kepegawaian' && activeSector !== 'pendidikan-islam' && (
                <>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nama Rumah Ibadah / KUA / Balai</label>
                    <input
                      type="text"
                      required
                      value={formData.nama || formData.namaGereja || formData.namaTempatIbadah || formData.namaKua || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({
                          ...formData,
                          nama: val,
                          namaGereja: val,
                          namaTempatIbadah: val,
                          namaKua: val
                        });
                      }}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                      placeholder="Masukkan nama resmi tempat ibadah / kantor"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Kecamatan</label>
                      <input
                        type="text"
                        value={formData.kecamatan || ''}
                        onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="Murung / Tanah Siang / dll"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Jumlah Umat / Jamaah</label>
                      <input
                        type="number"
                        value={formData.kapasitasJamaah || formData.jumlahJemaat || formData.jumlahUmat || formData.jumlahPeristiwaNikahTahun || ''}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setFormData({
                            ...formData,
                            kapasitasJamaah: val,
                            jumlahJemaat: val,
                            jumlahUmat: val,
                            jumlahPeristiwaNikahTahun: val
                          });
                        }}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        placeholder="Kapasitas atau jumlah jemaat"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Alamat Lengkap</label>
                    <input
                      type="text"
                      value={formData.alamat || ''}
                      onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                      placeholder="Alamat di Murung Raya"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
                >
                  Simpan Data
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
