/**
 * DPRO リフォーム・工務店 LINE
 * STEP REFORM-4 お客様相談受付画面 設定
 */
window.DPRO_REFORM_CONFIG = Object.freeze({
  VERSION: "REFORM-4-CUSTOMER-INTAKE-20260715",
  COMPANY_CODE: "dpro_reform_demo",
  API_BASE: "https://dpro-reform-line-api.dpromstk2000.workers.dev",

  // LINE DevelopersでLIFFを作成した後にLIFF IDを入力します。
  // 未設定でも通常ブラウザと ?line_user_id=... による確認ができます。
  LIFF_ID: "",

  MEMBER_PAGE: "member.html",
  MEMBER_PAGE_ENABLED: false,
  REQUEST_TIMEOUT_MS: 30000,
  PHOTO_LONG_EDGE_PX: 1600,
  PHOTO_TARGET_BYTES: 1250000,
  DEFAULT_MAX_PHOTOS: 5,

  // ?demo=1 の時だけ使用します。通常アクセスでは自動使用しません。
  DEMO_LINE_USER_ID: "demo_line_reform_001"
});
