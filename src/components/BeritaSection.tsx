import React, { useState } from 'react';
import { Berita } from '../types';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Share2, 
  Printer, 
  ArrowLeft,
  Newspaper,
  Check
} from 'lucide-react';

interface BeritaSectionProps {
  beritaList: Berita[];
  activeBeritaModal: Berita | null;
  onOpenBeritaModal: (berita: Berita) => void;
  onCloseBeritaModal: () => void;
}

const CATEGORIES = [
  'Semua',
  'Pendidikan Islam',
  'Bimas Islam',
  'Haji & Umrah',
  'Kerukunan Umat',
  'Kepegawaian',
  'Kegiatan Kemenag'
] as const;

export const BeritaSection: React.FC<BeritaSectionProps> = ({
  beritaList,
  activeBeritaModal,
  onOpenBeritaModal,
  onCloseBeritaModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copiedLink, setCopiedLink] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');

  // Filter logic
  const filteredBerita = beritaList.filter((item) => {
    const matchesCategory = 
      selectedCategory === 'Semua' || item.kategori === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !query ||
      item.judul.toLowerCase().includes(query) ||
      item.ringkasan.toLowerCase().includes(query) ||
      item.konten.toLowerCase().includes(query) ||
      item.penulis.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  const featured = filteredBerita.find(b => b.featured) || filteredBerita[0];
  const others = filteredBerita.filter(b => b.id !== featured?.id);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header and Controls */}
      <div className="border-b border-slate-200 pb-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <span>Warta & Informasi Publik</span>
            <span>·</span>
            <span>Kabupaten Murung Raya</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Berita Terkini Kemenag Murung Raya
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Liputan resmi seputar kegiatan keagamaan, prestasi madrasah, kebijakan haji, dan kerukunan umat beragama di Puruk Cahu dan sekitarnya.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-3 pt-2">
          {/* Kolom Pencarian */}
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berita berdasarkan judul, topik, nama madrasah, atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                Bersihkan
              </button>
            )}
          </div>

          {/* Kategori Berita Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
            <span className="text-xs text-slate-500 font-medium shrink-0 mr-1">Kategori:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results metadata */}
        <div className="text-xs text-slate-500 pt-1">
          Menampilkan <span className="font-semibold text-slate-900">{filteredBerita.length}</span> artikel berita
          {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
          {searchQuery && ` untuk kata kunci "${searchQuery}"`}
        </div>
      </div>

      {/* BERITA CONTENT */}
      {filteredBerita.length > 0 ? (
        <div className="space-y-8">
          
          {/* Lead Headline Story (Pattern C: 3-Tier Salience) */}
          {featured && !searchQuery && selectedCategory === 'Semua' && (
            <div 
              onClick={() => onOpenBeritaModal(featured)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-emerald-800 uppercase tracking-wide">
                    {featured.kategori}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {featured.tanggalUnggah}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {featured.waktuBaca}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {featured.judul}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {featured.ringkasan}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{featured.penulis} ({featured.jabatanPenulis})</span>
                  </div>
                  <span className="font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Baca Berita Lengkap →
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(searchQuery || selectedCategory !== 'Semua' ? filteredBerita : others).map((item) => (
              <article
                key={item.id}
                onClick={() => onOpenBeritaModal(item)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-emerald-800">{item.kategori}</span>
                    <span>{item.tanggalUnggah}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {item.judul}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.ringkasan}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-[11px] text-slate-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 truncate max-w-[160px]">
                    {item.penulis}
                  </span>
                  <span className="font-medium text-emerald-700 group-hover:translate-x-1 transition-transform">
                    Baca →
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            Tidak ada berita yang cocok
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Tidak ditemukan artikel untuk pencarian "{searchQuery}". Silakan coba kata kunci lain atau pilih kategori "Semua".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100"
          >
            Reset Filter Pencarian
          </button>
        </div>
      )}

      {/* FULL ARTICLE READER MODAL */}
      {activeBeritaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Top Bar */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between z-10">
              <button
                onClick={onCloseBeritaModal}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Daftar Berita</span>
              </button>

              <div className="flex items-center gap-2">
                {/* Font Size Adjuster */}
                <div className="flex items-center border border-slate-200 rounded-md p-0.5 text-xs text-slate-600">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-slate-200 font-bold' : ''}`}
                    title="Ukuran Font Normal"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-0.5 rounded ${fontSize === 'large' ? 'bg-slate-200 font-bold' : ''}`}
                    title="Ukuran Font Besar"
                  >
                    A+
                  </button>
                </div>

                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md border border-slate-200 hover:bg-slate-50"
                  title="Cetak Berita"
                >
                  <Printer className="w-4 h-4" />
                </button>

                {/* Share button */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 rounded-md hover:bg-emerald-100"
                  title="Salin Tautan"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Tersalin' : 'Bagikan'}</span>
                </button>

                <button
                  onClick={onCloseBeritaModal}
                  className="text-slate-400 hover:text-slate-600 p-1 text-lg font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Article Content (Editorial layout Pattern D) */}
            <div className="p-6 sm:p-10 space-y-6">
              
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 border-b border-slate-100 pb-4">
                <span className="font-semibold text-emerald-800">{activeBeritaModal.kategori}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeBeritaModal.tanggalUnggah}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeBeritaModal.waktuBaca}
                </span>
                <span>·</span>
                <span>Dibaca: {activeBeritaModal.dibaca} kali</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {activeBeritaModal.judul}
              </h1>

              {/* Author byline */}
              <div className="text-xs text-slate-600 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-700" />
                <span>Ditulis oleh: <strong>{activeBeritaModal.penulis}</strong> ({activeBeritaModal.jabatanPenulis})</span>
              </div>

              {/* Body prose */}
              <div className={`prose max-w-none text-slate-800 leading-relaxed whitespace-pre-line ${
                fontSize === 'large' ? 'text-base leading-loose' : 'text-sm'
              }`}>
                {activeBeritaModal.konten}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>Topik Terkait:</span>
                  <div className="flex flex-wrap gap-2">
                    {activeBeritaModal.tags.map((tag, idx) => (
                      <span key={idx} className="font-medium text-emerald-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Bottom Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between text-xs text-slate-500">
              <span>Humas Kantor Kementerian Agama Kabupaten Murung Raya</span>
              <button
                onClick={onCloseBeritaModal}
                className="px-4 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
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
