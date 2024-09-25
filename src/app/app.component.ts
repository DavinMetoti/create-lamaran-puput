import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import jsPDF from 'jspdf';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Message, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    MessagesModule
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'create-lamaran';
  nama_perusahaan = '';
  alamat_perusahaan = '';
  posisi = '';
  messages: any;


  constructor(
    public message: MessageService
  ) { }

  generatePDF() {
    if (this.nama_perusahaan == '' || this.alamat_perusahaan == '' || this.posisi == '') {
      this.messages = [{ severity: 'warn', detail: 'Diisi dulu semua sayangku' }];
    } else {
      const doc = new jsPDF();
      doc.setFont('times');
      doc.setFontSize(12);

      const today = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const formattedDate = today.toLocaleDateString('id-ID', options);


      doc.text('Semarang, ' + formattedDate, 180, 20, { align: 'right' });

      doc.text('Perihal: Lamaran Kerja', 20, 30);
      doc.text('Kepada,', 20, 40);
      doc.text('HRD ' + this.nama_perusahaan, 20, 46);
      doc.text(this.alamat_perusahaan, 20, 52);

      doc.text('Dengan Hormat,', 20, 70);

      const paragraph1 = 'Sehubungan dengan informasi lowongan pekerjaan yang saya dapat, saya mengetahui bahwa ' + this.nama_perusahaan + ' sedang mencari posisi ' + this.posisi + '. Untuk itu, saya yang bertanda tangan di bawah ini:';

      doc.text(doc.splitTextToSize(paragraph1, 165), 20, 80);

      const leftColumnX = 20;
      const valueColumnX = 60;

      doc.text('Nama', leftColumnX, 110);
      doc.text(': Puput Sekar Melati', valueColumnX, 110);

      doc.text('Jenis kelamin', leftColumnX, 116);
      doc.text(': Perempuan', valueColumnX, 116);

      doc.text('Tempat/Tanggal Lahir', leftColumnX, 122);
      doc.text(': Bogor, 16 Mei 2004', valueColumnX, 122);

      doc.text('Alamat', leftColumnX, 128);
      doc.text(': Jln Tambangan 1 RT 001 RW 001 Kelurahan Tambangan,', valueColumnX, 128);
      doc.text('', leftColumnX, 134);
      doc.text('  Kecamatan Mijen Kota Semarang', valueColumnX, 134);

      const paragraph2 = 'Dengan ini saya bermaksud untuk melamar posisi ' + this.posisi + ' di ' + this.nama_perusahaan + '. Sebagai bahan pertimbangan, saya sertakan beberapa dokumen sebagai berikut:';

      doc.text(doc.splitTextToSize(paragraph2, 165), 20, 146);

      doc.text('• Fotokopi KTP', 20, 160);
      doc.text('• Daftar Riwayat Hidup', 20, 166);
      doc.text('• Fotokopi Ijazah', 20, 172);
      doc.text('• Fotokopi Kartu Keluarga', 20, 178);
      doc.text('• Pas Foto', 20, 184);

      const paragraph3 = 'Dengan demikian, saya sangat berharap dapat diberikan kesempatan untuk mengikuti proses seleksi lebih lanjut. Saya akan sangat berterima kasih jika Bapak/Ibu HRD berkenan mempertimbangkan lamaran ini. Terima kasih atas waktu dan perhatian yang telah diberikan.';

      doc.text(doc.splitTextToSize(paragraph3, 170), 20, 196);

      doc.text('Hormat saya,', 180, 230, { align: 'right' });
      doc.text('Puput Sekar Melati', 180, 236, { align: 'right' });


      doc.save('Surat Lamaran ' + this.nama_perusahaan + '.pdf');
    }
  }

}
