import React, { useState } from 'react';
import { AdminUser } from '../../types/admin';
import { ADMIN_USERS } from '../../data/adminMockData';
import { OfficialEmblem } from '../OfficialEmblem';
import { 
  Lock, 
  User, 
  KeyRound, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Command,
  CheckCircle2,
  Users,
  Newspaper,
  Layers,
  Building2,
  GraduationCap
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(0);
  const [identifier, setIdentifier] = useState(ADMIN_USERS[0].username);
  const [password, setPassword] = useState('kemenagmura2026');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (index: number) => {
    setSelectedUserIndex(index);
    setIdentifier(ADMIN_USERS[index].username);
    setPassword('kemenagmura2026');
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      // Find matching user by username, email, or NIP
      const matchedUser = ADMIN_USERS.find(
        u => u.username.toLowerCase() === identifier.trim().toLowerCase() ||
             u.email.toLowerCase() === identifier.trim().toLowerCase() ||
             u.nip === identifier.trim()
      );

      if (matchedUser && password.length >= 4) {
        onLoginSuccess({
          ...matchedUser,
          loginTime: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
        });
        onClose();
      } else {
        setErrorMessage('Username atau kata sandi tidak cocok. Silakan pilih akun pengelola di bawah.');
      }
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-auto">
        
        {/* Header with Official Emblem */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <OfficialEmblem size={46} />
            <div>
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                Kementerian Agama Kab. Murung Raya
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Sistem Login Pengelola Portal Resmi
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[10px]">
                  <Command className="w-3 h-3" />
                  <span>Shortcut: Ctrl + Shift + A</span>
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg text-lg font-bold"
            title="Tutup dialog login"
          >
            ✕
          </button>
        </div>

        {/* Role Selector Badges (Admin Super, Humas, Operator Seksi) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Pilih Hak Akses Pengelola:</span>
            <span className="text-[11px] text-emerald-700 font-medium">RBAC Terintegrasi</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* 1. Admin Super */}
            <button
              type="button"
              onClick={() => handleSelectPreset(0)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedUserIndex === 0
                  ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Admin Super</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">Akses Semua Data</div>
            </button>

            {/* 2. Humas */}
            <button
              type="button"
              onClick={() => handleSelectPreset(1)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedUserIndex === 1
                  ? 'border-purple-600 bg-purple-50/80 ring-2 ring-purple-600/30'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-purple-800 font-bold text-xs">
                <Newspaper className="w-3.5 h-3.5 shrink-0" />
                <span>Humas</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">Berita & Galeri</div>
            </button>

            {/* 3. Operator Kepegawaian */}
            <button
              type="button"
              onClick={() => handleSelectPreset(2)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedUserIndex === 2
                  ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/30'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-blue-800 font-bold text-xs">
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span>Op. Pegawai</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">Data ASN & TU</div>
            </button>

            {/* 4. Operator Seksi Pendis */}
            <button
              type="button"
              onClick={() => handleSelectPreset(3)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedUserIndex === 3
                  ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-600/30'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5 text-teal-800 font-bold text-xs">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>Op. Pendis</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">SIPENDIS MURA</div>
            </button>
          </div>

          {/* Sub-selector for Religious Section Operators */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleSelectPreset(4)}
              className={`py-1.5 px-2 rounded-lg border text-center transition-all text-[11px] font-semibold ${
                selectedUserIndex === 4
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Op. Bimas Islam
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset(5)}
              className={`py-1.5 px-2 rounded-lg border text-center transition-all text-[11px] font-semibold ${
                selectedUserIndex === 5
                  ? 'border-purple-600 bg-purple-50 text-purple-900 ring-1 ring-purple-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Op. Bimas Kristen
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset(6)}
              className={`py-1.5 px-2 rounded-lg border text-center transition-all text-[11px] font-semibold ${
                selectedUserIndex === 6
                  ? 'border-amber-600 bg-amber-50 text-amber-900 ring-1 ring-amber-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Op. Bimas Hindu
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset(7)}
              className={`py-1.5 px-2 rounded-lg border text-center transition-all text-[11px] font-semibold ${
                selectedUserIndex === 7
                  ? 'border-cyan-600 bg-cyan-50 text-cyan-900 ring-1 ring-cyan-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Op. Bimas Budha
            </button>
          </div>
        </div>

        {/* Selected Role Permission Summary Box */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">
              {ADMIN_USERS[selectedUserIndex].nama}, {ADMIN_USERS[selectedUserIndex].gelar}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-900">
              {ADMIN_USERS[selectedUserIndex].roleLabel}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {ADMIN_USERS[selectedUserIndex].kewenanganDeskripsi}
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-800">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Username / NIP / Email Pengelola
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Username (contoh: superadmin, humas, op_kepegawaian, dll)"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md transition-colors"
          >
            {isLoading ? (
              <span>Memverifikasi Hak Akses...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Masuk Sebagai {ADMIN_USERS[selectedUserIndex].roleType === 'super_admin' ? 'Admin Super' : ADMIN_USERS[selectedUserIndex].roleType === 'humas' ? 'Humas' : 'Operator Seksi'}</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Kemenag Kabupaten Murung Raya</span>
          <span className="font-mono">Sistem Keamanan Terenkripsi</span>
        </div>

      </div>
    </div>
  );
};
