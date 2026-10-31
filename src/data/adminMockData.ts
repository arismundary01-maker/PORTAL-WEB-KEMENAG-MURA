import { AdminUser, AuditLog, PtspPermohonan } from '../types/admin';

export const ADMIN_USERS: AdminUser[] = [
  // 1. Admin Super (Akses & Edit Semua Data Portal)
  {
    id: "adm-super-01",
    username: "superadmin",
    nama: "Bambang Kurniawan",
    gelar: "S.Kom",
    nip: "199002142019031008",
    email: "superadmin@kemenagmura.go.id",
    roleType: "super_admin",
    roleLabel: "Admin Super (Administrator Utama)",
    kewenanganDeskripsi: "Akses penuh dan hak cipta/edit seluruh modul data, berita, pengumuman, galeri, seksi perbidang, antrean PTSP, serta pengaturan portal.",
    jabatan: "Pranata Komputer Ahli Pertama / Koordinator IT Kankemenag",
    loginTime: "2026-10-31 08:30 WIB"
  },

  // 2. Humas & Publikasi (Akses & Edit Warta Berita dan Galeri Kegiatan)
  {
    id: "adm-humas-01",
    username: "humas",
    nama: "Nurul Hidayati",
    gelar: "S.I.Kom",
    nip: "199407182020122011",
    email: "humas@kemenagmura.go.id",
    roleType: "humas",
    roleLabel: "Humas & Protokoler",
    kewenanganDeskripsi: "Kewenangan khusus mengelola, menulis, mengedit, dan mempublikasikan Berita Terkini, Pengumuman Dinas, serta Dokumentasi Galeri Kegiatan.",
    jabatan: "Pranata Humas / Pengelola Pemberitaan & Protokol",
    loginTime: "2026-10-31 08:35 WIB"
  },

  // 3. Operator Seksi: Kepegawaian & Umum
  {
    id: "op-pegawai-01",
    username: "op_kepegawaian",
    nama: "Muhammad Ridwan",
    gelar: "S.AP",
    nip: "198811052014021003",
    email: "op.kepegawaian@kemenagmura.go.id",
    roleType: "operator_seksi",
    roleLabel: "Operator Seksi Kepegawaian & TU",
    operatorSeksi: "kepegawaian",
    seksiLabel: "Seksi Kepegawaian & Tata Usaha",
    kewenanganDeskripsi: "Kewenangan terbatas mengelola, menambah, mengedit, dan mengekspor Data Pegawai (PNS, PPPK, PPNPN) Kemenag Murung Raya.",
    jabatan: "Pengelola Kepegawaian Subbag TU",
    loginTime: "2026-10-31 08:40 WIB"
  },

  // 4. Operator Seksi: Pendidikan Islam (SI PENDIS MURA)
  {
    id: "op-pendis-01",
    username: "op_pendis",
    nama: "Supriyanto",
    gelar: "M.Pd",
    nip: "198305172008011012",
    email: "op.pendis@kemenagmura.go.id",
    roleType: "operator_seksi",
    roleLabel: "Operator Seksi Pendidikan Islam",
    operatorSeksi: "pendis",
    seksiLabel: "Seksi Pendidikan Islam (Pendis)",
    kewenanganDeskripsi: "Kewenangan mengelola integrasi SI PENDIS MURA (sipendismura.my.id), EMIS Madrasah, dan verifikasi izin operasional pendidikan Islam.",
    jabatan: "Operator EMIS / Staf Seksi Pendis",
    loginTime: "2026-10-31 08:45 WIB"
  },

  // 5. Operator Seksi: Bimas Islam (Masjid & KUA)
  {
    id: "op-bimasislam-01",
    username: "op_bimasislam",
    nama: "H. Ahmad Fauzi",
    gelar: "S.Sos.I",
    nip: "198402192009121004",
    email: "op.bimasislam@kemenagmura.go.id",
    roleType: "operator_seksi",
    roleLabel: "Operator Seksi Bimas Islam",
    operatorSeksi: "bimas-islam",
    seksiLabel: "Seksi Bimbingan Masyarakat Islam",
    kewenanganDeskripsi: "Kewenangan khusus mengelola data Rumah Ibadah (Masjid & Mushalla), data tanah wakaf, dan operasional 10 KUA Kecamatan.",
    jabatan: "Pengelola Kemasjidan & KUA Seksi Bimas Islam",
    loginTime: "2026-10-31 08:50 WIB"
  },

  // 6. Operator Seksi: Bimas Kristen
  {
    id: "op-bimaskristen-01",
    username: "op_bimaskristen",
    nama: "Daniel Kristiawan",
    gelar: "S.Th",
    nip: "198904222019031005",
    email: "op.bimaskristen@kemenagmura.go.id",
    roleType: "operator_seksi",
    roleLabel: "Operator Seksi Bimas Kristen",
    operatorSeksi: "bimas-kristen",
    seksiLabel: "Penyelenggara Bimas Kristen",
    kewenanganDeskripsi: "Kewenangan khusus mengelola data Rumah Ibadah Kristen (Gereja Protestan & Katolik), data kependetaan, dan jumlah umat kristen.",
    jabatan: "Staf Penyelenggara Bimas Kristen",
    loginTime: "2026-10-31 08:52 WIB"
  },

  // 7. Operator Seksi: Bimas Hindu
  {
    id: "op-bimashindu-01",
    username: "op_bimashindu",
    nama: "I Wayan Suwandi",
    gelar: "S.Ag",
    nip: "199108152020121009",
    email: "op.bimashindu@kemenagmura.go.id",
    roleType: "operator_seksi",
    roleLabel: "Operator Seksi Bimas Hindu",
    operatorSeksi: "bimas-hindu",
    seksiLabel: "Penyelenggara Bimas Hindu",
    kewenanganDeskripsi: "Kewenangan khusus mengelola data Balai Basarah, data Basir/Rohaniwan, dan statistik umat Hindu Kaharingan.",
    jabatan: "Staf Penyelenggara Bimas Hindu",
    loginTime: "2026-10-31 08:55 WIB"
  },

  // 8. Operator Seksi: Bimas Budha
  {
    id: "op-bimasbudha-01",
    username: "op_bimasbudha",
    nama: "Suryadi Dharma",
    gelar: "S.Ag",
    nip: "199203112022031004",
    email: "op.bimasbudha@kemenagmura.go.id",
    roleType: "operator_seksi",
    roleLabel: "Operator Seksi Bimas Budha",
    operatorSeksi: "bimas-budha",
    seksiLabel: "Penyelenggara Bimas Budha",
    kewenanganDeskripsi: "Kewenangan khusus mengelola data Vihara, Cetiya, Pandita/Romo, dan statistik umat Budha Kabupaten Murung Raya.",
    jabatan: "Staf Penyelenggara Bimas Budha",
    loginTime: "2026-10-31 08:58 WIB"
  }
];

export const DEFAULT_ADMIN: AdminUser = ADMIN_USERS[0];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-1",
    waktu: "2026-10-31 08:15 WIB",
    adminName: "Bambang Kurniawan, S.Kom",
    aksi: "Sistem RBAC",
    modul: "Hak Akses Pengelola",
    keterangan: "Penerapan pemisahan hak akses Admin Super, Humas, dan Operator Seksi Teknis",
    ipAddress: "182.253.14.92 (Puruk Cahu)"
  },
  {
    id: "log-2",
    waktu: "2026-10-30 14:20 WIB",
    adminName: "Nurul Hidayati, S.I.Kom",
    aksi: "Publikasi Warta",
    modul: "Humas & Berita",
    keterangan: "Publikasi Berita Harmoni Lintas Iman dan Upacara Hari Amal Bakti",
    ipAddress: "182.253.14.92 (Puruk Cahu)"
  },
  {
    id: "log-3",
    waktu: "2026-10-29 11:30 WIB",
    adminName: "Supriyanto, M.Pd",
    aksi: "Integrasi Sistem",
    modul: "Pendidikan Islam",
    keterangan: "Sinkronisasi portal dengan SI PENDIS MURA (sipendismura.my.id)",
    ipAddress: "182.253.14.92 (Puruk Cahu)"
  },
  {
    id: "log-4",
    waktu: "2026-10-28 09:10 WIB",
    adminName: "H. Ahmad Fauzi, S.Sos.I",
    aksi: "Validasi Sarpras",
    modul: "Bimas Islam",
    keterangan: "Verifikasi sertifikat arah kiblat dan data BKM Masjid Agung Baitul Rahman",
    ipAddress: "182.253.14.92 (Puruk Cahu)"
  },
  {
    id: "log-5",
    waktu: "2026-10-27 16:00 WIB",
    adminName: "Muhammad Ridwan, S.AP",
    aksi: "Update Kepegawaian",
    modul: "Kepegawaian",
    keterangan: "Pembaruan kenaikan pangkat reguler dan formasi PPPK Kemenag Mura",
    ipAddress: "182.253.14.92 (Puruk Cahu)"
  }
];

export const INITIAL_PTSP_PERMOHONAN: PtspPermohonan[] = [
  {
    id: "ptsp-req-01",
    nomorTiket: "PTSP-MURA-261001",
    namaPemohon: "Muhammad Faisal Rahman",
    nik: "6212011504880003",
    kontak: "081250992381",
    asalKecamatan: "Murung",
    jenisLayanan: "Rekomendasi Pendaftaran Haji / Umrah",
    tanggalMasuk: "2026-10-28 09:15 WIB",
    status: "Diproses Seksi Teknis",
    posisiSeksi: "Seksi Penyelenggaraan Haji dan Umrah",
    catatanPetugas: "Kelengkapan berkas KTP dan KK telah diverifikasi. Menunggu tanda tangan digital Kankemenag."
  },
  {
    id: "ptsp-req-02",
    nomorTiket: "PTSP-MURA-261002",
    namaPemohon: "Ust. Zulkifli Mansur",
    nik: "6212022008790001",
    kontak: "081349120092",
    asalKecamatan: "Tanah Siang",
    jenisLayanan: "Rekomendasi Izin Operasional Lembaga Pendis",
    tanggalMasuk: "2026-10-27 11:30 WIB",
    status: "Menunggu Verifikasi",
    posisiSeksi: "Seksi Pendidikan Islam (Pendis)",
    catatanPetugas: "Menunggu tim verifikator lapangan melakukan peninjauan sarpras TPQ di Desa Saripoi."
  },
  {
    id: "ptsp-req-03",
    nomorTiket: "PTSP-MURA-261003",
    namaPemohon: "Pdt. Simon Petrus, S.Th",
    nik: "6212010406820002",
    kontak: "082155883344",
    asalKecamatan: "Murung",
    jenisLayanan: "Surat Keterangan Terdaftar Rumah Ibadah",
    tanggalMasuk: "2026-10-26 14:00 WIB",
    status: "Selesai / Terbit",
    posisiSeksi: "Penyelenggara Bimas Kristen",
    catatanPetugas: "Surat tanda daftar rumah ibadah gereja telah diterbitkan dengan nomor B-412/Kk.15.11/BA.01/10/2026."
  },
  {
    id: "ptsp-req-04",
    nomorTiket: "PTSP-MURA-261004",
    namaPemohon: "Basir Upu S. Jingga",
    nik: "6212011210740004",
    kontak: "085249001920",
    asalKecamatan: "Murung",
    jenisLayanan: "Permohonan Rohaniwan & Saksi Sumpah Jabatan",
    tanggalMasuk: "2026-10-25 10:20 WIB",
    status: "Selesai / Terbit",
    posisiSeksi: "Penyelenggara Bimas Hindu",
    catatanPetugas: "Penugasan Rohaniwan Hindu Kaharingan untuk pelantikan pejabat Pemkab Mura telah diterbitkan."
  },
  {
    id: "ptsp-req-05",
    nomorTiket: "PTSP-MURA-261005",
    namaPemohon: "Ahmad Rizky Pratama",
    nik: "6212030809960001",
    kontak: "081350882199",
    asalKecamatan: "Laung Tuhup",
    jenisLayanan: "Konsultasi & Pengantar Nikah Luar Wilayah KUA",
    tanggalMasuk: "2026-10-28 15:45 WIB",
    status: "Menunggu Verifikasi",
    posisiSeksi: "Seksi Bimas Islam",
    catatanPetugas: "Dokumen N1-N4 sedang ditelaah staf kepenghuluan."
  }
];
