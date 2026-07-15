/**
 * DPRO リフォーム・工務店 LINE
 * STEP REFORM-6 オーナーPC管理画面対応 設定
 */
window.DPRO_REFORM_CONFIG = Object.freeze({
  VERSION: "REFORM-6-OWNER-PC-20260715",
  COMPANY_CODE: "dpro_reform_demo",
  API_BASE: "https://dpro-reform-line-api.dpromstk2000.workers.dev",

  // LINE DevelopersでLIFFを作成した後にLIFF IDを入力します。
  LIFF_ID: "",

  CUSTOMER_INTAKE_PAGE: "index.html",
  MEMBER_PAGE: "member.html",
  OWNER_PAGE: "owner.html",
  STAFF_PAGE: "staff.html",
  OWNER_IPAD_PAGE: "owner-ipad.html",
  SYSTEM_CHECK_PAGE: "system-check.html",
  MEMBER_PAGE_ENABLED: true,

  REQUEST_TIMEOUT_MS: 30000,
  PHOTO_LONG_EDGE_PX: 1600,
  PHOTO_TARGET_BYTES: 1250000,
  DEFAULT_MAX_PHOTOS: 5,

  BROWSER_MEMBER_ID_STORAGE_KEY: "dpro_reform_browser_member_id_v1",
  MEMBER_TOKEN_STORAGE_KEY: "dpro_reform_member_tokens_v1",
  ADMIN_CODE_STORAGE_KEY: "dpro_reform_admin_code_v1",

  // ?demo=1 のときのみ自動入力します。通常アクセスでは使用しません。
  DEMO_ADMIN_CODE: "1234",
  DEMO_LINE_USER_ID: "demo_line_reform_001"
});
