import React, { useState } from 'react';
import { Pengumuman } from '../types';
import { 
  FileText, 
  Calendar, 
  Download, 
  Search, 
  ArrowUpDown, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileCheck,
  Building
} from 'lucide-react';

interface PengumumanSectionProps {
  pengumumanList: Pengumuman[];
  activePengumumanModal: Pengumuman | null;
  onOpenPengumumanModal: (pengumuman: Pengumuman) => void;
  onClosePengumumanModal: () => void;
}

const CATEGORIES = [
  'Semua Kategori',
  'Beasiswa & Guru',
  'PPDB & Madrasah',
  'Lelang & Pengadaan',
  'Surat Edaran',
  'Formasi & Kepegawaian',
  'Haji & Umrah'
] as const;

export const PengumumanSection: React.FC<PengumumanSectionProps> = ({
  pengumumanList,
  activePengumumanModal,
  onOpenPengumumanModal,
  onClosePengumumanModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori');
  const [dateSort, setDateSort] = useState<'desc' | 'asc'>('desc');
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Aktif' | 'Berakhir'>('all');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Month extraction
  const availableMonths = Array.from(
    new Set(pengumumanList.map(p => p.tanggalUnggah.slice(0, 7)))
  ).sort().reverse();

  // Filter & Sort
  const filteredList = pengumumanList
    .filter((item) => {
      // Category filter
      if (selectedCategory !== 'Semua Kategori' && item.kategori !== selectedCategory) {
        return false;
      }
      // Status filter
      if (filterStatus !== 'all' && item.status !== filterStatus) {
        return false;
      }
      // Month filter
      if (filterMonth !== 'all' && !item.tanggalUnggah.startsWith(filterMonth)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          item.judul.toLowerCase().includes(q) ||
          item.nomorSurat.toLowerCase().includes(q) ||
          item.isiLengkap.toLowerCase().includes(q) ||
          item.dikeluarkanOleh.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.tanggalUnggah).getTime();
      const dateB = new Date(b.tanggalUnggah).getTime();
      return dateSort === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const handleDownloadAttachment = (item: Pengumuman) => {
    // Generate an actual text/pdf attachment simulation
    const content = `KEMENTERIAN AGAMA REPUBLIK INDONESIA\nKANTOR KABUPATEN MURUNG RAYA\n\nNomor: ${item.nomorSurat}\nPerihal: ${item.judul}\nTanggal: ${item.tanggalUnggah}\nDikeluarkan oleh: ${item.dikeluarkanOleh}\n\n${item.isiLengkap}\n\nPuruk Cahu, ${item.tanggalUnggah}\nKepala Kantor Kementerian Agama Kab. Murung Raya`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = item.fileLampiranNama.replace('.pdf', '.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessToast(item.fileLampiranNama);
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Introduction */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
          <span>Keterbukaan Informasi Publik</span>
          <span>·</span>
          <span>Regulasi & Pengumuman Resmi</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Pengumuman & Surat Edaran Resmi
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Dokumen kedinasan, surat edaran, juknis beasiswa, formasi kepegawaian, pengadaan, dan pendaftaran haji Kantor Kementerian Agama Kabupaten Murung Raya.
        </p>
      </div>

      {/* FILTER SYSTEM BASED ON CATEGORY AND UPLOAD DATE */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Search className="w-4 h-4 text-emerald-700" />
            <span>Sistem Filter Kategori & Tanggal Unggah</span>
          </div>
          {(selectedCategory !== 'Semua Kategori' || filterMonth !== 'all' || filterStatus !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Semua Kategori');
                setFilterMonth('all');
                setFilterStatus('all');
                setSearchQuery('');
                setDateSort('desc');
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium"
            >
              Reset Semua Filter
            </button>
          )}
        </div>

        {/* Filter Row 1: Search & Date Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nomor surat, judul, atau perihal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Filter Bulan Unggah */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              >
                <option value="all">Semua Bulan Unggah</option>
                {availableMonths.map((m) => (
                  <option key={m} value={m}>
                    Bulan: {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Status Aktif */}
          <div className="md:col-span-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">Semua Status</option>
              <option value="Aktif">Hanya Aktif</option>
              <option value="Berakhir">Sudah Berakhir</option>
            </select>
          </div>

          {/* Urutan Tanggal (Asc/Desc) */}
          <div className="md:col-span-2">
            <button
              onClick={() => setDateSort(dateSort === 'desc' ? 'asc' : 'desc')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs border border-slate-300 rounded-lg hover:bg-slate-50 font-medium text-slate-700"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateSort === 'desc' ? 'Terbaru' : 'Terlama'}</span>
            </button>
          </div>

        </div>

        {/* Filter Row 2: Kategori Segmented Buttons */}
        <div className="pt-2">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Kategori Dokumen:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white font-medium shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Result Counter */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Ditemukan <span className="font-semibold text-slate-900">{filteredList.length}</span> pengumuman resmi
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Aktif</span>
            <span className="w-2 h-2 rounded-full bg-slate-300 ml-2" />
            <span>Berakhir</span>
          </div>
        </div>
      </div>

      {/* DOWNLOAD SUCCESS TOAST */}
      {downloadSuccessToast && (
        <div className="bg-emerald-900 text-white p-3 rounded-xl flex items-center justify-between text-xs shadow-md animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>Berkas lampiran resmi <strong>{downloadSuccessToast}</strong> berhasil diunduh ke perangkat Anda.</span>
          </div>
          <button 
            onClick={() => setDownloadSuccessToast(null)}
            className="text-emerald-300 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* PENGUMUMAN TABLE / LIST VIEW (Rapi & Sistematis) */}
      {filteredList.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-semibold">
                  <th className="py-3.5 px-4 w-12 text-center">No</th>
                  <th className="py-3.5 px-4 w-44">Tanggal Unggah</th>
                  <th className="py-3.5 px-4 w-52">Nomor Surat Dinas</th>
                  <th className="py-3.5 px-4">Judul & Perihal Pengumuman</th>
                  <th className="py-3.5 px-4 w-40">Kategori</th>
                  <th className="py-3.5 px-4 w-28 text-center">Status</th>
                  <th className="py-3.5 px-4 w-36 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.map((item, index) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-emerald-50/40 transition-colors group"
                  >
                    <td className="py-4 px-4 text-center font-mono text-slate-400">
                      {index + 1}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{item.tanggalUnggah}</div>
                      {item.batasWaktu && (
                        <div className="text-[10px] text-amber-700 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>Hingga {item.batasWaktu}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 font-mono text-slate-600 text-[11px] leading-relaxed">
                      {item.nomorSurat}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => onOpenPengumumanModal(item)}
                        className="text-left font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2"
                      >
                        {item.judul}
                      </button>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span>{item.dikeluarkanOleh}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {item.kategori}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.status === 'Aktif' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenPengumumanModal(item)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                        >
                          Lihat
                        </button>
                        <button
                          onClick={() => handleDownloadAttachment(item)}
                          className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-slate-100 rounded-md transition-colors"
                          title={`Unduh Lampiran (${item.ukuranFile})`}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            Tidak ada pengumuman yang sesuai dengan kriteria filter
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Ubah rentang tanggal, kategori dokumen, atau hapus kata kunci pencarian.
          </p>
        </div>
      )}

      {/* DETAIL MODAL PENGUMUMAN DENGAN PREVIEW RESMI */}
      {activePengumumanModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {activePengumumanModal.kategori}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
                  {activePengumumanModal.judul}
                </h3>
              </div>
              <button
                onClick={onClosePengumumanModal}
                className="text-slate-400 hover:text-slate-600 p-1 text-base font-bold ml-4"
              >
                ✕
              </button>
            </div>

            {/* Official Letter Header Information */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor Surat Dinas:</span>
                <span className="font-mono font-bold text-slate-900">{activePengumumanModal.nomorSurat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal Pengunggahan:</span>
                <span className="font-medium text-slate-900">{activePengumumanModal.tanggalUnggah}</span>
              </div>
              {activePengumumanModal.batasWaktu && (
                <div className="flex justify-between text-amber-800 font-semibold">
                  <span>Batas Akhir / Deadline:</span>
                  <span>{activePengumumanModal.batasWaktu}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Diterbitkan Oleh:</span>
                <span className="font-medium text-slate-900">{activePengumumanModal.dikeluarkanOleh}</span>
              </div>
            </div>

            {/* Circular Content */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Isi Surat / Pengumuman:</h4>
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line p-4 bg-white border border-slate-200 rounded-xl max-h-60 overflow-y-auto">
                {activePengumumanModal.isiLengkap}
              </div>
            </div>

            {/* Download Attachment Box */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">{activePengumumanModal.fileLampiranNama}</div>
                  <div className="text-[11px] text-slate-500">Berkas Dokumen Resmi · {activePengumumanModal.ukuranFile}</div>
                </div>
              </div>
              <button
                onClick={() => handleDownloadAttachment(activePengumumanModal)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-2xs transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Berkas</span>
              </button>
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
              <button
                onClick={onClosePengumumanModal}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
