import React, { useState } from 'react';
import { ProfilSubTab, PejabatEselon } from '../types';
import { PROFIL_DATA } from '../data/mockData';
import { 
  Target, 
  Compass, 
  Award, 
  Network, 
  Users2, 
  Search, 
  Mail, 
  Briefcase, 
  ChevronRight,
  Shield,
  FileCheck2
} from 'lucide-react';

interface ProfilSectionProps {
  currentSubTab: ProfilSubTab;
  onSelectSubTab: (subTab: ProfilSubTab) => void;
  pejabatList: PejabatEselon[];
}

export const ProfilSection: React.FC<ProfilSectionProps> = ({
  currentSubTab,
  onSelectSubTab,
  pejabatList
}) => {
  const [searchPejabat, setSearchPejabat] = useState('');
  const [selectedEselonFilter, setSelectedEselonFilter] = useState<string>('all');
  const [selectedPejabatModal, setSelectedPejabatModal] = useState<PejabatEselon | null>(null);
  const [selectedOrgUnit, setSelectedOrgUnit] = useState<string>('pimpinan');

  const filteredPejabat = pejabatList.filter(pej => {
    const matchesSearch = 
      pej.nama.toLowerCase().includes(searchPejabat.toLowerCase()) ||
      pej.jabatan.toLowerCase().includes(searchPejabat.toLowerCase()) ||
      pej.nip.includes(searchPejabat) ||
      pej.unitKerja.toLowerCase().includes(searchPejabat.toLowerCase());

    const matchesEselon = 
      selectedEselonFilter === 'all' || 
      pej.eselon === selectedEselonFilter;

    return matchesSearch && matchesEselon;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title & Context */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
          <span>Kementerian Agama Kabupaten Murung Raya</span>
          <span>·</span>
          <span>Profil Instansi</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Profil Kantor Kementerian Agama Kab. Murung Raya
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Mengenal visi misi, tata kelola kelembagaan, struktur organisasi, dan jajaran pimpinan yang berdedikasi melayani umat di Bumi Tana Malai Tolung Lingu.
        </p>

        {/* Sub-menu Navigation Segmented Control */}
        <div className="flex items-center gap-2 mt-6 p-1 bg-slate-100 rounded-xl max-w-fit">
          <button
            onClick={() => onSelectSubTab('visi-misi')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              currentSubTab === 'visi-misi'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Visi dan Misi
          </button>
          <button
            onClick={() => onSelectSubTab('struktur')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              currentSubTab === 'struktur'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Struktur Organisasi
          </button>
          <button
            onClick={() => onSelectSubTab('pejabat')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              currentSubTab === 'pejabat'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daftar Pejabat Eselon
          </button>
        </div>
      </div>

      {/* SUB-MENU 1: VISI DAN MISI */}
      {currentSubTab === 'visi-misi' && (
        <div className="space-y-12 animate-fadeIn">
          
          {/* Visi Section */}
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
              <Target className="w-4 h-4" />
              <span>Visi Kementerian Agama 2025 - 2029</span>
            </div>
            <p className="text-lg sm:text-2xl font-semibold leading-relaxed text-emerald-50">
              "{PROFIL_DATA.visi}"
            </p>
            <div className="mt-6 pt-4 border-t border-emerald-800/80 flex flex-wrap items-center gap-6 text-xs text-emerald-200">
              <div>
                <span className="font-semibold text-white">Motto: </span>
                <span className="text-amber-300 font-bold tracking-wide">IKHLAS BERAMAL</span>
              </div>
              <span>·</span>
              <div>
                <span className="font-semibold text-white">Falsafah Daerah: </span>
                <span>Tira Tangka Balang</span>
              </div>
            </div>
          </div>

          {/* Misi Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-900">
                Misi Strategis Kantor Kemenag Kabupaten Murung Raya
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROFIL_DATA.misi.map((misiText, index) => (
                <div 
                  key={index}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    0{index + 1}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {misiText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Nilai Budaya Kerja Kemenag */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-700" />
                <h2 className="text-xl font-bold text-slate-900">
                  5 Nilai Budaya Kerja Kementerian Agama
                </h2>
              </div>
              <span className="text-xs text-slate-500">Pedoman Etika & Kinerja ASN</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {PROFIL_DATA.nilaiBudayaKerja.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs space-y-2.5"
                >
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Nilai #{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.nilai}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.makna}
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <strong>Indikator:</strong> {item.indikator}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUB-MENU 2: STRUKTUR ORGANISASI */}
      {currentSubTab === 'struktur' && (
        <div className="space-y-10 animate-fadeIn">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-emerald-700" />
                <h2 className="text-xl font-bold text-slate-900">
                  Bagan Struktur Organisasi Kemenag Murung Raya
                </h2>
              </div>
              <span className="text-xs text-slate-500">KMA No. 19 Tahun 2019</span>
            </div>

            {/* Hierarchical Visual Diagram */}
            <div className="space-y-6 py-2">
              
              {/* Level 1: Kepala Kantor */}
              <div className="flex justify-center">
                <div 
                  onClick={() => setSelectedOrgUnit('pimpinan')}
                  className={`w-full max-w-md p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                    selectedOrgUnit === 'pimpinan' 
                      ? 'border-emerald-600 bg-emerald-50 shadow-md' 
                      : 'border-emerald-200 bg-white hover:border-emerald-400'
                  }`}
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Pimpinan Tertinggi</div>
                  <div className="text-base font-extrabold text-slate-900 mt-0.5">Kepala Kantor Kementerian Agama</div>
                  <div className="text-xs text-slate-600">H. Marzuki Rahman, S.Ag., M.Pd.I</div>
                </div>
              </div>

              {/* Connecting line */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-slate-300" />
              </div>

              {/* Level 2: Sub Bagian Tata Usaha */}
              <div className="flex justify-center">
                <div 
                  onClick={() => setSelectedOrgUnit('tu')}
                  className={`w-full max-w-sm p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                    selectedOrgUnit === 'tu' 
                      ? 'border-emerald-600 bg-emerald-50 shadow-md' 
                      : 'border-slate-300 bg-white hover:border-emerald-400'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pelayanan & Administrasi</div>
                  <div className="text-sm font-bold text-slate-900">Sub Bagian Tata Usaha (Subbag TU)</div>
                  <div className="text-xs text-slate-600">H. Ahmad Fauzi, S.Sos.I</div>
                </div>
              </div>

              {/* Connecting line */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-slate-300" />
              </div>

              {/* Level 3: Seksi & Penyelenggara Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div 
                  onClick={() => setSelectedOrgUnit('pendis')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedOrgUnit === 'pendis' 
                      ? 'border-emerald-600 bg-emerald-50 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-emerald-400'
                  }`}
                >
                  <div className="text-[10px] font-bold text-emerald-700 uppercase">Seksi Teknis</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Pendidikan Islam (Pendis)</div>
                  <div className="text-xs text-slate-600 mt-1">Supriyanto, S.Pd.I., M.Pd</div>
                  <div className="text-[11px] text-slate-400 mt-2">Madrasah, Pesantren & PAI</div>
                </div>

                <div 
                  onClick={() => setSelectedOrgUnit('bimas-islam')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedOrgUnit === 'bimas-islam' 
                      ? 'border-emerald-600 bg-emerald-50 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-emerald-400'
                  }`}
                >
                  <div className="text-[10px] font-bold text-emerald-700 uppercase">Seksi Teknis</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Bimbingan Masyarakat Islam</div>
                  <div className="text-xs text-slate-600 mt-1">H. Muhammad Zaini, S.H.I</div>
                  <div className="text-[11px] text-slate-400 mt-2">10 KUA, Masjid, Hisab Rukyat</div>
                </div>

                <div 
                  onClick={() => setSelectedOrgUnit('phu')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedOrgUnit === 'phu' 
                      ? 'border-emerald-600 bg-emerald-50 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-emerald-400'
                  }`}
                >
                  <div className="text-[10px] font-bold text-emerald-700 uppercase">Seksi Teknis</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Penyelenggaraan Haji & Umrah</div>
                  <div className="text-xs text-slate-600 mt-1">Hj. Siti Rohana, S.Ag</div>
                  <div className="text-[11px] text-slate-400 mt-2">Pendaftaran & Manasik Haji</div>
                </div>

                <div 
                  onClick={() => setSelectedOrgUnit('bimas-kristen-hindu')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedOrgUnit === 'bimas-kristen-hindu' 
                      ? 'border-emerald-600 bg-emerald-50 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-emerald-400'
                  }`}
                >
                  <div className="text-[10px] font-bold text-emerald-700 uppercase">Penyelenggara</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Bimas Kristen & Bimas Hindu</div>
                  <div className="text-xs text-slate-600 mt-1">Yulianus Tarigan & Darmanto</div>
                  <div className="text-[11px] text-slate-400 mt-2">Gereja, Balai Basarah Kaharingan</div>
                </div>

              </div>

              {/* Level 4: Unit Pelaksana Teknis & Lapangan */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-800">10 Kantor Urusan Agama (KUA) Kecamatan</div>
                  <p className="text-xs text-slate-500 mt-1">
                    KUA Murung, Tanah Siang, Tanah Siang Selatan, Laung Tuhup, Batura, Permata Intan, Sumber Barito, Sungai Babuat, Seribu Riam, Uut Murung.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-800">Satuan Pendidikan Madrasah Negeri</div>
                  <p className="text-xs text-slate-500 mt-1">
                    MAN Murung Raya, MTsN 1 Murung Raya, MIN 1 Murung Raya, dan Kelompok Kerja Madrasah (KKM) Swasta se-Kabupaten.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Unit Detail Explanation Box */}
          <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              <span>Tugas Pokok & Fungsi (Tupoksi) Unit Terpilih</span>
            </h3>

            {selectedOrgUnit === 'pimpinan' && (
              <p className="text-sm text-emerald-100 mt-3 leading-relaxed">
                <strong>Kepala Kantor:</strong> Memimpin, mengkoordinir, mengawasi, serta mengevaluasi pelaksanaan seluruh program tugas dan fungsi Kementerian Agama di wilayah Kabupaten Murung Raya sesuai dengan kebijakan Kementerian Agama dan peraturan perundang-undangan yang berlaku.
              </p>
            )}

            {selectedOrgUnit === 'tu' && (
              <p className="text-sm text-emerald-100 mt-3 leading-relaxed">
                <strong>Subbag Tata Usaha:</strong> Melakukan koordinasi penyusunan rencana program, pelaporan pertanggungjawaban, pengelolaan urusan kepegawaian, keuangan, barang milik negara (BMN), persuratan, kearsipan, humas, serta pelayanan perizinan pada PTSP.
              </p>
            )}

            {selectedOrgUnit === 'pendis' && (
              <p className="text-sm text-emerald-100 mt-3 leading-relaxed">
                <strong>Seksi Pendidikan Islam:</strong> Melakukan pelayanan, bimbingan teknis, pembinaan, serta pengelolaan data dan informasi pada pendidikan madrasah (RA, MI, MTs, MA), pendidikan agama Islam pada sekolah umum, dan pendidikan keagamaan Islam (Pondok Pesantren, MDTA, TPQ).
              </p>
            )}

            {selectedOrgUnit === 'bimas-islam' && (
              <p className="text-sm text-emerald-100 mt-3 leading-relaxed">
                <strong>Seksi Bimas Islam:</strong> Melaksanakan pelayanan teknis kepenghuluan, pembinaan kemasjidan, hisab rukyat, bimbingan keluarga sakinah, pemberdayaan zakat dan wakaf, serta pembinaan dan pengawasan kinerja KUA di 10 kecamatan.
              </p>
            )}

            {selectedOrgUnit === 'phu' && (
              <p className="text-sm text-emerald-100 mt-3 leading-relaxed">
                <strong>Seksi PHU:</strong> Melaksanakan pendaftaran, verifikasi dokumen paspor dan visa, pembinaan bimbingan manasik haji reguler, serta pemberangkatan dan pemulangan jemaah haji asal Kabupaten Murung Raya.
              </p>
            )}

            {selectedOrgUnit === 'bimas-kristen-hindu' && (
              <p className="text-sm text-emerald-100 mt-3 leading-relaxed">
                <strong>Penyelenggara Bimas Kristen & Hindu:</strong> Melaksanakan pembinaan urusan agama dan pendidikan keagamaan Kristen, Katolik, dan Hindu Kaharingan, pendaftaran rumah ibadah, pembinaan para rohaniwan/basir, serta penguatan toleransi umat.
              </p>
            )}
          </div>

        </div>
      )}

      {/* SUB-MENU 3: DAFTAR PEJABAT ESELON */}
      {currentSubTab === 'pejabat' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama pejabat, NIP, atau jabatan..."
                value={searchPejabat}
                onChange={(e) => setSearchPejabat(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
              <span className="text-xs text-slate-500 shrink-0">Eselon:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedEselonFilter('all')}
                  className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${
                    selectedEselonFilter === 'all'
                      ? 'bg-emerald-800 text-white font-medium'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setSelectedEselonFilter('Eselon III/a')}
                  className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${
                    selectedEselonFilter === 'Eselon III/a'
                      ? 'bg-emerald-800 text-white font-medium'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Eselon III/a
                </button>
                <button
                  onClick={() => setSelectedEselonFilter('Eselon IV/a')}
                  className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${
                    selectedEselonFilter === 'Eselon IV/a'
                      ? 'bg-emerald-800 text-white font-medium'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Eselon IV/a
                </button>
                <button
                  onClick={() => setSelectedEselonFilter('Subkoordinator')}
                  className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${
                    selectedEselonFilter === 'Subkoordinator'
                      ? 'bg-emerald-800 text-white font-medium'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Subkoordinator
                </button>
              </div>
            </div>
          </div>

          {/* Pejabat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPejabat.map((pej) => (
              <div
                key={pej.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  {/* Avatar & Rank */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-800 text-amber-300 font-bold text-lg flex items-center justify-center shrink-0 ring-2 ring-emerald-100">
                      {pej.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-emerald-800 font-semibold">
                        {pej.eselon}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {pej.nama}, {pej.gelar}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">
                        NIP. {pej.nip}
                      </p>
                    </div>
                  </div>

                  {/* Role & Pangkat */}
                  <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900">{pej.jabatan}</span>
                        <div className="text-slate-500 text-[11px]">{pej.unitKerja}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{pej.pangkatGolongan}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed pt-1">
                    {pej.riwayatSingkat}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[160px]">{pej.kontakKedinasan}</span>
                  </span>
                  <button
                    onClick={() => setSelectedPejabatModal(pej)}
                    className="font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                  >
                    <span>Detail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPejabat.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <Users2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">Tidak ada pejabat yang sesuai pencarian</p>
              <p className="text-xs text-slate-500">Coba gunakan kata kunci atau ubah filter eselon.</p>
            </div>
          )}

        </div>
      )}

      {/* DETAIL MODAL PEJABAT */}
      {selectedPejabatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-800 text-amber-300 font-bold text-base flex items-center justify-center">
                  {selectedPejabatModal.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedPejabatModal.nama}, {selectedPejabatModal.gelar}
                  </h3>
                  <p className="text-xs text-emerald-700 font-medium">
                    {selectedPejabatModal.jabatan}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPejabatModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs divide-y divide-slate-100">
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">NIP:</span>
                <span className="font-mono font-medium text-slate-900">{selectedPejabatModal.nip}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Eselon:</span>
                <span className="font-medium text-slate-900">{selectedPejabatModal.eselon}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Pangkat / Golongan:</span>
                <span className="font-medium text-slate-900">{selectedPejabatModal.pangkatGolongan}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Unit Kerja:</span>
                <span className="font-medium text-slate-900">{selectedPejabatModal.unitKerja}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Pendidikan Terakhir:</span>
                <span className="font-medium text-slate-900">{selectedPejabatModal.pendidikan}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Email Kedinasan:</span>
                <span className="font-medium text-emerald-800">{selectedPejabatModal.kontakKedinasan}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900">Riwayat & Deskripsi Tugas:</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedPejabatModal.riwayatSingkat}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPejabatModal(null)}
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
