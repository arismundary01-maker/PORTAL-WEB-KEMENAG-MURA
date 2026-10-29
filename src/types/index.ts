export type NavigationTab = 
  | 'beranda' 
  | 'profil' 
  | 'berita' 
  | 'pengumuman' 
  | 'data-informasi' 
  | 'galeri'
  | 'ptsp';

export type ProfilSubTab = 'visi-misi' | 'struktur' | 'pejabat';

export type DataSectorTab = 
  | 'kepegawaian' 
  | 'pendidikan-islam' 
  | 'bimas-islam' 
  | 'bimas-kristen' 
  | 'bimas-hindu';

export interface Pegawai {
  id: string;
  nip: string;
  nama: string;
  gelar: string;
  jabatan: string;
  status: 'PNS' | 'PPPK' | 'PPNPN';
  golongan: string;
  unitKerja: string;
  pendidikanTerakhir: string;
  masaKerjaTahun: number;
  kontak: string;
  email: string;
}

export interface LembagaPendis {
  id: string;
  nsm: string;
  npsn: string;
  namaLembaga: string;
  jenjang: 'RA' | 'MI' | 'MTs' | 'MA' | 'Pondok Pesantren' | 'TPQ/MDTA';
  status: 'Negeri' | 'Swasta';
  kecamatan: string;
  alamat: string;
  kepalaLembaga: string;
  jumlahSiswa: number;
  jumlahGuru: number;
  akreditasi: 'A' | 'B' | 'C' | 'Belum Terakreditasi';
  kontak: string;
}

export interface RumahIbadahIslam {
  id: string;
  nama: string;
  jenis: 'Masjid Agung' | 'Masjid Jami' | 'Masjid Besar' | 'Mushalla' | 'Langgar';
  kecamatan: string;
  alamat: string;
  kapasitasJamaah: number;
  luasTanahM2: number;
  statusTanah: 'Wakaf' | 'Hibah' | 'Milik Yayasan' | 'Pemerintah';
  namaPengurus: string;
  tahunBerdiri: number;
}

export interface KuaKecamatan {
  id: string;
  kodeKua: string;
  namaKua: string;
  kecamatan: string;
  namaKepala: string;
  nipKepala: string;
  alamat: string;
  kontak: string;
  email: string;
  jumlahPeristiwaNikahTahun: number;
  statusGedung: 'SBSN (Milik Sendiri)' | 'Milik Pemda' | 'Sewa / Pinjam Pakai';
}

export interface TempatIbadahKristen {
  id: string;
  namaGereja: string;
  denominasi: 'GKE' | 'GPdI' | 'GSJA' | 'GBI' | 'Katolik' | 'Lainnya';
  kecamatan: string;
  alamat: string;
  namaPendetaPastor: string;
  jumlahJemaat: number;
  tahunBerdiri: number;
  statusBangunan: 'Permanen' | 'Semi Permanen';
  kontak: string;
}

export interface TempatIbadahHindu {
  id: string;
  namaTempatIbadah: string;
  jenis: 'Balai Basarah' | 'Pura' | 'Sanggar';
  sekteTradisi: 'Hindu Kaharingan' | 'Hindu Dharma';
  kecamatan: string;
  alamat: string;
  namaBasirPemimpin: string;
  jumlahUmat: number;
  tahunBerdiri: number;
  kegiatanRutin: string;
  kontak: string;
}

export interface Berita {
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: 'Pendidikan Islam' | 'Bimas Islam' | 'Haji & Umrah' | 'Kerukunan Umat' | 'Kepegawaian' | 'Kegiatan Kemenag';
  penulis: string;
  jabatanPenulis: string;
  tanggalUnggah: string;
  waktuBaca: string;
  dibaca: number;
  gambarUrl?: string;
  tags: string[];
  featured?: boolean;
}

export interface Pengumuman {
  id: string;
  nomorSurat: string;
  judul: string;
  ringkasan: string;
  isiLengkap: string;
  kategori: 'Beasiswa & Guru' | 'PPDB & Madrasah' | 'Lelang & Pengadaan' | 'Surat Edaran' | 'Formasi & Kepegawaian' | 'Haji & Umrah';
  tanggalUnggah: string;
  batasWaktu?: string;
  fileLampiranNama: string;
  ukuranFile: string;
  dikeluarkanOleh: string;
  status: 'Aktif' | 'Berakhir';
}

export interface PejabatEselon {
  id: string;
  nama: string;
  gelar: string;
  nip: string;
  jabatan: string;
  eselon: 'Eselon III/a' | 'Eselon IV/a' | 'Subkoordinator' | 'Fungsional Tertentu';
  pangkatGolongan: string;
  unitKerja: string;
  riwayatSingkat: string;
  pendidikan: string;
  kontakKedinasan: string;
  fotoUrl?: string;
}

export interface GaleriKegiatan {
  id: string;
  judul: string;
  kategori: 'HAB Kemenag' | 'Pembinaan ASN' | 'Kerukunan & FKUB' | 'Pendidikan Madrasah' | 'Bimbingan Haji' | 'Kunjungan Kerja';
  tanggal: string;
  lokasi: string;
  deskripsi: string;
  fotografer: string;
  jumlahFoto: number;
  gambarUrl?: string;
  tags: string[];
}
