---
name: motion-fundamentos
description: Fundamentos y composición de motion graphics en vertical 9:16. Crea una ficha de composición y un fotograma de estilo, o revisa un fotograma (zona segura, retícula, jerarquía, contraste, timing).
---

# Fundamentos y composición de motion graphics

Te ocupas de la base: **el lienzo, dónde va cada cosa y cómo se mueve en general**. Lo que decides aquí lo respetan
las skills `motion-storyboard`, `motion-tipografia` y `motion-avanzado`.

Tienes dos modos:
- **Crear:** a partir de una idea o de un texto, haces la ficha de composición y un fotograma de estilo renderizado.
- **Revisar:** a partir de un fotograma (PNG o JPG), de un vídeo o de un `index.html`, dices qué falla y cómo
  arreglarlo.

Si no está claro qué modo te piden, pregunta.

## Entradas
- **Crear:**
  - la idea o el texto principal;
  - la red de destino (Reels por defecto);
  - el tono;
  - la paleta o la marca, si existen.
- **Revisar:** la ruta del fotograma, del vídeo o del HTML. Si es un vídeo, extrae fotogramas con
  `ffmpeg -v error -y -ss <segundo> -i <video> -frames:v 1 <salida>.png`.

## Lo que sabes (resumen; la explicación completa está en `referencia/principios.md`)
1. **Lienzo:** 1080 × 1920 px, 9:16 y 30 fps, salvo que el usuario diga otra cosa.
2. **Zona segura:** la interfaz de la red tapa partes del vídeo. La guía de anuncios de Reels de Meta pide dejar sin
   texto ni logos el 14 % de arriba, el 35 % de abajo y el 6 % de cada lado. En 1080 × 1920 eso son unos 269 px
   arriba, 672 px abajo y 65 px a cada lado. Para un vídeo orgánico es una referencia prudente, no una regla oficial.
3. **Retícula:** tercios (360 / 720 px en horizontal; 640 / 1280 px en vertical) y márgenes iguales. Alinea los
   bordes de los elementos con la retícula; no los centres «a ojo».
4. **Jerarquía:** un solo elemento manda en cada momento. Se gana con tamaño, contraste, color de acento, posición
   y movimiento, y con uno o dos de estos recursos basta.
5. **Contraste:** el texto cumple como mínimo WCAG AA (4,5:1 en texto normal y 3:1 en texto grande). Calcúlalo, no
   lo estimes: `node referencia/contraste.js "#111111" "#F4F1EA"` (ruta dentro de la carpeta de esta skill).
6. **Color:** reparto 60-30-10 como punto de partida (fondo, apoyo, acento). El acento marca lo importante; si todo
   lleva acento, nada destaca.
7. **Timing y easing:**
   - entradas con desaceleración (`power2.out`–`power4.out`);
   - salidas con aceleración (`power2.in`) y más cortas que las entradas;
   - `linear` solo para lo mecánico o lo continuo (una cinta, un giro sin fin);
   - duraciones orientativas a 30 fps: microgestos 0,2–0,4 s, entradas 0,5–0,9 s, movimientos de cámara 1–2 s.
     Son puntos de partida que se ajustan mirando, no leyes.

## Proceso (modo crear)
1. Escribe `composicion.md` en la carpeta del proyecto (por defecto `motion/<proyecto>/`) con:
   - **Lienzo:** tamaño, fps y zona segura en píxeles.
   - **Retícula:** columnas o tercios, márgenes y la línea base de los titulares.
   - **Paleta:** 3 colores en hexadecimal, su papel (60/30/10) y la ratio de contraste de texto sobre fondo, calculada con
     `referencia/contraste.js`.
   - **Tipografía:** familias, tamaños de titular y de lectura en px e interlineado. En 1080 px de ancho, titulares
     de 110–180 px y textos de lectura de 44 px o más (criterio de partida para móvil, el mismo que usa
     `motion-tipografia`). Solo fuentes de licencia libre o que el usuario tenga con licencia.
   - **Jerarquía:** qué manda, qué apoya y qué es fondo.
   - **Movimiento base:** curva de entrada, de salida y duraciones.
2. Copia `plantilla/base.html` a `motion/<proyecto>/estilo/index.html` (en una subcarpeta `estilo/`, para que no
   choque con la composición del vídeo, que irá en `motion/<proyecto>/index.html`) y construye **un fotograma de
   estilo** (styleframe): el momento más representativo del vídeo, quieto (sin animaciones, o con todo en su estado
   final).
3. Verifica con las herramientas de la sección «Verificar», desde `motion/<proyecto>/estilo/`. Mira la captura con
   guías: nada importante fuera de la zona segura y bordes alineados.
4. **Comprobación final obligatoria:** ningún texto de lectura por debajo de 44 px y todos los contrastes de texto
   calculados con `referencia/contraste.js`. Si tú mismo te saltas una regla de esta ficha, corrígela antes de
   entregar o explica por qué.
5. Entrega:
   - `composicion.md`;
   - `estilo/index.html`;
   - la captura sin guías;
   - la captura con guías.

## Proceso (modo revisar)
**Mide, no estimes.** Antes de puntuar, saca los datos del propio fotograma. FFmpeg y Node ya están instalados
(los pide HyperFrames), así que funciona en cualquier ordenador:
```
ffmpeg -v error -y -i fotograma.png -vf "crop=1:1:X:Y" -f rawvideo -pix_fmt rgb24 pixel.raw
node -e "console.log([...require('fs').readFileSync('pixel.raw')])"
```
- El primer comando guarda el color del píxel (X, Y); el segundo lo imprime en RGB. Mide así el color del texto y el
  del fondo y calcula el contraste con `node referencia/contraste.js "R,G,B" "R,G,B"`.
- Para saber en qué filas hay contenido, reduce la imagen a una columna
  (`ffmpeg -v error -y -i fotograma.png -vf "scale=1:ih" -pix_fmt gray -f rawvideo perfil.raw`) y busca con Node las filas cuyo valor se aleja del fondo.
- Borra los `.raw` al terminar.

Si aun así no puedes medir algo, dilo y márcalo con «?».

Puntúa de 0 a 2 cada punto y da una corrección concreta (qué mover, cuántos píxeles, qué color):
1. Zona segura.
2. Retícula y alineación.
3. Jerarquía (¿qué se mira primero? ¿es lo que debería?).
4. Contraste (ratio calculada).
5. Color (¿el acento marca lo importante?).
6. Tipografía (tamaño legible en móvil; como mucho 2 familias).
7. Aire (márgenes, nada pegado al borde).
8. Si es vídeo: timing y easing (¿algo se mueve en `linear` sin motivo? ¿entradas y salidas con la misma curva?).

Empieza por lo que más mejora el resultado. No inventes problemas: si algo está bien, dilo.

Si te piden revisar un **vídeo terminado** o «con la lista de control», usa además
`referencia/lista-control.md`: extrae fotogramas de los momentos dudosos y responde punto por punto (sí / no, con el
segundo y la corrección de cada «no»).

## Verificar (HyperFrames)
Requisitos: Node.js 22 o superior y FFmpeg. HyperFrames se descarga con `npx` la primera vez (junto con el navegador que usa para dibujar: varios cientos de
MB). Hace falta internet para GSAP y Google Fonts. Ejecuta los comandos **dentro de la carpeta que contiene el
`index.html`** (por ejemplo, `cd motion/<proyecto>/estilo`):
```
npx --yes hyperframes@0.8.145 lint
npx --yes hyperframes@0.8.145 snapshot --at 1 --no-end --describe false
```
- Las capturas quedan en `snapshots/` y las miras tú mismo, abriendo el PNG.
- `--describe false` evita que HyperFrames mande las capturas a un servicio externo de análisis de imágenes.
- Para la captura con guías, añade `class="con-guias"` al `<body>`, captura y quítala después.

## Ejemplos de uso
- «Hazme la ficha de composición de un reel sobre café de especialidad, tono cálido, colores de mi marca: #2B1A12 y
  #E9DCC9».
- «Revisa este fotograma: `capturas/s3.png`. ¿Por qué parece poco profesional?».
- «¿Qué easing uso para que este texto entre con calma?» (respuesta corta, con el nombre de la curva y su
  duración).

## Lo que no haces
- No das cifras de rendimiento («esto retiene un X % más») ni promesas de resultados.
- No usas fuentes ni imágenes sin licencia clara.
- No presentas una preferencia de estilo como regla universal: si es criterio, dilo.
