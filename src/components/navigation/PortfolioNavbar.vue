<template>
  <nav ref="navRoot" class="navbar" aria-label="Navigazione principale">
    <div class="navbar__inner">
      <RouterLink class="navbar__brand" :to="{ name: 'home' }" @click="closeMenu">
        <span>Giuseppe.</span>
      </RouterLink>

      <ul v-if="items.length" class="navbar__links">
        <li v-for="item in items" :key="item.id">
          <a
            :href="`#${item.id}`"
            :style="{ '--tab-color': item.tabColor }"
            :aria-current="activeId === item.id ? 'location' : undefined"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <PencilMenuButton
        v-if="items.length"
        ref="menuButton"
        class="navbar__menu-button"
        :expanded="menuOpen"
        aria-controls="navbar-drawer"
        @click="toggleMenu"
      />
    </div>

    <Transition name="drawer">
      <div v-if="menuOpen" id="navbar-drawer" ref="drawer" class="navbar__drawer">
        <ol>
          <li v-for="item in items" :key="item.id">
            <a
              :href="`#${item.id}`"
              :aria-current="activeId === item.id ? 'location' : undefined"
              @click="closeMenu"
            >
              {{ item.label }}
            </a>
          </li>
        </ol>
        <small>La pagina dove sei è cerchiata</small>
      </div>
    </Transition>

    <span
      class="navbar__progress"
      :style="{ transform: `scaleX(${readingProgress / 100})` }"
      aria-hidden="true"
    ></span>
  </nav>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PencilMenuButton from '@/components/primitives/PencilMenuButton.vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
})

const navRoot = ref(null)
const menuButton = ref(null)
const drawer = ref(null)
const menuOpen = ref(false)
const readingProgress = ref(0)
const activeId = ref(null)
let framePending = false

function updatePosition() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = maxScroll > 0 ? Math.min(100, Math.max(0, window.scrollY / maxScroll * 100)) : 0

  let current = null
  for (const item of props.items) {
    const section = document.getElementById(item.id)
    if (!section) continue
    // Una sezione con margine di scorrimento è "raggiunta" dove la portano le ancore.
    const anchorOffset = Number.parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0
    if (section.getBoundingClientRect().top - anchorOffset < window.innerHeight * 0.4) current = item.id
  }
  activeId.value = current
  framePending = false
}

function requestPositionUpdate() {
  if (framePending) return
  framePending = true
  window.requestAnimationFrame(updatePosition)
}

async function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    await nextTick()
    drawer.value?.querySelector('a')?.focus()
  }
}

function closeMenu() {
  menuOpen.value = false
}

function handleKeydown(event) {
  if (event.key !== 'Escape' || !menuOpen.value) return
  closeMenu()
  menuButton.value?.focus()
}

function handlePointerDown(event) {
  if (menuOpen.value && !navRoot.value?.contains(event.target)) closeMenu()
}

watch(
  () => props.items,
  () => {
    closeMenu()
    updatePosition()
  },
  { flush: 'post' },
)

onMounted(() => {
  updatePosition()
  window.addEventListener('scroll', requestPositionUpdate, { passive: true })
  window.addEventListener('resize', requestPositionUpdate, { passive: true })
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('pointerdown', handlePointerDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', requestPositionUpdate)
  window.removeEventListener('resize', requestPositionUpdate)
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('pointerdown', handlePointerDown)
})
</script>

<style scoped>
.navbar {
  position: sticky;
  top: env(safe-area-inset-top, 0);
  z-index: 50;
  background: var(--paper);
  border-bottom: 0.125rem dashed #c9c1b0;
  box-shadow: 0 0.125rem 0 var(--paper);
}

.navbar__inner {
  display: flex;
  gap: var(--space-4);
  align-items: center;
  width: min(100%, var(--content-width));
  height: var(--navbar-height);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

.navbar__brand {
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
}

.navbar__brand span {
  background: linear-gradient(transparent 55%, var(--tab-yellow) 55% 90%, transparent 90%);
}

.navbar__links {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
  align-self: stretch;
  align-items: flex-start;
  margin-block: 0;
  padding: 0;
  list-style: none;
}

.navbar__links a {
  display: block;
  margin-top: var(--navbar-height);
  padding: 0.375rem 0.625rem 0.5rem;
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: 1.1875rem;
  font-weight: 700;
  text-decoration: none;
  background: var(--tab-color);
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0 0.125rem 0 rgb(38 50 58 / 12%);
  transform: translateY(-62%);
  transition: transform var(--duration-fast) var(--ease-out);
}

.navbar__links a[aria-current] {
  transform: translateY(-38%);
}

.navbar__links a:focus-visible,
.navbar__menu-button:focus-visible,
.navbar__drawer a:focus-visible {
  outline: 0.1875rem solid var(--focus);
  outline-offset: 0.125rem;
}

.navbar__menu-button {
  display: none;
  margin-left: auto;
}

.navbar__progress {
  position: absolute;
  bottom: -0.125rem;
  left: 0;
  width: calc(100% - 0.35rem);
  height: 0.125rem;
  transform-origin: left center;
  background: linear-gradient(
    90deg,
    rgb(74 77 80 / 72%),
    var(--graphite) 78%,
    rgb(74 77 80 / 48%) 100%
  );
  box-shadow: 0 0.025rem 0.08rem rgb(36 48 58 / 28%);
}

.navbar__progress::after {
  content: "";
  position: absolute;
  top: -0.17rem;
  right: -0.2rem;
  width: 0.85rem;
  height: 0.45rem;
  background:
    radial-gradient(ellipse at 42% 52%, rgb(74 77 80 / 65%) 0 16%, rgb(74 77 80 / 32%) 38%, transparent 74%),
    radial-gradient(ellipse at 68% 38%, rgb(36 48 58 / 30%) 0 8%, transparent 42%);
  border-radius: 46% 58% 41% 62%;
  filter: blur(0.025rem);
  rotate: -4deg;
}

.navbar__drawer {
  position: absolute;
  top: 4rem;
  right: 0.875rem;
  width: min(13rem, calc(100vw - 1.75rem));
  padding: 1.625rem 1rem 1rem;
  background: var(--tab-yellow);
  box-shadow: 0 0.75rem 1rem -0.375rem rgb(38 50 58 / 35%);
  transform-origin: 90% 0;
  rotate: 2.5deg;
}

.drawer-enter-active,
.drawer-leave-active {
  transition:
    opacity 180ms var(--ease-out),
    transform 220ms var(--ease-drawer);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-0.75rem) scale(0.97);
}

.navbar__drawer::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 1rem;
  background: rgb(36 48 58 / 5%);
}

.navbar__drawer ol {
  display: grid;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navbar__drawer a {
  display: inline-block;
  min-height: 2.5rem;
  padding-inline: 0.5rem;
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: 1.5625rem;
  font-weight: 700;
  text-decoration: none;
}

.navbar__drawer a[aria-current] {
  border: 0.125rem solid var(--pen-red);
  border-radius: 50% 46% 52% 44% / 60% 50% 56% 48%;
  rotate: -2deg;
}

.navbar__drawer small {
  display: block;
  margin-top: 0.625rem;
  color: var(--ink-soft);
  font-family: var(--font-hand);
  font-size: 1rem;
  line-height: 1.2;
}

@media (hover: hover) and (pointer: fine) {
  .navbar__links a:hover {
    transform: translateY(-38%);
  }
}

@media (max-width: 40rem) {
  .navbar__links {
    display: none;
  }

  .navbar__menu-button {
    display: inline-flex;
  }
}

@media (prefers-reduced-motion: reduce) {
  .navbar__links a {
    transition: none;
  }

  .drawer-enter-active,
  .drawer-leave-active {
    transition: opacity var(--duration-micro) linear;
  }

  .drawer-enter-from,
  .drawer-leave-to {
    transform: none;
  }
}
</style>
