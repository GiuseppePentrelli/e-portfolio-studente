<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href ? target : undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :type="!href ? type : undefined"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'outline',
    validator: (v) => ['outline', 'ghost', 'solid'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v),
  },
  href: {
    type: String,
    default: null,
  },
  target: {
    type: String,
    default: '_self',
  },
  type: {
    type: String,
    default: 'button',
  },
})

const base = [
  'inline-flex items-center gap-2',
  'font-mono font-medium',
  'rounded-btn transition-all duration-200',
  'cursor-pointer select-none',
  'light:font-bold light:uppercase light:tracking-wide light:duration-150',
]

const sizes = {
  sm: 'text-[11px] px-2.5 py-1',
  md: 'text-xs px-3 py-1.5',
}

const variants = {
  outline: [
    'border border-border-2 bg-surface text-text-1',
    'hover:border-gold hover:text-text hover:bg-surface-2',
    'light:border-2 light:border-ink light:shadow-[3px_3px_0_0_var(--color-ink)]',
    'light:hover:border-ink light:hover:text-text-1 light:hover:bg-surface',
    'light:hover:translate-x-[2px] light:hover:translate-y-[2px] light:hover:shadow-[1px_1px_0_0_var(--color-ink)]',
    'light:active:translate-x-[3px] light:active:translate-y-[3px] light:active:shadow-none',
  ],
  ghost: [
    'border border-transparent bg-transparent text-text-2',
    'hover:text-text hover:bg-surface-2',
    'light:border-2 light:hover:border-ink light:hover:bg-transparent light:hover:text-text',
  ],
  solid: [
    'border border-gold bg-gold/10 text-gold',
    'hover:bg-gold hover:text-bg',
    'light:border-2 light:border-ink light:bg-fill-gold light:text-[#111] light:shadow-[3px_3px_0_0_var(--color-ink)]',
    'light:hover:bg-fill-gold light:hover:text-[#111]',
    'light:hover:translate-x-[2px] light:hover:translate-y-[2px] light:hover:shadow-[1px_1px_0_0_var(--color-ink)]',
    'light:active:translate-x-[3px] light:active:translate-y-[3px] light:active:shadow-none',
  ],
}

const classes = computed(() => [
  ...base,
  sizes[props.size],
  ...variants[props.variant],
])
</script>
