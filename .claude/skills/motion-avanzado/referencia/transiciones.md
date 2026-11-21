# Transiciones (código probado con HyperFrames 0.8.145 y GSAP 3.14.2)

En la cortinilla y el empuje se ven **las dos escenas** durante la transición: la siguiente se hace visible al
empezar y la anterior se oculta al terminar. En el corte por coincidencia y el zoom de entrada el cambio es
instantáneo: ocurre en el fotograma en que la forma llena el cuadro. Una transición sin motivo es ruido: si no lo hay, corte seco.

| Transición | Motivo | Duración orientativa |
|---|---|---|
| **Corte** | cambio de idea limpio, ritmo | 0 s |
| **Corte por coincidencia** (match cut) | una forma o un movimiento continúa en la escena siguiente | 0,4–0,8 s |
| **Cortinilla con máscara** | algo nuevo «tapa» lo anterior; capítulos | 0,5–0,8 s |
| **Empuje** (push) | avanzar en una lista o una secuencia | 0,5–0,7 s |
| **Zoom de entrada** (zoom through) | entrar «dentro» de un elemento (una pantalla, una palabra) | 0,6–1 s |

## Corte por coincidencia: el disco se convierte en el fondo de la escena siguiente
```js
tl.to("#e1 .disco", { scale: 14, duration: 0.6, ease: "power3.in" }, T);  // crece hasta llenar el cuadro
tl.set("#e2", { visibility: "visible" }, T + 0.6);                         // e2 tiene el fondo del mismo color
tl.set("#e1", { visibility: "hidden" }, T + 0.6);
```

## Cortinilla con máscara (clip-path)
```js
tl.set("#e3", { visibility: "visible", clipPath: "inset(100% 0% 0% 0%)" }, T);
tl.to("#e3", { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.inOut" }, T);
tl.set("#e2", { visibility: "hidden" }, T + 0.6);
```
Otras formas: `circle(0% at 50% 50%)` → `circle(75% at 50% 50%)` (iris), o `inset` desde otro lado.

## Empuje
```js
tl.set("#e4", { visibility: "visible", x: 1080 }, T);
tl.to("#e3", { x: -1080, duration: 0.6, ease: "power3.inOut" }, T);
tl.to("#e4", { x: 0, duration: 0.6, ease: "power3.inOut" }, T);
tl.set("#e3", { visibility: "hidden" }, T + 0.6);
```

## Zoom de entrada (zoom through)
El elemento por el que entras (aquí, una ventana oscura de 300 px centrada en 540, 900) tiene **el mismo color que el
fondo de la escena siguiente**. La escena entera crece hasta que ese elemento llena el cuadro y, en ese instante,
cambia la escena.
```js
tl.to("#e1", { scale: 8, transformOrigin: "540px 900px", duration: 0.7, ease: "power3.in" }, T);
tl.set("#e2", { visibility: "visible" }, T + 0.7);
tl.set("#e1", { visibility: "hidden" }, T + 0.7);
tl.from("#e2 p", { scale: 1.3, opacity: 0, duration: 0.6, ease: "power3.out" }, T + 0.7);  // lo de dentro se asienta
```
- `transformOrigin` es el centro del elemento.
- La escala tiene que bastar para cubrir el cuadro entero: escala ≥ (distancia del centro del elemento al borde
  más lejano del cuadro) / (mitad del lado del elemento). En el ejemplo: (1920 − 900) / 150 = 6,8; se usa 8 por
  margen.
- Error típico: hacer un fundido de las dos escenas enteras. Se ven los bordes de la escena nueva, como una postal
  pequeña, y se pierde la sensación de entrar.

## Errores típicos
- Las dos escenas con el mismo color de fondo en un empuje: no se ve el movimiento. Cambia el tono de una.
- Una transición distinta en cada cambio: el vídeo parece un muestrario. Elige una o dos para toda la pieza.
- Transiciones de más de 1 s en un vídeo de 20 s: se comen el tiempo de lectura.
