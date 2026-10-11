<template>
  <a
    class="social-stamp"
    :class="`social-stamp--${platform}`"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`${label} — apre il profilo in una nuova scheda`"
  >
    <span class="social-stamp__paper" aria-hidden="true">
      <span class="social-stamp__face">
        <!-- Tracciati ufficiali: GitHub Brand Toolkit e LinkedIn [in] Logo. -->
        <svg v-if="platform === 'github'" viewBox="0 0 128 128" role="presentation">
          <path d="M56.7937 84.9688C44.4187 83.4688 35.7 74.5625 35.7 63.0313C35.7 58.3438 37.3875 53.2813 40.2 49.9063C38.9812 46.8125 39.1687 40.25 40.575 37.5313C44.325 37.0625 49.3875 39.0313 52.3875 41.75C55.95 40.625 59.7 40.0625 64.2937 40.0625C68.8875 40.0625 72.6375 40.625 76.0125 41.6563C78.9187 39.0313 84.075 37.0625 87.825 37.5313C89.1375 40.0625 89.325 46.625 88.1062 49.8125C91.1062 53.375 92.7 58.1563 92.7 63.0313C92.7 74.5625 83.9812 83.2813 71.4187 84.875C74.6062 86.9375 76.7625 91.4375 76.7625 96.5938V106.344C76.7625 109.156 79.1062 110.75 81.9187 109.625C98.8875 103.156 112.2 86.1875 112.2 65.1875C112.2 38.6563 90.6375 17 64.1062 17C37.575 17 16.2 38.6562 16.2 65.1875C16.2 86 29.4187 103.25 47.2312 109.719C49.7625 110.656 52.2 108.969 52.2 106.438V98.9375C50.8875 99.5 49.2 99.875 47.7 99.875C41.5125 99.875 37.8562 96.5 35.2312 90.2188C34.2 87.6875 33.075 86.1875 30.9187 85.9063C29.7937 85.8125 29.4187 85.3438 29.4187 84.7813C29.4187 83.6563 31.2937 82.8125 33.1687 82.8125C35.8875 82.8125 38.2312 84.5 40.6687 87.9688C42.5437 90.6875 44.5125 91.9063 46.8562 91.9063C49.2 91.9063 50.7 91.0625 52.8562 88.9063C54.45 87.3125 55.6687 85.9063 56.7937 84.9688Z" fill="#fff" />
        </svg>

        <svg v-else viewBox="0 0 24 24" role="presentation">
          <path fill="#0077b5" d="M22.2 0H1.8C.8 0 0 .8 0 1.7v20.5c0 1 .8 1.7 1.8 1.7h20.5c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
          <path fill="#fff" d="M3.6 9h3.6v11.5H3.6V9Zm1.7-5.7c1.1 0 2.1.9 2.1 2.1s-.9 2-2.1 2c-1.1 0-2.1-.9-2.1-2.1s.9-2 2.1-2ZM9.4 9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.3h-3.6V15c0-1.3 0-3-1.9-3-1.9 0-2.1 1.4-2.1 2.9v5.7H9.4V9Z" />
        </svg>
      </span>
    </span>
    <span class="social-stamp__label">{{ label }}</span>
  </a>
</template>

<script setup>
defineProps({
  platform: {
    type: String,
    required: true,
    validator: value => ['github', 'linkedin'].includes(value),
  },
  href: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.social-stamp {
  display: grid;
  gap: 0.2rem;
  justify-items: center;
  color: var(--pen-black);
  text-decoration: none;
  transition: transform var(--transition-fast);
}

.social-stamp--github {
  rotate: -2deg;
}

.social-stamp--linkedin {
  rotate: 2.5deg;
}

.social-stamp__paper {
  position: relative;
  display: grid;
  width: 4.15rem;
  aspect-ratio: 0.72;
  place-items: center;
  filter:
    drop-shadow(0.075rem 0 0 rgb(20 24 27 / 95%))
    drop-shadow(-0.075rem 0 0 rgb(20 24 27 / 95%))
    drop-shadow(0 0.075rem 0 rgb(20 24 27 / 95%))
    drop-shadow(0 -0.075rem 0 rgb(20 24 27 / 95%))
    drop-shadow(0.15rem 0.2rem 0.18rem rgb(38 50 58 / 20%));
}

.social-stamp__face {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  place-items: center;
  padding: 1.05rem 0.72rem;
  background:
    radial-gradient(circle at 14% 22%, rgb(114 87 47 / 13%) 0 0.055rem, transparent 0.12rem),
    radial-gradient(circle at 78% 72%, rgb(90 68 40 / 9%) 0 0.08rem, transparent 0.17rem),
    radial-gradient(ellipse at 48% 8%, rgb(121 91 49 / 10%), transparent 42%),
    repeating-linear-gradient(96deg, rgb(83 68 46 / 2%) 0 0.04rem, transparent 0.04rem 0.28rem),
    #eee5cf;
  mask:
    linear-gradient(#000 0 0) center / calc(100% - 0.5rem) calc(100% - 0.5rem) no-repeat,
    radial-gradient(circle, #000 68%, transparent 72%) top left / 0.5rem 0.5rem repeat-x,
    radial-gradient(circle, #000 68%, transparent 72%) bottom left / 0.5rem 0.5rem repeat-x,
    radial-gradient(circle, #000 68%, transparent 72%) top left / 0.5rem 0.5rem repeat-y,
    radial-gradient(circle, #000 68%, transparent 72%) top right / 0.5rem 0.5rem repeat-y;
}

.social-stamp__face::after {
  content: "";
  position: absolute;
  z-index: 2;
  width: 3.9rem;
  height: 2.7rem;
  background:
    radial-gradient(
      circle at 18% 50%,
      transparent 0 0.92rem,
      rgb(75 67 55 / 48%) 0.95rem 1.04rem,
      transparent 1.08rem 1.22rem,
      rgb(75 67 55 / 30%) 1.25rem 1.32rem,
      transparent 1.36rem
    ),
    repeating-linear-gradient(
      174deg,
      transparent 0 0.34rem,
      rgb(75 67 55 / 38%) 0.36rem 0.43rem,
      transparent 0.45rem 0.69rem
    );
  opacity: 0.72;
  pointer-events: none;
}

.social-stamp--github .social-stamp__face::after {
  top: -0.18rem;
  left: -2.75rem;
  rotate: -8deg;
}

.social-stamp--linkedin .social-stamp__face::after {
  right: -2.65rem;
  bottom: -0.28rem;
  rotate: 11deg;
}

.social-stamp svg {
  position: relative;
  z-index: 1;
  display: block;
  width: auto;
  height: 100%;
  max-width: 100%;
}

.social-stamp--github svg {
  padding: 0.16rem;
  background: #1f2328;
  border-radius: 50%;
}

.social-stamp__label {
  font-family: var(--font-hand);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
}

.social-stamp:active {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .social-stamp:hover {
    transform: translateY(-0.18rem);
  }
}

.social-stamp:focus-visible {
  outline: 0.1875rem solid var(--focus);
  outline-offset: 0.25rem;
  border-radius: 0.2rem;
}

@media (prefers-reduced-motion: reduce) {
  .social-stamp {
    transition: opacity var(--duration-micro) linear;
  }

  .social-stamp:active {
    transform: none;
    opacity: 0.75;
  }
}
</style>
