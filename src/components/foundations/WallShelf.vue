<template>
  <!-- La mensola sulla parete, vista un po' dall'alto: libri di programmazione, una paperella di
       gomma (quella a cui si spiega il codice per trovare l'errore) e una piantina grassa. Quello che
       arriva dallo slot sta a destra della piantina. Decorativa. Le misure sono in em. -->
  <div class="shelf" aria-hidden="true">
    <div class="shelf__items">
      <span class="shelf__books">
        <i style="--book: #c4472f; --h: 9.4em">HTML</i>
        <i style="--book: #2f6fb5; --h: 10.2em">CSS</i>
        <i style="--book: #d9b13a; --h: 8.8em; --ink: #2a2414">JS</i>
        <i style="--book: #3f9c6d; --h: 9.8em">Vue</i>
        <i class="shelf__book--lean" style="--book: #6b4fb8; --h: 9em">Git</i>
      </span>
      <span class="shelf__duck"><i></i></span>
      <span class="shelf__plant"><i></i><i></i><i></i></span>
      <slot />
    </div>
    <span class="shelf__plank"></span>
    <span class="shelf__bracket"></span>
    <span class="shelf__bracket shelf__bracket--right"></span>
  </div>
</template>

<style scoped>
.shelf {
  position: relative;
  width: 34em;
  font-size: 1rem;
}

.shelf__items {
  display: flex;
  gap: 1.8em;
  align-items: flex-end;
  padding: 0 2em 0 1.6em;
}

.shelf__books {
  display: flex;
  gap: 0.15em;
  align-items: flex-end;
}

/* I dorsi dei libri: colore, un'ombra sui bordi e il titolo scritto in verticale. */
.shelf__books i {
  display: grid;
  place-items: center;
  width: 2.3em;
  height: var(--h);
  padding-block: 0.6em;
  color: var(--ink, #f5efe2);
  font-family: var(--font-code);
  font-size: 1em;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.08em;
  writing-mode: vertical-rl;
  background:
    linear-gradient(transparent 0 10%, rgb(0 0 0 / 22%) 10% 12%, transparent 12% 86%, rgb(0 0 0 / 22%) 86% 88%, transparent 88%),
    linear-gradient(90deg, rgb(0 0 0 / 30%), transparent 18% 72%, rgb(0 0 0 / 35%)),
    var(--book);
  border-radius: 0.2em;
}

.shelf__books i span,
.shelf__books i {
  line-height: 1;
}

/* L'ultimo libro è inclinato e si appoggia agli altri. */
.shelf__book--lean {
  margin-left: 0.9em;
  rotate: 16deg;
  transform-origin: 0 100%;
}

/* La paperella: corpo, testa, becco arancione e un occhio. */
.shelf__duck {
  position: relative;
  width: 4.4em;
  height: 4.6em;
}

.shelf__duck::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 4.4em;
  height: 2.9em;
  background: radial-gradient(ellipse at 40% 30%, #ffe766, #f5c518 60%, #c99a0c);
  border-radius: 50% 55% 45% 50% / 60% 60% 40% 40%;
}

.shelf__duck::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0.5em;
  width: 2.5em;
  height: 2.5em;
  background: radial-gradient(circle at 40% 35%, #fff07a, #f5c518 65%, #d5a512);
  border-radius: 50%;
}

.shelf__duck i {
  position: absolute;
  top: 1.05em;
  left: -0.25em;
  z-index: 1;
  width: 1.1em;
  height: 0.6em;
  background: #f08a24;
  border-radius: 50% 20% 20% 50%;
  box-shadow: 1.5em -0.35em 0 -0.22em #1b1b1b;
}

/* La piantina grassa: vaso di terracotta e tre foglie carnose. */
.shelf__plant {
  position: relative;
  width: 4em;
  height: 5.6em;
}

.shelf__plant::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0.3em;
  width: 3.4em;
  height: 2.8em;
  background: linear-gradient(90deg, rgb(0 0 0 / 25%), transparent 30% 70%, rgb(0 0 0 / 30%)), #c06a3e;
  clip-path: polygon(0 0, 100% 0, 88% 100%, 12% 100%);
}

.shelf__plant i {
  position: absolute;
  bottom: 2.3em;
  left: 1.5em;
  width: 1.1em;
  height: 3.2em;
  background: radial-gradient(ellipse at 40% 30%, #9ad18b, #4f9a5b 70%);
  border-radius: 50%;
  transform-origin: 50% 100%;
}

.shelf__plant i:nth-child(1) {
  rotate: -32deg;
}

.shelf__plant i:nth-child(3) {
  rotate: 34deg;
}

/* La mensola: la faccia superiore, chiara perché si vede dall'alto, e il bordo davanti. */
.shelf__plank {
  display: block;
  height: 1.8em;
  background:
    linear-gradient(#b98a5e 0 40%, #7b5132 40% 100%);
  border-radius: 0.15em;
  box-shadow: 0 0.8em 1em -0.3em rgb(0 0 0 / 60%);
  clip-path: polygon(1.2% 0, 98.8% 0, 100% 40%, 100% 100%, 0 100%, 0 40%);
}

.shelf__bracket {
  position: absolute;
  top: 100%;
  left: 3em;
  width: 2.2em;
  height: 2.6em;
  background: linear-gradient(90deg, #2a2f34, #4a5258);
  clip-path: polygon(0 0, 100% 0, 18% 100%, 0 100%);
}

.shelf__bracket--right {
  right: 3em;
  left: auto;
  scale: -1 1;
}
</style>
