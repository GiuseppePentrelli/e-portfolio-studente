<template>
  <section id="componenti" aria-labelledby="components-title" class="mt-16">
    <div class="flex items-end justify-between mb-8 gap-4">
      <div>
        <SectionLabel :label="t('components.label')" class="mb-3" />
        <h2 id="components-title" class="font-sans font-bold text-[clamp(24px,3vw,36px)] leading-tight tracking-tight text-text">
          {{ t('components.title_1') }} <em class="italic font-medium text-coral">{{ t('components.title_em') }}</em>
        </h2>
      </div>
      <span class="font-mono text-xs text-text-3 shrink-0">
        {{ filtered.length }} / {{ components.length }}
      </span>
    </div>

    <!-- Filters -->
    <div class="comp-filters mb-8" role="group" :aria-label="t('components.label')">
      <button
        v-for="f in filters"
        :key="f.key"
        :class="['filter-btn', { active: active === f.key }]"
        @click="setFilter(f.key)"
      >
        {{ t(`components.filters.${f.key}`) }}
      </button>
    </div>

    <!-- Grid -->
    <Transition name="cgrid-swap" mode="out-in">
      <div :key="`${active}-${page}`" class="comp-grid">
        <ComponentCard
          v-for="(comp, i) in paginated"
          :key="comp.id"
          :component="comp"
          :style="{ '--i': i }"
        />
      </div>
    </Transition>

    <p v-if="filtered.length === 0" class="font-mono text-sm text-text-3 py-8">
      {{ t('components.empty') }}
    </p>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button class="page-btn" :disabled="page === 1" aria-label="Pagina precedente" @click="page--">←</button>

      <button
        v-for="n in totalPages"
        :key="n"
        :class="['page-dot', { active: n === page }]"
        :aria-label="`Pagina ${n}`"
        :aria-current="n === page ? 'page' : undefined"
        @click="page = n"
      >
        {{ n }}
      </button>

      <button class="page-btn" :disabled="page === totalPages" aria-label="Pagina successiva" @click="page++">→</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useLocale } from '@/composables/useLocale'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import ComponentCard from './ComponentCard.vue'
import components from '@/data/components.json'

const { t } = useLocale()

const PER_PAGE = 4

const filters = [
  { key: 'all' },
  { key: 'card' },
  { key: 'button' },
  { key: 'nav' },
  { key: 'form' },
]

const active = ref('all')
const page   = ref(1)

const filtered = computed(() =>
  active.value === 'all'
    ? components
    : components.filter(c => c.category === active.value)
)

const totalPages = computed(() => Math.ceil(filtered.value.length / PER_PAGE))

const paginated = computed(() => {
  const start = (page.value - 1) * PER_PAGE
  return filtered.value.slice(start, start + PER_PAGE)
})

function setFilter(key) {
  active.value = key
}

watch(active, () => { page.value = 1 })
</script>

<style scoped>
.comp-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-btn {
  font-family: var(--font-family-mono);
  font-size: 12px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  color: var(--color-text-2);
  background: transparent;
  cursor: pointer;
  transition: all .18s;
}
.filter-btn:hover {
  border-color: var(--color-text-2);
  color: var(--color-text);
}
.filter-btn.active {
  border-color: var(--color-gold);
  color: var(--color-gold);
  background: rgba(245, 200, 66, 0.08);
}

.comp-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
@media (max-width: 1280px) {
  .comp-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 900px) {
  .comp-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .comp-grid { grid-template-columns: 1fr; }
}

/* Grid swap transition */
.cgrid-swap-leave-active {
  transition: opacity .12s ease;
}
.cgrid-swap-enter-active {
  transition: opacity .2s ease;
}
.cgrid-swap-enter-from,
.cgrid-swap-leave-to {
  opacity: 0;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 32px;
}

.page-btn {
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--color-text-2);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all .18s;
}
.page-btn:hover:not(:disabled) {
  color: var(--color-text);
  border-color: var(--color-text-2);
}
.page-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.page-dot {
  font-family: var(--font-family-mono);
  font-size: 12px;
  font-weight: 500;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  color: var(--color-text-2);
  background: transparent;
  cursor: pointer;
  transition: all .18s;
}
.page-dot:hover {
  border-color: var(--color-text-2);
  color: var(--color-text);
}
.page-dot.active {
  border-color: var(--color-gold);
  color: var(--color-gold);
  background: rgba(245, 200, 66, 0.08);
}
</style>
