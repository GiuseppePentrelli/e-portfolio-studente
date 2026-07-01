<template>
  <div
    role="group"
    :aria-label="groupLabel"
    class="inline-flex items-center p-0.5 border border-border-2 rounded-pill bg-surface light:border-2 light:border-ink"
  >
    <div class="relative flex items-center">
      <!-- Slider che scivola sotto il bottone attivo -->
      <div
        class="absolute inset-y-0 rounded-pill bg-surface-3 transition-transform duration-250 ease-in-out light:bg-ink"
        :style="{
          width: `${100 / options.length}%`,
          transform: `translateX(${activeIndex * 100}%)`
        }"
        aria-hidden="true"
      />

      <button
        v-for="opt in options"
        :key="opt.value"
        @click="$emit('select', opt.value)"
        :aria-pressed="modelValue === opt.value"
        :aria-label="opt.label"
        :class="[
          'relative z-10 min-w-6 h-5 px-1.5 rounded-pill grid place-items-center',
          'text-[10px] font-semibold tracking-widest uppercase',
          'transition-colors duration-250',
          'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold light:focus-visible:outline-ink',
          modelValue === opt.value ? 'text-gold light:text-bg' : 'text-text-3'
        ]"
      >
        <slot :opt="opt" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  options:    { type: Array,  required: true },
  modelValue: { type: String, required: true },
  groupLabel: { type: String, required: true },
})

defineEmits(['select'])

const activeIndex = computed(() =>
  props.options.findIndex(opt => opt.value === props.modelValue)
)
</script>
