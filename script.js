const CONFIG = {
  storageKey: "btc-by-jlv-settings-v1",
  defaultRefreshInterval: 60000,
  requestTimeout: 12000,
  wsReconnectDelay: 6000,
  apiKeys: {
    fred: ""
  },
  endpoints: {
    coinGecko: "https://api.coingecko.com/api/v3",
    binance: "https://api.binance.com/api/v3",
    binanceWs: "wss://stream.binance.com:9443/ws",
    mempool: "https://mempool.space/api",
    fearGreed: "https://api.alternative.me/fng/",
    fredApi: "https://api.stlouisfed.org/fred/series/observations",
    fredCsv: "https://fred.stlouisfed.org/graph/fredgraph.csv"
  }
};

const TIMEFRAME_CONFIG = {
  "1H": { interval: "1h", limit: 240, label: "1 hour" },
  "4H": { interval: "4h", limit: 240, label: "4 hour" },
  "1D": { interval: "1d", limit: 260, label: "1 day" },
  "1W": { interval: "1w", limit: 220, label: "1 week" }
};

const MACRO_SERIES = {
  dgs10: { label: "US 10Y", seriesId: "DGS10", unit: "%", changeLabel: "rate" },
  fedfunds: { label: "Fed Funds", seriesId: "FEDFUNDS", unit: "%", changeLabel: "policy" },
  cpi: { label: "CPI YoY", seriesId: "CPIAUCSL", unit: "%", changeLabel: "inflation", transform: "yoy" },
  m2: { label: "M2", seriesId: "M2SL", unit: "%", changeLabel: "liquidity", transform: "yoy" },
  dxy: { label: "DXY Proxy", seriesId: "DTWEXBGS", unit: "", changeLabel: "dollar" },
  unrate: { label: "Unemployment", seriesId: "UNRATE", unit: "%", changeLabel: "growth" }
};

// Browser-safe fallback snapshot used when direct client-side FRED requests are blocked.
const MACRO_BUNDLED_FALLBACK = {
  updatedAt: "2026-03-14",
  series: {
    dgs10: [
      { date: "2024-03-01", value: 4.21 },
      { date: "2024-04-01", value: 4.54 },
      { date: "2024-05-01", value: 4.48 },
      { date: "2024-06-01", value: 4.31 },
      { date: "2024-07-01", value: 4.25 },
      { date: "2024-08-01", value: 3.87 },
      { date: "2024-09-01", value: 3.72 },
      { date: "2024-10-01", value: 4.1 },
      { date: "2024-11-01", value: 4.36 },
      { date: "2024-12-01", value: 4.58 },
      { date: "2025-01-01", value: 4.63 },
      { date: "2025-02-01", value: 4.43 },
      { date: "2025-03-01", value: 4.32 },
      { date: "2025-04-01", value: 4.41 },
      { date: "2025-05-01", value: 4.49 },
      { date: "2025-06-01", value: 4.38 },
      { date: "2025-07-01", value: 4.21 },
      { date: "2025-08-01", value: 4.14 },
      { date: "2025-09-01", value: 4.05 },
      { date: "2025-10-01", value: 4.11 },
      { date: "2025-11-01", value: 4.27 },
      { date: "2025-12-01", value: 4.36 },
      { date: "2026-01-01", value: 4.44 },
      { date: "2026-02-01", value: 4.32 }
    ],
    fedfunds: [
      { date: "2024-03-01", value: 5.33 },
      { date: "2024-04-01", value: 5.33 },
      { date: "2024-05-01", value: 5.33 },
      { date: "2024-06-01", value: 5.33 },
      { date: "2024-07-01", value: 5.33 },
      { date: "2024-08-01", value: 5.33 },
      { date: "2024-09-01", value: 5.13 },
      { date: "2024-10-01", value: 4.83 },
      { date: "2024-11-01", value: 4.58 },
      { date: "2024-12-01", value: 4.33 },
      { date: "2025-01-01", value: 4.33 },
      { date: "2025-02-01", value: 4.33 },
      { date: "2025-03-01", value: 4.33 },
      { date: "2025-04-01", value: 4.33 },
      { date: "2025-05-01", value: 4.08 },
      { date: "2025-06-01", value: 4.08 },
      { date: "2025-07-01", value: 4.08 },
      { date: "2025-08-01", value: 3.83 },
      { date: "2025-09-01", value: 3.83 },
      { date: "2025-10-01", value: 3.83 },
      { date: "2025-11-01", value: 3.58 },
      { date: "2025-12-01", value: 3.58 },
      { date: "2026-01-01", value: 3.58 },
      { date: "2026-02-01", value: 3.58 }
    ],
    cpi: [
      { date: "2024-03-01", value: 312.332 },
      { date: "2024-04-01", value: 313.207 },
      { date: "2024-05-01", value: 313.225 },
      { date: "2024-06-01", value: 313.049 },
      { date: "2024-07-01", value: 313.534 },
      { date: "2024-08-01", value: 314.121 },
      { date: "2024-09-01", value: 314.686 },
      { date: "2024-10-01", value: 315.454 },
      { date: "2024-11-01", value: 316.043 },
      { date: "2024-12-01", value: 316.887 },
      { date: "2025-01-01", value: 317.671 },
      { date: "2025-02-01", value: 318.364 },
      { date: "2025-03-01", value: 319.141 },
      { date: "2025-04-01", value: 319.982 },
      { date: "2025-05-01", value: 320.531 },
      { date: "2025-06-01", value: 320.742 },
      { date: "2025-07-01", value: 320.994 },
      { date: "2025-08-01", value: 321.312 },
      { date: "2025-09-01", value: 321.721 },
      { date: "2025-10-01", value: 322.105 },
      { date: "2025-11-01", value: 322.366 },
      { date: "2025-12-01", value: 322.571 },
      { date: "2026-01-01", value: 322.904 },
      { date: "2026-02-01", value: 323.188 }
    ],
    m2: [
      { date: "2024-03-01", value: 20840 },
      { date: "2024-04-01", value: 20822 },
      { date: "2024-05-01", value: 20857 },
      { date: "2024-06-01", value: 20910 },
      { date: "2024-07-01", value: 20946 },
      { date: "2024-08-01", value: 20982 },
      { date: "2024-09-01", value: 21015 },
      { date: "2024-10-01", value: 21042 },
      { date: "2024-11-01", value: 21091 },
      { date: "2024-12-01", value: 21134 },
      { date: "2025-01-01", value: 21188 },
      { date: "2025-02-01", value: 21234 },
      { date: "2025-03-01", value: 21282 },
      { date: "2025-04-01", value: 21311 },
      { date: "2025-05-01", value: 21348 },
      { date: "2025-06-01", value: 21395 },
      { date: "2025-07-01", value: 21433 },
      { date: "2025-08-01", value: 21488 },
      { date: "2025-09-01", value: 21530 },
      { date: "2025-10-01", value: 21584 },
      { date: "2025-11-01", value: 21621 },
      { date: "2025-12-01", value: 21674 },
      { date: "2026-01-01", value: 21719 },
      { date: "2026-02-01", value: 21763 }
    ],
    dxy: [
      { date: "2024-03-01", value: 120.4 },
      { date: "2024-04-01", value: 121.2 },
      { date: "2024-05-01", value: 120.9 },
      { date: "2024-06-01", value: 120.1 },
      { date: "2024-07-01", value: 119.7 },
      { date: "2024-08-01", value: 119.1 },
      { date: "2024-09-01", value: 118.6 },
      { date: "2024-10-01", value: 119.0 },
      { date: "2024-11-01", value: 119.8 },
      { date: "2024-12-01", value: 120.7 },
      { date: "2025-01-01", value: 121.6 },
      { date: "2025-02-01", value: 122.1 },
      { date: "2025-03-01", value: 121.7 },
      { date: "2025-04-01", value: 121.1 },
      { date: "2025-05-01", value: 120.6 },
      { date: "2025-06-01", value: 120.2 },
      { date: "2025-07-01", value: 119.8 },
      { date: "2025-08-01", value: 119.3 },
      { date: "2025-09-01", value: 118.9 },
      { date: "2025-10-01", value: 119.4 },
      { date: "2025-11-01", value: 120.1 },
      { date: "2025-12-01", value: 120.8 },
      { date: "2026-01-01", value: 121.2 },
      { date: "2026-02-01", value: 120.5 }
    ],
    unrate: [
      { date: "2024-03-01", value: 3.8 },
      { date: "2024-04-01", value: 3.9 },
      { date: "2024-05-01", value: 4.0 },
      { date: "2024-06-01", value: 4.1 },
      { date: "2024-07-01", value: 4.2 },
      { date: "2024-08-01", value: 4.2 },
      { date: "2024-09-01", value: 4.1 },
      { date: "2024-10-01", value: 4.1 },
      { date: "2024-11-01", value: 4.2 },
      { date: "2024-12-01", value: 4.1 },
      { date: "2025-01-01", value: 4.1 },
      { date: "2025-02-01", value: 4.1 },
      { date: "2025-03-01", value: 4.1 },
      { date: "2025-04-01", value: 4.0 },
      { date: "2025-05-01", value: 4.0 },
      { date: "2025-06-01", value: 4.1 },
      { date: "2025-07-01", value: 4.2 },
      { date: "2025-08-01", value: 4.2 },
      { date: "2025-09-01", value: 4.1 },
      { date: "2025-10-01", value: 4.1 },
      { date: "2025-11-01", value: 4.0 },
      { date: "2025-12-01", value: 4.0 },
      { date: "2026-01-01", value: 4.0 },
      { date: "2026-02-01", value: 4.1 }
    ]
  }
};

const DEFAULT_STATE = {
  currency: "USD",
  timeframe: "1H",
  range: "1",
  chartPresetVersion: 2,
  autoRefresh: true,
  refreshInterval: 60000,
  compactMode: false,
  tooltips: true,
  modules: {
    market: true,
    chart: true,
    secondary: true,
    onchain: true,
    macro: true,
    sentiment: true,
    portfolio: true,
    alerts: true
  },
  overlays: {
    sma20: false,
    sma50: false,
    sma200: false,
    ema21: true,
    vwap: false
  },
  panels: {
    volume: true,
    rsi: false,
    macd: false
  },
  macroEnabled: {
    dgs10: true,
    fedfunds: true,
    cpi: true,
    m2: false,
    dxy: true,
    unrate: false
  },
  portfolio: {
    btcHeld: 1.25,
    avgPrice: 54000,
    cash: 25000,
    targetBtc: 2,
    targetSell: 150000,
    baseCurrency: "USD"
  }
};

const CHART_PRESET_VERSION = DEFAULT_STATE.chartPresetVersion;

const runtime = {
  charts: {},
  cache: new Map(),
  data: {
    market: null,
    global: null,
    fx: null,
    history: null,
    macroBenchmark: null,
    candles: null,
    fearGreed: null,
    network: {
      fees: null,
      mempool: null,
      blockHeight: null,
      difficulty: null,
      hashrate: null
    },
    macro: {},
    macroMeta: {
      source: "placeholder",
      note: "Optional / placeholder",
      tag: "Macro placeholders active",
      bundleUpdatedAt: null
    }
  },
  health: {
    coingecko: { status: "idle", message: "Waiting" },
    binance: { status: "idle", message: "Waiting" },
    mempool: { status: "idle", message: "Waiting" },
    fearGreed: { status: "idle", message: "Waiting" },
    fred: { status: "idle", message: "Optional" }
  },
  socket: null,
  socketReconnectTimer: null,
  refreshTimer: null,
  lastRefresh: null
};

const storedState = loadStoredState();
const appState = deepMerge(DEFAULT_STATE, storedState);
const didUpgradePrimaryChartState = upgradePrimaryChartState(appState, storedState);

document.addEventListener("DOMContentLoaded", init);

async function init() {
  applyStateToDocument();
  if (didUpgradePrimaryChartState) {
    saveState(true);
  }
  cacheControlValues();
  initCharts();
  bindEvents();
  syncPrimaryChartFullscreenState();
  renderModuleVisibility();
  renderPortfolio();
  renderHealthPanel();
  await refreshDashboard({ force: true, includeHistory: true, includeMacro: true });
  connectPriceSocket();
  syncRefreshTimer();
  window.addEventListener("resize", throttle(resizeCharts, 160));
}

function byId(id) {
  return document.getElementById(id);
}

function safeText(id, value, className) {
  const node = byId(id);
  if (!node) {
    return;
  }
  node.textContent = value;
  if (className !== undefined) {
    node.classList.remove("positive", "negative");
    if (className) {
      node.classList.add(className);
    }
  }
}

function safeHtml(id, value) {
  const node = byId(id);
  if (node) {
    node.innerHTML = value;
  }
}

function setStatusOverlay(id, message, tone = "", visible = true) {
  const node = byId(id);
  if (!node) {
    return;
  }
  node.textContent = message;
  node.classList.remove("is-hidden", "error", "warning");
  if (!visible) {
    node.classList.add("is-hidden");
    return;
  }
  if (tone === "error") {
    node.classList.add("error");
  }
  if (tone === "warning") {
    node.classList.add("warning");
  }
}

function setHealth(source, status, message) {
  runtime.health[source] = { status, message };
  renderHealthPanel();
}

function deepMerge(base, extra) {
  const output = structuredClone(base);
  if (!extra || typeof extra !== "object") {
    return output;
  }
  Object.keys(extra).forEach((key) => {
    const baseValue = output[key];
    const extraValue = extra[key];
    if (isPlainObject(baseValue) && isPlainObject(extraValue)) {
      output[key] = deepMerge(baseValue, extraValue);
      return;
    }
    output[key] = extraValue;
  });
  return output;
}

function upgradePrimaryChartState(state, persistedState) {
  if (!isPlainObject(state?.overlays) || !isPlainObject(state?.panels)) {
    return false;
  }

  if (Number(persistedState?.chartPresetVersion ?? 0) < CHART_PRESET_VERSION) {
    state.overlays = structuredClone(DEFAULT_STATE.overlays);
    state.panels = structuredClone(DEFAULT_STATE.panels);
    state.chartPresetVersion = CHART_PRESET_VERSION;
    return true;
  }

  return false;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function loadStoredState() {
  try {
    const raw = localStorage.getItem(CONFIG.storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(silent = false) {
  localStorage.setItem(CONFIG.storageKey, JSON.stringify(appState));
  if (!silent) {
    flashSettingsFeedback("Configuration saved locally.");
  }
}

function resetState() {
  const nextState = deepMerge(DEFAULT_STATE, {});
  Object.keys(appState).forEach((key) => {
    delete appState[key];
  });
  Object.assign(appState, nextState);
  applyStateToDocument();
  renderModuleVisibility();
  renderPortfolio();
  saveState();
}

function applyStateToDocument() {
  document.body.classList.toggle("is-compact", Boolean(appState.compactMode));
  document.body.classList.toggle("tooltips-off", !appState.tooltips);

  const currencySelect = byId("currency-select");
  const portfolioCurrency = byId("portfolio-base-currency");
  const autoRefresh = byId("auto-refresh-toggle");
  const compactMode = byId("compact-mode-toggle");
  const tooltips = byId("tooltips-toggle");
  const refreshInterval = byId("refresh-interval-select");

  if (currencySelect) currencySelect.value = appState.currency;
  if (portfolioCurrency) portfolioCurrency.value = appState.portfolio.baseCurrency;
  if (autoRefresh) autoRefresh.checked = Boolean(appState.autoRefresh);
  if (compactMode) compactMode.checked = Boolean(appState.compactMode);
  if (tooltips) tooltips.checked = Boolean(appState.tooltips);
  if (refreshInterval) refreshInterval.value = String(appState.refreshInterval);

  syncToggleGroup("[data-module-toggle]", appState.modules);
  syncToggleGroup("[data-overlay-toggle]", appState.overlays);
  syncToggleGroup("[data-panel-toggle]", appState.panels);
  syncToggleGroup("[data-macro-toggle]", appState.macroEnabled);

  syncButtonState(".timeframe-button", "data-timeframe", appState.timeframe);
  syncButtonState(".range-button", "data-range", appState.range);

  setNumericInput("portfolio-btc-held", appState.portfolio.btcHeld);
  setNumericInput("portfolio-avg-price", appState.portfolio.avgPrice);
  setNumericInput("portfolio-cash", appState.portfolio.cash);
  setNumericInput("portfolio-target-btc", appState.portfolio.targetBtc);
  setNumericInput("portfolio-target-sell", appState.portfolio.targetSell);
}

function setNumericInput(id, value) {
  const node = byId(id);
  if (node) {
    node.value = String(value);
  }
}

function syncToggleGroup(selector, values) {
  document.querySelectorAll(selector).forEach((input) => {
    const key = Object.keys(values).find((item) => item === input.dataset.moduleToggle || item === input.dataset.overlayToggle || item === input.dataset.panelToggle || item === input.dataset.macroToggle);
    if (key) {
      input.checked = Boolean(values[key]);
    }
  });
}

function syncButtonState(selector, attribute, activeValue) {
  document.querySelectorAll(selector).forEach((button) => {
    const isActive = button.getAttribute(attribute) === activeValue;
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("ghost", !isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function cacheControlValues() {
  safeText("chart-currency-pill", `Chart currency ${appState.currency}`);
  safeText("overview-data-cadence", appState.autoRefresh ? `Auto refresh every ${Math.round(appState.refreshInterval / 1000)}s.` : "Manual refresh only.");
}

function flashSettingsFeedback(message) {
  safeText("settings-feedback", message);
}

function formatCurrency(value, currency = appState.currency, digits = 0) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(value);
}

function formatNumber(value, digits = 0) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(value);
}

function formatCompact(value, digits = 2) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: digits
  }).format(value);
}

function formatPercent(value, digits = 2) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(digits)}%`;
}

function formatPlainPercent(value, digits = 2) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return `${value.toFixed(digits)}%`;
}

function formatHashrate(value) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  const units = ["H/s", "KH/s", "MH/s", "GH/s", "TH/s", "PH/s", "EH/s", "ZH/s"];
  let current = value;
  let unitIndex = 0;
  while (current >= 1000 && unitIndex < units.length - 1) {
    current /= 1000;
    unitIndex += 1;
  }
  return `${current.toFixed(current >= 100 ? 0 : 2)} ${units[unitIndex]}`;
}

function formatDateTime(value) {
  if (!value) {
    return "--";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function formatDateLabel(value) {
  if (!value) {
    return "--";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function getChangeClass(value) {
  if (!Number.isFinite(value)) {
    return "";
  }
  if (value > 0) {
    return "positive";
  }
  if (value < 0) {
    return "negative";
  }
  return "";
}

function getBtcFxPrice(currency) {
  const lookup = runtime.data.fx?.bitcoin;
  if (!lookup) {
    return null;
  }
  return lookup[currency.toLowerCase()] ?? null;
}

function convertValue(value, fromCurrency, toCurrency) {
  if (!Number.isFinite(value) || fromCurrency === toCurrency) {
    return value;
  }
  const fromPrice = getBtcFxPrice(fromCurrency);
  const toPrice = getBtcFxPrice(toCurrency);
  if (!fromPrice || !toPrice) {
    return value;
  }
  return value * (toPrice / fromPrice);
}

function getSelectedFxRatio() {
  const usdPrice = getBtcFxPrice("USD");
  const selected = getBtcFxPrice(appState.currency);
  if (!usdPrice || !selected) {
    return 1;
  }
  return selected / usdPrice;
}

function getConversionRatioFromUsd(currency) {
  const usdPrice = getBtcFxPrice("USD");
  const targetPrice = getBtcFxPrice(currency);
  if (!usdPrice || !targetPrice) {
    return 1;
  }
  return targetPrice / usdPrice;
}

function throttle(fn, wait) {
  let timeoutId = null;
  let lastArgs = null;
  return (...args) => {
    lastArgs = args;
    if (timeoutId) {
      return;
    }
    timeoutId = window.setTimeout(() => {
      timeoutId = null;
      fn(...lastArgs);
    }, wait);
  };
}

function bindEvents() {
  byId("manual-refresh")?.addEventListener("click", () => {
    refreshDashboard({ force: true, includeHistory: true, includeMacro: true });
  });

  byId("primary-chart-fullscreen")?.addEventListener("click", () => {
    togglePrimaryChartFullscreen();
  });

  document.addEventListener("fullscreenchange", syncPrimaryChartFullscreenState);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isPrimaryChartFullscreenActive() && document.fullscreenElement !== getPrimaryChartStage()) {
      setPrimaryChartFallbackState(false);
    }
  });

  byId("save-config")?.addEventListener("click", () => {
    saveState();
  });

  byId("reset-config")?.addEventListener("click", async () => {
    resetState();
    await refreshDashboard({ force: true, includeHistory: true, includeMacro: true });
    connectPriceSocket();
    syncRefreshTimer();
  });

  byId("export-config")?.addEventListener("click", exportConfig);
  byId("import-trigger")?.addEventListener("click", () => byId("import-config")?.click());
  byId("import-config")?.addEventListener("change", importConfig);

  byId("currency-select")?.addEventListener("change", async (event) => {
    appState.currency = event.target.value;
    saveState(true);
    applyStateToDocument();
    renderPortfolio();
    renderHero();
    renderMarket();
    renderCandles();
    await refreshDashboard({ force: true, includeHistory: true, includeMacro: true });
  });

  byId("portfolio-base-currency")?.addEventListener("change", (event) => {
    appState.portfolio.baseCurrency = event.target.value;
    saveState(true);
    renderPortfolio();
  });

  byId("auto-refresh-toggle")?.addEventListener("change", (event) => {
    appState.autoRefresh = event.target.checked;
    cacheControlValues();
    saveState(true);
    syncRefreshTimer();
    connectPriceSocket();
  });

  byId("compact-mode-toggle")?.addEventListener("change", (event) => {
    appState.compactMode = event.target.checked;
    applyStateToDocument();
    saveState(true);
    resizeCharts();
  });

  byId("tooltips-toggle")?.addEventListener("change", (event) => {
    appState.tooltips = event.target.checked;
    applyStateToDocument();
    saveState(true);
  });

  byId("refresh-interval-select")?.addEventListener("change", (event) => {
    appState.refreshInterval = Number(event.target.value) || CONFIG.defaultRefreshInterval;
    cacheControlValues();
    saveState(true);
    syncRefreshTimer();
  });

  document.querySelectorAll("[data-module-toggle]").forEach((input) => {
    input.addEventListener("change", (event) => {
      appState.modules[event.target.dataset.moduleToggle] = event.target.checked;
      saveState(true);
      renderModuleVisibility();
      resizeCharts();
    });
  });

  document.querySelectorAll("[data-overlay-toggle]").forEach((input) => {
    input.addEventListener("change", (event) => {
      appState.overlays[event.target.dataset.overlayToggle] = event.target.checked;
      saveState(true);
      renderCandles();
    });
  });

  document.querySelectorAll("[data-panel-toggle]").forEach((input) => {
    input.addEventListener("change", (event) => {
      appState.panels[event.target.dataset.panelToggle] = event.target.checked;
      saveState(true);
      renderCandles();
    });
  });

  document.querySelectorAll("[data-macro-toggle]").forEach((input) => {
    input.addEventListener("change", async (event) => {
      appState.macroEnabled[event.target.dataset.macroToggle] = event.target.checked;
      saveState(true);
      await refreshMacroData(true);
      renderAlerts();
    });
  });

  document.querySelectorAll(".timeframe-button").forEach((button) => {
    button.addEventListener("click", async () => {
      appState.timeframe = button.dataset.timeframe;
      syncButtonState(".timeframe-button", "data-timeframe", appState.timeframe);
      saveState(true);
      await refreshCandles(true);
    });
  });

  document.querySelectorAll(".range-button").forEach((button) => {
    button.addEventListener("click", async () => {
      appState.range = button.dataset.range;
      syncButtonState(".range-button", "data-range", appState.range);
      saveState(true);
      await refreshHistory(true);
      await refreshMacroData(false);
    });
  });

  [
    ["portfolio-btc-held", "btcHeld"],
    ["portfolio-avg-price", "avgPrice"],
    ["portfolio-cash", "cash"],
    ["portfolio-target-btc", "targetBtc"],
    ["portfolio-target-sell", "targetSell"]
  ].forEach(([id, field]) => {
    byId(id)?.addEventListener("input", (event) => {
      appState.portfolio[field] = Number(event.target.value) || 0;
      saveState(true);
      renderPortfolio();
      renderAlerts();
    });
  });
}

async function refreshDashboard({ force = false, includeHistory = false, includeMacro = false } = {}) {
  const tasks = [
    refreshMarketData(force),
    refreshNetworkData(force),
    refreshFearGreed(force),
    refreshCandles(force)
  ];

  if (includeHistory || !runtime.data.history) {
    tasks.push(refreshHistory(force));
  }

  if (includeMacro || Object.keys(runtime.data.macro).length === 0) {
    tasks.push(refreshMacroData(force));
  }

  await Promise.allSettled(tasks);
  runtime.lastRefresh = Date.now();
  safeText("header-refresh", formatDateTime(runtime.lastRefresh));
  renderHero();
  renderMarket();
  renderMacro();
  renderSentiment();
  renderOnchain();
  renderPortfolio();
  renderAlerts();
}

async function refreshMarketData(force = false) {
  setHealth("coingecko", "loading", "Refreshing");
  const marketKey = `market-${appState.currency}`;
  const [market, global, fx] = await Promise.allSettled([
    cachedRequest(marketKey, 45000, () => fetchMarket(appState.currency), force),
    cachedRequest("global-market", 90000, fetchGlobal, force),
    cachedRequest("fx-btc", 90000, fetchFx, force)
  ]);

  runtime.data.market = market.status === "fulfilled" ? market.value : runtime.data.market;
  runtime.data.global = global.status === "fulfilled" ? global.value : runtime.data.global;
  runtime.data.fx = fx.status === "fulfilled" ? fx.value : runtime.data.fx;

  if (runtime.data.market) {
    setHealth("coingecko", "ok", "Live");
  } else {
    setHealth("coingecko", "error", "Unavailable");
  }
}

async function refreshHistory(force = false) {
  setStatusOverlay("performance-chart-status", "Loading performance history...");
  setStatusOverlay("drawdown-chart-status", "Loading drawdown history...");
  setStatusOverlay("volume-chart-status", "Loading volume history...");
  setStatusOverlay("trend-chart-status", "Computing trend diagnostics...");

  try {
    runtime.data.history = await cachedRequest(`history-${appState.currency}-${appState.range}`, getHistoryTtl(appState.range), () => fetchHistoryWithFallback(appState.currency, appState.range), force);
    renderHistoryCharts();
  } catch {
    setStatusOverlay("performance-chart-status", "Market history feed unavailable.", "error");
    setStatusOverlay("drawdown-chart-status", "Market history feed unavailable.", "error");
    setStatusOverlay("volume-chart-status", "Market history feed unavailable.", "error");
    setStatusOverlay("trend-chart-status", "Market history feed unavailable.", "error");
  }
}

async function refreshCandles(force = false) {
  setStatusOverlay("primary-chart-status", "Loading Binance OHLC...");
  setHealth("binance", "loading", "Refreshing");
  try {
    runtime.data.candles = await cachedRequest(`candles-${appState.timeframe}`, 45000, () => fetchCandles(appState.timeframe), force);
    renderCandles();
    setHealth("binance", "ok", "Live");
  } catch {
    setStatusOverlay("primary-chart-status", "Binance OHLC feed unavailable.", "error");
    setHealth("binance", "error", "Unavailable");
  }
}

async function refreshNetworkData(force = false) {
  setHealth("mempool", "loading", "Refreshing");
  try {
    const [fees, mempool, blockHeight, difficulty, hashrate] = await Promise.all([
      cachedRequest("mempool-fees", 45000, fetchFees, force),
      cachedRequest("mempool-summary", 45000, fetchMempoolSummary, force),
      cachedRequest("mempool-height", 45000, fetchBlockHeight, force),
      cachedRequest("mempool-difficulty", 180000, fetchDifficultyAdjustment, force),
      cachedRequest("mempool-hashrate", 600000, fetchHashrate, force)
    ]);

    runtime.data.network = { fees, mempool, blockHeight, difficulty, hashrate };
    renderOnchain();
    setHealth("mempool", "ok", "Live");
  } catch {
    setHealth("mempool", "error", "Unavailable");
  }
}

async function refreshFearGreed(force = false) {
  setHealth("fearGreed", "loading", "Refreshing");
  try {
    runtime.data.fearGreed = await cachedRequest("fear-greed", 900000, fetchFearGreed, force);
    renderSentiment();
    setHealth("fearGreed", "ok", "Live");
  } catch {
    setHealth("fearGreed", "error", "Unavailable");
  }
}

async function refreshMacroData(force = false) {
  setStatusOverlay("macro-chart-status", "Loading macro comparison...");
  const enabledSeries = Object.keys(appState.macroEnabled).filter((key) => appState.macroEnabled[key]);
  if (enabledSeries.length === 0) {
    runtime.data.macro = {};
    runtime.data.macroMeta = buildMacroMeta([]);
    renderMacro();
    setHealth("fred", "idle", "Disabled");
    return;
  }

  setHealth("fred", "loading", "Refreshing");
  const results = await Promise.allSettled(enabledSeries.map((key) => cachedRequest(`macro-${key}`, 1800000, () => fetchMacroSeries(key), force)));
  const macroData = {};
  const sourceEntries = [];
  enabledSeries.forEach((key, index) => {
    if (results[index].status === "fulfilled" && results[index].value?.entries?.length) {
      macroData[key] = results[index].value.entries;
      sourceEntries.push(results[index].value);
    }
  });
  runtime.data.macro = macroData;
  runtime.data.macroMeta = buildMacroMeta(sourceEntries);

  try {
    runtime.data.macroBenchmark = await cachedRequest(`macro-benchmark-${appState.currency}`, 1800000, () => fetchHistoryWithFallback(appState.currency, "365"), force);
  } catch {
    runtime.data.macroBenchmark = runtime.data.history;
  }

  if (Object.keys(macroData).length > 0) {
    setHealth("fred", runtime.data.macroMeta.source === "bundled-fallback" ? "warning" : "ok", runtime.data.macroMeta.healthMessage);
  } else {
    runtime.data.macroMeta = buildMacroMeta([]);
    setHealth("fred", CONFIG.apiKeys.fred ? "error" : "warning", CONFIG.apiKeys.fred ? "Unavailable" : "Optional / placeholder");
  }
  renderMacro();
}

function getHistoryTtl(range) {
  if (range === "1") {
    return 90000;
  }
  if (range === "7") {
    return 180000;
  }
  return 600000;
}

async function cachedRequest(key, ttl, requestFn, force = false) {
  const entry = runtime.cache.get(key);
  const now = Date.now();
  if (!force && entry && now - entry.timestamp < ttl) {
    return entry.value;
  }
  const value = await requestFn();
  runtime.cache.set(key, { timestamp: now, value });
  return value;
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), CONFIG.requestTimeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), CONFIG.requestTimeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchMarket(currency) {
  const params = new URLSearchParams({
    vs_currency: currency.toLowerCase(),
    ids: "bitcoin",
    price_change_percentage: "24h,7d,30d",
    sparkline: "false"
  });
  const data = await fetchJson(`${CONFIG.endpoints.coinGecko}/coins/markets?${params.toString()}`);
  return Array.isArray(data) ? data[0] : null;
}

async function fetchGlobal() {
  const data = await fetchJson(`${CONFIG.endpoints.coinGecko}/global`);
  return data?.data ?? null;
}

async function fetchFx() {
  return fetchJson(`${CONFIG.endpoints.coinGecko}/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp,chf`);
}

async function fetchHistory(currency, range) {
  const params = new URLSearchParams({
    vs_currency: currency.toLowerCase(),
    days: range
  });
  if (range === "365" || range === "max") {
    params.set("interval", "daily");
  }
  const data = await fetchJson(`${CONFIG.endpoints.coinGecko}/coins/bitcoin/market_chart?${params.toString()}`);
  return data;
}

async function fetchHistoryWithFallback(currency, range) {
  try {
    const primary = await fetchHistory(currency, range);
    return { ...primary, source: "coingecko" };
  } catch {
    return fetchHistoryFromBinance(currency, range);
  }
}

async function fetchHistoryFromBinance(currency, range) {
  const config = getSecondaryHistoryConfig(range);
  const ratio = getConversionRatioFromUsd(currency);
  const data = await fetchJson(`${CONFIG.endpoints.binance}/klines?symbol=BTCUSDT&interval=${config.interval}&limit=${config.limit}`);
  return {
    source: "binance",
    prices: data.map((entry) => [entry[0], Number(entry[4]) * ratio]),
    total_volumes: data.map((entry) => [entry[0], Number(entry[7]) * ratio]),
    market_caps: []
  };
}

function getSecondaryHistoryConfig(range) {
  switch (range) {
    case "1":
      return { interval: "1h", limit: 24 };
    case "7":
      return { interval: "4h", limit: 42 };
    case "30":
      return { interval: "1d", limit: 30 };
    case "90":
      return { interval: "1d", limit: 90 };
    case "365":
      return { interval: "1d", limit: 365 };
    case "max":
      return { interval: "1w", limit: 520 };
    default:
      return { interval: "1d", limit: 90 };
  }
}

async function fetchCandles(timeframe) {
  const config = TIMEFRAME_CONFIG[timeframe];
  const data = await fetchJson(`${CONFIG.endpoints.binance}/klines?symbol=BTCUSDT&interval=${config.interval}&limit=${config.limit}`);
  return data.map((entry) => ({
    time: entry[0],
    open: Number(entry[1]),
    high: Number(entry[2]),
    low: Number(entry[3]),
    close: Number(entry[4]),
    volume: Number(entry[5])
  }));
}

async function fetchFees() {
  return fetchJson(`${CONFIG.endpoints.mempool}/v1/fees/recommended`);
}

async function fetchMempoolSummary() {
  return fetchJson(`${CONFIG.endpoints.mempool}/mempool`);
}

async function fetchBlockHeight() {
  return fetchJson(`${CONFIG.endpoints.mempool}/blocks/tip/height`);
}

async function fetchDifficultyAdjustment() {
  return fetchJson(`${CONFIG.endpoints.mempool}/v1/difficulty-adjustment`);
}

async function fetchHashrate() {
  return fetchJson(`${CONFIG.endpoints.mempool}/v1/mining/hashrate/1m`);
}

async function fetchFearGreed() {
  const data = await fetchJson(`${CONFIG.endpoints.fearGreed}?limit=1`);
  return data?.data?.[0] ?? null;
}

async function fetchMacroSeries(key) {
  const config = MACRO_SERIES[key];
  if (CONFIG.apiKeys.fred) {
    try {
      const params = new URLSearchParams({
        series_id: config.seriesId,
        api_key: CONFIG.apiKeys.fred,
        file_type: "json",
        sort_order: "asc",
        observation_start: getMacroStartDate()
      });
      const data = await fetchJson(`${CONFIG.endpoints.fredApi}?${params.toString()}`);
      const entries = normalizeFredSeries(data?.observations ?? [], config.transform);
      if (entries.length) {
        return { entries, source: "fred-api" };
      }
    } catch {
      // Fall through to public and bundled routes when the official API is unreachable in-browser.
    }
  }

  try {
    const csv = await fetchText(`${CONFIG.endpoints.fredCsv}?id=${config.seriesId}&cosd=${getMacroStartDate()}`);
    const entries = normalizeFredSeries(parseFredCsv(csv), config.transform);
    if (entries.length) {
      return { entries, source: "fred-csv" };
    }
  } catch {
    // Direct browser access to FRED is frequently blocked by hosting/runtime constraints.
  }

  const fallbackSeries = normalizeFredSeries(MACRO_BUNDLED_FALLBACK.series[key] ?? [], config.transform);
  if (fallbackSeries.length) {
    return {
      entries: fallbackSeries,
      source: "bundled-fallback",
      bundleUpdatedAt: MACRO_BUNDLED_FALLBACK.updatedAt
    };
  }

  throw new Error(`Macro series unavailable for ${key}`);
}

function getMacroStartDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 2);
  return date.toISOString().slice(0, 10);
}

function parseFredCsv(csvText) {
  return csvText
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [date, value] = line.split(",");
      return { date, value };
    });
}

function buildMacroMeta(entries) {
  if (!entries.length) {
    return {
      source: "placeholder",
      healthMessage: "Optional / placeholder",
      note: "No macro series could be loaded. The dashboard keeps the module visible, but the browser could not reach the live FRED routes.",
      tag: "Macro placeholders active",
      bundleUpdatedAt: null
    };
  }

  const sources = [...new Set(entries.map((entry) => entry.source))];
  const bundleUpdatedAt = entries.find((entry) => entry.bundleUpdatedAt)?.bundleUpdatedAt ?? null;

  if (sources.length === 1 && sources[0] === "bundled-fallback") {
    return {
      source: "bundled-fallback",
      healthMessage: "Bundled fallback",
      note: `Bundled monthly macro snapshot loaded (${formatDateLabel(bundleUpdatedAt)}). Add CONFIG.apiKeys.fred when you want the direct official FRED route.`,
      tag: `Bundled snapshot ${formatDateLabel(bundleUpdatedAt)}`,
      bundleUpdatedAt
    };
  }

  if (sources.includes("fred-api")) {
    return {
      source: "fred-api",
      healthMessage: sources.includes("bundled-fallback") ? "Mixed / live" : "Live / official",
      note: sources.includes("bundled-fallback")
        ? "Macro feeds loaded through the official FRED API, with the bundled browser-safe snapshot filling any blocked series."
        : "Macro feeds loaded through the official FRED API.",
      tag: sources.includes("bundled-fallback") ? "Official + bundled fallback" : "Official FRED API",
      bundleUpdatedAt
    };
  }

  return {
    source: sources.includes("bundled-fallback") ? "mixed-fallback" : "fred-csv",
    healthMessage: sources.includes("bundled-fallback") ? "Public + bundled" : "Public fallback",
    note: sources.includes("bundled-fallback")
      ? `Public FRED fallback loaded where possible, with a bundled snapshot (${formatDateLabel(bundleUpdatedAt)}) covering blocked series.`
      : "Macro feeds loaded through the public FRED fallback route.",
    tag: sources.includes("bundled-fallback") ? "Public + bundled fallback" : "Public FRED fallback",
    bundleUpdatedAt
  };
}

function normalizeFredSeries(entries, transform) {
  const values = entries
    .map((entry) => ({
      date: entry.date,
      value: Number(entry.value)
    }))
    .filter((entry) => entry.date && Number.isFinite(entry.value));

  if (transform === "yoy") {
    return values
      .map((entry, index) => {
        const previous = values[index - 12];
        if (!previous || previous.value === 0) {
          return null;
        }
        return {
          date: entry.date,
          value: ((entry.value / previous.value) - 1) * 100
        };
      })
      .filter(Boolean);
  }

  return values;
}

function renderModuleVisibility() {
  document.querySelectorAll("[data-module]").forEach((section) => {
    const key = section.dataset.module;
    if (Object.prototype.hasOwnProperty.call(appState.modules, key)) {
      section.classList.toggle("is-hidden", !appState.modules[key]);
    }
  });
}

function renderHero() {
  const market = runtime.data.market;
  const global = runtime.data.global;
  const fear = runtime.data.fearGreed;
  const fees = runtime.data.network.fees;
  const blockHeight = runtime.data.network.blockHeight;
  const stance = deriveMarketStance();
  const scarcity = market?.circulating_supply && market?.max_supply ? (market.circulating_supply / market.max_supply) * 100 : null;

  safeText("hero-price", formatCurrency(market?.current_price, appState.currency, 0));
  safeText("hero-change", formatPercent(market?.price_change_percentage_24h_in_currency), getChangeClass(market?.price_change_percentage_24h_in_currency));
  safeText("hero-marketcap", formatCurrency(market?.market_cap, appState.currency, 0));
  safeText("hero-sats", formatNumber(getSatsPerUnit(appState.currency), 0));
  safeText("hero-ath-distance", formatPercent(market?.ath_change_percentage), getChangeClass(market?.ath_change_percentage));
  safeText("hero-supply", scarcity !== null ? `${scarcity.toFixed(2)}%` : "--");
  safeText("hero-price-note", market?.last_updated ? `Updated ${formatDateTime(market.last_updated)}` : "Awaiting market feed");
  safeText("hero-change-note", stance.label);
  safeText("hero-dominance-note", global?.market_cap_percentage?.btc ? `BTC dominance ${formatPlainPercent(global.market_cap_percentage.btc, 2)}` : "Dominance pending");
  safeText("hero-sats-note", `${appState.currency} scarcity lens`);
  safeText("hero-ath-note", "Distance from current cycle high");
  safeText("hero-supply-note", market?.circulating_supply ? `${formatNumber(market.circulating_supply, 0)} BTC issued` : "Toward 21M cap");

  safeText("overview-regime-pill", `Regime ${stance.label}`, stance.tone);
  safeText("overview-fear-pill", fear ? `${fear.value_classification} ${fear.value}` : "Sentiment --");
  safeText("overview-fee-pill", fees ? `Fees ${fees.fastestFee} sat/vB` : "Fees --");
  safeText("overview-stance-copy", stance.copy);
  safeText("overview-last-block", blockHeight ? `Block ${formatNumber(Number(blockHeight), 0)}` : "--");
  safeText("overview-data-cadence", appState.autoRefresh ? `Auto refresh every ${Math.round(appState.refreshInterval / 1000)}s.` : "Manual refresh only.");
}

function renderMarket() {
  const market = runtime.data.market;
  const global = runtime.data.global;
  const stance = deriveMarketStance();

  safeText("header-price", formatCurrency(market?.current_price, appState.currency, 0));
  safeText("header-change", formatPercent(market?.price_change_percentage_24h_in_currency), getChangeClass(market?.price_change_percentage_24h_in_currency));

  safeText("market-price", formatCurrency(market?.current_price, appState.currency, 0));
  safeText("market-change-24h", formatPercent(market?.price_change_percentage_24h_in_currency), getChangeClass(market?.price_change_percentage_24h_in_currency));
  safeText("market-change-7d", formatPercent(market?.price_change_percentage_7d_in_currency), getChangeClass(market?.price_change_percentage_7d_in_currency));
  safeText("market-change-30d", formatPercent(market?.price_change_percentage_30d_in_currency), getChangeClass(market?.price_change_percentage_30d_in_currency));
  safeText("market-cap", formatCurrency(market?.market_cap, appState.currency, 0));
  safeText("market-volume", formatCurrency(market?.total_volume, appState.currency, 0));
  safeText("market-supply", market?.circulating_supply ? `${formatNumber(market.circulating_supply, 0)} BTC` : "--");
  safeText("market-ath", formatCurrency(market?.ath, appState.currency, 0));
  safeText("market-distance-ath", formatPercent(market?.ath_change_percentage), getChangeClass(market?.ath_change_percentage));
  safeText("market-dominance", global?.market_cap_percentage?.btc ? formatPlainPercent(global.market_cap_percentage.btc, 2) : "--");
  safeText("market-bias", stance.label, stance.tone);

  safeText("market-price-foot", market?.last_updated ? `Updated ${formatDateTime(market.last_updated)}` : "Spot reference");
  safeText("market-change-24h-foot", market ? "Daily momentum" : "Feed pending");
  safeText("market-change-7d-foot", "Weekly impulse");
  safeText("market-change-30d-foot", "Monthly trend");
  safeText("market-cap-foot", "Capitalization");
  safeText("market-volume-foot", "Spot liquidity");
  safeText("market-supply-foot", market?.max_supply ? `Max supply ${formatNumber(market.max_supply, 0)} BTC` : "Coins mined");
  safeText("market-ath-foot", market?.ath_date ? `ATH ${formatDateTime(market.ath_date)}` : "Cycle peak");
  safeText("market-distance-ath-foot", "Current drawdown");
  safeText("market-dominance-foot", global ? "Share of crypto market cap" : "Global market pending");
  safeText("market-bias-foot", stance.copy);
}

function renderOnchain() {
  const { fees, mempool, blockHeight, difficulty, hashrate } = runtime.data.network;
  const market = runtime.data.market;
  const supplyRemaining = market?.max_supply && market?.circulating_supply ? market.max_supply - market.circulating_supply : null;
  const supplyPercent = market?.max_supply && market?.circulating_supply ? (market.circulating_supply / market.max_supply) * 100 : null;
  const halving = deriveHalving(blockHeight);

  safeText("onchain-fee-low", fees ? `${fees.hourFee} sat/vB` : "--");
  safeText("onchain-fee-medium", fees ? `${fees.halfHourFee} sat/vB` : "--");
  safeText("onchain-fee-high", fees ? `${fees.fastestFee} sat/vB` : "--");
  safeText("onchain-block-height", blockHeight ? formatNumber(Number(blockHeight), 0) : "--");
  safeText("onchain-difficulty", hashrate?.currentDifficulty ? formatCompact(hashrate.currentDifficulty, 2) : "--");
  safeText("onchain-difficulty-foot", difficulty ? `Next adj ${formatPercent(difficulty.difficultyChange, 2)} in ${formatNumber(difficulty.remainingBlocks, 0)} blocks` : "Adjustment pending");
  safeText("onchain-hashrate", hashrate?.currentHashrate ? formatHashrate(hashrate.currentHashrate) : "--");
  safeText("onchain-unconfirmed", mempool?.count ? formatCompact(mempool.count, 1) : "--");
  safeText("onchain-next-block", fees ? `${fees.fastestFee} sat/vB` : "--");
  safeText("onchain-subsidy", halving ? `${halving.subsidy.toFixed(3)} BTC / E${halving.epoch}` : "--");
  safeText("onchain-subsidy-foot", halving ? `Next halving at block ${formatNumber(halving.nextHeight, 0)}` : "Post-halving emission");
  safeText("onchain-halving", halving ? `${formatNumber(halving.blocksRemaining, 0)} blocks` : "--");
  safeText("onchain-halving-foot", halving ? `${halving.daysRemaining} days approx.` : "Approximate blocks remaining");
  safeText("onchain-sats", formatNumber(getSatsPerUnit(appState.currency), 0));

  safeText("supply-mined", market?.circulating_supply ? `${formatNumber(market.circulating_supply, 2)} BTC` : "--");
  safeText("supply-remaining", supplyRemaining !== null ? `${formatNumber(supplyRemaining, 2)} BTC` : "--");
  safeText("supply-percent", supplyPercent !== null ? `${supplyPercent.toFixed(3)}%` : "--");
  safeText("supply-caption", supplyPercent !== null ? `${supplyPercent.toFixed(3)}% of the fixed 21M issuance has already been mined.` : "Waiting for supply data.");
  const progress = byId("supply-progress");
  if (progress) {
    progress.style.width = supplyPercent !== null ? `${Math.min(supplyPercent, 100)}%` : "0%";
  }

  renderOnchainChart();
}

function renderSentiment() {
  const fear = runtime.data.fearGreed;
  const tags = deriveSentimentTags();
  const gauge = byId("fear-gauge");
  const value = fear ? Number(fear.value) : null;

  if (gauge && Number.isFinite(value)) {
    gauge.style.setProperty("--gauge-angle", `${Math.max(10, Math.min(360, value * 3.6))}deg`);
  }

  safeText("fear-value", Number.isFinite(value) ? String(value) : "--");
  safeText("fear-classification", fear?.value_classification ?? "Awaiting feed");
  safeText("fear-foot", fear?.timestamp ? `Updated ${formatDateTime(Number(fear.timestamp) * 1000)}` : "Visible rules drive the regime panel and alert console.");
  safeText("overview-fear-pill", fear ? `${fear.value_classification} ${fear.value}` : "Sentiment --");

  const tagMarkup = tags.map((tag) => `<span class="tag ${tag.className}">${tag.label}</span>`).join("");
  safeHtml("sentiment-tags", tagMarkup || '<span class="tag">sentiment pending</span>');
  safeText("sentiment-summary", deriveSentimentSummary(tags));
  safeText("positioning-funding", "Optional API slot");
  safeText("positioning-options", "Optional API slot");
  safeText("positioning-basis", "Optional API slot");
  safeText("positioning-copy", "Static hosting keeps this module safe by default; keys remain optional.");
}

function renderPortfolio() {
  const market = runtime.data.market;
  const baseCurrency = appState.portfolio.baseCurrency;
  const livePrice = getBtcFxPrice(baseCurrency) ?? convertValue(market?.current_price ?? 0, appState.currency, baseCurrency);
  const held = appState.portfolio.btcHeld;
  const avg = appState.portfolio.avgPrice;
  const cash = appState.portfolio.cash;
  const targetBtc = appState.portfolio.targetBtc;
  const targetSell = appState.portfolio.targetSell;
  const costBasis = held * avg;
  const currentValue = held * (livePrice || 0);
  const unrealized = currentValue - costBasis;
  const unrealizedPct = costBasis ? (unrealized / costBasis) * 100 : 0;
  const breakEvenDistance = livePrice ? ((livePrice / Math.max(avg, 1)) - 1) * 100 : 0;
  const athBase = market?.ath ? convertValue(market.ath, appState.currency, baseCurrency) : 0;
  const valueAtAth = held * athBase;
  const satsHeld = held * 100000000;
  const targetGap = Math.max(targetBtc - held, 0);
  const shareOfSupply = held / 21000000 * 100;
  const acquiredWithCash = livePrice ? cash / livePrice : 0;
  const newHeld = held + acquiredWithCash;
  const newAvg = newHeld > 0 ? (costBasis + cash) / newHeld : 0;
  const conservative = held * convertUsdTargetToCurrency(100000, baseCurrency);
  const baseCase = held * convertUsdTargetToCurrency(150000, baseCurrency);
  const aggressive = held * convertUsdTargetToCurrency(250000, baseCurrency);

  safeText("portfolio-current-value", formatCurrency(currentValue, baseCurrency, 0));
  safeText("portfolio-unrealized-pl", formatCurrency(unrealized, baseCurrency, 0), getChangeClass(unrealized));
  safeText("portfolio-unrealized-pl-foot", costBasis ? `Cost basis ${formatCurrency(costBasis, baseCurrency, 0)}` : "Absolute change");
  safeText("portfolio-unrealized-pl-percent", formatPercent(unrealizedPct), getChangeClass(unrealizedPct));
  safeText("portfolio-break-even", formatCurrency(avg, baseCurrency, 0));
  safeText("portfolio-break-even-foot", `${formatPercent(breakEvenDistance)} versus live mark`);
  safeText("portfolio-value-ath", formatCurrency(valueAtAth, baseCurrency, 0));
  safeText("portfolio-sats-held", formatNumber(satsHeld, 0));
  safeText("portfolio-supply-share", `${shareOfSupply.toExponential(2)}%`);
  safeText("portfolio-target-gap", `${formatNumber(targetGap, 8)} BTC`);

  safeText("scenario-150k", formatCurrency(held * convertUsdTargetToCurrency(150000, baseCurrency), baseCurrency, 0));
  safeText("scenario-250k", formatCurrency(held * convertUsdTargetToCurrency(250000, baseCurrency), baseCurrency, 0));
  safeText("scenario-500k", formatCurrency(held * convertUsdTargetToCurrency(500000, baseCurrency), baseCurrency, 0));
  safeText("scenario-1m", formatCurrency(held * convertUsdTargetToCurrency(1000000, baseCurrency), baseCurrency, 0));

  safeText("portfolio-case-conservative", formatCurrency(conservative, baseCurrency, 0));
  safeText("portfolio-case-base", formatCurrency(baseCase, baseCurrency, 0));
  safeText("portfolio-case-aggressive", formatCurrency(aggressive, baseCurrency, 0));
  safeText("portfolio-dca-summary", livePrice ? `${formatCurrency(cash, baseCurrency, 0)} deployed now adds ${formatNumber(acquiredWithCash, 8)} BTC and moves the blended cost basis to ${formatCurrency(newAvg, baseCurrency, 0)}.` : "Waiting for live price to compute a blended cost basis.");
  safeText("portfolio-interpretation", derivePortfolioInterpretation({ livePrice, unrealizedPct, targetGap, targetSell, baseCurrency }));
}

function renderAlerts() {
  const alerts = deriveAlerts();
  const alertMarkup = alerts.map((alert) => `
    <li class="alert-item ${alert.tone}">
      <div>
        <strong>${alert.title}</strong>
        <p>${alert.copy}</p>
      </div>
      <span class="severity-pill ${alert.severityClass}">${alert.severity}</span>
    </li>
  `).join("");
  safeHtml("alerts-list", alertMarkup);

  const stance = deriveMarketStance();
  const fees = runtime.data.network.fees;
  const macroState = Object.keys(runtime.data.macro).length ? "Available" : "Placeholder";
  const portfolioState = runtime.data.market ? derivePortfolioBadge() : "Standby";
  safeHtml("signal-matrix", `
    <div class="signal-box"><span>Market regime</span><strong>${stance.label}</strong></div>
    <div class="signal-box"><span>Network stress</span><strong>${fees ? `${fees.fastestFee} sat/vB` : "--"}</strong></div>
    <div class="signal-box"><span>Portfolio state</span><strong>${portfolioState}</strong></div>
    <div class="signal-box"><span>Macro state</span><strong>${macroState}</strong></div>
  `);
}

function renderHealthPanel() {
  const items = [
    ["CoinGecko", runtime.health.coingecko],
    ["Binance", runtime.health.binance],
    ["mempool.space", runtime.health.mempool],
    ["Alternative.me", runtime.health.fearGreed],
    ["FRED", runtime.health.fred]
  ];
  const markup = items.map(([label, health]) => `<li><span>${label}</span><strong>${health.message}</strong></li>`).join("");
  safeHtml("data-health-list", markup);
}

function renderMacro() {
  const tags = [];
  const macroMeta = runtime.data.macroMeta;
  Object.keys(MACRO_SERIES).forEach((key) => {
    const series = runtime.data.macro[key];
    const config = MACRO_SERIES[key];
    const enabled = Boolean(appState.macroEnabled[key]);
    const last = series?.[series.length - 1]?.value;
    const previous = series?.[series.length - 2]?.value;
    const delta = Number.isFinite(last) && Number.isFinite(previous) ? last - previous : null;
    const unit = config.unit || "";
    const valueText = Number.isFinite(last) ? `${formatNumber(last, 2)}${unit}` : enabled ? "Feed pending" : "Disabled";

    safeText(`macro-${key}`, valueText, Number.isFinite(delta) ? getChangeClass(delta) : "");
    safeText(`macro-${key}-foot`, Number.isFinite(delta) ? `${config.changeLabel} ${formatPercent(delta, 2)}` : enabled ? "Loading / optional feed" : "Disabled");
    document.querySelector(`[data-series-card="${key}"]`)?.classList.toggle("is-disabled", !enabled);

    if (Number.isFinite(last)) {
      if (key === "dgs10" || key === "fedfunds") {
        tags.push(`<span class="tag">${config.label} ${last.toFixed(2)}%</span>`);
      }
      if (key === "cpi") {
        tags.push(`<span class="tag ${last > 3 ? "is-hot" : "is-cold"}">Inflation ${last.toFixed(1)}%</span>`);
      }
      if (key === "dxy") {
        tags.push(`<span class="tag ${last > 120 ? "is-hot" : "is-cold"}">Dollar ${last.toFixed(1)}</span>`);
      }
    }
  });

  if (macroMeta?.tag) {
    tags.unshift(`<span class="tag">${macroMeta.tag}</span>`);
  }

  safeHtml("macro-tags", tags.join("") || '<span class="tag">Macro placeholders active</span>');
  safeText("macro-note", macroMeta.note);
  renderMacroChart();
}

function deriveMarketStance() {
  const market = runtime.data.market;
  const fear = runtime.data.fearGreed;
  const fees = runtime.data.network.fees;
  let score = 0;

  if (market?.price_change_percentage_7d_in_currency > 0) score += 1;
  if (market?.price_change_percentage_30d_in_currency > 0) score += 1;
  if ((market?.ath_change_percentage ?? -100) > -25) score += 1;
  if ((fear ? Number(fear.value) : 50) > 55) score += 0.5;
  if ((fear ? Number(fear.value) : 50) < 25) score -= 0.5;
  if ((fees?.fastestFee ?? 0) > 20) score -= 0.5;

  if (score >= 2.5) {
    return { label: "Bullish", tone: "positive", copy: "Momentum, breadth and proximity to highs align positively." };
  }
  if (score <= 0.5) {
    return { label: "Bearish", tone: "negative", copy: "Momentum and/or network pressure keep the risk profile defensive." };
  }
  return { label: "Neutral", tone: "", copy: "Signals are mixed; trend persistence exists but needs confirmation." };
}

function deriveSentimentTags() {
  const tags = [];
  const market = runtime.data.market;
  const fearValue = runtime.data.fearGreed ? Number(runtime.data.fearGreed.value) : null;
  const fees = runtime.data.network.fees;

  if ((market?.price_change_percentage_7d_in_currency ?? 0) > 0 && (fearValue ?? 50) > 55) {
    tags.push({ label: "risk-on", className: "" });
  }
  if ((market?.price_change_percentage_7d_in_currency ?? 0) < 0 || (fearValue ?? 50) < 35) {
    tags.push({ label: "risk-off", className: "is-cold" });
  }
  if ((fearValue ?? 0) >= 75 && (market?.ath_change_percentage ?? -100) > -12) {
    tags.push({ label: "overheated", className: "is-hot" });
  }
  if ((fearValue ?? 100) <= 35 && (market?.price_change_percentage_30d_in_currency ?? 0) > -10) {
    tags.push({ label: "accumulation", className: "" });
  }
  if ((fearValue ?? 100) < 20 || (fees?.fastestFee ?? 0) > 30) {
    tags.push({ label: "panic", className: "is-hot" });
  }

  return tags;
}

function deriveSentimentSummary(tags) {
  if (!tags.length) {
    return "Sentiment inputs are mixed or still loading.";
  }
  return `Active regime tags: ${tags.map((tag) => tag.label).join(", ")}. Rules are visible in script.js and computed fully client-side.`;
}

function derivePortfolioInterpretation({ livePrice, unrealizedPct, targetGap, targetSell, baseCurrency }) {
  if (!livePrice) {
    return "Waiting for live pricing data.";
  }
  const upsideToTarget = ((targetSell / Math.max(livePrice, 1)) - 1) * 100;
  if (unrealizedPct > 35 && upsideToTarget < 40) {
    return `The position is materially in profit in ${baseCurrency}; trimming or systematic de-risking can be evaluated if ${formatPercent(upsideToTarget)} upside feels thin.`;
  }
  if (unrealizedPct < 0 && targetGap > 0) {
    return "The current mark is below cost while the allocation target is still open. DCA discipline matters more than precision.";
  }
  return "Exposure is balanced relative to the current market. Focus on execution discipline, target sizing and tax-aware exits.";
}

function derivePortfolioBadge() {
  const market = runtime.data.market;
  if (!market) {
    return "Standby";
  }
  const livePrice = getBtcFxPrice(appState.portfolio.baseCurrency) ?? market.current_price;
  const pnl = ((livePrice / Math.max(appState.portfolio.avgPrice, 1)) - 1) * 100;
  if (pnl > 20) return "In profit";
  if (pnl < -10) return "Underwater";
  return "Near basis";
}

function deriveAlerts() {
  const alerts = [];
  const market = runtime.data.market;
  const fear = runtime.data.fearGreed;
  const fees = runtime.data.network.fees;
  const halving = deriveHalving(runtime.data.network.blockHeight);
  const stance = deriveMarketStance();

  alerts.push({
    title: `Market regime: ${stance.label}`,
    copy: stance.copy,
    tone: stance.tone === "positive" ? "bullish" : stance.tone === "negative" ? "bearish" : "neutral",
    severity: "MODEL",
    severityClass: stance.tone === "positive" ? "low" : stance.tone === "negative" ? "high" : ""
  });

  if ((market?.price_change_percentage_24h_in_currency ?? 0) > 4) {
    alerts.push({
      title: "Momentum expansion",
      copy: `BTC is up ${formatPercent(market.price_change_percentage_24h_in_currency)} over 24H. Short-term volatility is likely elevated.`,
      tone: "bullish",
      severity: "WATCH",
      severityClass: "low"
    });
  }

  if ((market?.ath_change_percentage ?? -100) > -10) {
    alerts.push({
      title: "Near all-time high zone",
      copy: "Price is trading within 10% of the cycle ATH. Breakout and rejection risk both increase in this area.",
      tone: "neutral",
      severity: "LEVEL",
      severityClass: ""
    });
  }

  if ((fear ? Number(fear.value) : 50) < 25) {
    alerts.push({
      title: "Sentiment under pressure",
      copy: `Fear & Greed prints ${fear.value}, which historically aligns with stress, forced selling or deeper accumulation windows.`,
      tone: "bearish",
      severity: "RISK",
      severityClass: "high"
    });
  }

  if ((fees?.fastestFee ?? 0) > 20) {
    alerts.push({
      title: "Fee pressure elevated",
      copy: `Priority fees at ${fees.fastestFee} sat/vB suggest hotter block space demand and potentially noisier on-chain conditions.`,
      tone: "neutral",
      severity: "CHAIN",
      severityClass: ""
    });
  }

  if (halving && halving.blocksRemaining < 25000) {
    alerts.push({
      title: "Halving window compression",
      copy: `${formatNumber(halving.blocksRemaining, 0)} blocks remain until the next subsidy cut.`,
      tone: "bullish",
      severity: "CYCLE",
      severityClass: "low"
    });
  }

  if (!runtime.data.market) {
    alerts.push({
      title: "Core market feed missing",
      copy: "The dashboard keeps rendering, but market cards and portfolio math are degraded until CoinGecko responds.",
      tone: "bearish",
      severity: "DATA",
      severityClass: "high"
    });
  }

  return alerts;
}

function deriveHalving(blockHeight) {
  if (!Number.isFinite(Number(blockHeight))) {
    return null;
  }
  const height = Number(blockHeight);
  const epoch = Math.floor(height / 210000);
  const nextHeight = (epoch + 1) * 210000;
  const blocksRemaining = Math.max(nextHeight - height, 0);
  const subsidy = 50 / (2 ** epoch);
  return {
    epoch,
    nextHeight,
    blocksRemaining,
    subsidy,
    daysRemaining: Math.round((blocksRemaining * 10) / 60 / 24)
  };
}

function getSatsPerUnit(currency) {
  const price = getBtcFxPrice(currency) ?? runtime.data.market?.current_price;
  if (!price) {
    return null;
  }
  return 100000000 / price;
}

function convertUsdTargetToCurrency(usdTarget, currency) {
  return convertValue(usdTarget, "USD", currency);
}

function initCharts() {
  if (!window.echarts) {
    [
      "primary-chart-status",
      "performance-chart-status",
      "drawdown-chart-status",
      "volume-chart-status",
      "trend-chart-status",
      "onchain-chart-status",
      "macro-chart-status"
    ].forEach((id) => setStatusOverlay(id, "Apache ECharts failed to load from CDN.", "error"));
    return;
  }

  [
    ["primary", "primary-chart"],
    ["performance", "performance-chart"],
    ["drawdown", "drawdown-chart"],
    ["volume", "volume-chart"],
    ["trend", "trend-chart"],
    ["onchain", "onchain-chart"],
    ["macro", "macro-chart"]
  ].forEach(([key, id]) => {
    const node = byId(id);
    if (node) {
      runtime.charts[key] = echarts.init(node, null, { renderer: "canvas" });
    }
  });
}

function resizeCharts() {
  Object.values(runtime.charts).forEach((chart) => chart?.resize());
}

function getPrimaryChartStage() {
  return byId("primary-chart-stage");
}

function isPrimaryChartFullscreenActive() {
  const stage = getPrimaryChartStage();
  return Boolean(stage) && (document.fullscreenElement === stage || stage.classList.contains("is-expanded-fallback"));
}

function syncPrimaryChartFullscreenState() {
  const stage = getPrimaryChartStage();
  const button = byId("primary-chart-fullscreen");
  if (!stage || !button) {
    return;
  }

  const isActive = document.fullscreenElement === stage || stage.classList.contains("is-expanded-fallback");
  stage.classList.toggle("is-fullscreen-active", isActive);
  document.body.classList.toggle("has-primary-chart-focus", isActive);
  button.textContent = isActive ? "Exit expanded view" : "Expand chart";
  button.setAttribute("aria-pressed", String(isActive));
  window.setTimeout(resizeCharts, 90);
}

function setPrimaryChartFallbackState(expanded) {
  const stage = getPrimaryChartStage();
  if (!stage) {
    return;
  }
  stage.classList.toggle("is-expanded-fallback", expanded);
  syncPrimaryChartFullscreenState();
}

async function togglePrimaryChartFullscreen() {
  const stage = getPrimaryChartStage();
  if (!stage) {
    return;
  }

  if (document.fullscreenElement === stage) {
    await document.exitFullscreen();
    return;
  }

  if (stage.classList.contains("is-expanded-fallback")) {
    setPrimaryChartFallbackState(false);
    return;
  }

  if (typeof stage.requestFullscreen === "function") {
    try {
      await stage.requestFullscreen();
      return;
    } catch {
      // Some browsers block fullscreen in static contexts; use an in-page expansion fallback instead.
    }
  }

  setPrimaryChartFallbackState(true);
}

function renderCandles() {
  const chart = runtime.charts.primary;
  const candles = runtime.data.candles;
  if (!chart || !candles?.length) {
    return;
  }

  const ratio = getSelectedFxRatio();
  const converted = candles.map((candle) => ({
    time: candle.time,
    open: candle.open * ratio,
    high: candle.high * ratio,
    low: candle.low * ratio,
    close: candle.close * ratio,
    volume: candle.volume
  }));

  const closes = converted.map((candle) => candle.close);
  const volumes = converted.map((candle) => candle.volume);
  const categories = converted.map((candle) => formatAxisLabel(candle.time, appState.timeframe));
  const overlays = buildOverlaySeries(closes, volumes);
  const layout = buildPrimaryLayout(categories);
  const volumeSeries = converted.map((candle) => ({
    value: candle.volume,
    itemStyle: {
      color: candle.close >= candle.open ? "#22c55e" : "#ef4444"
    }
  }));

  const series = [
    {
      name: "BTC",
      type: "candlestick",
      data: converted.map((candle) => [candle.open, candle.close, candle.low, candle.high]),
      barMaxWidth: 18,
      itemStyle: {
        color: "#22c55e",
        color0: "#ef4444",
        borderColor: "#22c55e",
        borderColor0: "#ef4444"
      },
      xAxisIndex: 0,
      yAxisIndex: 0
    }
  ];

  Object.entries(overlays).forEach(([key, values]) => {
    if (!appState.overlays[key]) {
      return;
    }
    series.push({
      name: key.toUpperCase(),
      type: "line",
      data: values,
      xAxisIndex: 0,
      yAxisIndex: 0,
      showSymbol: false,
      smooth: false,
      lineStyle: { width: 1.25, color: overlayColor(key), opacity: 0.82 }
    });
  });

  if (appState.panels.volume) {
    series.push({
      name: "Volume",
      type: "bar",
      data: volumeSeries,
      barMaxWidth: 14,
      xAxisIndex: layout.panelIndexes.volume,
      yAxisIndex: layout.panelIndexes.volume
    });
  }

  if (appState.panels.rsi) {
    series.push({
      name: "RSI",
      type: "line",
      data: calculateRsi(closes, 14),
      xAxisIndex: layout.panelIndexes.rsi,
      yAxisIndex: layout.panelIndexes.rsi,
      showSymbol: false,
      smooth: false,
      lineStyle: { color: "#d6b26e", width: 1.35 }
    });
  }

  if (appState.panels.macd) {
    const macd = calculateMacd(closes);
    series.push({
      name: "MACD Hist",
      type: "bar",
      data: macd.histogram.map((value) => ({
        value,
        itemStyle: { color: value >= 0 ? "rgba(34,197,94,0.65)" : "rgba(239,68,68,0.65)" }
      })),
      xAxisIndex: layout.panelIndexes.macd,
      yAxisIndex: layout.panelIndexes.macd
    });
    series.push({
      name: "MACD",
      type: "line",
      data: macd.macd,
      xAxisIndex: layout.panelIndexes.macd,
      yAxisIndex: layout.panelIndexes.macd,
      showSymbol: false,
      lineStyle: { color: "#5dd1ff", width: 1.3 }
    });
    series.push({
      name: "Signal",
      type: "line",
      data: macd.signal,
      xAxisIndex: layout.panelIndexes.macd,
      yAxisIndex: layout.panelIndexes.macd,
      showSymbol: false,
      lineStyle: { color: "#d6b26e", width: 1.3 }
    });
  }

  chart.setOption({
    animation: false,
    backgroundColor: "transparent",
    grid: layout.grids,
    xAxis: layout.xAxes,
    yAxis: layout.yAxes,
    dataZoom: [
      { type: "inside", xAxisIndex: layout.allXAxisIndexes },
      {
        type: "slider",
        xAxisIndex: layout.allXAxisIndexes,
        height: 14,
        bottom: 6,
        borderColor: "rgba(255,255,255,0.04)",
        backgroundColor: "rgba(255,255,255,0.015)",
        fillerColor: "rgba(93,209,255,0.12)",
        handleSize: "90%",
        showDetail: false,
        dataBackground: {
          lineStyle: { color: "rgba(148,164,180,0.22)" },
          areaStyle: { color: "rgba(148,164,180,0.05)" }
        },
        handleStyle: {
          color: "rgba(93,209,255,0.55)",
          borderColor: "rgba(93,209,255,0.22)"
        },
        moveHandleStyle: { color: "rgba(93,209,255,0.4)" }
      }
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        snap: true,
        lineStyle: { color: "rgba(148,164,180,0.26)", width: 1 }
      },
      backgroundColor: "rgba(7,9,13,0.96)",
      borderColor: "rgba(184,202,219,0.18)",
      textStyle: { color: "#eef2f6" }
    },
    series
  }, true);

  setStatusOverlay("primary-chart-status", "", "", false);
  safeText("chart-currency-pill", `Chart currency ${appState.currency}`);
  safeText("chart-caption", `Binance BTCUSDT candles converted to ${appState.currency} using CoinGecko FX parity.`);
  const last = converted[converted.length - 1];
  safeText("chart-last-close", formatCurrency(last?.close, appState.currency, 0));
  safeText("chart-last-close-foot", TIMEFRAME_CONFIG[appState.timeframe].label);
  safeText("chart-session-range", `${formatCurrency(last?.high, appState.currency, 0)} / ${formatCurrency(last?.low, appState.currency, 0)}`);
  safeText("chart-session-range-foot", "High / low");
  safeText("chart-volume", formatCompact(last?.volume, 2));
  safeText("chart-volume-foot", "BTC volume");
  safeText("chart-overlays-active", Object.keys(appState.overlays).filter((key) => appState.overlays[key]).map((key) => key.toUpperCase()).join(", ") || "None");
  safeText("chart-panels-active", `Panels ${Object.keys(appState.panels).filter((key) => appState.panels[key]).join(", ") || "none"}`);
}

function renderHistoryCharts() {
  const history = runtime.data.history;
  if (!history?.prices?.length) {
    return;
  }

  const priceSeries = history.prices.map(([time, value]) => [time, value]);
  const volumeSeries = history.total_volumes.map(([time, value]) => [time, value]);
  const drawdownSeries = buildDrawdownSeries(priceSeries);
  const trendSeries = buildTrendSeries(priceSeries);

  renderLineChart(runtime.charts.performance, {
    title: "Performance",
    series: [{
      name: "BTC",
      type: "line",
      smooth: true,
      showSymbol: false,
      areaStyle: { color: "rgba(93,209,255,0.12)" },
      lineStyle: { color: "#5dd1ff", width: 2 },
      data: normalizeSeries(priceSeries)
    }]
  });

  renderLineChart(runtime.charts.drawdown, {
    title: "Drawdown",
    series: [{
      name: "Drawdown",
      type: "line",
      smooth: true,
      showSymbol: false,
      areaStyle: { color: "rgba(239,68,68,0.14)" },
      lineStyle: { color: "#ef4444", width: 2 },
      data: drawdownSeries
    }],
    yAxisFormatter: (value) => `${value.toFixed(0)}%`
  });

  renderLineChart(runtime.charts.volume, {
    title: "Volume",
    series: [{
      name: "Volume",
      type: "bar",
      itemStyle: { color: "rgba(214,178,110,0.72)" },
      data: volumeSeries
    }],
    yAxisFormatter: (value) => formatCompact(value, 1)
  });

  renderLineChart(runtime.charts.trend, {
    title: "Trend",
    legend: ["Volatility", "Trend spread"],
    series: [
      {
        name: "Volatility",
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: { color: "#d6b26e", width: 1.8 },
        data: trendSeries.volatility
      },
      {
        name: "Trend spread",
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: { color: "#22c55e", width: 1.8 },
        data: trendSeries.spread
      }
    ],
    yAxisFormatter: (value) => `${value.toFixed(1)}%`
  });

  setStatusOverlay("performance-chart-status", "", "", false);
  setStatusOverlay("drawdown-chart-status", "", "", false);
  setStatusOverlay("volume-chart-status", "", "", false);
  setStatusOverlay("trend-chart-status", "", "", false);
}

function renderOnchainChart() {
  const chart = runtime.charts.onchain;
  const data = runtime.data.network.hashrate?.hashrates;
  if (!chart || !data?.length) {
    if (chart) {
      setStatusOverlay("onchain-chart-status", "Hashrate feed unavailable.", "warning");
    }
    return;
  }

  renderLineChart(chart, {
    title: "Hashrate",
    series: [{
      name: "Hashrate",
      type: "line",
      smooth: true,
      showSymbol: false,
      lineStyle: { color: "#22c55e", width: 2 },
      areaStyle: { color: "rgba(34,197,94,0.10)" },
      data: data.map((point) => [point.timestamp * 1000, point.avgHashrate / 1e18])
    }],
    yAxisFormatter: (value) => `${value.toFixed(0)} EH/s`
  });
  setStatusOverlay("onchain-chart-status", "", "", false);
}

function renderMacroChart() {
  const chart = runtime.charts.macro;
  if (!chart) {
    return;
  }

  const macroSeries = Object.entries(runtime.data.macro);
  if (!macroSeries.length) {
    chart.clear();
    setStatusOverlay("macro-chart-status", "Macro feeds unavailable. Configure CONFIG.apiKeys.fred or rely on the CSV fallback.", "warning");
    return;
  }

  const series = [];
  const colors = ["#5dd1ff", "#d6b26e", "#22c55e", "#ef4444", "#8898aa", "#b48df7"];

  if (runtime.data.macroBenchmark?.prices?.length) {
    series.push({
      name: "BTC",
      type: "line",
      smooth: true,
      showSymbol: false,
      lineStyle: { color: "#5dd1ff", width: 2.2 },
      data: normalizeSeries(runtime.data.macroBenchmark.prices)
    });
  }

  macroSeries.forEach(([key, values], index) => {
    series.push({
      name: MACRO_SERIES[key].label,
      type: "line",
      smooth: true,
      showSymbol: false,
      lineStyle: { color: colors[(index + 1) % colors.length], width: 1.5 },
      data: normalizeSeries(values.map((entry) => [new Date(entry.date).getTime(), entry.value]))
    });
  });

  renderLineChart(chart, {
    title: "Macro",
    legend: series.map((item) => item.name),
    series,
    yAxisFormatter: (value) => `${value.toFixed(0)}`
  });
  setStatusOverlay("macro-chart-status", "", "", false);
}

function renderLineChart(chart, { title, series, yAxisFormatter }) {
  if (!chart) {
    return;
  }
  chart.setOption({
    animation: false,
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      backgroundColor: "rgba(7,9,13,0.96)",
      borderColor: "rgba(184,202,219,0.18)",
      textStyle: { color: "#eef2f6" }
    },
    legend: {
      top: 8,
      textStyle: { color: "#94a4b4" }
    },
    grid: { left: 54, right: 18, top: 52, bottom: 34 },
    xAxis: {
      type: "time",
      axisLine: { lineStyle: { color: "rgba(184,202,219,0.16)" } },
      axisLabel: { color: "#94a4b4" },
      splitLine: { show: false }
    },
    yAxis: {
      type: "value",
      scale: true,
      axisLine: { lineStyle: { color: "rgba(184,202,219,0.16)" } },
      axisLabel: {
        color: "#94a4b4",
        formatter: yAxisFormatter || ((value) => formatCompact(value, 1))
      },
      splitLine: { lineStyle: { color: "rgba(184,202,219,0.08)" } }
    },
    series
  }, true);
}

function buildPrimaryLayout(categories) {
  const grids = [];
  const xAxes = [];
  const yAxes = [];
  const panelIndexes = {};
  const extras = [];
  const chartGrid = { left: 18, right: 82 };
  if (appState.panels.volume) extras.push("volume");
  if (appState.panels.rsi) extras.push("rsi");
  if (appState.panels.macd) extras.push("macd");

  const gap = 2.5;
  const extraHeight = extras.length === 0 ? 0 : extras.length === 1 ? 16 : extras.length === 2 ? 12 : 10;
  const mainHeight = extras.length === 0 ? 90 : extras.length === 1 ? 70 : extras.length === 2 ? 60 : 52;
  let currentTop = 4;
  const allXAxisIndexes = [0];

  grids.push({ ...chartGrid, top: `${currentTop}%`, height: `${mainHeight}%` });
  xAxes.push(buildCategoryAxis(categories, extras.length === 0, 0));
  yAxes.push(buildValueAxis((value) => formatPrimaryAxisLabel(value), {
    gridIndex: 0,
    labelWidth: 68,
    splitNumber: 5
  }));
  currentTop += mainHeight + gap;

  extras.forEach((panel, index) => {
    const gridIndex = index + 1;
    grids.push({ ...chartGrid, top: `${currentTop}%`, height: `${extraHeight}%` });
    xAxes.push(buildCategoryAxis(categories, index === extras.length - 1, gridIndex));
    yAxes.push(buildPrimaryPanelAxis(panel, gridIndex));
    panelIndexes[panel] = gridIndex;
    allXAxisIndexes.push(gridIndex);
    currentTop += extraHeight + gap;
  });

  return { grids, xAxes, yAxes, panelIndexes, allXAxisIndexes };
}

function buildPrimaryPanelAxis(panel, gridIndex) {
  if (panel === "rsi") {
    return buildValueAxis((value) => formatNumber(value, 0), {
      gridIndex,
      labelWidth: 34,
      min: 0,
      max: 100,
      splitNumber: 3
    });
  }

  if (panel === "macd") {
    return buildValueAxis((value) => formatCompact(value, 2), {
      gridIndex,
      labelWidth: 48,
      splitNumber: 3
    });
  }

  return buildValueAxis((value) => formatCompact(value, 1), {
    gridIndex,
    labelWidth: 52,
    splitNumber: 2
  });
}

function buildCategoryAxis(categories, showLabels, gridIndex) {
  return {
    type: "category",
    gridIndex,
    data: categories,
    boundaryGap: true,
    axisLine: { lineStyle: { color: "rgba(184,202,219,0.12)" } },
    axisTick: { show: false },
    axisLabel: {
      show: showLabels,
      color: "#7f90a2",
      hideOverlap: true,
      margin: 10,
      fontSize: 11
    },
    splitLine: { show: false }
  };
}

function buildValueAxis(formatter, options = {}) {
  const labelWidth = options.labelWidth ?? 58;
  return {
    type: "value",
    scale: true,
    position: "right",
    gridIndex: options.gridIndex ?? 0,
    min: options.min,
    max: options.max,
    splitNumber: options.splitNumber ?? 4,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: "#7f90a2",
      formatter,
      width: labelWidth,
      overflow: "truncate",
      margin: 10,
      fontSize: 11
    },
    splitLine: {
      lineStyle: {
        color: "rgba(184,202,219,0.06)",
        type: "dashed"
      }
    }
  };
}

function formatPrimaryAxisLabel(value) {
  if (!Number.isFinite(value)) {
    return "";
  }
  if (Math.abs(value) >= 1000) {
    return formatNumber(value, 0);
  }
  if (Math.abs(value) >= 100) {
    return formatNumber(value, 1);
  }
  return formatNumber(value, 2);
}

function buildOverlaySeries(closes, volumes) {
  return {
    sma20: calculateSma(closes, 20),
    sma50: calculateSma(closes, 50),
    sma200: calculateSma(closes, 200),
    ema21: calculateEma(closes, 21),
    vwap: calculateVwap(closes, volumes)
  };
}

function calculateSma(values, period) {
  return values.map((_, index) => {
    if (index + 1 < period) {
      return null;
    }
    const slice = values.slice(index + 1 - period, index + 1);
    return slice.reduce((sum, value) => sum + value, 0) / period;
  });
}

function calculateEma(values, period) {
  const multiplier = 2 / (period + 1);
  let previous = null;
  return values.map((value, index) => {
    if (index === 0) {
      previous = value;
      return value;
    }
    previous = ((value - previous) * multiplier) + previous;
    return previous;
  });
}

function calculateVwap(closes, volumes) {
  let cumulativePriceVolume = 0;
  let cumulativeVolume = 0;
  return closes.map((close, index) => {
    cumulativePriceVolume += close * (volumes[index] || 0);
    cumulativeVolume += volumes[index] || 0;
    return cumulativeVolume ? cumulativePriceVolume / cumulativeVolume : null;
  });
}

function calculateRsi(values, period = 14) {
  if (values.length <= period) {
    return new Array(values.length).fill(null);
  }
  const output = new Array(values.length).fill(null);
  let gains = 0;
  let losses = 0;

  for (let index = 1; index <= period; index += 1) {
    const delta = values[index] - values[index - 1];
    if (delta >= 0) gains += delta;
    if (delta < 0) losses -= delta;
  }

  let averageGain = gains / period;
  let averageLoss = losses / period;
  output[period] = averageLoss === 0 ? 100 : 100 - (100 / (1 + (averageGain / averageLoss)));

  for (let index = period + 1; index < values.length; index += 1) {
    const delta = values[index] - values[index - 1];
    averageGain = ((averageGain * (period - 1)) + Math.max(delta, 0)) / period;
    averageLoss = ((averageLoss * (period - 1)) + Math.max(-delta, 0)) / period;
    output[index] = averageLoss === 0 ? 100 : 100 - (100 / (1 + (averageGain / averageLoss)));
  }

  return output;
}

function calculateMacd(values) {
  const ema12 = calculateEma(values, 12);
  const ema26 = calculateEma(values, 26);
  const macd = values.map((_, index) => ema12[index] - ema26[index]);
  const signal = calculateEma(macd.map((value) => value ?? 0), 9);
  const histogram = macd.map((value, index) => value - signal[index]);
  return { macd, signal, histogram };
}

function buildDrawdownSeries(priceSeries) {
  let peak = -Infinity;
  return priceSeries.map(([time, value]) => {
    peak = Math.max(peak, value);
    const drawdown = peak > 0 ? ((value / peak) - 1) * 100 : 0;
    return [time, drawdown];
  });
}

function buildTrendSeries(priceSeries) {
  const values = priceSeries.map((entry) => entry[1]);
  const sma = calculateSma(values, Math.min(20, Math.max(5, Math.floor(values.length / 5))));
  const returns = [];
  for (let index = 1; index < values.length; index += 1) {
    returns.push(Math.log(values[index] / values[index - 1]));
  }

  const windowSize = Math.min(20, Math.max(5, Math.floor(values.length / 8)));
  const volatility = priceSeries.map(([time], index) => {
    if (index < windowSize) {
      return [time, null];
    }
    const slice = returns.slice(index - windowSize, index);
    const mean = slice.reduce((sum, value) => sum + value, 0) / slice.length;
    const variance = slice.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / slice.length;
    return [time, Math.sqrt(variance) * Math.sqrt(365) * 100];
  });

  const spread = priceSeries.map(([time, value], index) => {
    const baseline = sma[index];
    return [time, baseline ? ((value / baseline) - 1) * 100 : null];
  });

  return { volatility, spread };
}

function normalizeSeries(series) {
  const first = series.find((entry) => Number.isFinite(entry[1]));
  if (!first) {
    return series;
  }
  return series.map(([time, value]) => [time, (value / first[1]) * 100]);
}

function overlayColor(key) {
  return {
    sma20: "#5dd1ff",
    sma50: "#d6b26e",
    sma200: "#8898aa",
    ema21: "#22c55e",
    vwap: "#ef4444"
  }[key] ?? "#5dd1ff";
}

function formatAxisLabel(value, timeframe) {
  const date = new Date(value);
  if (timeframe === "1H" || timeframe === "4H") {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit"
    }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric"
  }).format(date);
}

function connectPriceSocket() {
  window.clearTimeout(runtime.socketReconnectTimer);
  if (runtime.socket) {
    runtime.socket.close();
    runtime.socket = null;
  }

  if (!appState.autoRefresh || !("WebSocket" in window)) {
    updateSocketStatus("WS off", "");
    return;
  }

  updateSocketStatus("WS connecting", "");
  const socket = new WebSocket(`${CONFIG.endpoints.binanceWs}/btcusdt@miniTicker`);
  runtime.socket = socket;

  socket.addEventListener("open", () => {
    updateSocketStatus("WS live", "live");
  });

  socket.addEventListener("message", (event) => {
    try {
      const payload = JSON.parse(event.data);
      const ratio = getSelectedFxRatio();
      const livePrice = Number(payload.c) * ratio;
      safeText("header-price", formatCurrency(livePrice, appState.currency, 0));
      safeText("header-change", formatPercent(Number(payload.P), 2), getChangeClass(Number(payload.P)));
    } catch {
      updateSocketStatus("WS parsing", "error");
    }
  });

  socket.addEventListener("error", () => {
    updateSocketStatus("WS degraded", "error");
  });

  socket.addEventListener("close", () => {
    updateSocketStatus("WS retrying", "error");
    runtime.socketReconnectTimer = window.setTimeout(connectPriceSocket, CONFIG.wsReconnectDelay);
  });
}

function updateSocketStatus(text, stateClass) {
  safeText("ws-status", text);
  const chip = byId("ws-chip");
  if (chip) {
    chip.classList.remove("live", "error");
    if (stateClass) {
      chip.classList.add(stateClass);
    }
  }
}

function syncRefreshTimer() {
  window.clearInterval(runtime.refreshTimer);
  if (!appState.autoRefresh) {
    return;
  }
  runtime.refreshTimer = window.setInterval(() => {
    refreshDashboard({ force: true, includeHistory: false, includeMacro: false });
  }, appState.refreshInterval);
}

function exportConfig() {
  const blob = new Blob([JSON.stringify(appState, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "btc-by-jlv-settings.json";
  anchor.click();
  URL.revokeObjectURL(url);
  flashSettingsFeedback("Configuration exported.");
}

function importConfig(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", async () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const nextState = deepMerge(DEFAULT_STATE, parsed);
      Object.keys(appState).forEach((key) => delete appState[key]);
      Object.assign(appState, nextState);
      applyStateToDocument();
      renderModuleVisibility();
      saveState(true);
      await refreshDashboard({ force: true, includeHistory: true, includeMacro: true });
      connectPriceSocket();
      syncRefreshTimer();
      flashSettingsFeedback("Configuration imported.");
    } catch {
      flashSettingsFeedback("Import failed. JSON is invalid.");
    }
  });
  reader.readAsText(file);
  event.target.value = "";
}
