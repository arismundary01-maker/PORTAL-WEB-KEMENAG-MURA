import React, { useState } from 'react';
import { GaleriKegiatan } from '../types';
import { 
  Camera, 
  Calendar, 
  MapPin, 
  Tag, 
  ArrowRight, 
  Sparkles,
  Maximize2
} from 'lucide-react';

interface GaleriSectionProps {
  galeriList: GaleriKegiatan[];
}

const CATEGORIES = [
  'Semua Galeri',
  'HAB Kemenag',
  'Pembinaan ASN',
  'Kerukunan & FKUB',
  'Pendidikan Madrasah',
  'Bimbingan Haji',
  'Kunjungan Kerja'
] as const;

export const GaleriSection: React.FC<GaleriSectionProps> = ({ galeriList }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Galeri');
  const [activeModalItem, setActiveModalItem] = useState<GaleriKegiatan | null>(null);

  const filteredGaleri = galeriList.filter((item) => {
    if (selectedCategory === 'Semua Galeri') return true;
    return item.kategori === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
          <span>Dokumentasi Visual</span>
          <span>·</span>
          <span>Kementerian Agama Kabupaten Murung Raya</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Galeri Kegiatan & Dokumentasi
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Rekam jejak visual pelayanan, pembinaan keagamaan, upacara Hari Amal Bakti, dialog kerukunan lintas agama, serta kunjungan kerja di pelosok Murung Raya.
        </p>

        {/* Filter categories */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
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

      {/* Grid of gallery cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGaleri.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            {/* Visual Header Banner Container */}
            <div className="h-44 bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-950 p-6 flex flex-col justify-between relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(#fbbf24 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />
              
              <div className="flex items-center justify-between text-xs relative z-10">
                <span className="font-semibold text-amber-300">
                  {item.kategori}
                </span>
                <span className="text-white/80 font-mono text-[11px] bg-black/30 px-2 py-0.5 rounded">
                  {item.jumlahFoto} Dokumentasi Foto
                </span>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-white/90 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{item.lokasi}</span>
                </div>
              </div>
            </div>

            {/* Body Description */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.tanggal}</span>
                  <span>·</span>
                  <span>Oleh: {item.fotografer}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {item.judul}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-medium">
                <span className="flex items-center gap-1 group-hover:underline">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Buka Dokumentasi</span>
                </span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl border border-slate-200">
            
            {/* Visual Large Frame */}
            <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 p-8 sm:p-12 text-white relative">
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-2 text-lg font-bold"
              >
                ✕
              </button>
              
              <div className="space-y-3">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-amber-300 text-xs font-semibold">
                  {activeModalItem.kategori}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                  {activeModalItem.judul}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200 pt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {activeModalItem.tanggal}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {activeModalItem.lokasi}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Uraian Dokumentasi Kegiatan:
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeModalItem.deskripsi}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>
                  Fotografer Kedinasan: <strong>{activeModalItem.fotografer}</strong>
                </div>
                <div className="flex gap-1.5">
                  {activeModalItem.tags.map((tag, idx) => (
                    <span key={idx} className="font-medium text-emerald-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Tutup Galeri
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
