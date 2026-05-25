// Copy this file to js/config.js and fill in the values.
// js/config.js is gitignored — never commit your real config.
//
// Get SUPABASE_URL and SUPABASE_ANON_KEY from your Supabase project at:
//   Project Settings → API
// The anon key is the publishable client key — safe to ship in the browser.
// NEVER put the service_role key in this file.
//
// ADMIN_EMAIL must match the email of the Supabase auth user you created
// AND the email you hard-coded into the RLS policies in
// supabase/migrations/001_initial_schema.sql.
window.APP_CONFIG = {
  SUPABASE_URL: 'https://ztquydpzekcmyqwsfkmg.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_H7SZF5zhnTC9c6_uC46yzg_WqUCogV_',
  ADMIN_EMAIL: 'zefanya.kharisma@croissantsmoon.com',
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/xaqkdvwd',
};
