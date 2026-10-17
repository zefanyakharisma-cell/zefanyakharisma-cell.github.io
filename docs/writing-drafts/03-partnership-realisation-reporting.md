# 03 · Reporting partnership activities as RENSTRA / IKU indicators (SIM Realisasi)

```yaml
slug: reporting-partnership-realisation-renstra
streams: [systems]
type: explainer
related_page: /sim-realisasi      # "SIM Realisasi"
featured: false
cover_upload: public/assets/images/partnerships/meetings/de-la-salle-1.jpg
cover_alt: "De La Salle University and PETRA delegations in a meeting room"
publish_date: ""
primary_search_intent:
  id: ["laporan realisasi kerjasama", "IKU kerjasama", "indikator kerja sama perguruan tinggi"]
  en: ["reporting university partnership activities KPI"]
```

Internal links used: [/sim-realisasi](/sim-realisasi), [/sim-kerjasama](/sim-kerjasama), [/university-support](/university-support)

Note for the owner: the repo describes RENSTRA indicators (1.1, 1.19.S1, 1.19.S4) but does not mention the ministry's IKU. The draft explains the link cautiously and marks where an exact IKU mapping is needed.

---

## English

**Title:** From Signed Agreements to Counted Partnership Activities

**Excerpt:** How SIM Realisasi turns activities under PETRA's MoUs and MoAs into verified RENSTRA indicators, and the rules that keep each semester's numbers stable.

### Body

An agreement is only worth what is carried out under it. Every Indonesian university is asked, in one form or another, to show that its partnerships produce something: students who went abroad, students who came in, joint activities that actually happened. Until recently, at Petra Christian University (PETRA), nobody could count that reliably.

SIM Realisasi is the system I designed to fix this. Its mission is to collect, verify, store and report every activity carried out under PETRA's MoUs and MoAs. This post explains how it works and the rules behind it, for anyone who has to produce a partnership realisation report (*laporan realisasi kerja sama*) every semester.

## Why realisation needed its own system

Before SIM Realisasi, four things went wrong every semester.

1. Realisations reached the International Office through scattered reports, emails and spreadsheets.
2. Counting inbound and outbound students meant manual reconciliation.
3. The same student could be reported by two units and counted twice.
4. Last semester's numbers shifted whenever a late report arrived.

The last one matters more than it looks. If a reported figure changes after it has gone to leadership, every later conversation starts with "which number is right?"

## The unit of reporting: one activity, one agreement

The system is built on a few terms, and getting them right was most of the design work.

- **Kegiatan (activity):** one activity under one agreement, documented by one Implementation Arrangement (IA) and one Implementation Report (IR).
- **Kerja sama (agreement):** the single MoU or MoA from SIM Kerjasama that the activity implements, picked only from documents valid on the activity dates.
- **Renewal chain:** an agreement plus all its renewals. A mid-year renewal therefore counts once, not twice.
- **Jenis kegiatan (activity type):** a list maintained by the International Office, which decides per type whether it is mobility and whether it counts toward a given indicator.
- **Snapshot:** a semester's frozen indicator values, with the IDs of every record behind them and the settings used.

What is in scope is deliberate: activities that implement a PETRA MoU or MoA recorded in SIM Kerjasama. IISMA, free movers, government scholarships and imports of historical data are out of scope.

## From activity to indicator

### Submit

The academic unit that ran the activity fills in one page in four steps: details, participants, files, submit. It picks the agreement from a list of documents valid on the activity date. The system sets the semester and academic year from the start date, and the deadline is the end date plus 30 days. Late submissions are flagged, not refused.

### Verify

Mobility activities need a participant list and one combined PDF, and are verified by the International Office's mobility team. Student and employee numbers are looked up against BAAK and HR records. If two units report the same student, the mobility team decides which activity keeps them, and approval waits until that is decided. Other activity types are verified on submission.

### Never reject, always revise

A wrong submission is never rejected. It comes back as a revision with a note and returns as the next participant version. Submitted activities are never deleted. This keeps a full trail for audits and stops units from quietly resubmitting under a new record.

### Count

Indicators are computed by the database from verified data only. The status path is *Draf*, *Diajukan*, *Menunggu verifikasi*, *Terverifikasi* and finally *Terhitung* (counted).

## Which indicators

SIM Realisasi reports RENSTRA 1.1 (inbound and outbound students), RENSTRA 1.19.S1 (international activities) and RENSTRA 1.19.S4 (agreements actually realised, counted per renewal chain), as well as an internal International Awards ranking of study programmes on verified activity.

These are PETRA's strategic-plan indicators. Many of the same figures feed what universities report against the ministry's main performance indicators (IKU), particularly those about student activity outside campus and partnerships with external institutions. [CONFIRM: which IKU numbers PETRA reports from SIM Realisasi data, and the exact definitions used]

## Freezing the semester

On each semester's cutoff date, a daily job freezes the indicators into a snapshot, with the ID of every record behind each figure. After that:

- an activity verified or edited inside a frozen window is logged as a post-freeze change, not merged silently;
- the administrator can only re-freeze, and must record a reason;
- leadership reads the frozen snapshot and the live year-to-date figures side by side, and downloads both as Excel.

That is what makes a report reproducible. If an accreditation assessor asks how a figure was reached a year later, the answer is a list of records, not a reconstruction.

## Privacy is part of the design

Activities carry personal data about students and staff, so access is enforced in the database with row-level security, not only hidden in the interface. Leadership sees verified activities but not participant names. Every export containing student data is logged, in line with Indonesia's personal data protection law (UU PDP 27/2022).

## Closing the loop with the agreement system

Realisation data flows back to SIM Kerjasama. Each agreement shows its verified activities across the whole renewal chain, and active agreements with no activity this year get a "no activity yet" flag, unless they are in a grace period. When a renewal is assessed, the activity summary is there as evidence. Dormant partnerships become visible instead of quietly renewing. The [SIM Kerjasama case study](/sim-kerjasama) shows the other side of that link.

## What I would tell another university

- Define "one activity" before building anything. Most double counting starts with a vague unit.
- Link every activity to a specific, valid agreement, or the realisation figure means nothing.
- Verify before counting, and decide duplicates once.
- Freeze each semester. Stable numbers build more trust than perfect ones.

The [SIM Realisasi case study](/sim-realisasi) has the business process, the role matrix and a demo on generated data. It is one of the ways I [support PETRA's faculties and units on partnership](/university-support).

---

## Bahasa Indonesia

**Judul:** Laporan Realisasi Kerja Sama yang Bisa Dipertanggungjawabkan

**Ringkasan:** Cara SIM Realisasi mengubah kegiatan di bawah MoU dan MoA PETRA menjadi indikator RENSTRA yang terverifikasi, dan aturan agar angka tiap semester tidak berubah.

### Isi

Nilai sebuah kerja sama ada pada apa yang benar-benar dijalankan. Setiap perguruan tinggi di Indonesia, dengan satu atau lain cara, diminta menunjukkan hasil kerja samanya: mahasiswa yang berangkat, mahasiswa yang datang, kegiatan bersama yang sungguh terlaksana. Sampai belum lama ini, di Universitas Kristen Petra (PETRA), angka itu belum bisa dihitung dengan andal.

SIM Realisasi adalah sistem yang saya rancang untuk menjawab masalah itu. Tugasnya mengumpulkan, memverifikasi, menyimpan, dan melaporkan setiap kegiatan yang dijalankan di bawah MoU dan MoA PETRA. Tulisan ini untuk rekan-rekan yang setiap semester harus menyusun laporan realisasi kerja sama.

## Mengapa realisasi butuh sistem sendiri

Sebelum ada SIM Realisasi, empat hal selalu terulang setiap semester.

1. Data realisasi masuk ke Kantor Internasional lewat laporan, surel, dan spreadsheet yang tercecer.
2. Menghitung mahasiswa *inbound* dan *outbound* berarti rekonsiliasi manual.
3. Mahasiswa yang sama bisa dilaporkan dua unit dan terhitung dua kali.
4. Angka semester lalu berubah setiap kali ada laporan yang terlambat masuk.

Poin terakhir lebih penting daripada kelihatannya. Kalau angka yang sudah dilaporkan ke pimpinan berubah, setiap pembicaraan berikutnya dimulai dengan pertanyaan "jadi angka yang benar yang mana?"

## Satuan laporan: satu kegiatan, satu naskah

Sistem ini berdiri di atas beberapa istilah, dan merumuskannya dengan tepat adalah sebagian besar pekerjaan desain.

- **Kegiatan:** satu kegiatan di bawah satu naskah, didokumentasikan dengan satu *Implementation Arrangement* (IA) dan satu *Implementation Report* (IR).
- **Kerja sama:** satu MoU atau MoA dari SIM Kerjasama yang dilaksanakan oleh kegiatan itu, dipilih hanya dari naskah yang berlaku pada tanggal kegiatan.
- **Rantai perpanjangan:** satu naskah beserta seluruh perpanjangannya. Naskah yang diperpanjang di tengah tahun tetap terhitung satu.
- **Jenis kegiatan:** daftar yang dikelola Kantor Internasional. Untuk setiap jenis, kantor menentukan apakah termasuk mobilitas dan apakah dihitung untuk indikator tertentu.
- **Snapshot:** nilai indikator satu semester yang dibekukan, lengkap dengan ID setiap data di baliknya dan pengaturan yang dipakai.

Cakupannya sengaja dibatasi: kegiatan yang melaksanakan MoU atau MoA PETRA yang tercatat di SIM Kerjasama. IISMA, *free mover*, beasiswa pemerintah, dan impor data lama tidak termasuk.

## Dari kegiatan ke indikator

### Pengajuan

Unit akademik yang menjalankan kegiatan mengisi satu halaman dalam empat langkah: detail, peserta, berkas, ajukan. Naskah dipilih dari daftar naskah yang berlaku pada tanggal kegiatan. Sistem menentukan semester dan tahun akademik dari tanggal mulai, dan tenggatnya adalah tanggal selesai ditambah 30 hari. Pengajuan yang terlambat diberi tanda, bukan ditolak.

### Verifikasi

Kegiatan mobilitas wajib melampirkan daftar peserta dan satu PDF gabungan, lalu diverifikasi oleh tim mobilitas Kantor Internasional. NIM dan nomor induk pegawai dicek otomatis ke data BAAK dan SDM. Kalau dua unit melaporkan mahasiswa yang sama, tim mobilitas memutuskan kegiatan mana yang mencatat mahasiswa itu, dan persetujuan menunggu sampai keputusan diambil. Jenis kegiatan lain langsung terverifikasi saat diajukan.

### Tidak ada penolakan, yang ada revisi

Pengajuan yang keliru tidak pernah ditolak. Pengajuan itu dikembalikan sebagai revisi dengan catatan, lalu kembali sebagai versi peserta berikutnya. Kegiatan yang sudah diajukan tidak pernah dihapus. Dengan begitu jejaknya lengkap untuk audit, dan unit tidak bisa diam-diam mengajukan ulang sebagai data baru.

### Penghitungan

Indikator dihitung oleh basis data hanya dari data terverifikasi. Alur statusnya: *Draf*, *Diajukan*, *Menunggu verifikasi*, *Terverifikasi*, lalu *Terhitung*.

## Indikator apa saja

SIM Realisasi melaporkan RENSTRA 1.1 (mahasiswa *inbound* dan *outbound*), RENSTRA 1.19.S1 (kegiatan internasional), dan RENSTRA 1.19.S4 (naskah yang benar-benar terealisasi, dihitung per rantai perpanjangan), ditambah pemeringkatan internal International Awards untuk program studi berdasarkan kegiatan terverifikasi.

Indikator-indikator ini milik Rencana Strategis PETRA. Banyak angka yang sama juga menjadi bahan laporan Indikator Kinerja Utama (IKU) kementerian, terutama yang berkaitan dengan kegiatan mahasiswa di luar kampus dan kerja sama dengan mitra. [CONFIRM: nomor IKU yang dilaporkan PETRA dari data SIM Realisasi, beserta definisinya]

## Membekukan angka semester

Pada tanggal *cutoff* setiap semester, proses harian membekukan indikator menjadi *snapshot*, lengkap dengan ID setiap data di balik setiap angka. Setelah itu:

- kegiatan yang diverifikasi atau diubah dalam periode yang sudah dibekukan dicatat sebagai perubahan pasca-pembekuan, bukan digabung diam-diam;
- admin hanya bisa membekukan ulang, dan wajib mencatat alasannya;
- pimpinan membaca *snapshot* beku dan angka berjalan tahun ini secara berdampingan, dan bisa mengunduh keduanya dalam format Excel.

Inilah yang membuat laporan bisa direproduksi. Kalau setahun kemudian asesor akreditasi bertanya bagaimana sebuah angka diperoleh, jawabannya adalah daftar data, bukan rekonstruksi dari ingatan.

## Perlindungan data sejak rancangan

Data kegiatan memuat data pribadi mahasiswa dan pegawai. Karena itu hak akses dijaga di tingkat basis data dengan *row-level security*, bukan sekadar disembunyikan di tampilan. Pimpinan melihat kegiatan terverifikasi tanpa nama peserta. Setiap ekspor yang memuat data mahasiswa tercatat, sesuai UU Pelindungan Data Pribadi Nomor 27 Tahun 2022.

## Umpan balik ke sistem naskah

Data realisasi mengalir kembali ke SIM Kerjasama. Setiap naskah menampilkan kegiatan terverifikasinya di sepanjang rantai perpanjangan, dan naskah aktif yang belum punya kegiatan tahun ini diberi tanda "belum ada kegiatan", kecuali masih dalam masa tenggang. Ketika perpanjangan dinilai, ringkasan kegiatan tersedia sebagai bukti. Kerja sama yang tidur jadi terlihat, alih-alih diperpanjang begitu saja. Sisi lain dari hubungan ini dijelaskan di [studi kasus SIM Kerjasama](/sim-kerjasama).

## Saran untuk kampus lain

- Definisikan "satu kegiatan" sebelum membangun apa pun. Penghitungan ganda hampir selalu berawal dari satuan yang kabur.
- Kaitkan setiap kegiatan dengan naskah tertentu yang masih berlaku. Tanpa itu, angka realisasi tidak bermakna.
- Verifikasi sebelum menghitung, dan putuskan data ganda sekali saja.
- Bekukan angka setiap semester. Angka yang stabil lebih dipercaya daripada angka yang sempurna.

Proses bisnis, matriks peran, dan demo dengan data contoh ada di [studi kasus SIM Realisasi](/sim-realisasi). Sistem ini adalah salah satu bentuk [dukungan kerja sama saya untuk fakultas dan unit di PETRA](/university-support).
