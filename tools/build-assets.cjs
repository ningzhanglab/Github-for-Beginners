// Builds the icon files and the route pictures used in the lessons.
// Run from the repository root:  node tools/build-assets.cjs
// Route steps come from workflows.html, so the pictures always match the route map.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { PLACES, G, ICONS, tile } = require('./icons.cjs');

const root = path.join(__dirname, '..');

function loadRoutes() {
  const html = fs.readFileSync(path.join(root, 'workflows.html'), 'utf8');
  const m = html.match(/var LINES = (\[[\s\S]*?\n\]);/);
  if (!m) throw new Error('Could not find route data in workflows.html');
  return vm.runInNewContext(m[1]);
}

const ROUTE_COLORS = { first: '#2F5BEA', daily: '#1E8E5A', update: '#B77900', pr: '#C0306B', team: '#0E8A93', localai: '#6A4CC2', cloudai: '#D45D10', fix: '#5B6676' };
const LANE_NAMES = ['Your folder', 'GitHub Desktop', 'GitHub.com'];
const LANE_PLACES = ['folder', 'desktop', 'web'];

function esc(s) { return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function plain(s) { return s.replace(/\{\{([^|}]*)\|([^}]*)\}\}/g, '$1 / $2').replace(/\*\*|`/g, ''); }
function wrap(s, max) {
  const out = [''];
  for (const w of s.split(' ')) {
    const cur = out[out.length - 1];
    if (cur && (cur + ' ' + w).length > max) out.push(w); else out[out.length - 1] = cur ? cur + ' ' + w : w;
  }
  return out.slice(0, 3);
}

function routeSvg(route) {
  const n = route.stops.length, labelW = 132, step = 112, laneH = 92, pad = 70;
  const W = labelW + pad * 2 + (n - 1) * step, H = laneH * 3;
  const col = ROUTE_COLORS[route.id];
  const pt = (i, lane) => ({ x: labelW + pad + i * step, y: laneH * lane + 34 });
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Route: ${esc(route.goal)}. ${route.stops.map((st, i) => (i + 1) + ' ' + esc(plain(st.t)) + ' in ' + LANE_NAMES[st.lane]).join('; ')}">`;
  s += `<style>.bg0{fill:#f6f8fa}.bg1{fill:#eaeef3}.ln{font:600 13px system-ui,-apple-system,"Segoe UI",sans-serif;fill:#4a5668}.lb{font:12px system-ui,-apple-system,"Segoe UI",sans-serif;fill:#1b2433;text-anchor:middle}.st{fill:#fff}.gl{stroke:#1b2433}.nm{font:700 11px system-ui,-apple-system,"Segoe UI",sans-serif;fill:#fff;text-anchor:middle}` +
    `@media (prefers-color-scheme:dark){.bg0{fill:#18202a}.bg1{fill:#1f2834}.ln{fill:#9aa8ba}.lb{fill:#e7ecf3}.st{fill:#1a222e}.gl{stroke:#e7ecf3}}</style>`;
  for (let l = 0; l < 3; l++) {
    s += `<rect class="bg${l % 2}" x="0" y="${laneH * l}" width="${W}" height="${laneH}"/>`;
    s += `<rect x="0" y="${laneH * l}" width="6" height="${laneH}" fill="${PLACES[LANE_PLACES[l]].color}"/>`;
    s += `<text class="ln" x="18" y="${laneH * l + 38}">${LANE_NAMES[l]}</text>`;
  }
  const pts = route.stops.map((st, i) => pt(i, st.lane));
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i], b = pts[i + 1], mx = (a.x + b.x) / 2;
    s += `<path d="M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round"/>`;
  }
  route.stops.forEach((st, i) => {
    const p = pts[i], dashed = st.who ? ' stroke-dasharray="5 4"' : '';
    s += `<circle class="st" cx="${p.x}" cy="${p.y}" r="21" stroke="${col}" stroke-width="4"${dashed}/>`;
    s += `<g class="gl" transform="translate(${p.x - 12} ${p.y - 12})" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${G[ICONS[st.i][0]]}</g>`;
    s += `<circle cx="${p.x + 17}" cy="${p.y - 17}" r="9" fill="${col}"/><text class="nm" x="${p.x + 17}" y="${p.y - 13}">${i + 1}</text>`;
    wrap(plain(st.t), 16).forEach((line, k) => { s += `<text class="lb" x="${p.x}" y="${p.y + 38 + k * 14}">${esc(line)}</text>`; });
  });
  return s + '</svg>\n';
}

function build() {
  const iconDir = path.join(root, 'assets', 'icons');
  const routeDir = path.join(root, 'assets', 'routes');
  fs.mkdirSync(iconDir, { recursive: true });
  fs.mkdirSync(routeDir, { recursive: true });
  for (const name of Object.keys(ICONS)) fs.writeFileSync(path.join(iconDir, name + '.svg'), tile(name));
  const routes = loadRoutes();
  for (const r of routes) {
    for (const st of r.stops) if (!ICONS[st.i]) throw new Error('Unknown icon "' + st.i + '" in route ' + r.id);
    fs.writeFileSync(path.join(routeDir, r.id + '.svg'), routeSvg(r));
  }
  return { icons: Object.keys(ICONS).length, routes: routes.length };
}

module.exports = { build, loadRoutes };
if (require.main === module) console.log('Built', build());
