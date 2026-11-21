# Mover con intención · skills de motion graphics para Claude Code

Las cuatro skills del minicurso gratuito «Mover con intención», de El Estudio de Nadie:

| Skill | Para qué sirve |
|---|---|
| `motion-fundamentos` | Lienzo 9:16, zona segura, retícula, jerarquía, contraste y timing. Crea una ficha y un fotograma de estilo, o revisa un fotograma. |
| `motion-storyboard` | Convierte una idea en un storyboard por escenas, con su concepto y sus reglas visuales. |
| `motion-tipografia` | Anima el texto: máscaras, escalonados, énfasis, sustituciones y máquina de escribir. |
| `motion-avanzado` | Formas, 2.5D con cámara, transiciones, movimiento con peso, audio y render del vídeo. |

Las explicaciones, los ejercicios y el proyecto completo están en el PDF del minicurso.

## Instalar (lo hace Claude Code por ti)
1. Crea una carpeta para tus proyectos (por ejemplo, `estudio`) y abre la terminal dentro.
2. Escribe `claude` y pega este mensaje:

```
Instala las skills del minicurso «Mover con intención» en esta carpeta:
1. Descarga el repositorio https://github.com/alissonallgayer/mover-con-intencion en una carpeta temporal (con git clone; si no tienes git, descarga el ZIP de GitHub).
2. Copia su carpeta .claude/skills/ dentro de esta carpeta, sin crear carpetas de más, y borra la carpeta temporal.
3. Comprueba que en .claude/skills/ hay cuatro carpetas motion-, cada una con su SKILL.md.
4. Comprueba node -v (versión 22 o superior) y ffmpeg -version. Si falta algo, dime cómo instalarlo en mi sistema, pero no instales nada sin mi permiso.
5. Termina con una tabla corta: cada skill (instalada sí o no) y cada requisito (bien o qué falta).
```

3. Escribe `/exit`, vuelve a abrir `claude` y escribe `/motion` para ver las cuatro.

**A mano:** copia la carpeta `.claude/skills/` de este repositorio dentro de tu carpeta de proyectos.

## Requisitos
- Claude Code con un plan Pro o superior (o la Consola de Anthropic).
- Para renderizar: Node.js 22 o superior y FFmpeg. Las skills usan HyperFrames 0.8.145, que se descarga solo con `npx` la primera vez.

## Licencia
Ver [`LICENCIA.txt`](LICENCIA.txt): puedes usar y modificar las skills en tus proyectos y en encargos para clientes;
no las revendas ni las distribuyas como producto propio.
