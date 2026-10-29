import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Phone, 
  Send, 
  Search, 
  ExternalLink, 
  Maximize2,
  Globe
} from 'lucide-react';

interface PtspModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullPortalView?: () => void;
}

export const PtspModal: React.FC<PtspModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenFullPortalView
}) => {
  const [activeTab, setActiveTab] = useState<'live-ptsp' | 'ajukan' | 'lacak'>('live-ptsp');
  const [namaPemohon, setNamaPemohon] = useState('');
  const [nikPemohon, setNikPemohon] = useState('');
  const [jenisLayanan, setJenisLayanan] = useState('Rekomendasi Pendaftaran Haji / Umrah');
  const [kecamatan, setKecamatan] = useState('Murung');
  const [keterangan, setKeterangan] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState<any | null>(null);

  const ptspUrl = "https://ptsp-kemenag-mura.vercel.app/";

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `PTSP-MURA-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket(ticketId);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;
    setTrackingResult({
      kode: trackingCode.toUpperCase(),
      pemohon: "M. Faisal Rahman",
      layanan: "Rekomendasi Operasional Madrasah Diniyah",
      status: "Dalam Proses Verifikasi Petugas Teknis",
      posisi: "Seksi Pendidikan Islam (Pendis)",
      tanggalMasuk: "2026-10-27 09:30 WIB",
      estimasiSelesai: "2 hari kerja"
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className={`bg-white rounded-2xl w-full my-6 p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 transition-all ${
        activeTab === 'live-ptsp' ? 'max-w-5xl' : 'max-w-xl'
      }`}>
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Pelayanan Terpadu Satu Pintu (PTSP) Online</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Portal PTSP Kemenag Kabupaten Murung Raya
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {onOpenFullPortalView && (
              <button
                onClick={() => {
                  onClose();
                  onOpenFullPortalView();
                }}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                title="Buka pada halaman utama portal"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Mode Halaman Penuh</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 text-base font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 sm:gap-2 p-1 bg-slate-100 rounded-lg overflow-x-auto">
          <button
            onClick={() => setActiveTab('live-ptsp')}
            className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'live-ptsp' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Akses Layanan PTSP (Live)
          </button>
          <button
            onClick={() => { setActiveTab('ajukan'); setSubmittedTicket(null); }}
            className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'ajukan' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Formulir Cepat
          </button>
          <button
            onClick={() => setActiveTab('lacak')}
            className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'lacak' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lacak Berkas
          </button>
        </div>

        {/* TAB 0: LIVE EMBEDDED PTSP APPLICATION */}
        {activeTab === 'live-ptsp' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2 truncate">
                <Globe className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="font-mono text-[11px] truncate">{ptspUrl}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={ptspUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:underline"
                >
                  <span>Buka Tab Terpisah</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs h-[520px]">
              <iframe
                src={ptspUrl}
                title="PTSP Kemenag Murung Raya Live"
                className="w-full h-full border-0"
                allow="geolocation; microphone; camera; clipboard-read; clipboard-write"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
              />
            </div>
          </div>
        )}

        {/* TAB 1: FORM PENGAJUAN */}
        {activeTab === 'ajukan' && (
          <div>
            {submittedTicket ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-700 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">
                  Permohonan Berhasil Dikirim ke PTSP
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Permohonan Anda telah tercatat dalam sistem loket PTSP Kantor Kemenag Kabupaten Murung Raya.
                </p>
                <div className="p-3 bg-white border border-emerald-300 rounded-lg inline-block font-mono text-sm font-bold text-emerald-900 tracking-wider">
                  {submittedTicket}
                </div>
                <p className="text-[11px] text-slate-500">
                  Simpan kode tiket di atas untuk melacak perkembangan status berkas Anda. Petugas PTSP akan menghubungi via WhatsApp / telepon.
                </p>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="mt-2 px-4 py-1.5 text-xs font-medium text-emerald-800 hover:underline"
                >
                  Ajukan Permohonan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nama Lengkap Pemohon</label>
                    <input
                      type="text"
                      required
                      value={namaPemohon}
                      onChange={(e) => setNamaPemohon(e.target.value)}
                      placeholder="Sesuai KTP"
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">NIK (Nomor Induk Kependudukan)</label>
                    <input
                      type="text"
                      required
                      value={nikPemohon}
                      onChange={(e) => setNikPemohon(e.target.value)}
                      placeholder="16 Digit NIK"
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Jenis Layanan yang Dibutuhkan</label>
                    <select
                      value={jenisLayanan}
                      onChange={(e) => setJenisLayanan(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    >
                      <option>Rekomendasi Pendaftaran Haji / Umrah</option>
                      <option>Surat Keterangan Terdaftar Rumah Ibadah</option>
                      <option>Rekomendasi Izin Operasional Lembaga Pendis</option>
                      <option>Konsultasi & Pengantar Nikah Luar Wilayah KUA</option>
                      <option>Permohonan Rohaniwan & Saksi Sumpah Jabatan</option>
                      <option>Legalisir Ijazah Madrasah / Dokumen Nikah</option>
                      <option>Layanan Pembinaan Bimas Kristen / Hindu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Asal Kecamatan</label>
                    <select
                      value={kecamatan}
                      onChange={(e) => setKecamatan(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    >
                      <option value="Murung">Murung (Puruk Cahu)</option>
                      <option value="Tanah Siang">Tanah Siang (Saripoi)</option>
                      <option value="Tanah Siang Selatan">Tanah Siang Selatan</option>
                      <option value="Laung Tuhup">Laung Tuhup (Muara Laung)</option>
                      <option value="Barito Tuhup Raya">Barito Tuhup Raya</option>
                      <option value="Permata Intan">Permata Intan</option>
                      <option value="Sumber Barito">Sumber Barito</option>
                      <option value="Sungai Babuat">Sungai Babuat</option>
                      <option value="Seribu Riam">Seribu Riam</option>
                      <option value="Uut Murung">Uut Murung</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Catatan / Keterangan Permohonan</label>
                  <textarea
                    rows={3}
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    placeholder="Tuliskan keterangan singkat terkait berkas yang diajukan..."
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Layanan bebas biaya (Rp 0,- / Gratis)</span>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pengajuan</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: LACAK RESI */}
        {activeTab === 'lacak' && (
          <div className="space-y-4 text-xs">
            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                placeholder="Masukkan Nomor Resi / Tiket PTSP..."
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="flex-1 p-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Lacak</span>
              </button>
            </form>

            {trackingResult && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-mono font-bold text-emerald-800">{trackingResult.kode}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                    {trackingResult.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pemohon:</span>
                  <span className="font-medium text-slate-800">{trackingResult.pemohon}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Layanan:</span>
                  <span className="font-medium text-slate-800">{trackingResult.layanan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Meja Penanganan:</span>
                  <span className="font-medium text-slate-800">{trackingResult.posisi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Waktu Pengajuan:</span>
                  <span className="font-medium text-slate-800">{trackingResult.tanggalMasuk}</span>
                </div>
              </div>
            )}

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 text-[11px] flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Butuh bantuan cepat? Hubungi Helpdesk PTSP Kemenag Mura di (0528) 31445 pada jam kerja.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
