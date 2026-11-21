---
name: motion-tipografia
description: Tipografía cinética para vídeo vertical. Anima frases (máscara, escalonado, énfasis, tracking, sustitución, máquina de escribir) en HyperFrames con tiempo de lectura; renderiza y revisa.
---

# Tipografía cinética

Haces que el texto se mueva **para que se lea mejor y diga más**, no para decorar. Trabajas sobre una composición de
HyperFrames (HTML + GSAP) y la dejas lista para renderizar.

## Entradas
Una de estas tres:
- `storyboard.json` (de la skill `motion-storyboard`): animas **el texto de todas las escenas**, lleven la etiqueta
  que lleven. Las formas, la cámara y las transiciones son de `motion-avanzado`.
- Una frase o una lista de frases, con la duración de cada una.
- Un `index.html` existente en el que hay que animar textos.

Si existe `composicion.md`, respeta su paleta, sus tipografías, su retícula y su movimiento base. Si no hay
duración, propón una con la regla de lectura de abajo y pregunta.

## Reglas
1. **Lectura primero:** cada texto queda quieto y entero el tiempo de leerlo en voz alta con calma dos veces. La
   animación de entrada no cuenta como tiempo de lectura.
2. **Una técnica principal por pieza** y, como mucho, una de apoyo. Repetir la misma gramática da estilo; mezclar
   cinco técnicas parece una demo.
3. **Jerarquía:** una palabra clave por frase, como mucho, se marca con el acento (color, escala o peso).
4. **Tamaño:** pensado para móvil. Titulares de 110–180 px y textos de apoyo de 44 px o más en un lienzo de 1080 px de
   ancho. Es un criterio de partida; compruébalo en la captura.
5. **Entradas con desaceleración y salidas más rápidas que las entradas** (`power3.out` / `power2.in`).
6. **Dentro de la zona segura:** ningún texto importante en el 14 % superior, el 35 % inferior ni el 6 % de cada lado
   (guía de anuncios de Reels de Meta; para vídeo orgánico es una referencia prudente).
7. **Accesible:** el vídeo es una imagen, así que la accesibilidad está en el contraste (punto 5 de `composicion.md`),
   en que nada parpadee más de tres veces por segundo (WCAG 2.3.1), en subtítulos si hay voz y en el texto
   alternativo de la publicación. En el HTML, `partir()` guarda el texto completo en `aria-label`: es un detalle
   técnico, no sustituye a lo anterior.

## Técnicas (código en `referencia/tecnicas.md`)
| Técnica | Qué comunica | Cuándo |
|---|---|---|
| **Revelado con máscara** | aparición limpia, editorial | titulares, frases de peso |
| **Escalonado por palabras** (stagger) | ritmo de habla | frases que acompañan una voz |
| **Énfasis** (escala, color o peso en una palabra) | «esto es lo importante» | la palabra clave |
| **Tracking que se cierra** | concentración, llegada | títulos cortos, cierres |
| **Sustitución** (una palabra cambia por otra) | contraste, corrección | «no es X → es Y», antes y después |
| **Máquina de escribir** | algo que se escribe en este momento | chats, código, notas |

## Proceso
1. **Lee** el texto y marca la palabra clave de cada frase.
2. **Elige la técnica principal** según la tabla y dilo en una línea con el motivo.
3. **Calcula tiempos:** entrada (0,5–0,9 s), lectura (la regla 1) y salida (0,3–0,5 s). Si no cabe en la escena,
   propón cortar texto; no aceleres la lectura.
4. **Monta** la composición:
   - si no existe, copia `plantilla/base.html` a `index.html`;
   - cada escena es una `<section class="escena" id="eN">`;
   - todas las animaciones van en el único timeline, con tiempo absoluto;
   - parte el texto con la función `partir()` de `referencia/tecnicas.md`.
5. **Verifica:**
   ```
   npx --yes hyperframes@0.8.145 lint
   npx --yes hyperframes@0.8.145 snapshot --at <entrada>,<mitad de la lectura>,<salida> --no-end --describe false
   ```
   Abre las capturas y comprueba:
   - el texto se lee entero a mitad de la lectura;
   - nada sale de la zona segura;
   - no se ven letras cortadas por la máscara;
   - la palabra clave destaca.
6. **Renderiza** cuando las capturas estén bien:
   ```
   npx --yes hyperframes@0.8.145 render -o salida/video.mp4 --quality standard
   ```
   Necesita Node.js 22 o superior y FFmpeg. Un render cada vez: dos a la vez pueden bloquear el ordenador.
7. **Entrega:** la ruta del MP4, las capturas y, en tres líneas, la técnica elegida, por qué y los tiempos de cada
   frase.

## Ejemplos de uso
- «Anima “Lento entra, rápido sale” en 3 s, con revelado con máscara y la palabra “rápido” en acento».
- «Anima las escenas de tipografía de `motion/curva/storyboard.json`».
- «Esta frase dura 1,5 s en pantalla: “Tres errores que hacen que tu vídeo parezca barato”. ¿Se lee?» (si no se lee,
  dilo y propón un corte del texto).

## Lo que no haces
- No uses `Math.random()` sin semilla, `Date.now()`, `setTimeout` ni `requestAnimationFrame`: HyperFrames busca
  cada fotograma y el resultado tiene que ser siempre el mismo.
- No metas animaciones CSS (`@keyframes`) para el movimiento principal: todo va en el timeline de GSAP.
- No uses fuentes sin licencia. Las de Google Fonts con licencia OFL valen.
