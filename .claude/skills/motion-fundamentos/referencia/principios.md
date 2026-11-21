# Principios de referencia

## 1. Fotograma clave e interpolación
Un **fotograma clave** (keyframe) fija el valor de una propiedad (posición, escala, opacidad…) en un instante. El
programa calcula los valores intermedios: eso es la **interpolación**. La curva de interpolación (el **easing**)
decide cómo se reparten esos valores en el tiempo.

## 2. Timing y espaciado (spacing)
- **Timing:** cuánto dura un movimiento.
- **Spacing:** cómo se reparte la distancia entre fotogramas.

Con el mismo timing, un espaciado distinto cuenta otra cosa:
- espaciado igual: mecánico;
- apretado al final: frena;
- apretado al principio: arranca.

## 3. Curvas de easing (nombres en GSAP)
| Curva | Fórmula de progreso p(t), t ∈ [0,1] | Sensación | Uso típico |
|---|---|---|---|
| `none` / `linear` | t | máquina, constante | cintas, giros continuos, contadores |
| `power1.out` (= quad) | 1 − (1 − t)² | frenada suave | movimientos pequeños |
| `power2.out` (= cubic) | 1 − (1 − t)³ | frenada clara | entradas generales |
| `power3.out` (= quart) | 1 − (1 − t)⁴ | llega rápido y se posa | titulares, tarjetas |
| `power4.out` (= quint) | 1 − (1 − t)⁵ | golpe y calma | revelados con máscara |
| `power2.in` | t³ | arranca lento y se va | salidas |
| `power2.inOut` | aceleración y frenada | de A a B con peso | movimientos de cámara |
| `back.out(1.7)` | se pasa del destino y vuelve | se pasa y vuelve, desenfadado | acentos, iconos (con moderación) |

Equivalencias publicadas por GreenSock: power1 = quad, power2 = cubic, power3 = quart, power4 = quint. Las
ecuaciones clásicas de easing son de Robert Penner (2001, licencias MIT y BSD).

## 4. Principios de animación útiles en motion graphics
De los doce principios descritos por Frank Thomas y Ollie Johnston en *Disney Animation: The Illusion of Life*
(1981), estos se aplican directamente a gráficos:
- **Aceleración y desaceleración** (slow in / slow out): el easing.
- **Anticipación:** un pequeño gesto contrario antes del movimiento principal.
- **Continuación y superposición** (follow-through / overlapping action): las partes no paran a la vez.
- **Arcos:** lo orgánico se mueve en curvas, no en líneas rectas.
- **Exageración** y **puesta en escena** (staging): una sola idea clara cada vez.
- **Timing.**

## 5. Contraste WCAG 2
- **Luminancia relativa:** L = 0,2126 R + 0,7152 G + 0,0722 B. Cada canal en lineal: c/255; si es ≤ 0,04045, se
  divide entre 12,92; si no, ((c + 0,055) / 1,055)^2,4.
- **Ratio:** (L₁ + 0,05) / (L₂ + 0,05), con L₁ como la mayor.
- **Nivel AA:** 4,5:1 en texto normal y 3:1 en texto grande.

## 6. Universal frente a específico
Todo lo anterior vale en cualquier programa. Lo que cambia es dónde se toca:
- **After Effects:** Graph Editor; Easy Ease con F9.
- **CapCut:** fotogramas clave; las opciones de curva cambian según la versión, así que conviene comprobarlas en la
  tuya.
- **DaVinci Resolve:** editor de curvas de los fotogramas clave.
- **HyperFrames:** el parámetro `ease` de GSAP.
