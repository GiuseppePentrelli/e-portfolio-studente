<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__top">
        <div class="footer__label" aria-label="Etichetta del portfolio">
          <p><small>Nome</small><strong>Giuseppe Pentrelli</strong></p>
          <p><small>Materia</small><strong>Sviluppo web</strong></p>
          <p><small>Anno</small><strong>2026–2027</strong></p>
        </div>

        <nav class="footer__columns" aria-label="Navigazione nel footer">
          <div v-if="links.length">
            <h2>Quaderno</h2>
            <ul>
              <li v-for="link in links" :key="link.id">
                <a :href="`#${link.id}`">{{ link.label }}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Altrove</h2>
            <ul class="footer__elsewhere">
              <li class="footer__social-stamps">
                <SocialStampLink
                  platform="github"
                  label="GitHub"
                  href="https://github.com/Giuseppe-Pentrelli"
                />
                <SocialStampLink
                  platform="linkedin"
                  label="LinkedIn"
                  href="https://it.linkedin.com/in/giuseppe-pentrelli-dev"
                />
              </li>
              <li><a href="mailto:giuseppe.pentrelli.dev@gmail.com">Scrivimi</a></li>
            </ul>
          </div>
        </nav>

        <div class="footer__barcode" aria-hidden="true">
          <span></span>
          <code>8 012026 100928</code>
          <small>80 fogli · rigo 28px</small>
        </div>
      </div>

    </div>

    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <p>© 2026 Giuseppe · scritto a mano, compilato con <code>npm run build</code></p>
        <a class="footer__back-to-top" href="#main-content">Torna su <span aria-hidden="true">↑</span></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import SocialStampLink from '@/components/primitives/SocialStampLink.vue'

defineProps({
  links: { type: Array, default: () => [] },
})
</script>

<style scoped>
.footer {
  margin-top: var(--space-8);
  color: var(--pen-black);
  background:
    repeating-linear-gradient(92deg, rgb(90 64 30 / 5%) 0 0.125rem, transparent 0.125rem 0.4375rem),
    var(--cover-board);
  border-top: 0.375rem solid var(--cover-board-edge);
}

.footer__inner,
.footer__bottom-inner {
  width: min(100%, 65rem);
  margin-inline: auto;
}

.footer__inner {
  padding: 2.125rem var(--space-4) 1.625rem;
}

.footer__top {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) auto;
  gap: 1.75rem;
  align-items: start;
}

.footer__label {
  display: grid;
  gap: var(--space-1);
  max-width: 21.25rem;
  padding: 0.75rem 1rem;
  background: var(--cover-label);
  border: 0.125rem solid var(--cover-label);
  border-radius: 0.625rem;
  outline: 0.125rem solid var(--cover-label-ink);
  outline-offset: -0.4375rem;
  box-shadow: 0.125rem 0.1875rem 0 rgb(0 0 0 / 12%);
  rotate: -1deg;
}

.footer__label p {
  display: flex;
  gap: var(--space-2);
  align-items: baseline;
  padding: 0.125rem var(--space-1);
  border-bottom: 0.09375rem solid var(--cover-label-rule);
}

.footer__label small {
  flex: 0 0 4rem;
  color: var(--cover-label-ink);
  font-family: var(--font-code);
  font-size: 0.625rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.footer__label strong {
  font-family: var(--font-hand);
  font-size: 1.4375rem;
  line-height: 1.1;
}

.footer__columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.125rem;
}

.footer__columns h2 {
  margin-bottom: 0.375rem;
  color: #5a4a2a;
  font-family: var(--font-code);
  font-size: 0.65625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.footer__columns ul {
  display: grid;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__columns a {
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: 1.3125rem;
  font-weight: 700;
  text-decoration: none;
}

.footer__columns a:hover {
  text-decoration: underline;
  text-underline-offset: 0.1875rem;
}

.footer__social-stamps {
  display: flex;
  gap: 0.9rem;
  align-items: start;
  padding-block: 0.2rem 0.55rem;
}

.footer__columns .footer__social-stamps a:hover {
  text-decoration: none;
}

.footer__columns a:focus-visible,
.footer__back-to-top:focus-visible {
  outline: 0.1875rem solid var(--focus);
  outline-offset: 0.1875rem;
}

.footer__barcode {
  display: grid;
  gap: 0.125rem;
  justify-items: center;
  padding: 0.625rem 0.75rem 0.375rem;
  background: var(--cover-label);
  box-shadow: 0.0625rem 0.125rem 0 rgb(0 0 0 / 12%);
}

.footer__barcode > span {
  width: 9.375rem;
  height: 2.875rem;
  background: repeating-linear-gradient(
    90deg,
    #222 0 0.125rem,
    transparent 0.125rem 0.1875rem,
    #222 0.1875rem 0.25rem,
    transparent 0.25rem 0.4375rem,
    #222 0.4375rem 0.625rem,
    transparent 0.625rem 0.6875rem,
    #222 0.6875rem 0.75rem,
    transparent 0.75rem 0.9375rem
  );
}

.footer__barcode code {
  font-family: var(--font-code);
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
}

.footer__barcode small {
  color: #555;
  font-family: var(--font-code);
  font-size: 0.59375rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer__bottom {
  color: #4a3e26;
  border-top: 0.09375rem dashed #8e7a55;
  font-size: 0.8125rem;
}

.footer__bottom-inner {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem var(--space-4) 1.375rem;
}

.footer__bottom code {
  font-family: var(--font-code);
}

.footer__back-to-top {
  padding-inline: 0.75rem;
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: 1.3125rem;
  font-weight: 700;
  text-decoration: none;
  background: var(--cover-label);
  border: 0.125rem solid var(--pen-black);
  border-radius: 0.5rem 0.625rem 0.4375rem 0.5625rem;
  box-shadow: 0.125rem 0.125rem 0 var(--pen-black);
}

@media (max-width: 48rem) {
  .footer__top {
    grid-template-columns: minmax(0, 1fr);
  }

  .footer__barcode {
    justify-self: start;
  }
}

@media (max-width: 27rem) {
  .footer__columns {
    grid-template-columns: minmax(0, 1fr);
  }

  .footer__label strong {
    font-size: 1.25rem;
  }
}
</style>
