// Ratio de contraste WCAG 2 entre dos colores.
// Uso: node contraste.js "#111111" "#F4F1EA"   (o «19,19,19» en RGB)
function rgb(c) {
  if (c.includes(",")) return c.split(",").map(Number);
  const h = c.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function lum(c) {
  const [r, g, b] = rgb(c).map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const [a, b] = process.argv.slice(2);
if (!a || !b) { console.log('Uso: node contraste.js "#111111" "#F4F1EA"'); process.exit(1); }
const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
const r = (l1 + 0.05) / (l2 + 0.05);
const nivel = r >= 4.5 ? "AA texto normal" : r >= 3 ? "AA solo texto grande" : "no apto para texto";
console.log(`${r.toFixed(2).replace(".", ",")}:1 · ${nivel}`);
