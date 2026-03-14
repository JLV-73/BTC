# BTC by JLV

BTC by JLV is a static Bitcoin-only intelligence terminal built for GitHub Pages. It combines live market data, red/green candlesticks, on-chain telemetry, macro placeholders and fallbacks, sentiment heuristics, and portfolio analytics in a single dense dark-theme dashboard.

## Overview

The project is intentionally backend-free:

- `index.html` provides the single-page application structure.
- `styles.css` delivers the premium terminal-style visual system.
- `script.js` handles live data, charts, persistence, portfolio calculations, and graceful degradation.
- `logo_JLV.jpg` is the current top-right logo asset used by the UI.

## Features

- Sticky terminal header with live BTC spot, 24H change, refresh timestamp, and WebSocket status.
- Hero summary for regime, ATH distance, scarcity, block height, and sentiment.
- Market KPI grid for price, 24H / 7D / 30D momentum, market cap, volume, supply, ATH, drawdown, and BTC dominance.
- Main candlestick chart with required red/green candles and toggleable SMA 20, SMA 50, SMA 200, EMA 21, VWAP, volume, RSI, and MACD.
- Secondary analytics charts for performance, drawdown, volume evolution, and rolling trend / volatility diagnostics.
- On-chain panel for mempool fees, block height, difficulty adjustment, hashrate, unconfirmed transactions, subsidy epoch, halving countdown, supply progress, and sats per fiat unit.
- Macro section with FRED-ready architecture, optional key support, and placeholder-safe states.
- Sentiment section using Fear & Greed plus visible rule-based market tags.
- Portfolio lab for BTC holdings, average price, deployable cash, target sizing, break-even, scenario mapping, and DCA interpretation.
- Local persistence for currency, modules, layout, chart toggles, portfolio inputs, and refresh settings.
- Import / export / reset configuration workflow for portable personalization.

## Screenshot Placeholders

- Hero / overview screenshot placeholder
- Candlestick deck screenshot placeholder
- On-chain + macro screenshot placeholder
- Portfolio lab screenshot placeholder

## File Structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- README.md
|-- Prompt.txt
`-- logo_JLV.jpg
```

## Local Usage

1. Clone or download the repository.
2. Open `index.html` directly in a browser, or serve the folder with any simple static server.
3. The dashboard will run without a backend. Some feeds may still be limited by browser CORS or public API availability.

## GitHub Pages Deployment

1. Push the repository to GitHub.
2. In GitHub, open `Settings > Pages`.
3. Set the source to the branch that contains `index.html` at the repository root.
4. Save. GitHub Pages will serve the static app without extra configuration.

## Configuration

All runtime configuration lives in the `CONFIG` object inside [script.js](/C:/Users/esade/Desktop/projets/BTC/script.js).

Key points:

- `CONFIG.storageKey` controls the localStorage namespace.
- `CONFIG.defaultRefreshInterval` and the UI selector control polling cadence.
- `CONFIG.apiKeys.fred` is the single place to add an optional FRED API key.
- `CONFIG.endpoints` centralizes all public API URLs for easier swapping later.

## Supported APIs

- CoinGecko
  - Market KPIs
  - Global market cap / BTC dominance snapshot
  - Multi-currency BTC conversion
  - Historical market chart data
- Binance public REST + WebSocket
  - BTCUSDT candlesticks
  - Live mini-ticker updates for the header
- mempool.space
  - Recommended fees
  - Mempool summary
  - Block height
  - Difficulty adjustment
  - Monthly hashrate history
- Alternative.me
  - Fear & Greed index
- FRED
  - Optional macro series via API key or best-effort CSV fallback

## Optional APIs

- FRED is optional. The dashboard stays usable without a key and surfaces placeholders when macro series cannot load.
- Funding, options OI, and basis feeds are intentionally left as optional architecture slots. No secret-backed feed is required for the base version.

## Logo Placement

The current implementation uses `logo_JLV.jpg` in the fixed top-right badge from [index.html](/C:/Users/esade/Desktop/projets/BTC/index.html).

If you later want a repository asset path such as `/assets/jlv-logo.png`:

1. Add the file to the repo.
2. Replace the `src` attribute of the `.corner-logo img` tag in [index.html](/C:/Users/esade/Desktop/projets/BTC/index.html).

## Color Customization

The theme tokens are defined at the top of [styles.css](/C:/Users/esade/Desktop/projets/BTC/styles.css) under `:root`.

Useful variables:

- `--bg`, `--bg-panel`, `--bg-panel-strong`
- `--text`, `--muted`, `--muted-strong`
- `--green`, `--red`, `--gold`, `--cyan`
- `--line`, `--line-strong`

## Default Currency

The default display currency is controlled in `DEFAULT_STATE.currency` inside [script.js](/C:/Users/esade/Desktop/projets/BTC/script.js).

Supported currencies in the current UI:

- `USD`
- `EUR`
- `GBP`
- `CHF`

## Add or Remove Modules

- UI visibility toggles are stored under `DEFAULT_STATE.modules` in [script.js](/C:/Users/esade/Desktop/projets/BTC/script.js).
- Section containers are tagged with `data-module` in [index.html](/C:/Users/esade/Desktop/projets/BTC/index.html).
- The `renderModuleVisibility()` function in [script.js](/C:/Users/esade/Desktop/projets/BTC/script.js) applies the show / hide behavior.

To add a module:

1. Add the section markup to `index.html`.
2. Add styles in `styles.css`.
3. Add state, events, render logic, and persistence wiring in `script.js`.

## Limitations of Static Hosting

- Public APIs can throttle or fail temporarily.
- Browser CORS policy may block individual data sources depending on provider changes.
- Without a backend, secret-backed institutional feeds should not be embedded directly.
- WebSocket availability can vary by network or region; the header ticker falls back to polled data.

## Security Note About Frontend API Keys

Any key placed in `script.js` is visible client-side. Only use keys that are explicitly safe for frontend exposure and rate-limited accordingly. Do not embed private exchange, brokerage, or paid data credentials in a static site.

## Future Roadmap

- Add optional funding, futures basis, and options positioning feeds.
- Add user-defined alerts with threshold persistence.
- Add more macro cross-asset comparisons when reliable public browser-safe feeds are available.
- Add panel presets for trader / investor / macro analyst layouts.
- Add screenshot assets and documentation visuals.

## Troubleshooting

- Charts do not appear
  - Confirm the ECharts CDN is reachable in the browser.
- Market cards stay empty
  - CoinGecko may be rate-limiting or temporarily unavailable.
- Candles fail but the rest of the page works
  - Binance may be blocked on the current network; the app keeps the remaining modules alive.
- Macro cards show placeholders
  - Add a FRED API key in `CONFIG.apiKeys.fred`, or rely on the CSV fallback if reachable.
- Settings reset unexpectedly
  - Check whether the browser is clearing localStorage for local files or private sessions.

## Notes

- The dashboard is static and directly runnable.
- No framework, build tool, backend, database, or environment variable is required for the base version.
