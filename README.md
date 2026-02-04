# Etch-a-Sketch
A browser-based drawing tool built with vanilla JavaScript. This project features a unique **progressive darkening** mechanic where squares retain their assigned colors but get darker with every pass of the mouse or finger.
## Key Features

* **Dynamic Grid Generation:** Customize the resolution of the canvas instantly.
* **Progressive Shading:** Squares start at white and gradually reach 100% black.
* **Persistent Hue Logic:** Each square is assigned a random hue on the first touch, which it remembers even if you stop and start drawing again.
* **Dual Mode:** Dedicated buttons to switch between **Pen** (Darkening) and **Eraser** (Reset) tools.

## What I Learned

* **State Management with Data Attributes:** I learned how to use `HTMLElement.dataset` to store "memory" directly on the DOM, allowing individual squares to track their own lightness and color state.
* **The HSL Color Model:** I discovered why **HSL** (Hue, Saturation, Lightness) is superior to RGB for programmatic styling, specifically for creating shading and random color effects.

## Built With

* **HTML5**
* **CSS3** (Flexbox, CSS Variables, Media Queries)
* **JavaScript** (DOM Manipulation, Pointer Events API)

## How It Works

### The Darkening Logic

The application tracks the "lightness" of each square using the `data-lightness` attribute. When a square is interacted with:

1. It checks for an existing `data-hue`. If none exists, one is generated via .
2. It subtracts value from the current lightness value.
3. It updates the background using the HSL color model:

### Click-and-Drag

To ensure a natural drawing feel, the app uses a global `isDrawing` state combined with `pointerenter`.

