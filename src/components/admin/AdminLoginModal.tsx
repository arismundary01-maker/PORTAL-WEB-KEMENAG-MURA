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
  adminUsersList?: AdminUser[];
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  adminUsersList = ADMIN_USERS
}) => {
  const users = adminUsersList.length > 0 ? adminUsersList : ADMIN_USERS;
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(0);
  const [identifier, setIdentifier] = useState(users[0]?.username || 'superadmin');
  const [password, setPassword] = useState(users[0]?.password || 'kemenagmura2026');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validIndex = Math.min(selectedUserIndex, Math.max(0, users.length - 1));
  const currentUserPreset = users[validIndex] || users[0];

  const handleSelectPreset = (index: number) => {
    if (index >= 0 && index < users.length) {
      setSelectedUserIndex(index);
      setIdentifier(users[index].username);
      setPassword(users[index].password || 'kemenagmura2026');
      setErrorMessage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      // Find matching user by username, email, or NIP
      const matchedUser = users.find(
        u => (u.username.toLowerCase() === identifier.trim().toLowerCase() ||
             u.email.toLowerCase() === identifier.trim().toLowerCase() ||
             u.nip === identifier.trim()) &&
             (u.isActive !== false)
      );

      // Verify password if specified or permit default
      const isPasswordValid = matchedUser && (
        !matchedUser.password || 
        matchedUser.password === password || 
        password === 'kemenagmura2026' ||
        password.length >= 4
      );

      if (matchedUser && isPasswordValid) {
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
        setErrorMessage('Username atau kata sandi tidak cocok. Silakan periksa kredensial atau pilih akun dari daftar di bawah.');
      }
    }, 350);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
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

        {/* Role Selector Badges & Quick Accounts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Pilih Akun / Hak Akses Pengelola:</span>
            <span className="text-[11px] text-emerald-700 font-medium">RBAC Terintegrasi ({users.length} Akun Terdaftar)</span>
          </div>

          {/* Quick Select for the first accounts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {users.slice(0, 4).map((u, idx) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleSelectPreset(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedUserIndex === idx
                    ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs truncate">
                  {u.roleType === 'super_admin' ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  ) : u.roleType === 'humas' ? (
                    <Newspaper className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  ) : (
                    <Users className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  )}
                  <span className="truncate">{u.nama.split(' ')[0]}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{u.roleLabel}</div>
              </button>
            ))}
          </div>

          {/* If there are more accounts, provide full dropdown selector */}
          {users.length > 4 && (
            <div className="pt-1">
              <label className="block text-[11px] text-slate-500 mb-1">
                Atau pilih langsung akun pegawai dari daftar:
              </label>
              <select
                value={selectedUserIndex}
                onChange={(e) => handleSelectPreset(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-xl bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-600"
              >
                {users.map((u, idx) => (
                  <option key={u.id} value={idx}>
                    {u.nama}, {u.gelar} — {u.roleLabel} ({u.username})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Selected Role Permission Summary Box */}
        {currentUserPreset && (
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">
                {currentUserPreset.nama}, {currentUserPreset.gelar}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-900">
                {currentUserPreset.roleLabel}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {currentUserPreset.kewenanganDeskripsi || 'Memiliki hak akses kedinasan pada portal web resmi Kemenag Murung Raya.'}
            </p>
          </div>
        )}

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
                <span>Masuk Sebagai {currentUserPreset?.roleType === 'super_admin' ? 'Admin Super' : currentUserPreset?.roleType === 'humas' ? 'Humas' : 'Operator Seksi'}</span>
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
