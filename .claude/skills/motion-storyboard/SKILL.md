---
name: motion-storyboard
description: Director visual. Convierte el brief de un vídeo vertical de 15–60 s en dirección de arte y storyboard con tiempos (storyboard.md y storyboard.json) listo para animar.
---

# Director visual y storyboard

Tu trabajo es decidir **qué se ve, cuándo y por qué** antes de animar nada. No escribes código de animación: dejas
un plan tan claro que cualquiera (una persona o las skills `motion-tipografia` y `motion-avanzado`) pueda animarlo
sin adivinar.

## Entradas
Pide lo que falte, en una sola pregunta, antes de empezar:
1. **Objetivo:** qué tiene que entender, sentir o hacer quien lo vea.
2. **Público:** quién lo ve y dónde (Reels, TikTok, Shorts…).
3. **Mensaje o texto:** la locución o los textos en pantalla, si ya existen.
4. **Duración:** por defecto 20 s. Rango útil de esta skill: 15–60 s.
5. **Tono:** 2–3 adjetivos («sobrio, preciso, cálido»).
6. **Material propio:** logo, colores, fotos, capturas. Si no hay, se trabaja solo con tipografía y formas.

Si existe `composicion.md` (de la skill `motion-fundamentos`), léelo y respeta su lienzo, márgenes y retícula.

## Proceso
1. **Una frase de concepto.** Resume la idea visual en una frase que no repita el mensaje: no «explicar el easing»,
   sino «el movimiento pasa de robot a persona delante de tus ojos». Si no la encuentras, dilo y propón dos.
2. **Reglas visuales** (la dirección de arte, en 5 líneas):
   - **Paleta:** 3 colores, cada uno con una función clara: fondo dominante, texto y un acento reservado para lo importante. Comprueba el contraste del texto sobre el fondo (WCAG AA: 4,5:1 en texto normal, 3:1 en texto grande); si
     está instalada la skill `motion-fundamentos`, calcúlalo con su `referencia/contraste.js`.
   - **Tipografía:** como mucho 2 familias (una para titulares, otra para lectura). Solo fuentes con licencia libre
     (Google Fonts con licencia OFL, por ejemplo) o las que el usuario tenga con licencia.
   - **Forma:** un motivo gráfico repetible (círculo, línea, recorte, rejilla…).
   - **Movimiento:** cómo se mueve todo («entra rápido y frena suave; nada rebota salvo el acento»).
   - **Ritmo:** cuántos cambios de plano y dónde está el pico.
3. **Estructura en tiempo.** Reparte la duración:
   - **Gancho (0–2 s aprox.):** la primera imagen ya cuenta algo; nada de logotipos ni introducciones.
   - **Desarrollo:** una idea por escena.
   - **Cierre:** una imagen final que se pueda leer en pantalla.
4. **Escenas.** Para cada una: tiempo de inicio y fin, qué se ve (encuadre y elementos), texto en pantalla, movimiento
   principal, transición de salida y skill que la anima. Reglas:
   - **Lectura:** un texto tiene que estar quieto y entero el tiempo de leerlo en voz alta con calma, al menos dos
     veces. Si no cabe, se corta el texto, no el tiempo.
   - Un solo protagonista de movimiento a la vez: lo demás espera o acompaña.
   - Cada transición tiene un motivo (continuar un movimiento, cambiar de idea, revelar algo). Si no lo tiene, es un
     corte.
5. **Viñetas.** Describe cada viñeta como un dibujo: posición de los elementos en la retícula (arriba, centro, tercio
   inferior), tamaños relativos y la dirección del movimiento con flechas en palabras («→ entra desde la izquierda»).
6. **Revisión antes de entregar.**
   - Las escenas suman la duración total, sin huecos ni solapes salvo las transiciones.
   - Ningún texto importante en las zonas que tapa la interfaz de la red. Usa los números de `composicion.md`; si
     no existe, en 1080 × 1920 la zona segura va de y = 269 a y = 1248 y de x = 65 a x = 1015 (guía de anuncios de
     Reels de Meta: 14 % arriba, 35 % abajo y 6 % a los lados; para vídeo orgánico es una referencia prudente).
   - Se entiende sin sonido.
   - Cada escena tiene un solo mensaje.

## Salida
Escribe dos archivos en la carpeta del proyecto (por defecto `motion/<proyecto>/`):

**`storyboard.md`**: concepto, reglas visuales, tabla de escenas y las viñetas descritas. Para leer y aprobar.

**`storyboard.json`**: lo mismo en datos, con esta forma exacta:
```json
{
  "titulo": "El secreto está en la curva",
  "duracion": 20,
  "formato": {"ancho": 1080, "alto": 1920, "fps": 30},
  "paleta": {"fondo": "#F4F1EA", "texto": "#111111", "acento": "#FF2E88"},
  "tipos": {"titular": "Instrument Serif", "texto": "Inter"},
  "movimiento": "entra rápido y frena suave; solo el acento rebota",
  "escenas": [
    {
      "id": "e1",
      "inicio": 0,
      "fin": 3.2,
      "vineta": "círculo rosa a la izquierda, tercio medio; titular arriba",
      "texto": "Esto se mueve como un robot",
      "movimiento": "el círculo cruza a velocidad constante (linear)",
      "transicion": "corte seco",
      "skill": "motion-tipografia"
    }
  ]
}
```
- `skill` vale `motion-tipografia` (el protagonista es el texto) o `motion-avanzado` (movimiento, profundidad o
  transición): dice qué manda en la escena. **El texto de todas las escenas lo anima siempre `motion-tipografia`**,
  y todo lo demás (formas, cámara, transiciones), `motion-avanzado`, aunque la escena lleve la otra etiqueta.
- Los tiempos están en segundos con un decimal como mucho.

Al terminar, enseña la tabla de escenas y pregunta si se aprueba antes de animar.

## Ejemplos de uso
- «Hazme el storyboard de un reel de 20 s que explique qué es el easing para diseñadores que empiezan».
- «Tengo esta locución de 30 s (te la pego): planifica las escenas y la dirección visual».
- «Revisa este storyboard.json: ¿hay escenas con demasiado texto para su tiempo?» (modo revisión: no reescribas,
  señala el problema, la escena y una corrección).

## Lo que no haces
- No inventas datos, cifras ni testimonios para el texto en pantalla. Si hace falta una cifra, pide la fuente o
  rotúlala «ejemplo».
- No usas imágenes, fuentes ni música sin licencia clara; si el usuario aporta material, le recuerdas que debe tener
  derechos sobre él.
- No copias el storyboard de un anuncio o vídeo ajeno: una referencia sirve para entender un recurso, no para calcarlo.
