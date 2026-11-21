# Movimiento con peso (código probado con HyperFrames 0.8.145 y GSAP 3.14.2)

`tl` es el único timeline; `T`, el segundo en que empieza el gesto.

## Anticipación
Un gesto pequeño y contrario antes del principal. Prepara el ojo: «algo va a pasar hacia allí».
```js
tl.to(".bola", { x: -30, duration: 0.25, ease: "power2.out" }, T);          // retrocede un poco
tl.to(".bola", { x: 700, duration: 0.9, ease: "power2.inOut" }, T + 0.25);   // y sale
```
Proporción orientativa: la anticipación dura entre la cuarta y la tercera parte del movimiento principal y recorre
mucha menos distancia.

## Superposición (overlapping action)
Las partes de un conjunto no salen ni llegan a la vez. `stagger` desfasa cada elemento:
```js
tl.from(".tarjeta", { x: -1000, duration: 0.7, ease: "power3.out", stagger: 0.12 }, T);
```
- **Desfase pequeño** (0,05–0,1 s): se lee como un bloque con vida.
- **Desfase grande** (0,2 s o más): se lee como elementos separados.

## Continuación y asentamiento (follow-through)
Al llegar, se pasa un poco y vuelve. Se puede sumar a otro movimiento con una segunda animación (tween) sobre otra propiedad:
```js
tl.from(".tarjeta", { rotation: -4, duration: 0.9, ease: "back.out(3)", stagger: 0.12 }, T);
```
`back.out(n)`: cuanto mayor es `n`, más se pasa. Úsalo en un detalle; si todo rebota, el vídeo parece de dibujos
animados.

## Arcos
Lo orgánico se mueve en curva. Se consigue con dos tweens a la vez: uno para `x` y otro para `y`, con curvas
distintas:
```js
tl.to(".bola", { x: 700, duration: 0.9, ease: "power2.inOut" }, T);
tl.to(".bola", { y: -110, duration: 0.45, ease: "power2.out", yoyo: true, repeat: 1 }, T);  // sube y baja
```
Comprueba con una captura a mitad del arco que la trayectoria no atraviesa otros elementos.

## Qué propiedades animar
Anima `x`, `y`, `scale`, `rotation` y `opacity`, porque se interpolan con subpíxeles. Evita `left`, `top`, `width`,
`height`, `letter-spacing` y `margin`: saltan de píxel en píxel y el `lint` de HyperFrames los marca.
