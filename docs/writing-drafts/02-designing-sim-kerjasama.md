# 02 · Designing a partnership information system (SIM Kerjasama)

```yaml
slug: designing-partnership-information-system
streams: [systems]
type: explainer
related_page: /sim-kerjasama      # "SIM Kerjasama"
featured: false
cover_upload: public/assets/images/partnerships/signings/talenta-karya-sentosa-1.jpg
cover_alt: "PETRA and Talenta Karya Sentosa signatories signing the MoU"
publish_date: ""
primary_search_intent:
  id: ["sistem informasi kerjasama perguruan tinggi", "aplikasi manajemen MoU kampus"]
  en: ["partnership management system university"]
```

Internal links used: [/sim-kerjasama](/sim-kerjasama), [/mou](/mou), [/sim-realisasi](/sim-realisasi)

---

## English

**Title:** Designing a Partnership Information System for a University

**Excerpt:** What I learned designing SIM Kerjasama, PETRA's system of record for MoUs and MoAs: the problems it solves, the rules it enforces and what to build first.

### Body

Most universities can tell you how many partners they have. Far fewer can tell you, today, which agreements are valid, who is holding the three that are stuck, and which partnerships nobody has used in a year. That gap is what a partnership information system is for.

At Petra Christian University (PETRA) I designed SIM Kerjasama, the official system of record for every MoU and MoA. It records who proposed each agreement, who approved it, when it is valid and whether it has been renewed. This post explains the design decisions behind it, for anyone planning something similar for their own institution.

## Start from the problems, not the screens

Before writing any requirement, I listed what was going wrong. There were four problems.

1. Proposals travelled by email and paper, so nobody could say where a document was or who was holding it.
2. Approvals had no clock. A draft could sit with one office for weeks without anyone noticing.
3. Renewals were noticed late, usually after the agreement had already expired, and decided without evidence.
4. The same partner was recorded under several spellings, so counts of partners and countries were unreliable.

Each problem became a design goal. Nine goals in total, grouped under three themes: governance (approvals follow the official hierarchy and every delay is visible), data quality (one clean, evidence-based dataset other systems can rely on) and visibility (active partnerships open to the whole university, and presented to partners as an official PETRA service).

## One record, one status, one owner

The core rule is simple: every MoU and MoA has one record, one status and one owner, from the first draft to the archive. The statuses follow the document through the approval process: *Draft*, *Diajukan* (submitted), *Diproses* (being routed), *Disposisi* (with an approver, tier 1, 2 or 3), *Disetujui* (approved), *Siap TTD* (ready to sign) and *Aktif* (active). Two side statuses, *Pending* and *Ditolak* (rejected), cover the exceptions.

Once active, an agreement moves through *Aktif*, *Akan Berakhir* (ending soon) and *Diarsipkan* (archived). An archived agreement always carries a reason: superseded by a renewal, expired without renewal, or terminated early. That one field later makes reporting honest.

## Enforce the approval hierarchy in software

### Tiers

Approvers sit in three tiers: the head of the International Office and the head of the Rector's Secretariat; deans and heads of programmes and units; and the Vice Rectors and the Rector, who decide in parallel. A tier opens only when no lower tier in the current round is still waiting. Empty tiers are skipped.

### Four decisions, not two

Approve opens the next tier. Revise asks for a new draft while the clock keeps running. Pending freezes the document and its clock. Reject archives it. Giving approvers an option besides rejecting was one of the most valuable choices in the whole project: it removed the reason to sit on a document.

### A clock per approver

Time is counted in business days from when an approver's tier opens, excluding weekends, holidays and time in Pending. The flag turns yellow at two days and red at four. Approvals taking more than four working days went from "unknown" to "visible per approver".

## Make renewal proactive and evidence-based

Renewal is where most partnership offices lose track. In SIM Kerjasama, reminders go out monthly from six months before the end date, then weekly for the last two months. A daily sweep at 05:15 WIB flags agreements that are ending.

Renewal then needs two evaluations: one from the owning unit, made in the app, and one from the lead partner, made through a secure link without creating an account. Renewal opens only when both agree, or when the office overrides with a recorded reason. Activating the renewal links it to the old agreement and archives the old one in a single transaction, so the history becomes a chain rather than a pile.

## Keep the partner dataset clean

Duplicate partner records were "piling up" before. The master data menu now lets the office merge partners and countries, so a university recorded under three spellings becomes one. This matters well beyond the partnerships office: accreditation evidence for BAN-PT and LAM assessors, RENSTRA counts of domestic and international agreements, and the international partner and country counts used for QS and THE submissions all depend on it.

## Eight menus, one lifecycle

The finished system has eight menus: Dashboard, Find Agreements, New Agreement, My Queue, Renewals, Notifications, Master Data and Admin. Each group of users sees what it needs. Approvers open only the documents waiting for them. Faculties propose agreements and follow their status. Leadership reads KPIs and RENSTRA indicators. Partners complete evaluations through an official PETRA link.

## Lessons for anyone building one

- **Allow the past in.** A "record an agreement already signed" path means the dataset is complete from day one, not only for new documents.
- **Measure before and after.** I listed seven measures, such as documents completed in under a month and renewals with a complete evaluation, and wrote down that most were "not measured" before. That list became the case for the system.
- **Design for the systems that come next.** The internationalisation KPI dashboard and [SIM Realisasi, which reports the activities under each agreement](/sim-realisasi), both read from SIM Kerjasama. A stable read interface was worth planning from the start.
- **Model the process before the database.** I modelled both processes, proposal and approval, and renewal and evaluation, in BPMN, from the rules the database enforces.

You can see the business process, the objectives and a live demo on the [SIM Kerjasama case study](/sim-kerjasama), and the wider agreement lifecycle on the [MoU and MoA coordination page](/mou). [CONFIRM: technology stack and build timeline, if you want to mention them]

---

## Bahasa Indonesia

**Judul:** Merancang Sistem Informasi Kerja Sama Perguruan Tinggi

**Ringkasan:** Catatan saya merancang SIM Kerjasama, sistem pencatatan resmi MoU dan MoA di PETRA: masalah yang diselesaikan, aturan yang dijaga, dan apa yang dibangun dulu.

### Isi

Hampir setiap kampus bisa menyebut berapa jumlah mitranya. Tetapi tidak banyak yang bisa menjawab, hari ini juga, naskah mana yang masih berlaku, siapa yang sedang menahan tiga naskah yang macet, dan kerja sama mana yang setahun terakhir tidak pernah dipakai. Celah inilah yang mestinya diisi oleh sistem informasi kerja sama.

Di Universitas Kristen Petra (PETRA), saya merancang SIM Kerjasama sebagai sistem pencatatan resmi untuk seluruh MoU dan MoA. Sistem ini mencatat siapa yang mengusulkan, siapa yang menyetujui, kapan masa berlakunya, dan apakah sudah diperpanjang. Tulisan ini membahas keputusan desain di baliknya, untuk rekan-rekan yang sedang merencanakan sistem serupa di kampusnya.

## Mulai dari masalah, bukan dari tampilan

Sebelum menulis kebutuhan sistem, saya mendata dulu apa saja yang bermasalah. Ada empat.

1. Usulan berpindah lewat surel dan kertas, sehingga tidak ada yang tahu naskah sedang di mana dan dipegang siapa.
2. Persetujuan tidak punya batas waktu. Draf bisa tertahan berminggu-minggu di satu kantor tanpa ada yang sadar.
3. Perpanjangan baru disadari terlambat, sering setelah masa berlaku habis, dan diputuskan tanpa bukti.
4. Satu mitra tercatat dengan beberapa ejaan, sehingga jumlah mitra dan negara tidak bisa dipercaya.

Setiap masalah saya ubah menjadi tujuan desain. Totalnya sembilan tujuan, dikelompokkan dalam tiga tema: tata kelola (persetujuan mengikuti hierarki resmi dan setiap keterlambatan terlihat), kualitas data (satu basis data kerja sama yang bersih dan berbasis bukti) dan keterbukaan (kerja sama aktif bisa dilihat seluruh kampus, dan tampil di hadapan mitra sebagai layanan resmi PETRA).

## Satu naskah, satu status, satu pemilik

Aturan intinya sederhana: setiap MoU dan MoA punya satu catatan, satu status, dan satu pemilik, dari draf pertama sampai arsip. Statusnya mengikuti perjalanan naskah: *Draft*, *Diajukan*, *Diproses*, *Disposisi* (tingkat 1, 2, atau 3), *Disetujui*, *Siap TTD*, dan *Aktif*. Dua status tambahan, *Pending* dan *Ditolak*, menampung pengecualian.

Setelah aktif, naskah bergerak dari *Aktif* ke *Akan Berakhir* lalu *Diarsipkan*. Setiap naskah yang diarsipkan wajib punya alasan: digantikan perpanjangan, berakhir tanpa perpanjangan, atau dihentikan lebih awal. Satu kolom ini kelak membuat laporan jauh lebih jujur.

## Hierarki persetujuan dijaga oleh sistem

### Tingkatan

Pemberi persetujuan dibagi tiga tingkat: Kepala Kantor Internasional dan Kepala Sekretariat Rektor; dekan serta kepala program studi, program, dan unit; serta para Wakil Rektor dan Rektor yang memutuskan secara paralel. Satu tingkat baru terbuka ketika tidak ada lagi tingkat di bawahnya yang masih menunggu. Tingkat yang kosong dilewati.

### Empat keputusan, bukan dua

Setujui membuka tingkat berikutnya. Revisi meminta draf baru, sementara waktu tetap berjalan. Pending membekukan naskah beserta hitungan waktunya. Tolak mengarsipkan naskah. Memberi pilihan selain menolak adalah salah satu keputusan terbaik dalam proyek ini, karena alasan untuk "menahan dulu" jadi hilang.

### Batas waktu per pemberi persetujuan

Waktu dihitung dalam hari kerja sejak giliran seseorang dibuka, tanpa akhir pekan, hari libur, dan masa *Pending*. Indikator berubah kuning di hari kedua dan merah di hari keempat. Persetujuan yang lebih dari empat hari kerja, yang dulu tidak diketahui, kini terlihat per orang.

## Perpanjangan yang proaktif dan berbasis bukti

Di tahap perpanjangan inilah banyak kantor kerja sama kehilangan jejak. Di SIM Kerjasama, pengingat dikirim setiap bulan mulai enam bulan sebelum masa berlaku habis, lalu setiap minggu pada dua bulan terakhir. Pemeriksaan harian pukul 05.15 WIB menandai naskah yang akan berakhir.

Perpanjangan kemudian membutuhkan dua evaluasi: dari unit pemilik, diisi di aplikasi, dan dari mitra utama, diisi lewat tautan aman tanpa perlu membuat akun. Perpanjangan baru bisa dibuka kalau keduanya sepakat, atau kalau kantor memutuskan lain dengan alasan yang tercatat. Saat perpanjangan diaktifkan, naskah baru otomatis tertaut ke naskah lama dan naskah lama diarsipkan dalam satu transaksi. Riwayatnya menjadi rantai, bukan tumpukan.

## Data mitra yang bersih

Dulu catatan mitra ganda terus menumpuk. Kini menu data induk memungkinkan kantor menggabungkan mitra dan negara, sehingga satu universitas yang tercatat dengan tiga ejaan menjadi satu. Manfaatnya jauh melampaui kantor kerja sama: bukti akreditasi untuk asesor BAN-PT dan LAM, rekap jumlah MoU/MoA dalam dan luar negeri untuk RENSTRA, serta jumlah mitra dan negara untuk pengisian data QS dan THE, semuanya bergantung pada data ini.

## Delapan menu, satu siklus

Sistem yang sudah jadi punya delapan menu: Dashboard, Cari Naskah, Naskah Baru, Antrean Saya, Perpanjangan, Notifikasi, Data Induk, dan Admin. Setiap kelompok pengguna melihat apa yang ia perlukan. Pemberi persetujuan hanya membuka naskah yang menunggu dirinya. Fakultas mengusulkan naskah dan memantau statusnya. Pimpinan membaca KPI dan indikator RENSTRA. Mitra mengisi evaluasi lewat tautan resmi PETRA.

## Pelajaran untuk yang ingin membangun

- **Beri jalan untuk naskah lama.** Fitur "catat naskah yang sudah ditandatangani" membuat data lengkap sejak hari pertama, bukan hanya untuk naskah baru.
- **Ukur sebelum dan sesudah.** Saya menyusun tujuh ukuran, misalnya naskah yang selesai dalam kurang dari sebulan dan perpanjangan dengan evaluasi lengkap, lalu mencatat bahwa sebagian besar sebelumnya "tidak diukur". Daftar itu menjadi alasan terkuat sistem ini dibangun.
- **Rancang untuk sistem berikutnya.** Dasbor KPI internasionalisasi dan [SIM Realisasi, yang mencatat kegiatan di bawah setiap naskah](/sim-realisasi), sama-sama membaca data dari SIM Kerjasama. Antarmuka baca yang stabil layak direncanakan sejak awal.
- **Modelkan proses sebelum basis data.** Kedua proses, pengusulan dan persetujuan serta perpanjangan dan evaluasi, saya modelkan dalam BPMN berdasarkan aturan yang dijaga basis data.

Proses bisnis, tujuan, dan demo langsungnya bisa dilihat di [studi kasus SIM Kerjasama](/sim-kerjasama), sedangkan siklus naskah secara utuh ada di [halaman koordinasi MoU dan MoA](/mou). [CONFIRM: teknologi yang dipakai dan lama pengembangan, bila ingin disebutkan]
