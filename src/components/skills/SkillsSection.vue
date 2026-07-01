<template>
  <section id="skills" aria-labelledby="skills-title" class="mt-16">
    <SectionLabel :label="t('skills.label')" class="mb-3" />
    <h2
      id="skills-title"
      class="font-sans font-bold text-[clamp(24px,3vw,36px)] leading-tight tracking-tight text-text mb-10 light:font-[family-name:var(--font-family-display)]"
    >
      {{ t('skills.title_1') }}
      <em class="italic font-medium text-coral light:not-italic light:font-bold light:bg-fill-coral light:text-[#111] light:px-1">{{ t('skills.title_em') }}</em>
    </h2>

    <div class="flex flex-col gap-7">
      <div v-for="group in skills" :key="group.id" class="skill-row">
        <!-- Label + separatore -->
        <div class="skill-row-header">
          <span class="skill-row-label">
            <span class="t-cm">// </span>{{ t('skills.categories.' + group.id) }}
          </span>
          <span class="skill-row-line" aria-hidden="true" />
        </div>

        <!-- Chip -->
        <div class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="skill in group.skills"
            :key="skill.name"
            class="skill-chip"
          >
            <Icon
              :icon="skill.icon"
              :class="skill.mono ? 'text-text-2' : ''"
              class="skill-icon"
              aria-hidden="true"
            />
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useLocale } from '@/composables/useLocale'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import skills from '@/data/skills.json'

const { t } = useLocale()
</script>

<style scoped>
.skill-row-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skill-row-label {
  font-family: var(--font-family-mono);
  font-size: 0.78rem;
  color: var(--color-text-3);
  white-space: nowrap;
  letter-spacing: 0.05em;
}

.skill-row-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, var(--color-border-2), transparent);
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-family-mono);
  font-size: 0.8rem;
  color: var(--color-text-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-tag);
  padding: 5px 12px;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.skill-chip:hover {
  border-color: var(--color-border-2);
  color: var(--color-text);
  background: var(--color-surface-2);
}

.skill-icon {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
}

/* === LIGHT MODE (brutal-giocoso) ====================================== */

[data-theme="light"] .skill-row-line {
  height: 3px;
  background: var(--color-ink);
}

[data-theme="light"] .skill-chip {
  border: 2px solid var(--color-ink);
  box-shadow: 2px 2px 0 0 var(--color-ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease, color 0.2s, background 0.2s;
}
[data-theme="light"] .skill-chip:hover {
  border-color: var(--color-ink);
  color: var(--color-text);
  background: var(--color-surface-2);
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 0 var(--color-ink);
}
</style>
