<template>
  <div class="tech-strip" aria-hidden="true">
    <div class="tech-track">
      <span v-for="(skill, i) in allSkills" :key="i" class="tech-item">
        <Icon :icon="skill.icon" :class="skill.mono ? 'text-text-2' : ''" class="tech-icon" />
        <span class="tech-name">{{ skill.name }}</span>
        <span class="tech-sep">·</span>
      </span>
      <!-- duplicato per loop seamless -->
      <span v-for="(skill, i) in allSkills" :key="`b-${i}`" class="tech-item">
        <Icon :icon="skill.icon" :class="skill.mono ? 'text-text-2' : ''" class="tech-icon" />
        <span class="tech-name">{{ skill.name }}</span>
        <span class="tech-sep">·</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import skillsData from '@/data/skills.json'

const allSkills = skillsData.flatMap(group => group.skills)
</script>

<style scoped>
.tech-strip {
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 14px 0;
  background: var(--color-surface);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.tech-track {
  display: flex;
  width: max-content;
  animation: techscroll 35s linear infinite;
}

.tech-strip:hover .tech-track {
  animation-play-state: paused;
}

.tech-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 18px;
  white-space: nowrap;
}

.tech-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.tech-name {
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--color-text-2);
}

.tech-sep {
  color: var(--color-border-2);
  font-size: 14px;
  margin-left: 6px;
}

@keyframes techscroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
</style>
