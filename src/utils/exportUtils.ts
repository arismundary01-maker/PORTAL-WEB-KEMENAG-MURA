import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface PdfExportConfig {
  title: string;
  subTitle?: string;
  sectorName: string;
  headers: string[];
  rows: (string | number)[][];
  fileName: string;
}

export function exportToExcel(data: Record<string, unknown>[], fileName: string, sheetName = 'Data Kemenag'): void {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Auto-fit column widths
    const columnWidths = Object.keys(data[0] || {}).map(key => {
      const maxLen = Math.max(
        key.length,
        ...data.map(item => String(item[key] ?? '').length)
      );
      return { wch: Math.min(Math.max(maxLen + 3, 12), 40) };
    });
    worksheet['!cols'] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    const cleanFileName = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
    XLSX.writeFile(workbook, cleanFileName);
  } catch (error) {
    console.error('Gagal mengekspor data ke Excel:', error);
    alert('Terjadi kesalahan saat memproses ekspor Excel.');
  }
}

export function exportToCSV(data: Record<string, unknown>[], fileName: string): void {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    
    // Prepend UTF-8 BOM so Excel opens indonesian diacritics / special characters nicely
    const blob = new Blob(['\uFEFF' + csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName.endsWith('.csv') ? fileName : `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Gagal mengekspor data ke CSV:', error);
    alert('Terjadi kesalahan saat memproses ekspor CSV.');
  }
}

export function exportToOfficialPDF(config: PdfExportConfig): void {
  try {
    // A4 landscape or portrait based on column count
    const orientation = config.headers.length > 5 ? 'landscape' : 'portrait';
    const doc = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    let currentY = 14;

    // --- KOP SURAT RESMI KEMENTERIAN AGAMA ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(20, 83, 45); // Emerald-900 / Green Kemenag
    doc.text('KEMENTERIAN AGAMA REPUBLIK INDONESIA', pageWidth / 2, currentY, { align: 'center' });
    currentY += 5.5;

    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text('KANTOR KEMENTERIAN AGAMA KABUPATEN MURUNG RAYA', pageWidth / 2, currentY, { align: 'center' });
    currentY += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105); // Slate-600
    doc.text('Jl. Jenderal Sudirman No. 12, Kompleks Perkantoran Pemkab Murung Raya, Puruk Cahu 73911', pageWidth / 2, currentY, { align: 'center' });
    currentY += 3.8;
    doc.text('Telepon: (0528) 31445 | Email: kemenag.murungraya@kemenag.go.id | Laman: murungraya.kemenag.go.id', pageWidth / 2, currentY, { align: 'center' });
    currentY += 3.5;

    // Double hairline government style
    doc.setDrawColor(20, 83, 45);
    doc.setLineWidth(0.8);
    doc.line(14, currentY, pageWidth - 14, currentY);
    currentY += 1.2;
    doc.setLineWidth(0.2);
    doc.line(14, currentY, pageWidth - 14, currentY);
    currentY += 8;

    // --- JUDUL DOKUMEN ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(config.title.toUpperCase(), pageWidth / 2, currentY, { align: 'center' });
    currentY += 5;

    if (config.subTitle) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(config.subTitle, pageWidth / 2, currentY, { align: 'center' });
      currentY += 4;
    }

    const todayStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Waktu Cetak: ${todayStr} | Dokumen Resmi Sistem Informasi Kemenag Mura`, 14, currentY);
    currentY += 3;

    // --- TABEL DATA AUTO-TABLE ---
    autoTable(doc, {
      startY: currentY,
      head: [config.headers],
      body: config.rows,
      theme: 'grid',
      headStyles: {
        fillColor: [20, 83, 45], // Emerald-900
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8.5,
        halign: 'center',
        valign: 'middle',
        cellPadding: 2.5
      },
      styles: {
        fontSize: 7.5,
        textColor: [30, 41, 59],
        cellPadding: 2,
        lineColor: [226, 232, 240],
        lineWidth: 0.1
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252] // Slate-50
      },
      margin: { left: 14, right: 14, bottom: 25 },
      didDrawPage: (data) => {
        // Footer on each page
        const str = `Halaman ${data.pageNumber}`;
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(str, pageWidth - 14, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
        doc.text('Kantor Kementerian Agama Kabupaten Murung Raya - "Ikhlas Beramal"', 14, doc.internal.pageSize.getHeight() - 10);
      }
    });

    // Signature Block on final page
    const finalY = (doc as any).lastAutoTable?.finalY || currentY + 40;
    const pageHeight = doc.internal.pageSize.getHeight();

    // Check if there's enough room for signature block (need ~35mm)
    if (finalY + 38 > pageHeight - 15) {
      doc.addPage();
      currentY = 20;
    } else {
      currentY = finalY + 10;
    }

    const sigX = pageWidth - 70;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(`Puruk Cahu, ${todayStr}`, sigX, currentY);
    currentY += 4.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Kepala Kantor Kementerian Agama', sigX, currentY);
    currentY += 4;
    doc.text('Kabupaten Murung Raya,', sigX, currentY);
    currentY += 18; // Spasi tanda tangan

    doc.text('H. MARZUKI RAHMAN, S.Ag., M.Pd.I', sigX, currentY);
    currentY += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('NIP. 197205141999031003', sigX, currentY);

    doc.save(config.fileName.endsWith('.pdf') ? config.fileName : `${config.fileName}.pdf`);
  } catch (error) {
    console.error('Gagal mengekspor data ke PDF:', error);
    alert('Terjadi kesalahan saat memproses ekspor PDF.');
  }
}
