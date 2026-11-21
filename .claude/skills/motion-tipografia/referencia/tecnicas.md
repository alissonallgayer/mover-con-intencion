# Técnicas de tipografía cinética (código probado con HyperFrames 0.8.145 y GSAP 3.14.2)

Todas usan **un solo timeline** (`tl`) y **tiempo absoluto** (`T`, el segundo en que empieza la técnica). Copia el
fragmento dentro de `document.fonts.ready.then(...)` de la plantilla base.

## Función auxiliar: partir un texto en palabras o letras
```js
// Devuelve los <span> creados. El texto completo queda en aria-label para lectores de pantalla.
function partir(el, modo, mascara) {           // modo: "palabras" | "letras"; mascara: true/false
  const texto = el.textContent;
  el.setAttribute("aria-label", texto);
  el.textContent = "";
  const hechos = [];
  texto.split(/(\s+)/).forEach(function (pal) {
    if (pal === "") return;
    if (/^\s+$/.test(pal)) { el.append(pal); return; }
    const caja = document.createElement("span");    // una caja por palabra: nunca se parte entre dos líneas
    caja.setAttribute("aria-hidden", "true");
    caja.style.cssText = "display:inline-block;white-space:nowrap" +
      (mascara ? ";overflow:hidden;vertical-align:bottom;padding-bottom:.12em" : "");
    (modo === "letras" ? Array.from(pal) : [pal]).forEach(function (t) {
      const s = document.createElement("span");
      s.textContent = t;
      s.style.display = "inline-block";
      caja.append(s);
      hechos.push(s);
    });
    el.append(caja);
  });
  return hechos;
}
const ACENTO = getComputedStyle(document.documentElement).getPropertyValue("--acento").trim();
```

## 1. Revelado con máscara (por líneas)
```html
<h1 class="mascara"><span class="linea"><span>Lento entra,</span></span><span class="linea"><span>rápido sale.</span></span></h1>
```
```css
.mascara .linea { display: block; overflow: hidden; padding-bottom: .12em; }
.mascara .linea > span { display: block; }
```
```js
tl.from("#e1 .linea > span", { yPercent: 120, duration: 0.8, ease: "power4.out", stagger: 0.12 }, T);  // 120: el padding-bottom agranda la máscara
tl.to("#e1 .linea > span", { yPercent: -120, duration: 0.4, ease: "power2.in", stagger: 0.06 }, T_SALIDA);
```
Error típico: sin `padding-bottom` la máscara corta las letras con trazo descendente (g, p, y, j) y las cursivas.

## 2. Escalonado por palabras (stagger)
```js
const pal = partir(document.querySelector("#e2 p"), "palabras");
tl.from(pal, { y: 40, opacity: 0, duration: 0.5, ease: "power3.out", stagger: 0.09 }, T);
```
Con voz, en vez de `stagger` fijo coloca cada palabra en su segundo: `tl.from(pal[i], {...}, segundo_de_la_palabra)`.

## 3. Énfasis en una palabra
```html
<p>Una sola palabra <span class="clave">manda.</span></p>
```
```css
.clave { display: inline-block; transform-origin: 0% 80%; } /* crece hacia la derecha: no se sale del margen */
```
`scale` no empuja a las palabras vecinas: si detrás de la clave hay texto o un signo en la misma línea, la palabra
ampliada lo pisa. Deja la clave al final de la línea o mete su puntuación dentro del `<span>`.
```js
tl.to("#e3 .clave", { scale: 1.18, color: ACENTO, duration: 0.45, ease: "back.out(2)" }, T);
```

## 4. Tracking que se cierra (letras que se juntan)
No animes `letter-spacing`: el navegador lo redondea a píxeles enteros y el movimiento tiembla (el `lint` de
HyperFrames lo marca como error). Separa las letras y mueve cada una con `x`, que sí admite subpíxeles:
```js
const letras4 = partir(document.querySelector("#e4 h2"), "letras");
const centro = (letras4.length - 1) / 2;
tl.from(letras4, { x: function (i) { return (i - centro) * 40; }, opacity: 0,
                   duration: 1.4, ease: "power3.out" }, T);
```
Cada letra empieza separada de su sitio en proporción a su distancia del centro y todas llegan a la vez.

## 5. Sustitución
```html
<p>Se mueve como un <span class="cambio"><span class="a">robot</span><span class="b">humano</span></span></p>
```
```css
.cambio { display: inline-grid; overflow: hidden; vertical-align: bottom; padding-bottom: .12em; }
.cambio > span { grid-area: 1 / 1; }
```
```js
tl.set("#e5 .b", { yPercent: 130 }, 0);   // 130 y no 110: el padding-bottom agranda la máscara
tl.to("#e5 .a", { yPercent: -130, duration: 0.5, ease: "power3.in" }, T);
tl.to("#e5 .b", { yPercent: 0, color: ACENTO, duration: 0.6, ease: "power3.out" }, T + 0.15);
```

## 6. Máquina de escribir
Aquí no se usa `partir()`: los espacios también tienen que aparecer uno a uno.
```css
.cursor { display: inline-block; width: .55em; height: 1em; background: var(--acento); vertical-align: -0.12em; }
```
```html
<p><span class="txt">escribiendo en directo</span><span class="cursor"></span></p>
```
```js
const caja6 = document.querySelector("#e6 .txt");
const texto6 = caja6.textContent;
caja6.setAttribute("aria-label", texto6);
caja6.textContent = "";
caja6.style.whiteSpace = "pre";   // una sola línea: la máquina de escribir pide frases cortas
const letras = Array.from(texto6).map(function (c) {
  const s = document.createElement("span"); s.textContent = c; caja6.append(s); return s;
});
gsap.set(letras, { display: "none" });   // ocultas desde el principio, fuera del timeline; sin ocupar sitio
letras.forEach(function (l, i) { tl.set(l, { display: "inline" }, T + i * 0.06); });
// cursor que parpadea: repeticiones finitas, así el timeline tiene duración conocida
tl.to("#e6 .cursor", { opacity: 0, duration: 0.01, repeat: 11, yoyo: true, repeatDelay: 0.35 }, T);
```

## Salidas
Una salida es más corta que su entrada y acelera (`power2.in`). Opciones: la misma máscara hacia arriba, un fundido a `opacity: 0` de 0,3 s o un corte seco con la escena siguiente. La salida no es obligatoria: un corte limpio también
vale.
