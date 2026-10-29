import React, { useState, useRef } from 'react';
import { 
  Globe, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  ArrowLeft, 
  ShieldCheck, 
  Lock,
  AlertCircle
} from 'lucide-react';

interface PtspEmbeddedViewProps {
  onBackToHome: () => void;
}

export const PtspEmbeddedView: React.FC<PtspEmbeddedViewProps> = ({ onBackToHome }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const ptspUrl = "https://ptsp-kemenag-mura.vercel.app/";

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(!isFullscreen);
        });
      }
      setIsFullscreen(true);
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          setIsFullscreen(false);
        });
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`bg-slate-100 flex flex-col transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 p-0 m-0 bg-white' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'
      }`}
    >
      {/* Top Embedded Control Bar */}
      <div className="bg-white rounded-t-2xl border border-slate-200 border-b-0 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        
        {/* Left: Brand & URL Address bar */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
            title="Kembali ke Beranda Portal Kemenag Mura"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs w-full sm:w-96 text-slate-600 truncate">
            <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="font-mono text-[11px] truncate">{ptspUrl}</span>
            <span className="ml-auto text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.2 rounded shrink-0">
              Terhubung
            </span>
          </div>
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 mr-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Layanan Terpadu Satu Pintu Mandiri</span>
          </span>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2 text-slate-600 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            title="Muat Ulang Halaman PTSP"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Buka Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Keluar' : 'Layar Penuh'}</span>
          </button>

          {/* Open in new tab fallback */}
          <a
            href={ptspUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
            title="Buka pada tab terpisah jika diperlukan"
          >
            <span>Tab Baru</span>
            <ExternalLink className="w-3 h-3 text-emerald-700" />
          </a>
        </div>

      </div>

      {/* Frame Container */}
      <div className="relative w-full bg-white border border-slate-200 rounded-b-2xl overflow-hidden shadow-md flex-1">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-slate-50/90 backdrop-blur-2xs flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-3 border-emerald-200 border-t-emerald-800 rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-xs font-bold text-slate-800">
                Memuat Layanan PTSP Online Kemenag Murung Raya...
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                {ptspUrl}
              </p>
            </div>
          </div>
        )}

        {/* Embedded Iframe */}
        <iframe
          key={iframeKey}
          src={ptspUrl}
          title="Layanan PTSP Online Kantor Kementerian Agama Kabupaten Murung Raya"
          className="w-full border-0 transition-opacity duration-300"
          style={{
            height: isFullscreen ? 'calc(100vh - 60px)' : '800px',
            opacity: isLoading ? 0.3 : 1
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          allow="geolocation; microphone; camera; display-capture; clipboard-read; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
        />

        {/* Fallback box if iframe has trouble loading */}
        {hasError && (
          <div className="p-8 text-center bg-white rounded-b-2xl space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">
              Tampilan PTSP Tidak Dapat Dimuat dalam Frame
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Peramban Anda mungkin membatasi konten eksternal tertentu. Anda dapat langsung membuka portal PTSP resmi melalui tombol berikut:
            </p>
            <a
              href={ptspUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
            >
              <span>Buka Layanan PTSP Kemenag Mura</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

      </div>

      {/* Embedded footer note */}
      {!isFullscreen && (
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-emerald-600" />
            <span>Sistem Informasi PTSP Resmi Kantor Kementerian Agama Kabupaten Murung Raya</span>
          </div>
          <div>
            Jika membutuhkan bantuan teknis pendaftaran, hubungi PTSP Kemenag Mura di <strong>(0528) 31445</strong>
          </div>
        </div>
      )}

    </div>
  );
};
