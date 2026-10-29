import React from 'react';
import { Berita, Pengumuman, NavigationTab, ProfilSubTab } from '../types';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  HeartHandshake
} from 'lucide-react';

interface BerandaSectionProps {
  beritaList: Berita[];
  pengumumanList: Pengumuman[];
  onSelectTab: (tab: NavigationTab) => void;
  onSelectProfilSubTab: (subTab: ProfilSubTab) => void;
  onReadBerita: (berita: Berita) => void;
  onViewPengumuman: (pengumuman: Pengumuman) => void;
  onOpenPtspModal: () => void;
}

export const BerandaSection: React.FC<BerandaSectionProps> = ({
  beritaList,
  pengumumanList,
  onSelectTab,
  onSelectProfilSubTab,
  onReadBerita,
  onViewPengumuman,
  onOpenPtspModal
}) => {
  const featuredBerita = beritaList[0];
  const secondaryBerita = beritaList.slice(1, 4);
  const latestPengumuman = pengumumanList.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-950 text-white">
        {/* Subtle patterned overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(#fbbf24 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Main Title & Editorial Mission */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-700/50 text-emerald-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Portal Resmi Pelayanan Keagamaan & Pendidikan</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Menebar Kebaikan, <br />
                <span className="text-emerald-400">Merawat Kerukunan</span> di Bumi Murung Raya
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
                Selamat datang di situs resmi Kantor Kementerian Agama Kabupaten Murung Raya, Kalimantan Tengah. 
                Pusat layanan informasi terpadu keagamaan, pendidikan madrasah, bimbingan masyarakat, serta tata kelola data umat.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onSelectTab('ptsp')}
                  className="px-6 py-3 text-sm font-semibold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all flex items-center gap-2 font-sans"
                >
                  <span>Akses Layanan PTSP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelectTab('data-informasi')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>Buka Data Perbidang</span>
                </button>
              </div>

              {/* Slogan pill unboxed */}
              <div className="pt-4 flex items-center gap-3 text-xs text-emerald-300/80">
                <span className="font-semibold text-emerald-300">Semboyan Daerah:</span>
                <span>Tira Tangka Balang (Maju Terus Pantang Mundur)</span>
                <span>·</span>
                <span className="font-semibold text-emerald-300">Motto:</span>
                <span>Ikhlas Beramal</span>
              </div>
            </div>

            {/* Right Col: Leadership Card (Sambutan Kepala Kantor) */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 text-slate-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-white/40 backdrop-blur-xs relative">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xl ring-4 ring-emerald-100 shrink-0">
                    MR
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      H. Marzuki Rahman, S.Ag., M.Pd.I
                    </h3>
                    <p className="text-xs text-emerald-700 font-medium">
                      Kepala Kantor Kemenag Kabupaten Murung Raya
                    </p>
                    <p className="text-[11px] text-slate-500">
                      NIP. 197205141999031003
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-xs text-slate-600 leading-relaxed">
                  <p>
                    "Assalamu'alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera, Shalom, Om Swastyastu, Namo Buddhaya, Salam Kebajikan.
                  </p>
                  <p>
                    Kami berkomitmen menyajikan transparansi publik dan mempermudah akses layanan keagamaan bagi seluruh masyarakat di 10 kecamatan Kabupaten Murung Raya. Baik pelayanan nikah di KUA, pendaftaran haji, bantuan tempat ibadah, hingga pembinaan pendidikan madrasah."
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onSelectTab('profil');
                      onSelectProfilSubTab('pejabat');
                    }}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5"
                  >
                    <span>Profil Pimpinan & Pejabat Eselon</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-400">Puruk Cahu</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATISTIK DATA KEMENAG MURUNG RAYA (Full-width strip below hero) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-xl p-5 shadow-lg border border-slate-200">
          
          <div className="p-4 border-r border-slate-100 last:border-none">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  184
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Aparatur & Pegawai (PNS/PPPK/PTT)
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-r border-slate-100 last:border-none">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  38
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Madrasah & Pesantren Binaan
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-r border-slate-100 last:border-none">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  146
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Rumah Ibadah Lintas Agama
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  10
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  KUA Kecamatan Tersebar
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BERITA TERKINI & PENGUMUMAN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main 8 Cols: Berita Terkini */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Warta & Berita Terkini
                </h2>
                <p className="text-xs text-slate-500">
                  Informasi kegiatan, program keagamaan, dan pembinaan di Murung Raya
                </p>
              </div>
              <button
                onClick={() => onSelectTab('berita')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>Lihat Semua Berita</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Featured Lead Story */}
            {featuredBerita && (
              <div 
                onClick={() => onReadBerita(featuredBerita)}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-emerald-800">{featuredBerita.kategori}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredBerita.tanggalUnggah}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredBerita.waktuBaca}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {featuredBerita.judul}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {featuredBerita.ringkasan}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>Oleh: {featuredBerita.penulis}</span>
                    <span className="font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Baca Selengkapnya →
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {secondaryBerita.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onReadBerita(item)}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-medium text-emerald-700">{item.kategori}</span>
                      <span>·</span>
                      <span>{item.tanggalUnggah}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                      {item.judul}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-100 text-[11px] font-medium text-emerald-700 flex items-center justify-between">
                    <span>Baca info</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 4 Cols: Pengumuman Terkini */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Pengumuman Resmi
                </h2>
                <p className="text-xs text-slate-500">
                  Surat edaran, seleksi & pemberitahuan
                </p>
              </div>
              <button
                onClick={() => onSelectTab('pengumuman')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
              >
                Semua
              </button>
            </div>

            <div className="space-y-3">
              {latestPengumuman.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onViewPengumuman(item)}
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer shadow-xs space-y-2 group"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono text-emerald-800 truncate max-w-[200px]">
                      {item.nomorSurat}
                    </span>
                    <span className="shrink-0">{item.tanggalUnggah}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {item.judul}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>{item.kategori}</span>
                    <span className="text-emerald-700 font-medium">Buka Berkas</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Box: Maklumat Pelayanan */}
            <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Maklumat Pelayanan</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Dengan ini kami segenap aparatur Kantor Kementerian Agama Kabupaten Murung Raya menyatakan sanggup menyelenggarakan pelayanan publik sesuai standar pelayanan yang telah ditetapkan."
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Zona Integritas</span>
                <span className="font-semibold text-emerald-400">WBK - WBBM</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* QUICK ACCESS LAYANAN PERBIDANG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-emerald-200/60">
            <div>
              <h3 className="text-xl font-bold text-emerald-950">
                Layanan Publik & Data Keagamaan Murung Raya
              </h3>
              <p className="text-xs text-emerald-800">
                Pilih bidang pengelolaan informasi untuk meninjau data resmi atau mengunduh laporan Excel/PDF
              </p>
            </div>
            <button
              onClick={() => onSelectTab('data-informasi')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
            >
              Lihat Seluruh Data Informasi →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6">
            <div 
              onClick={() => onSelectTab('data-informasi')}
              className="bg-white p-4 rounded-xl border border-emerald-100 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-3">
                KP
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">Kepegawaian</h4>
              <p className="text-xs text-slate-500 mt-1">Data ASN, PPPK, dan PTT Kemenag Mura</p>
            </div>

            <div 
              onClick={() => onSelectTab('data-informasi')}
              className="bg-white p-4 rounded-xl border border-emerald-100 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-3">
                PD
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">Pendidikan Islam</h4>
              <p className="text-xs text-slate-500 mt-1">Lembaga MI, MTs, MA, RA, & Pesantren</p>
            </div>

            <div 
              onClick={() => onSelectTab('data-informasi')}
              className="bg-white p-4 rounded-xl border border-emerald-100 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-3">
                BI
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">Bimas Islam</h4>
              <p className="text-xs text-slate-500 mt-1">Data Rumah Ibadah & 10 KUA Kecamatan</p>
            </div>

            <div 
              onClick={() => onSelectTab('data-informasi')}
              className="bg-white p-4 rounded-xl border border-emerald-100 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-3">
                BK
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">Bimas Kristen</h4>
              <p className="text-xs text-slate-500 mt-1">Tempat Ibadah Gereja & Jumlah Umat</p>
            </div>

            <div 
              onClick={() => onSelectTab('data-informasi')}
              className="bg-white p-4 rounded-xl border border-emerald-100 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-3">
                BH
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">Bimas Hindu</h4>
              <p className="text-xs text-slate-500 mt-1">Balai Basarah Kaharingan & Umat</p>
            </div>
          </div>
        </div>
      </section>

      {/* FALSAFAH HUMA BETANG & MODERASI BERAGAMA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-emerald-700" />
              <span>Kerukunan Hidup Beragama di Murung Raya</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Falsafah Huma Betang: Hidup Rukun Berdampingan dalam Keberagaman
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Masyarakat Kabupaten Murung Raya mewarisi kearifan luhur suku Dayak Kalimantan Tengah yaitu filosofi <strong>Huma Betang</strong> (Rumah Panjang), di mana berbagai keluarga dengan keyakinan beragama yang berbeda dapat hidup bersama di bawah satu atap dengan penuh damai, toleransi, dan gotong royong. Kementerian Agama hadir menjaga warisan harmoni ini melalui pembinaan yang merangkul segenap elemen umat.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
