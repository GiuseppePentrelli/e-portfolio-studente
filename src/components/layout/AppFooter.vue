<template>
  <footer class="mt-20 pt-14 pb-10 border-t border-border bg-surface"
    style="background-image: linear-gradient(180deg, transparent, rgba(245,200,66,.02))" id="contatti">
    <div class="max-w-330 mx-auto px-7">

      <!-- Eyebrow -->
      <SectionLabel :label="t('footer.eof')" class="mb-[18px]" />

      <!-- Titolo CTA -->
      <h2 class="font-sans font-bold leading-[1.05] tracking-[-0.02em] text-[clamp(36px,5vw,64px)] text-text mb-9"
        style="text-wrap: pretty">
        {{ t('footer.cta_title') }}<br>
        <span class="italic font-medium text-coral">{{ t('footer.cta_sub') }}</span>

      </h2>

      <!-- Mailto buttons -->
      <div class="flex flex-col sm:flex-row gap-3">
        <a :href="`mailto:${me.contact.email_personal}`" class="foot-mailto">
          {{ me.contact.email_personal }}
          <span aria-hidden="true" class="hidden sm:inline">→</span>
        </a>
        <a :href="`mailto:${me.contact.email_school}`" class="foot-mailto">
          {{ me.contact.email_school }}
          <span aria-hidden="true" class="hidden sm:inline">→</span>
        </a>
      </div>

      <!-- Grid 4 colonne -->
      <div class="foot-grid mt-7 pt-7 border-t border-dashed border-border-2">

        <!-- Where to find me -->
        <div class="foot-col">
          <p class="foot-label">{{ t('footer.where') }}</p>
          <a :href="me.contact.github_personal" target="_blank" rel="noopener noreferrer">
            github.com/{{ githubHandle }}
          </a>
          <a :href="me.contact.linkedin" target="_blank" rel="noopener noreferrer">
            {{ linkedinHandle }}
          </a>
          <a :href="`mailto:${me.contact.email_personal}`">
            {{ me.contact.email_personal }}
          </a>
        </div>

        <!-- Docs -->
        <div class="foot-col">
          <p class="foot-label">{{ t('footer.docs') }}</p>
          <a href="#">{{ t('footer.cv_it') }}</a>
          <a href="#">{{ t('footer.cv_en') }}</a>
          <a href="#">{{ t('footer.thesis') }}</a>
        </div>

        <!-- School -->
        <div class="foot-col">
          <p class="foot-label">{{ t('footer.school') }}</p>
          <span>{{ me.school.name }}</span>
          <span>{{ me.school.class }}</span>
          <span>{{ me.school.city }} · IT</span>
        </div>

        <!-- Shortcuts -->
        <div class="foot-col">
          <p class="foot-label">{{ t('footer.shortcuts') }}</p>
          <button @click="scrollToTop">{{ t('footer.scroll_top') }}</button>
          <button @click="scrollTo('capolavori')">{{ t('footer.goto_featured') }}</button>
          <button @click="scrollTo('projects')">{{ t('footer.goto_projects') }}</button>
        </div>

      </div>

      <!-- Bottom bar -->
      <div
        class="mt-10 pt-[22px] border-t border-border font-mono text-[11.5px] text-text-3 tracking-[.04em] flex flex-wrap items-center justify-between gap-4">
        <span>© {{ year }} {{ me.name }} · {{ t('footer.built_with') }}</span>
        <span class="inline-flex items-center gap-2">
          <span class="pulse-dot" aria-hidden="true"></span>
          git status · clean · main · {{ me.portfolio.version }}
        </span>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import me from '@/data/me.json'

const { t } = useLocale()

const year = new Date().getFullYear()

const githubHandle = computed(() =>
  me.contact.github_personal.replace('https://github.com/', '')
)

const linkedinHandle = computed(() =>
  me.contact.linkedin.replace('https://it.', '').replace('https://', '')
)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.foot-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 32px;
}

.foot-col .foot-label {
  font-family: var(--font-family-mono);
  font-size: 10.5px;
  color: var(--color-text-3);
  letter-spacing: .14em;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 0 12px;
}

.foot-col a,
.foot-col span,
.foot-col button {
  display: block;
  padding: 5px 0;
  font-size: 14px;
  font-family: var(--font-family-mono);
  color: var(--color-text-1);
  border-bottom: 1px solid transparent;
  transition: border-color .2s, color .2s;
  background: none;
  text-align: left;
  cursor: default;
  width: 100%;
}

.foot-col a:hover,
.foot-col button:hover {
  color: var(--color-gold);
  border-bottom-color: var(--color-gold);
  cursor: pointer;
}

.foot-mailto {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-family: var(--font-family-mono);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-gold);
  padding: 12px 16px;
  border: 1px solid var(--color-gold);
  border-radius: 8px;
  background: rgba(245, 200, 66, 0.08);
  transition: all .18s;
  overflow: hidden;
  word-break: break-all;
}

@media (min-width: 640px) {
  .foot-mailto {
    word-break: normal;
  }
}

.foot-mailto:hover {
  background: var(--color-gold);
  color: var(--color-bg);
  transform: translateY(-2px);
}

/* Pulsing green dot */
.pulse-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-green);
  box-shadow: 0 0 8px var(--color-green);
  animation: pulse 2.2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: .55;
    transform: scale(.85);
  }
}

@media (max-width: 1100px) {
  .foot-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .foot-grid {
    grid-template-columns: 1fr;
  }
}
</style>
