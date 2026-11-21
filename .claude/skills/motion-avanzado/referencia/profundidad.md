# Profundidad: 2D y 2.5D (código probado con HyperFrames 0.8.145 y GSAP 3.14.2)

## 2D: sugerir profundidad en un plano
Señales que se suman (cuantas más, más profundidad):
- **Tamaño:** lo lejano, más pequeño.
- **Oclusión:** lo cercano tapa lo lejano.
- **Desenfoque:** lo lejano, más borroso (`filter: blur(6px)`). Es caro de renderizar, así que úsalo en pocas capas.
- **Contraste y color atmosférico:** lo lejano tiene menos contraste y se parece más al fondo.
- **Sombra:** solo lo cercano proyecta una sombra nítida.
- **Velocidad (paralaje a mano):** al desplazar el plano, cada capa se mueve según su factor: la cercana con 1 y las
  lejanas con menos.
```js
[[".c1", 0.3], [".c2", 0.6], [".c3", 1]].forEach(function (c) {
  tl.fromTo(c[0], { x: 120 * c[1] }, { x: -120 * c[1], duration: 3.6, ease: "none" }, T);
});
```

## 2.5D: capas planas en un espacio 3D
Las capas siguen siendo planas, pero cada una está a una distancia (`translateZ`). Una cámara con perspectiva crea el paralaje por sí sola: al moverla, lo cercano se desplaza más que lo lejano.
```html
<div class="camara"><div class="mundo">
  <div class="capa sol"    style="transform:translateZ(-1400px)"></div>
  <div class="capa cerro"  style="transform:translateZ(-600px)"></div>
  <div class="capa rotulo" style="transform:translateZ(0px)">Lo cercano corre más.</div>
  <div class="capa disco"  style="transform:translate3d(120px,180px,150px)"></div>
</div></div>
```
```css
.camara { position:absolute; inset:0; perspective:1200px; }      /* distancia de la cámara */
.mundo  { position:absolute; inset:0; transform-style:preserve-3d; }
.capa   { position:absolute; left:50%; top:50%; }
```
```js
// Movimiento de cámara: se mueve el mundo entero. z positivo = la cámara se acerca.
tl.fromTo(".mundo", { z: -150, x: 90 }, { z: 180, x: -90, duration: 4.4, ease: "power2.inOut" }, T);
```
Reglas:
- **Perspectiva:** el ángulo de visión horizontal es 2·atan(540 / P) en un lienzo de 1080 px:
  - 600–800 px (84–68°): perspectiva exagerada, como un gran angular;
  - 1000–1400 px (57–42°): un punto de partida natural;
  - 2000 px o más (30° o menos): casi plana.
- **No aplanes el mundo:** `opacity` menor que 1, `filter`, `clip-path`, `mask` u `overflow` distinto de `visible`
  en `.mundo` rompen `preserve-3d` y todas las capas quedan en el mismo plano. Funde, desenfoca o recorta cada capa o
  la escena entera, nunca el mundo.
- **Si vas a animar una capa**, colócala con GSAP en lugar de con `style="transform:…"` (los dos transforms chocan):
  `gsap.set(".disco", { z: 150, xPercent: -50, yPercent: -50 })`.
- **Bordes:** las capas lejanas se ven más pequeñas. Agrándalas, o se verán sus bordes al mover la cámara.
- **Texto:** en `translateZ(0)` el texto se ve a su tamaño real. Si la cámara avanza mucho, el texto crece y se sale:
  desvanécelo antes o limita el movimiento.
- **Comprobar:** haz dos capturas, al principio y al final del movimiento de cámara
  (`snapshot --at <inicio>,<fin> --no-end --describe false`), y compara: lo cercano tiene que desplazarse o crecer
  más que lo lejano. Si todo se mueve igual, las capas no están a distintas profundidades (revisa
  `transform-style: preserve-3d` en el contenedor del mundo). `snapshot --angle` gira el escenario entero y, con la
  perspectiva dentro de un contenedor, no separa las capas: no sirve para esto.

## Movimientos de cámara (nombres de rodaje)
| Movimiento | En GSAP (sobre `.mundo`) | Para qué |
|---|---|---|
| **Acercamiento** (push-in) | `z` sube | acercarse a lo importante, tensión |
| **Alejamiento** (pull-out) | `z` baja | revelar el contexto |
| **Desplazamiento lateral** (truck) | `x` | recorrer, comparar |
| **Pedestal** | `y` | subir o bajar por la escena |
| **Inclinación** | `rotationX`, con suavidad | dar volumen a un plano |

Un movimiento de cámara casi siempre usa `power2.inOut` (arranca y frena con peso) o `none` si debe ser continuo.
