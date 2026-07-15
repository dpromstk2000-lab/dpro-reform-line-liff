/**
 * DPRO リフォーム・工務店 LINE
 * STEP REFORM-5 お客様マイページ連携版 設定
 */
window.DPRO_REFORM_CONFIG = Object.freeze({
  VERSION: "REFORM-5-MEMBER-PAGE-LINK-20260715",
  COMPANY_CODE: "dpro_reform_demo",
  API_BASE: "https://dpro-reform-line-api.dpromstk2000.workers.dev",

  // LINE DevelopersでLIFFを作成した後にLIFF IDを入力します。
  // 未設定でも通常ブラウザと ?line_user_id=... による確認ができます。
  LIFF_ID: "",

  MEMBER_PAGE: "member.html",
  CUSTOMER_INTAKE_PAGE: "index.html",
  MEMBER_PAGE_ENABLED: true,
  REQUEST_TIMEOUT_MS: 30000,
  PHOTO_LONG_EDGE_PX: 1600,
  PHOTO_TARGET_BYTES: 1250000,
  DEFAULT_MAX_PHOTOS: 5,
  BROWSER_MEMBER_ID_STORAGE_KEY: "dpro_reform_browser_member_id_v1",
  MEMBER_TOKEN_STORAGE_KEY: "dpro_reform_member_tokens_v1",

  // ?demo=1 の時だけ使用します。通常アクセスでは自動使用しません。
  DEMO_LINE_USER_ID: "demo_line_reform_001"
});
