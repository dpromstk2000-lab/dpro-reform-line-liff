/**
 * DPRO リフォーム・工務店 LINE
 * STEP REFORM-10 全画面最終ブラッシュアップ 設定
 */
window.DPRO_REFORM_CONFIG = Object.freeze({
  VERSION: "REFORM-10-FINAL-BRUSHUP-20260715",
  COMPANY_CODE: "dpro_reform_demo",
  API_BASE: "https://dpro-reform-line-api.dpromstk2000.workers.dev",

  // LINE DevelopersでLIFFを作成した後にLIFF IDを入力します。
  // 未設定でも通常ブラウザ・営業デモURLで確認できます。
  LIFF_ID: "",

  CUSTOMER_INTAKE_PAGE: "index.html",
  MEMBER_PAGE: "member.html",
  MEMBER_PAGE_ENABLED: true,
  REQUEST_TIMEOUT_MS: 30000,

  PHOTO_LONG_EDGE_PX: 1600,
  PHOTO_TARGET_BYTES: 1250000,
  DEFAULT_MAX_PHOTOS: 5,

  // ブラウザ内には識別IDと公開トークンだけを保存します。
  BROWSER_MEMBER_ID_STORAGE_KEY: "dpro_reform_browser_member_id_v1",
  MEMBER_TOKEN_STORAGE_KEY: "dpro_reform_member_tokens_v1",
  ADMIN_CODE_STORAGE_KEY: "dpro_reform_admin_code_v1",
  STAFF_CODE_STORAGE_KEY: "dpro_reform_staff_code_v1",

  // ?demo=1 の時だけ使用します。通常アクセスでは自動使用しません。
  DEMO_LINE_USER_ID: "demo_reform_line_001",
  DEMO_ADMIN_CODE: "1234"
});

/* DPRO TUTORIAL R3 loader: demo/tutorial routes only. No business API calls. */
(() => {
  try {
    const q = new URLSearchParams(location.search);
    if (q.get('demo') !== '1' && q.get('tutorial') !== '1') return;
    if (document.querySelector('script[data-dpro-reform-tutorial]')) return;
    const s = document.createElement('script');
    s.src = './tutorial-first10.js?v=20260828-r3-v11-routefix1';
    s.defer = true;
    s.dataset.dproReformTutorial = '1';
    (document.head || document.documentElement).appendChild(s);
  } catch (_) {}
})();
