import * as XLSX from 'xlsx';
import { DataSectorTab } from '../types';

export interface ParseResult<T = Record<string, unknown>> {
  success: boolean;
  data: T[];
  headers: string[];
  errors: string[];
  rowCount: number;
}

export function parseSpreadsheetFile<T = Record<string, unknown>>(
  file: File
): Promise<ParseResult<T>> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target?.result;
        const workbook = XLSX.read(buffer, { type: 'binary', raw: false });
        const firstSheetName = workbook.SheetNames[0];
        
        if (!firstSheetName) {
          resolve({
            success: false,
            data: [],
            headers: [],
            errors: ['File spreadsheet kosong atau tidak memiliki lembar kerja (worksheet).'],
            rowCount: 0
          });
          return;
        }

        const worksheet = workbook.Sheets[firstSheetName];
        const rawJson = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: '' });

        if (!rawJson || rawJson.length === 0) {
          resolve({
            success: false,
            data: [],
            headers: [],
            errors: ['Tidak ada data baris yang ditemukan dalam spreadsheet.'],
            rowCount: 0
          });
          return;
        }

        const headers = Object.keys(rawJson[0]);

        resolve({
          success: true,
          data: rawJson as T[],
          headers,
          errors: [],
          rowCount: rawJson.length
        });
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Format file tidak valid';
        resolve({
          success: false,
          data: [],
          headers: [],
          errors: [`Gagal membaca file: ${errMsg}`],
          rowCount: 0
        });
      }
    };

    reader.onerror = () => {
      resolve({
        success: false,
        data: [],
        headers: [],
        errors: ['Terjadi kesalahan pembacaan berkas pada perangkat.'],
        rowCount: 0
      });
    };

    reader.readAsBinaryString(file);
  });
}

export function downloadImportTemplate(sector: DataSectorTab, subType?: string): void {
  let sampleData: Record<string, string | number>[] = [];
  let fileName = `Template_Impor_${sector}`;

  if (sector === 'kepegawaian') {
    fileName = 'Template_Data_Kepegawaian_Kemenag_Mura';
    sampleData = [
      {
        NIP: "198501012015011002",
        Nama: "Muhammad Fadli",
        Gelar: "S.Pd.I",
        Jabatan: "Pengadministrasi Kependidikan",
        Status: "PNS",
        Golongan: "III/a",
        UnitKerja: "Seksi Pendidikan Islam",
        Pendidikan: "S1 Pendidikan Agama Islam",
        MasaKerjaTahun: 11,
        Kontak: "081234567890",
        Email: "fadli@kemenag.go.id"
      },
      {
        NIP: "PPPK-2023-019",
        Nama: "Dewi Lestari",
        Gelar: "S.E",
        Jabatan: "Pengelola Pengadaan Barang/Jasa",
        Status: "PPPK",
        Golongan: "Golongan IX",
        UnitKerja: "Subbag Tata Usaha",
        Pendidikan: "S1 Manajemen",
        MasaKerjaTahun: 3,
        Kontak: "085211223344",
        Email: "dewi.lestari@kemenag.go.id"
      }
    ];
  } else if (sector === 'pendidikan-islam') {
    fileName = 'Template_Data_Lembaga_Pendis_Kemenag_Mura';
    sampleData = [
      {
        NSM: "111262120099",
        NPSN: "69887766",
        NamaLembaga: "MIS Hidayatul Mubtadiin",
        Jenjang: "MI",
        Status: "Swasta",
        Kecamatan: "Murung",
        Alamat: "Jl. Muara Sumpoi RT 04",
        KepalaLembaga: "Ust. M. Yusuf, S.Pd.I",
        JumlahSiswa: 140,
        JumlahGuru: 12,
        Akreditasi: "B",
        Kontak: "081399887766"
      }
    ];
  } else if (sector === 'bimas-islam') {
    if (subType === 'kua') {
      fileName = 'Template_Data_KUA_Kecamatan_Mura';
      sampleData = [
        {
          KodeKUA: "62.12.11",
          NamaKUA: "KUA Kecamatan Percontohan",
          Kecamatan: "Murung",
          NamaKepala: "H. Abdullah Sani, S.Ag",
          NIPKepala: "198005102008011012",
          Alamat: "Jl. Poros Perkantoran",
          Kontak: "081255443322",
          Email: "kua.contoh@kemenag.go.id",
          JumlahNikahTahun: 120,
          StatusGedung: "SBSN (Milik Sendiri)"
        }
      ];
    } else {
      fileName = 'Template_Data_Rumah_Ibadah_Islam_Mura';
      sampleData = [
        {
          NamaMasjid: "Masjid Al-Falah",
          Jenis: "Masjid Jami",
          Kecamatan: "Murung",
          Alamat: "Jl. Trans Kalimantan Km. 2",
          KapasitasJamaah: 600,
          LuasTanahM2: 1200,
          StatusTanah: "Wakaf",
          NamaPengurus: "H. Syarkawi",
          TahunBerdiri: 2005
        }
      ];
    }
  } else if (sector === 'bimas-kristen') {
    fileName = 'Template_Data_Gereja_Kristen_Mura';
    sampleData = [
      {
        NamaGereja: "Gereja Bethania GKE",
        Denominasi: "GKE",
        Kecamatan: "Tanah Siang",
        Alamat: "Desa Belawan RT 01",
        NamaPendetaPastor: "Pdt. Simon Petrus, S.Th",
        JumlahJemaat: 350,
        TahunBerdiri: 1988,
        StatusBangunan: "Permanen",
        Kontak: "082155667788"
      }
    ];
  } else if (sector === 'bimas-hindu') {
    fileName = 'Template_Data_Balai_Hindu_Kaharingan_Mura';
    sampleData = [
      {
        NamaTempatIbadah: "Balai Basarah Kaharingan Dirung",
        Jenis: "Balai Basarah",
        SekteTradisi: "Hindu Kaharingan",
        Kecamatan: "Tanah Siang",
        Alamat: "Desa Dirung Lingkin",
        NamaBasirPemimpin: "Basir Mantikei",
        JumlahUmat: 290,
        TahunBerdiri: 1994,
        KegiatanRutin: "Basarah setiap malam Jumat",
        Kontak: "085233445566"
      }
    ];
  }

  const ws = XLSX.utils.json_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}
