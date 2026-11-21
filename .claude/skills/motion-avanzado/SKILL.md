---
name: motion-avanzado
description: Motion graphics avanzado en HyperFrames (HTML + GSAP): movimiento con peso (anticipación, superposición, arcos), 2D, 2.5D con cámara y transiciones con motivo. Anima, renderiza y revisa.
---

# Motion graphics avanzado

Te encargas de lo que hace que un vídeo parezca **dirigido** y no solo animado:
- movimiento con peso;
- profundidad;
- cámara;
- transiciones que continúan una idea.

Trabajas sobre una composición de HyperFrames (HTML + GSAP).

## Entradas
Una de estas tres:
- `storyboard.json` (de la skill `motion-storyboard`): animas todo lo que no es texto (formas, gráficos, profundidad,
  cámara) en todas las escenas, y las transiciones entre escenas. El texto lo anima `motion-tipografia`.
- Una descripción («tres capas con paralaje y un empuje de cámara de 2 s»).
- Un `index.html` existente que hay que mejorar («se ve plano», «las transiciones no fluyen»).

Si existe `composicion.md`, respeta su paleta, su retícula y su movimiento base. Si los textos de una escena los
anima `motion-tipografia`, no los toques: anima el espacio a su alrededor.

## Las tres capas del oficio (código probado en `referencia/`)
1. **Movimiento con peso** (`referencia/movimiento.md`):
   - **anticipación:** un gesto contrario pequeño antes del principal;
   - **superposición:** las partes no salen ni llegan a la vez (stagger y desfases);
   - **continuación:** se pasa un poco del destino y se asienta;
   - **arcos:** x e y con curvas distintas.
2. **Profundidad, 2D y 2.5D** (`referencia/profundidad.md`):
   - **2D:** todo en un plano; la profundidad se sugiere con escala, oclusión y contraste.
   - **2.5D:** capas planas colocadas a distintas distancias en un espacio 3D (CSS `perspective` + `translateZ`). Al
     mover la cámara, las capas cercanas se desplazan más que las lejanas: eso es el **paralaje**.
   - Señales de profundidad que se suman: tamaño, oclusión, desenfoque, contraste y color atmosférico (lo lejano se parece más al fondo), sombra y velocidad.
3. **Transiciones** (`referencia/transiciones.md`):
   - corte;
   - corte por coincidencia (match cut);
   - cortinilla con máscara;
   - empuje;
   - zoom a través de un elemento.

   Cada una necesita un motivo. Si no lo hay, corte seco.

## Proceso
1. **Diagnóstico en una línea:** qué debe sentir quien lo ve en esta escena (peso, calma, sorpresa, avance) y qué
   recurso lo da.
2. **Elige lo mínimo:** un recurso de profundidad y una transición por cambio de idea. Si todo se mueve, nada
   destaca: un solo protagonista de movimiento a la vez.
3. **Monta:**
   - si no existe, copia `plantilla/base.html` a `index.html`;
   - escenas en `<section class="escena" id="eN">`, un solo timeline y tiempos absolutos;
        - en la cortinilla y el empuje las dos escenas están visibles durante la transición; en el corte por
       coincidencia y el zoom de entrada el cambio es instantáneo, en el momento en que la forma llena el cuadro.
4. **Verifica:**
   ```
   npx --yes hyperframes@0.8.145 lint
   npx --yes hyperframes@0.8.145 snapshot --at <antes>,<mitad de la transición>,<después> --no-end --describe false
   ```
   - Con 2.5D, comprueba la profundidad con dos capturas al principio y al final del movimiento de cámara: lo
     cercano tiene que desplazarse (o crecer) más que lo lejano. (`snapshot --angle` gira el escenario entero y, con
     la perspectiva dentro de un contenedor, no separa las capas: no sirve para esto.)
   - Mira las capturas:
     - ningún borde de capa a la vista al mover la cámara (agranda las capas de fondo);
     - nada importante fuera de la zona segura;
     - la transición se entiende congelada a la mitad.
5. **Renderiza** cuando las capturas estén bien:
   ```
   npx --yes hyperframes@0.8.145 render -o salida/video.mp4 --quality standard
   ```
   Necesita Node.js 22 o superior y FFmpeg. Un render cada vez.
6. **Sonido (opcional):** si el usuario te da un audio, añádelo dentro de `#main` como
   `<audio id="musica" src="audio/musica.mp3" data-start="0" data-duration="20" data-track-index="9" data-volume="0.8"></audio>`
   (segundos de inicio y duración; volumen de 0 a 1). Recuérdale que necesita licencia para usar ese audio.
7. **Entrega:** la ruta del MP4, las capturas y tres líneas: qué recurso usaste en cada escena, por qué y qué
   descartaste.

## Ejemplos de uso
- «Esta escena se ve plana: dale profundidad con tres capas y un empuje de cámara lento».
- «Une la escena 2 y la 3 con una transición que continúe el movimiento del círculo».
- «Anima la entrada de estas cuatro tarjetas para que no lleguen todas a la vez».

## Lo que no haces
- Nada de `Math.random()` sin semilla, `Date.now()`, `setTimeout` ni `requestAnimationFrame`.
- No animes `letter-spacing`, `width`, `top` ni `left` para mover cosas: usa `x`, `y`, `scale`, `rotation` y
  `opacity`. Las propiedades de maquetación saltan de píxel en píxel y el movimiento tiembla (el `lint` de
  HyperFrames las marca).
- No prometas «desenfoque de movimiento real»: un `filter: blur()` es un desenfoque uniforme que lo imita, no un
  motion blur. Dilo así si lo usas.
- No uses imágenes ni vídeos sin licencia clara.
