<template>
  <div
    class="bg-surface border border-border-2 rounded-card overflow-hidden transition-colors duration-300"
    :style="{ boxShadow: 'var(--shadow-card)' }"
  >
    <!-- Title bar -->
    <div class="bg-surface-2 border-b border-border">
      <!-- Riga principale: dots + titolo + tab (desktop) -->
      <div class="h-9 flex items-center gap-2 px-3.5">
        <span class="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden="true"></span>
        <span class="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true"></span>
        <span class="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true"></span>

        <span class="hidden sm:flex flex-1 text-center font-mono text-[11px] text-text-3 items-center justify-center gap-2" aria-hidden="true">
          <span class="w-2.5 h-2.5 rounded-[3px] bg-gradient-to-br from-blue to-purple"></span>
          {{ title }}
        </span>

        <div
          v-if="tabs.length"
          role="tablist"
          :aria-label="title"
          class="hidden sm:flex gap-1 font-mono text-[11px]"
        >
          <button
            v-for="tab in tabs"
            :key="tab"
            role="tab"
            :aria-selected="activeTab === tab"
            :aria-controls="`panel-${tab}`"
            :id="`tab-${tab}`"
            @click="$emit('tabChange', tab)"
            :class="[
              'px-2 py-0.5 rounded-[5px] border transition-all duration-150',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
              activeTab === tab
                ? 'bg-surface text-text border-border-2'
                : 'bg-transparent text-text-3 border-transparent hover:text-text-1',
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Tab row mobile: visibile solo su sm- -->
      <div
        v-if="tabs.length"
        role="tablist"
        :aria-label="title"
        class="flex sm:hidden border-t border-border font-mono text-[11px]"
      >
        <button
          v-for="tab in tabs"
          :key="`m-${tab}`"
          role="tab"
          :aria-selected="activeTab === tab"
          :aria-controls="`panel-${tab}`"
          :id="`tab-m-${tab}`"
          @click="$emit('tabChange', tab)"
          :class="[
            'flex-1 py-1.5 text-center border-r last:border-r-0 border-border transition-all duration-150',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
            activeTab === tab
              ? 'bg-surface text-text'
              : 'bg-transparent text-text-3',
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Body -->
    <div
      class="p-5 font-mono text-[13.5px] leading-[1.85] overflow-x-auto no-scrollbar"
      role="tabpanel"
      :id="`panel-${activeTab}`"
      :aria-labelledby="`tab-${activeTab}`"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title:     { type: String, required: true },
  tabs:      { type: Array,  default: () => [] },
  activeTab: { type: String, default: null },
})

defineEmits(['tabChange'])
</script>
