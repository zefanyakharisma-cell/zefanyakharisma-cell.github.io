// Programmer view of SIM Kerjasama and SIM Realisasi. Transcribed from the
// public repos (supabase/migrations, README, docs/spec/Rules.md v1.1):
//   github.com/zefanyakharisma-cell/SIM_Kerjasama
//   github.com/zefanyakharisma-cell/SIM_Realisasi
// Only a selection of columns is shown per table; `more` counts the rest.

export type Key = 'PK' | 'FK' | 'UQ' | 'LFK'
export type Column = { name: string; type: string; key?: Key }
export type Entity = { id: string; schema?: string; domain: string; col: number; columns: Column[]; more?: number; note?: string }
export type Relation = { from: string; to: string; logical?: boolean }
export type Domain = { key: string; label: string; color: string }
export type StepData = { rpc?: string[]; tables?: string[]; writes?: string; status?: string; rules?: string[] }
export type Rule = { id: string; text: string; where: string }
export type DevSystem = {
  repo: string
  stack: { layer: string; choice: string }[]
  principles: { title: string; text: string }[]
  arch: { title: string; items: string[] }[]
  domains: Domain[]
  entities: Entity[]
  relations: Relation[]
  steps: Record<string, StepData[]>
  rules: Rule[]
  enums: { name: string; values: string[] }[]
  jobs: { name: string; schedule: string; does: string }[]
  security: { title: string; text: string }[]
  tests: string[]
  counts: { label: string; value: string }[]
}

const c = (name: string, type: string, key?: Key): Column => ({ name, type, key })

export const simKerjasamaDev: DevSystem = {
  repo: 'https://github.com/zefanyakharisma-cell/SIM_Kerjasama',
  counts: [
    { label: 'SQL migrations', value: '61' },
    { label: 'Tables', value: '43' },
    { label: 'Postgres functions', value: '77' },
    { label: 'Scheduled sweeps', value: '2' },
  ],
  stack: [
    { layer: 'Frontend', choice: 'Next.js 15 (App Router, typed routes), React 18, TypeScript, Tailwind CSS 3' },
    { layer: 'Backend', choice: 'Supabase: Postgres 17, Auth, Storage, Row-Level Security, Edge Functions, pg_cron' },
    { layer: 'Domain logic', choice: 'Postgres functions: tier gating, business-day SLA with pause, unit cascade, renewal gate' },
    { layer: 'Charts / map', choice: 'ECharts (Studio Grafik), Leaflet (Peta Mitra Global)' },
    { layer: 'Exports', choice: 'ExcelJS (.xlsx)' },
    { layer: 'Email', choice: 'kirim-email Supabase Edge Function via Resend' },
    { layer: 'Hosting', choice: 'Vercel (frontend), Supabase (database and functions)' },
  ],
  principles: [
    { title: 'Rules live in the database', text: 'Access control is RLS; tier gating and SLA are Postgres functions. They behave the same from a Server Action, a sweep or the read API.' },
    { title: 'Server Components read, Server Actions write', text: 'No client-side data fetching and no internal API routes. Each action is a thin call into the function that owns the rule.' },
    { title: 'Views are security_invoker', text: 'RLS still decides which rows a view returns, so reporting never leaks.' },
    { title: 'Never hard-delete', text: 'Every archival records a reason: rejected, expired_without_renewal, superseded_by_renewal or terminated_early.' },
  ],
  arch: [
    { title: 'Browser → Next.js on Vercel', items: ['Server Components (read)', 'Server Actions (write)', '/api/ekspor (session)', '/api/v1 read API (API key)', '/evaluasi/[token] (public)'] },
    { title: 'Supabase Postgres', items: ['RLS on every table', 'recompute_tiers, SLA, cascade, renewal gate', 'pg_cron: SLA sweep, expiry sweep', 'notifikasi queue'] },
    { title: 'Outside', items: ['kirim-email Edge Function → Resend', 'SIM Realisasi (read views)', 'Internationalisation KPI dashboard'] },
  ],
  domains: [
    { key: 'master', label: 'Master data', color: '#6e7b8a' },
    { key: 'proposal', label: 'Proposal', color: '#2a64a8' },
    { key: 'workflow', label: 'Disposition & approval', color: '#b7791f' },
    { key: 'agreement', label: 'Agreement & renewal', color: '#135d50' },
  ],
  entities: [
    { id: 'negara', domain: 'master', col: 0, columns: [c('id', 'int', 'PK'), c('kode', 'varchar(3)'), c('nama', 'varchar(100)'), c('is_domestic', 'boolean')] },
    { id: 'unit', domain: 'master', col: 0, columns: [c('id', 'int', 'PK'), c('nama', 'varchar(150)'), c('id_parent_unit', 'int', 'FK'), c('id_jenis_unit', 'int', 'FK'), c('is_active', 'boolean')] },
    { id: 'jabatan', domain: 'master', col: 0, columns: [c('id', 'int', 'PK'), c('nama', 'varchar(150)'), c('id_unit', 'int', 'FK'), c('tier_disposisi', 'smallint')] },
    { id: 'akun', domain: 'master', col: 0, columns: [c('id', 'int', 'PK'), c('auth_user_id', 'uuid', 'FK'), c('id_jabatan', 'int', 'FK'), c('email', 'varchar(150)'), c('role', 'varchar(30)')], more: 1 },
    { id: 'partner', domain: 'master', col: 0, columns: [c('id', 'int', 'PK'), c('nama', 'varchar(200)'), c('is_international', 'boolean'), c('id_negara', 'int', 'FK'), c('latitude', 'numeric(9,6)'), c('longitude', 'numeric(9,6)'), c('id_merged_into', 'int', 'FK')], more: 10 },
    { id: 'partner_contact', domain: 'master', col: 0, columns: [c('id', 'int', 'PK'), c('id_partner', 'int', 'FK'), c('nama', 'varchar(150)'), c('email', 'varchar(150)')], more: 2 },
    { id: 'agenda', domain: 'master', col: 0, columns: [c('id', 'int', 'PK'), c('nama', 'varchar(200)'), c('is_amendment', 'boolean')] },

    { id: 'proposal_dokumen', domain: 'proposal', col: 1, columns: [c('id', 'int', 'PK'), c('jenis_kerjasama', 'MoU | MoA'), c('status_proposal', 'varchar(30)'), c('tujuan_kerjasama', 'text'), c('manfaat_bagi_petra', 'text'), c('id_dokumen_sebelumnya', 'int', 'FK'), c('id_akun_pembuat', 'int', 'FK'), c('waktu_disetujui', 'timestamptz'), c('status_sla', 'varchar(30)')], more: 8 },
    { id: 'partner_pengusul', domain: 'proposal', col: 1, columns: [c('id_partner', 'int', 'FK'), c('id_proposal_dokumen', 'int', 'FK'), c('is_lead', 'boolean')] },
    { id: 'pengusul', domain: 'proposal', col: 1, columns: [c('id_jabatan', 'int', 'FK'), c('id_proposal_dokumen', 'int', 'FK')] },
    { id: 'proposal_dokumen_unit', domain: 'proposal', col: 1, columns: [c('id_proposal_dokumen', 'int', 'FK'), c('id_unit', 'int', 'FK')], note: 'Lingkup Kerja Sama' },
    { id: 'proposal_dokumen_agenda', domain: 'proposal', col: 1, columns: [c('id_proposal_dokumen', 'int', 'FK'), c('id_agenda', 'int', 'FK')] },
    { id: 'proposal_status_history', domain: 'proposal', col: 1, columns: [c('id', 'int', 'PK'), c('id_proposal_dokumen', 'int', 'FK'), c('status_lama', 'varchar(30)'), c('status_baru', 'varchar(30)'), c('waktu', 'timestamptz')] },

    { id: 'disposisi', domain: 'workflow', col: 2, columns: [c('no', 'int', 'PK'), c('id_proposal_dokumen', 'int', 'FK'), c('no_dokumen_kerjasama', 'int', 'FK'), c('jenis_disposisi', 'varchar(30)'), c('round_ke', 'smallint'), c('id_akun_pengirim', 'int', 'FK')], more: 3 },
    { id: 'disposisi_target', domain: 'workflow', col: 2, columns: [c('no', 'int', 'PK'), c('no_disposisi', 'int', 'FK'), c('id_jabatan', 'int', 'FK'), c('tier', 'smallint'), c('status', 'varchar(30)'), c('waktu_unlock', 'timestamptz'), c('batas_waktu_sla', 'timestamptz'), c('durasi_hari_kerja', 'numeric(6,2)'), c('status_sla', 'varchar(20)')], more: 1 },
    { id: 'riwayat_approval', domain: 'workflow', col: 2, columns: [c('id', 'int', 'PK'), c('id_disposisi_target', 'int', 'FK'), c('id_proposal_dokumen', 'int', 'FK'), c('id_akun', 'int', 'FK'), c('aksi', 'varchar(50)'), c('catatan', 'text')], more: 2, note: 'Append-only audit trail' },
    { id: 'revisi_proposal', domain: 'workflow', col: 2, columns: [c('id', 'int', 'PK'), c('id_proposal_dokumen', 'int', 'FK'), c('file_proposal', 'varchar(500)'), c('id_disposisi_target_peminta', 'int', 'FK')], more: 3 },
    { id: 'pending_periods', domain: 'workflow', col: 2, columns: [c('id', 'int', 'PK'), c('id_proposal_dokumen', 'int', 'FK'), c('mulai', 'timestamptz'), c('selesai', 'timestamptz')], more: 2, note: 'SLA pause netting' },

    { id: 'dokumen_kerja_sama', domain: 'agreement', col: 3, columns: [c('no', 'int', 'PK'), c('id_proposal_dokumen', 'int', 'FK'), c('no_dokumen', 'varchar(50)'), c('tanggal_mulai', 'date'), c('tanggal_berakhir', 'date'), c('status', 'varchar(30)'), c('alasan_arsip', 'varchar(40)'), c('upload_dokumen', 'varchar(500)')], more: 6 },
    { id: 'evaluasi', domain: 'agreement', col: 3, columns: [c('no', 'int', 'PK'), c('id_dokumen_kerjasama', 'int', 'FK'), c('respondent_type', 'varchar(10)'), c('id_partner_contact', 'int', 'FK'), c('id_jabatan_pengusul', 'int', 'FK'), c('rekomendasi', 'varchar(50)'), c('status', 'varchar(20)'), c('id_supersedes', 'int', 'FK')], more: 15, note: '5 expectation + 5 satisfaction scores' },
    { id: 'partner_eval_token', domain: 'agreement', col: 3, columns: [c('id', 'int', 'PK'), c('id_evaluasi', 'int', 'FK'), c('token', 'char(64)'), c('is_active', 'boolean'), c('waktu_submit', 'timestamptz')], more: 4 },
    { id: 'keputusan_pembaruan', domain: 'agreement', col: 3, columns: [c('id', 'int', 'PK'), c('id_dokumen_kerjasama', 'int', 'FK'), c('keputusan', 'varchar(20)'), c('alasan', 'text')], more: 2 },
    { id: 'notifikasi', domain: 'agreement', col: 3, columns: [c('id', 'int', 'PK'), c('id_proposal_dokumen', 'int', 'FK'), c('no_dokumen_kerjasama', 'int', 'FK'), c('id_jabatan_penerima', 'int', 'FK'), c('jenis_notifikasi', 'varchar(50)'), c('status', 'varchar(30)')], more: 3, note: 'Queue for kirim-email' },
    { id: 'implementasi_dokumen', domain: 'agreement', col: 3, columns: [c('no', 'int', 'PK'), c('no_dokumen_kerjasama', 'int', 'FK'), c('jenis', 'varchar(20)'), c('judul', 'varchar(200)'), c('status', 'varchar(20)')], more: 5 },
  ],
  relations: [
    { from: 'jabatan', to: 'unit' }, { from: 'akun', to: 'jabatan' }, { from: 'partner', to: 'negara' }, { from: 'partner_contact', to: 'partner' },
    { from: 'proposal_dokumen', to: 'akun' },
    { from: 'partner_pengusul', to: 'partner' }, { from: 'partner_pengusul', to: 'proposal_dokumen' },
    { from: 'pengusul', to: 'jabatan' }, { from: 'pengusul', to: 'proposal_dokumen' },
    { from: 'proposal_dokumen_unit', to: 'unit' }, { from: 'proposal_dokumen_unit', to: 'proposal_dokumen' },
    { from: 'proposal_dokumen_agenda', to: 'agenda' }, { from: 'proposal_dokumen_agenda', to: 'proposal_dokumen' },
    { from: 'proposal_status_history', to: 'proposal_dokumen' },
    { from: 'disposisi', to: 'proposal_dokumen' }, { from: 'disposisi', to: 'dokumen_kerja_sama' },
    { from: 'disposisi_target', to: 'disposisi' }, { from: 'disposisi_target', to: 'jabatan' },
    { from: 'riwayat_approval', to: 'disposisi_target' }, { from: 'revisi_proposal', to: 'disposisi_target' },
    { from: 'revisi_proposal', to: 'proposal_dokumen' }, { from: 'pending_periods', to: 'proposal_dokumen' },
    { from: 'dokumen_kerja_sama', to: 'proposal_dokumen' },
    { from: 'evaluasi', to: 'dokumen_kerja_sama' }, { from: 'evaluasi', to: 'partner_contact' },
    { from: 'partner_eval_token', to: 'evaluasi' }, { from: 'keputusan_pembaruan', to: 'dokumen_kerja_sama' },
    { from: 'notifikasi', to: 'jabatan' }, { from: 'implementasi_dokumen', to: 'dokumen_kerja_sama' },
  ],
  steps: {
    approval: [
      { writes: 'A unit has a partnership to propose.' },
      { rpc: ['simpan_anak_proposal'], tables: ['proposal_dokumen', 'partner_pengusul', 'pengusul', 'proposal_dokumen_unit', 'proposal_dokumen_agenda'], writes: 'The proposal and its child rows (partners, proposers, Lingkup units, agendas, fields, SDGs, MoU/MoA detail).', status: 'status_proposal = Draft' },
      { rpc: ['ajukan_proposal', 'catat_status_proposal'], tables: ['proposal_dokumen', 'proposal_status_history'], writes: 'Submission time and a status-history row (used by the bottleneck report).', status: 'Draft → Diajukan' },
      { rpc: ['kirim_disposisi'], tables: ['disposisi', 'disposisi_target', 'riwayat_approval'], writes: 'One disposisi for the round (round_ke) and one target per chosen position, each with its tier.', status: 'Diajukan → Diproses' },
      { rpc: ['recompute_tiers', 'catat_notifikasi'], tables: ['disposisi_target', 'notifikasi'], writes: 'Targets with no unapproved lower tier switch waiting → pending_action; waktu_unlock and batas_waktu_sla are set; the position is notified.', status: 'Disposisi – Tier n', rules: ['K-01', 'K-02'] },
      { rpc: ['antrean_saya'], tables: ['disposisi_target'], writes: 'Nothing. The queue is a read, and RLS limits it to targets routed to the caller’s jabatan.', rules: ['K-08'] },
      { rpc: ['aksi_approval'], tables: ['disposisi_target', 'riwayat_approval', 'revisi_proposal', 'pending_periods'], writes: 'The decision on the target, an audit row, and a revision request or a pending period when chosen.', status: 'approved | revision | Pending | Ditolak', rules: ['K-03', 'K-04', 'K-05'] },
      { rpc: ['recompute_tiers'], tables: ['disposisi_target', 'proposal_dokumen'], writes: 'The next tier unlocks; when every tier is clear the proposal is approved (waktu_disetujui).', status: '→ Disetujui', rules: ['K-01'] },
      { rpc: ['tandai_siap_ttd'], tables: ['proposal_dokumen'], writes: 'Only an Admin can mark a Disetujui proposal ready to sign.', status: 'Disetujui → Siap TTD' },
      { rpc: ['aktivasi_dokumen'], tables: ['dokumen_kerja_sama', 'penandatangan_petra', 'penandatangan_partner'], writes: 'The agreement row: number, dates, signed file and signatories.' },
      { tables: ['dokumen_kerja_sama'], writes: 'The agreement becomes visible to every authenticated user, on the map and the dashboard.', status: 'dokumen.status = Aktif' },
    ],
    renewal: [
      { rpc: ['sapu_kedaluarsa'], writes: 'pg_cron at 22:15 UTC (05:15 WIB).' },
      { rpc: ['sapu_kedaluarsa', 'catat_notifikasi'], tables: ['dokumen_kerja_sama', 'notifikasi'], writes: 'Documents near their end date move to Akan Berakhir; reminders are queued monthly from 6 months out, weekly for the last 2. Auto Renewed documents are skipped.', status: 'Aktif → Akan Berakhir', rules: ['K-06'] },
      { rpc: ['kirim_permintaan_pembaruan'], tables: ['disposisi', 'disposisi_target'], writes: 'A renewal-request disposition to the owning unit. It shares the tables but has no tiers and no gating.' },
      { rpc: ['kirim_evaluasi_fakultas'], tables: ['evaluasi'], writes: 'The faculty evaluation: scores, recommendation and continuation mode.' },
      { rpc: ['buat_tautan_evaluasi_mitra', 'resolusi_token_evaluasi', 'kirim_evaluasi_partner'], tables: ['partner_eval_token', 'evaluasi'], writes: 'A 256-bit token link; the two anon-callable functions read and submit exactly one evaluation.', rules: ['K-07'] },
      { rpc: ['status_gerbang_pembaruan', 'putuskan_pembaruan'], tables: ['evaluasi', 'keputusan_pembaruan'], writes: 'The gate reads both recommendations; a disagreement needs an override with a recorded reason.', rules: ['K-06'] },
      { rpc: ['mulai_proses_pembaruan'], tables: ['notifikasi'], writes: 'KUI opens renewal; only now is the unit notified and allowed to upload.' },
      { rpc: ['boleh_unggah_perpanjangan', 'buat_proposal_perpanjangan'], tables: ['proposal_dokumen'], writes: 'A new proposal with id_dokumen_sebelumnya set. The function refuses anything the gate has not opened.', rules: ['K-06'] },
      { writes: 'The renewal proposal runs through Process 1.' },
      { rpc: ['aktivasi_dokumen'], tables: ['dokumen_kerja_sama'], writes: 'In one transaction the new document is activated and the old one is archived.', status: 'alasan_arsip = superseded_by_renewal', rules: ['K-09'] },
      { rpc: ['resolusi_penerus'], writes: 'The read API follows the chain forward to the current Active successor.' },
    ],
  },
  rules: [
    { id: 'K-01', text: 'A target unlocks when no lower-tier target in the current round is still unapproved; an empty tier is skipped. recompute_tiers is the single idempotent writer of this state.', where: 'Function' },
    { id: 'K-02', text: 'SLA is per target, from unlock, in business days excluding weekends, holidays and time in Pending. Yellow at 2, red at 4; thresholds come from settings.', where: 'Function + pg_cron' },
    { id: 'K-03', text: 'A revision overwrites the draft in place and is logged in revisi_proposal. No other target is affected and the SLA clock keeps running.', where: 'Function' },
    { id: 'K-04', text: 'Pending freezes the document and stops the SLA clock. Reactivation starts a new round from tier 1, including tiers that had already approved.', where: 'Function' },
    { id: 'K-05', text: 'Reject is terminal; the document is archived with alasan_arsip = rejected.', where: 'Function' },
    { id: 'K-06', text: 'A renewal proposal can be created only when both evaluations are submitted and both recommend continuing, or KUI recorded an override with a reason.', where: 'buat_proposal_perpanjangan' },
    { id: 'K-07', text: 'The public surface is exactly two anon-executable functions, each requiring a 256-bit token scoped to one evaluation.', where: 'Grants' },
    { id: 'K-08', text: 'An account may act on a document only while an open disposisi_target is routed to its jabatan and is pending_action.', where: 'RLS' },
    { id: 'K-09', text: 'Documents are never hard-deleted; every archival records one of four reasons.', where: 'CHECK + functions' },
    { id: 'K-10', text: 'While a document is in disposition IO can add targets (they join the current tier) or remove pending ones; an approved target cannot be removed.', where: 'tambah_target / hapus_target' },
  ],
  enums: [
    { name: 'proposal_dokumen.status_proposal', values: ['Draft', 'Diajukan', 'Diproses', 'Disposisi - Tier 1', 'Disposisi - Tier 2', 'Disposisi - Tier 3', 'Pending', 'Disetujui', 'Siap TTD', 'Ditolak'] },
    { name: 'dokumen_kerja_sama.status', values: ['Aktif', 'Akan Berakhir', 'Kedaluarsa', 'Diarsipkan'] },
    { name: 'disposisi_target.status', values: ['waiting', 'pending_action', 'approved', 'rejected', 'removed'] },
    { name: 'alasan_arsip', values: ['rejected', 'expired_without_renewal', 'superseded_by_renewal', 'terminated_early'] },
    { name: 'akun.role', values: ['submitter', 'io_staff', 'io_admin', 'viewer'] },
    { name: 'jenis_kerjasama_t', values: ['MoU', 'MoA'] },
  ],
  jobs: [
    { name: 'simks-sapu-sla → sapu_sla()', schedule: 'pg_cron 22:00 UTC (05:00 WIB)', does: 'Recompute SLA, set flags, queue yellow, red and escalation reminders' },
    { name: 'simks-sapu-kedaluarsa → sapu_kedaluarsa()', schedule: 'pg_cron 22:15 UTC', does: 'Move documents to Akan Berakhir, archive expired ones, queue expiry reminders' },
    { name: 'kirim-email Edge Function', schedule: 'Every 5 minutes', does: 'Send pending notifikasi rows via Resend, after the transaction commits' },
  ],
  security: [
    { title: 'Two authorization axes', text: 'Application role on akun.role, plus approver status, which is derived from open targets and never stored.' },
    { title: 'RLS everywhere', text: 'Every table has RLS. Middleware only redirects to /login; RLS decides which rows a request reaches.' },
    { title: 'Read API for SIM Realisasi', text: '/api/v1/kerja-sama with an API key compared in constant time: active agreements, one agreement, and the renewal-chain successor.' },
    { title: 'Revoke by default', text: 'New functions are revoked from PUBLIC in the migration that creates them and granted only to authenticated.' },
    { title: 'Private storage', text: 'Files are served through signed URLs after an authorization check.' },
  ],
  tests: [
    'Tier gating when a tier is empty', 'Pending reset and the new round', 'SLA pause netting and business-day arithmetic', 'Revision isolation',
    'Live edit: add, remove, refuse removing an approved target', 'Sweep idempotency', 'Transaction rollback', 'The evaluation gate',
    'Reopening a partner evaluation supersedes the old one', 'Token scope', 'The RLS boundary', 'Lingkup cascade', 'Renewal-chain resolution',
  ],
}

export const simRealisasiDev: DevSystem = {
  repo: 'https://github.com/zefanyakharisma-cell/SIM_Realisasi',
  counts: [
    { label: 'Tables & views', value: '39' },
    { label: 'Columns', value: '249' },
    { label: 'Relationships', value: '32' },
    { label: 'Numbered business rules', value: '64' },
  ],
  stack: [
    { layer: 'Frontend', choice: 'Next.js 15 App Router, TypeScript, Tailwind, shadcn/ui' },
    { layer: 'Forms', choice: 'react-hook-form + zod, schemas shared client and server' },
    { layer: 'Data', choice: 'Supabase Postgres, RLS, SQL functions, @supabase/ssr' },
    { layer: 'Auth', choice: 'Supabase Auth, shared with SIM Kerjasama; demo role switcher' },
    { layer: 'Files', choice: 'Supabase Storage, private buckets, 5-minute signed URLs' },
    { layer: 'Jobs', choice: 'pg_cron for reminders and freezes; triggers for the duplicate scan' },
    { layer: 'Excel & charts', choice: 'exceljs in route handlers (streamed), Recharts' },
    { layer: 'Tests', choice: 'SQL acceptance tests, Vitest, Playwright' },
  ],
  principles: [
    { title: 'One database, two systems', text: 'Realisasi lives in schema realisasi beside SIM Kerjasama and only reads it through views in schema kerjasama. It never writes SIMKS tables.' },
    { title: 'Business rules in the database', text: 'Status derivation, period derivation, chain resolution and KPI math are SQL, so the UI, exports and snapshots can never disagree.' },
    { title: 'External systems behind an RPC', text: 'BAAK and HR are mocked, but the app only calls lookup_students and lookup_employees, so production swaps the implementation, not the app.' },
    { title: 'Frozen means frozen', text: 'Snapshots are written once; a correction creates a new superseding snapshot with a reason.' },
    { title: 'Privacy by default', text: 'Participant data and transcripts sit behind RLS and private storage; every personal-data export is logged.' },
  ],
  arch: [
    { title: 'Next.js on Vercel', items: ['Dashboard and period selector', 'Kegiatan list, detail, new, revision', 'Verifikasi Mobilitas and duplicates', 'Laporan and Excel route handlers', 'Pengaturan (IO Admin)'] },
    { title: 'Supabase (shared project)', items: ['schema realisasi: tables, triggers, RPCs', 'schema kerjasama: read-only views over SIM-KS', 'mock_baak / mock_hr registries', 'pg_cron: realisasi-daily-jobs'] },
    { title: 'Outputs', items: ['RENSTRA 1.1, 1.19.S1, 1.19.24', 'International Awards', 'Frozen semester snapshots', 'Realisasi tab back in SIM Kerjasama'] },
  ],
  domains: [
    { key: 'simks', label: 'SIM Kerjasama views', color: '#6e7b8a' },
    { key: 'activity', label: 'Kegiatan', color: '#2a64a8' },
    { key: 'participant', label: 'Participants & verification', color: '#135d50' },
    { key: 'calendar', label: 'Calendar, config & RENSTRA', color: '#b7791f' },
    { key: 'ops', label: 'Operations & mock registries', color: '#7a5ba6' },
  ],
  entities: [
    { id: 'units', schema: 'kerjasama', domain: 'simks', col: 0, columns: [c('id', 'int', 'PK'), c('name', 'text'), c('parent_id', 'int'), c('is_academic', 'boolean')], more: 2, note: 'view' },
    { id: 'agendas', schema: 'kerjasama', domain: 'simks', col: 0, columns: [c('id', 'int', 'PK'), c('name', 'text'), c('is_active', 'boolean')], note: 'view' },
    { id: 'documents', schema: 'kerjasama', domain: 'simks', col: 0, columns: [c('id', 'int', 'PK'), c('doc_number', 'text'), c('kind', 'text'), c('status', 'text'), c('start_date', 'date'), c('end_date', 'date'), c('auto_renewed', 'boolean'), c('predecessor_id', 'int', 'LFK')], more: 5, note: 'view' },
    { id: 'partners', schema: 'kerjasama', domain: 'simks', col: 0, columns: [c('id', 'int', 'PK'), c('name', 'text'), c('country_code', 'text', 'LFK'), c('merged_into_id', 'int')], more: 1, note: 'view' },
    { id: 'countries', schema: 'kerjasama', domain: 'simks', col: 0, columns: [c('code', 'text', 'PK'), c('name', 'text'), c('is_domestic', 'boolean')], more: 2, note: 'view' },

    { id: 'activity_units', domain: 'activity', col: 1, columns: [c('activity_id', 'uuid', 'PK'), c('unit_id', 'int', 'PK'), c('is_submitter', 'boolean')] },
    { id: 'agenda_rules', domain: 'calendar', col: 1, columns: [c('agenda_id', 'int', 'PK'), c('mobility_category', 'mobility_category'), c('counts_for_s1', 'boolean')], more: 2 },
    { id: 'activity_documents', domain: 'activity', col: 1, columns: [c('activity_id', 'uuid', 'PK'), c('original_document_id', 'int', 'PK'), c('chain_id', 'int'), c('out_of_scope_warning', 'boolean')] },
    { id: 'activity_partner_snapshot', domain: 'activity', col: 1, columns: [c('id', 'bigserial', 'PK'), c('activity_id', 'uuid', 'FK'), c('partner_id', 'int', 'LFK'), c('partner_name', 'text'), c('country_code', 'text')], more: 2 },
    { id: 'activity_files', domain: 'activity', col: 1, columns: [c('id', 'bigserial', 'PK'), c('activity_id', 'uuid', 'FK'), c('kind', 'file_kind'), c('version', 'int'), c('storage_path', 'text'), c('is_current', 'boolean')], more: 6 },

    { id: 'activities', domain: 'activity', col: 2, columns: [c('id', 'uuid', 'PK'), c('code', 'text', 'UQ'), c('agenda_id', 'int', 'LFK'), c('direction', 'direction'), c('start_date', 'date'), c('end_date', 'date'), c('academic_year_id', 'int', 'FK'), c('semester_id', 'int', 'FK'), c('status', 'activity_status'), c('mobility_status', 'track_status'), c('reporting_deadline', 'date'), c('is_late', 'boolean'), c('verified_at', 'timestamptz')], more: 13 },
    { id: 'academic_years', domain: 'calendar', col: 2, columns: [c('id', 'serial', 'PK'), c('label', 'text', 'UQ'), c('start_date', 'date'), c('end_date', 'date')] },
    { id: 'semesters', domain: 'calendar', col: 2, columns: [c('id', 'serial', 'PK'), c('academic_year_id', 'int', 'FK'), c('term', 'semester_term'), c('cutoff_date', 'date')], more: 2 },
    { id: 'kpi_snapshots', domain: 'calendar', col: 2, columns: [c('id', 'uuid', 'PK'), c('academic_year_id', 'int', 'FK'), c('kind', 'snapshot_kind'), c('values', 'jsonb'), c('settings_used', 'jsonb'), c('superseded_by', 'uuid', 'FK'), c('refreeze_reason', 'text')], more: 6 },
    { id: 'kpi_snapshot_items', domain: 'calendar', col: 2, columns: [c('snapshot_id', 'uuid', 'FK'), c('kpi_code', 'text'), c('ref_id', 'text'), c('is_late_addition', 'boolean')], more: 2 },

    { id: 'participant_set_versions', domain: 'participant', col: 3, columns: [c('id', 'uuid', 'PK'), c('activity_id', 'uuid', 'FK'), c('version', 'int'), c('status', 'pset_status'), c('review_note', 'text')], more: 4 },
    { id: 'participant_students', domain: 'participant', col: 3, columns: [c('id', 'bigserial', 'PK'), c('set_version_id', 'uuid', 'FK'), c('section', 'student_section'), c('nrp', 'text', 'LFK'), c('prodi_name', 'text'), c('home_institution', 'text')], more: 4 },
    { id: 'participant_staff', domain: 'participant', col: 3, columns: [c('id', 'bigserial', 'PK'), c('set_version_id', 'uuid', 'FK'), c('employee_id', 'text', 'LFK'), c('full_name', 'text')], more: 1 },
    { id: 'participant_conflicts', domain: 'participant', col: 3, columns: [c('id', 'bigserial', 'PK'), c('nrp', 'text'), c('activity_a', 'uuid', 'FK'), c('activity_b', 'uuid', 'FK'), c('status', 'conflict_status'), c('kept_activity_id', 'uuid', 'FK')], more: 4 },
    { id: 'activity_log', domain: 'ops', col: 3, columns: [c('id', 'bigserial', 'PK'), c('activity_id', 'uuid', 'FK'), c('kind', 'log_kind'), c('action', 'text'), c('diff', 'jsonb'), c('in_frozen_period', 'boolean')], more: 4 },

    { id: 'students', schema: 'mock_baak', domain: 'ops', col: 4, columns: [c('nrp', 'text', 'PK'), c('full_name', 'text'), c('prodi_name', 'text'), c('category', 'text'), c('status', 'text')], more: 5 },
    { id: 'employees', schema: 'mock_hr', domain: 'ops', col: 4, columns: [c('employee_id', 'text', 'PK'), c('full_name', 'text'), c('unit_name', 'text'), c('status', 'text')], more: 1 },
    { id: 'notifications', domain: 'ops', col: 4, columns: [c('id', 'bigserial', 'PK'), c('recipient_id', 'uuid'), c('kind', 'text'), c('read_at', 'timestamptz')], more: 4 },
    { id: 'email_outbox', domain: 'ops', col: 4, columns: [c('id', 'bigserial', 'PK'), c('to_email', 'text'), c('subject', 'text'), c('sent_at', 'timestamptz')], more: 2 },
    { id: 'export_log', domain: 'ops', col: 4, columns: [c('id', 'bigserial', 'PK'), c('actor_id', 'uuid'), c('export_kind', 'text'), c('row_count', 'int'), c('contains_personal_data', 'boolean')], more: 2 },
  ],
  relations: [
    { from: 'documents', to: 'documents', logical: true },
    { from: 'partners', to: 'countries', logical: true },
    { from: 'activity_units', to: 'activities' }, { from: 'activity_units', to: 'units', logical: true },
    { from: 'agenda_rules', to: 'agendas', logical: true }, { from: 'activities', to: 'agenda_rules', logical: true },
    { from: 'activity_documents', to: 'activities' }, { from: 'activity_documents', to: 'documents', logical: true },
    { from: 'activity_partner_snapshot', to: 'activities' }, { from: 'activity_partner_snapshot', to: 'partners', logical: true },
    { from: 'activity_files', to: 'activities' },
    { from: 'activities', to: 'academic_years' }, { from: 'activities', to: 'semesters' }, { from: 'semesters', to: 'academic_years' },
    { from: 'kpi_snapshots', to: 'academic_years' }, { from: 'kpi_snapshot_items', to: 'kpi_snapshots' },
    { from: 'participant_set_versions', to: 'activities' }, { from: 'participant_students', to: 'participant_set_versions' },
    { from: 'participant_staff', to: 'participant_set_versions' }, { from: 'participant_conflicts', to: 'activities' },
    { from: 'activity_log', to: 'activities' },
    { from: 'participant_students', to: 'students', logical: true }, { from: 'participant_staff', to: 'employees', logical: true },
  ],
  steps: {
    submit: [
      { writes: 'An activity under a PETRA MoU/MoA has ended.', rules: ['R-01', 'R-02'] },
      { rpc: ['documents_valid_between', 'save_activity_draft'], tables: ['activities', 'activity_units', 'activity_documents', 'activity_partner_snapshot', 'documents'], writes: 'The activity, its units and one agreement link (the original document plus its chain_id). Partner name and country are snapshotted by trigger.', rules: ['R-03', 'R-04', 'R-05', 'R-06'] },
      { rpc: ['_trg_derive_period', '_trg_derive_deadline'], tables: ['activities', 'academic_years', 'semesters'], writes: 'Triggers derive academic_year_id and semester_id from start_date, and reporting_deadline = end_date + reporting_deadline_days.', status: "status = 'draft'", rules: ['R-09', 'R-10'] },
      { rpc: ['agenda_is_mobility', 'register_activity_file'], tables: ['agenda_rules', 'activity_files'], writes: 'The agenda rule decides the track. Non-mobility uploads IA and IR; mobility also needs one mobility_bundle PDF.', rules: ['R-07a', 'R-11', 'R-13'] },
      { rpc: ['lookup_students', 'lookup_employees', 'save_participants'], tables: ['participant_set_versions', 'participant_students', 'participant_staff', 'students', 'employees'], writes: 'A draft participant set; every NRP must resolve in BAAK, staff in HR. Duplicate NRPs in one set are refused.', rules: ['R-16', 'R-19', 'R-22'] },
      { rpc: ['submission_checklist', 'submit_activity'], tables: ['activities', 'activity_log'], writes: 'Required fields, the agreement, IA and IR are checked; submitted_at is set and is_late is flagged after the deadline.', status: 'draft → in_verification | verified', rules: ['R-07', 'R-10'] },
      { rpc: ['_trg_activity_status', '_scan_conflicts'], tables: ['activities', 'participant_conflicts', 'notifications'], writes: 'Status is derived from the track. Same NRP, different submitting units, overlapping dates becomes an open conflict.', status: "mobility_status = 'pending'", rules: ['R-23', 'R-25', 'R-33'] },
      { rpc: ['conflict_list', 'resolve_conflict'], tables: ['participant_conflicts', 'activity_log'], writes: 'Mobility keeps each duplicate student on one activity (logged). While open, the student counts in neither.', rules: ['R-34', 'R-35'] },
      { rpc: ['mobility_request_revision', 'mobility_approve'], tables: ['participant_set_versions', 'activities'], writes: 'A revision needs one general note; approval is refused while conflicts are open.', status: 'pending → revision_requested | approved', rules: ['R-26', 'R-27', 'R-27a'] },
      { rpc: ['_trg_pset_supersede'], tables: ['participant_set_versions', 'activities', 'notifications'], writes: 'The approved version counts and the previous approved one becomes superseded. verified_at is set once.', status: 'status = verified', rules: ['R-21', 'R-28'] },
      { rpc: ['compute_kpis', 'kpi_items', 'international_awards'], tables: ['activities', 'participant_students', 'activity_documents'], writes: 'Verified data only. 1.1 counts (NRP, kegiatan) pairs; 1.19.24 counts renewal chains; awards rank Program Studi.', rules: ['R-36', 'R-38', 'R-42', 'R-48'] },
    ],
    close: [
      { writes: "pg_cron job 'realisasi-daily-jobs' at 18:00 UTC (01:00 WIB)." },
      { rpc: ['run_daily_jobs', '_mark_once'], tables: ['activity_documents', 'job_marks'], writes: 'Refreshes stored chain ids (SIM Kerjasama may re-parent documents), then scans drafts and open revisions.' },
      { rpc: ['_notify_unit'], tables: ['notifications', 'email_outbox'], writes: 'Revision reminder after 7 days; draft deadline reminders 7 days before, on the day, then weekly. No escalation.', rules: ['R-61', 'R-62'] },
      { writes: 'The unit completes or resubmits through the submission process.' },
      { writes: 'Each semester has a cutoff_date, by default the semester end plus 30 days.', rules: ['R-55'] },
      { rpc: ['compute_kpis'], tables: ['activities', 'participant_students', 'activity_documents'], writes: 'The indicators for the semester window, from verified activities only.', rules: ['R-36', 'R-37'] },
      { rpc: ['_freeze'], tables: ['kpi_snapshots', 'kpi_snapshot_items'], writes: 'For every semester past its cutoff without a current snapshot, run_daily_jobs freezes the values, the contributing IDs and the settings used.', status: 'ganjil_ytd | genap_full_year', rules: ['R-55', 'R-56'] },
      { rpc: ['refreeze_snapshot'], tables: ['kpi_snapshots'], writes: 'Optional: IO Admin re-freezes with a mandatory reason; the old snapshot is kept and marked superseded.', rules: ['R-58'] },
      { rpc: ['dashboard', 'kpi_drilldown', 'snapshot_late_additions', 'log_export'], tables: ['kpi_snapshots', 'activity_log', 'export_log'], writes: 'Snapshots and YTD side by side. Late verifications and edits inside a frozen window are listed in the next report; every export with personal data is logged.', rules: ['R-31', 'R-57', 'R-63'] },
      { writes: 'Every snapshot, superseded ones included, stays downloadable.', rules: ['R-59'] },
    ],
  },
  rules: [
    { id: 'R-03', text: 'An activity links to exactly one agreement. The link stores the original document; the current one is always resolved through the renewal chain.', where: 'activity_documents + chain_current' },
    { id: 'R-04', text: 'An agreement is selectable if its validity overlaps the activity dates, whatever its status today. Rejected and in-process documents never are.', where: 'documents_valid_between' },
    { id: 'R-06', text: 'Partner name and country are snapshotted at link time; later edits or merges in SIM Kerjasama do not change them.', where: 'Trigger' },
    { id: 'R-09', text: 'Semester and academic year are derived from Tanggal Mulai; a date outside any configured year cannot be submitted.', where: 'Trigger' },
    { id: 'R-10', text: 'Reporting deadline = Tanggal Selesai + reporting_deadline_days (default 30). Late submissions are accepted and flagged.', where: 'Trigger' },
    { id: 'R-11', text: 'A mobility kegiatan needs participants and one mobility PDF; its track starts pending. Any other kegiatan is verified on submit.', where: 'submit_activity' },
    { id: 'R-16', text: 'Every counted student must have an NRP that resolves in BAAK. Unknown NRPs block submission.', where: 'lookup_students' },
    { id: 'R-21', text: 'Participant sets are versioned. Only the single approved version counts; approving a new one supersedes the previous.', where: 'Trigger' },
    { id: 'R-25', text: 'Overall status is derived, never set directly: draft, revision_requested, verified or in_verification.', where: '_trg_activity_status' },
    { id: 'R-26', text: 'Nothing is rejected: a wrong submission goes back to the unit as a revision.', where: 'RPC' },
    { id: 'R-27a', text: 'Mobility cannot approve while the kegiatan has open duplicate-student conflicts.', where: 'mobility_approve' },
    { id: 'R-33', text: 'Same NRP in two non-draft mobility kegiatan of different submitting units with overlapping dates is a conflict.', where: '_scan_conflicts' },
    { id: 'R-36', text: 'Only verified activities count. Activity date = Tanggal Mulai.', where: 'compute_kpis' },
    { id: 'R-42', text: 'Realisation of agreements counts renewal chains, so a mid-year renewal counts once.', where: 'compute_kpis' },
    { id: 'R-43', text: 'The denominator excludes chains starting within grace_period_months (default 6) of the cutoff; auto-renewed chains are always included.', where: 'compute_kpis' },
    { id: 'R-55', text: 'On each semester cutoff the system freezes a snapshot: Ganjil → ganjil_ytd, Genap → genap_full_year.', where: 'run_daily_jobs' },
    { id: 'R-56', text: 'A snapshot stores values, contributing IDs and the settings used. Settings changes never alter existing snapshots.', where: 'kpi_snapshots' },
    { id: 'R-63', text: 'Every export containing personal data is logged with actor, filters and row count.', where: 'log_export' },
    { id: 'R-64', text: 'No hard deletes after submission; everything is status plus log.', where: 'RLS + RPC' },
  ],
  enums: [
    { name: 'activity_status', values: ['draft', 'in_verification', 'revision_requested', 'verified'] },
    { name: 'track_status', values: ['not_required', 'pending', 'revision_requested', 'approved'] },
    { name: 'pset_status', values: ['draft', 'pending', 'revision_requested', 'approved', 'superseded'] },
    { name: 'mobility_category', values: ['jd_dd', 'student_exchange', 'short_summer', 'other_mobility'] },
    { name: 'file_kind', values: ['ia', 'ir', 'mobility_bundle', 'evidence'] },
    { name: 'snapshot_kind', values: ['ganjil_ytd', 'genap_full_year'] },
    { name: 'conflict_status', values: ['open', 'resolved'] },
    { name: 'direction', values: ['inbound', 'outbound'] },
  ],
  jobs: [
    { name: 'realisasi-daily-jobs → run_daily_jobs()', schedule: 'pg_cron 18:00 UTC (01:00 WIB)', does: 'Refresh chain ids, revision and deadline reminders, semester freezes' },
    { name: 'Duplicate scan', schedule: 'Trigger, on submit and every participant change', does: 'Open or close participant_conflicts' },
  ],
  security: [
    { title: 'Read-only adapter', text: 'SIM Kerjasama data is reached only through views in schema kerjasama. Views cannot be FK targets, so the RPCs check those references.' },
    { title: 'RLS and per-function checks', text: 'Row-level security plus permission checks inside every SQL function (_require_admin, _require_mobility, _require_team).' },
    { title: 'Roles of its own', text: 'account_roles keeps a Realisasi role per SIM-KS account, so SIM-KS roles stay untouched.' },
    { title: 'Personal data', text: 'Participant names and mobility PDFs are visible to the unit and IO only; exports with student data are logged (UU PDP 27/2022).' },
    { title: 'Private files', text: 'Private buckets with 5-minute signed URLs.' },
  ],
  tests: [
    'SQL acceptance tests AT-01..AT-11', 'Status machine', 'RLS boundaries', 'RENSTRA and KPI math', 'Duplicate conflicts',
    'International Awards', 'Snapshots and freezes', 'Kerjasama adapter', 'Vitest unit tests', 'Playwright journeys',
  ],
}
