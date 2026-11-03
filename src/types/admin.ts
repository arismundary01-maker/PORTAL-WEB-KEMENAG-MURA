export type AdminTab = 
  | 'ringkasan' 
  | 'kelola-profil'
  | 'kelola-berita' 
  | 'kelola-pengumuman' 
  | 'kelola-galeri' 
  | 'kelola-data-keagamaan' 
  | 'antrean-ptsp' 
  | 'pengaturan'
  | 'sipendis-mura';

export type AdminRoleType = 'super_admin' | 'humas' | 'operator_seksi';

export type OperatorSeksiType = 
  | 'kepegawaian' 
  | 'pendis' 
  | 'bimas-islam' 
  | 'bimas-kristen' 
  | 'bimas-hindu' 
  | 'bimas-budha'
  | 'phu';

export type HeaderThemeType = 'emerald' | 'navy' | 'forest' | 'maroon' | 'custom';
export type LogoType = 'kemenag-ri' | 'kemenag-kalteng' | 'pemkab-mura' | 'custom';

export interface PortalConfig {
  namaInstansi: string;
  subInstansi: string;
  tagline: string;
  telepon: string;
  email: string;
  alamat: string;
  ptspUrl: string;
  sipendisUrl: string;
  logoType: LogoType;
  customLogoUrl?: string;
  headerTheme: HeaderThemeType;
  customHeaderColor?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password?: string;
  nama: string;
  gelar: string;
  nip: string;
  email: string;
  roleType: AdminRoleType;
  roleLabel: string;
  operatorSeksi?: OperatorSeksiType;
  seksiLabel?: string;
  kewenanganDeskripsi: string;
  jabatan: string;
  foto?: string;
  loginTime: string;
  isActive?: boolean;
}

export interface AuditLog {
  id: string;
  waktu: string;
  adminName: string;
  aksi: string;
  modul: string;
  keterangan: string;
  ipAddress: string;
}

export interface PtspPermohonan {
  id: string;
  nomorTiket: string;
  namaPemohon: string;
  nik: string;
  kontak: string;
  asalKecamatan: string;
  jenisLayanan: string;
  tanggalMasuk: string;
  status: 'Menunggu Verifikasi' | 'Diproses Seksi Teknis' | 'Selesai / Terbit' | 'Ditolak';
  posisiSeksi: string;
  catatanPetugas?: string;
}

