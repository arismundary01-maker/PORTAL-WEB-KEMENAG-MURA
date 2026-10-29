import React from 'react';
import { OfficialEmblem } from './OfficialEmblem';
import { NavigationTab, ProfilSubTab } from '../types';
import { MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
  onSelectProfilSubTab: (subTab: ProfilSubTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onSelectProfilSubTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identitas Resmi */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <OfficialEmblem size={50} />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Kementerian Agama RI
                </div>
                <div className="text-base font-bold text-white tracking-tight">
                  Kantor Kabupaten Murung Raya
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mewujudkan pelayanan prima di bidang keagamaan dan pendidikan keagamaan yang berintegritas, berkeadilan, dan rukun di Bumi Tana Malai Tolung Lingu.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Zona Integritas Menuju WBK & WBBM</span>
            </div>
          </div>

          {/* Col 2: Alamat & Kontak */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Kontak Kedinasan
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Jenderal Sudirman No. 12, Kompleks Perkantoran Pemkab Murung Raya, Puruk Cahu 73911, Kalimantan Tengah</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(0528) 31445</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>kemenag.murungraya@kemenag.go.id</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>murungraya.kemenag.go.id</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigasi Cepat Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Akses Portal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectTab('beranda')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('profil');
                    onSelectProfilSubTab('visi-misi');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Visi, Misi & 5 Nilai Budaya Kerja
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('profil');
                    onSelectProfilSubTab('struktur');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Struktur Organisasi & Seksi
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('profil');
                    onSelectProfilSubTab('pejabat');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Daftar Pejabat Eselon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('data-informasi')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Data & Informasi Perbidang
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('pengumuman')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Pengumuman Resmi & Surat Edaran
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Layanan Nasional Terintegrasi */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Aplikasi Kemenag Pusat
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://simkah4.kemenag.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between hover:text-emerald-400 transition-colors"
                >
                  <span>SIMKAH Gen-4 (Nikah Digital)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://emis.kemenag.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between hover:text-emerald-400 transition-colors"
                >
                  <span>EMIS 4.0 (Pendidikan Islam)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://simpatika.kemenag.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between hover:text-emerald-400 transition-colors"
                >
                  <span>SIMPATIKA (Karier & TPG Guru)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://haji.kemenag.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between hover:text-emerald-400 transition-colors"
                >
                  <span>Siskohat (Pendaftaran & Info Haji)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ptsp')}
                  className="w-full text-left flex items-center justify-between text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
                >
                  <span>PTSP Kemenag Mura (Online)</span>
                  <span className="text-[10px] bg-emerald-950 border border-emerald-700 text-emerald-300 px-1.5 py-0.2 rounded">Buka</span>
                </button>
              </li>
              <li>
                <a
                  href="https://ptsp.kemenag.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between hover:text-emerald-400 transition-colors"
                >
                  <span>PTSP Online Kemenag RI</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Kantor Kementerian Agama Kabupaten Murung Raya, Kalimantan Tengah. Hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-4">
            <span>Standar Pelayanan Publik</span>
            <span>·</span>
            <span>Keterbukaan Informasi Publik (KIP)</span>
            <span>·</span>
            <span>Satu Data Kemenag</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
