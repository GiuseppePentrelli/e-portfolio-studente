<template>
  <div class="relative">
    <img
      :src="alienSrc"
      alt=""
      aria-hidden="true"
      class="absolute -top-16 right-2 w-16 z-10 drop-shadow-md select-none pointer-events-none light:drop-shadow-none"
    />

  <AppWindow
    :title="`~/giuseppe/${activeTab}`"
    :tabs="['about.json', 'stack.json', 'stats.json']"
    :activeTab="activeTab"
    @tabChange="onTabChange"
  >
    <Transition name="fade" mode="out-in">
      <!-- about.json -->
      <div v-if="activeTab === 'about.json'" key="about">
        <WinLine n="1"  :visible="1  <= revealed"><span class="t-cm">{{ t('bio.about_comment') }}</span></WinLine>
        <WinLine n="2"  :visible="2  <= revealed"><span class="t-kw">const</span> <span class="t-nm">dev</span> <span class="t-bk">= {</span></WinLine>
        <WinLine n="3"  :visible="3  <= revealed">&nbsp;&nbsp;<span class="t-fn">name</span><span class="t-bk">:</span> <span class="t-st">'{{ me.name }}'</span><span class="t-bk">,</span></WinLine>
        <WinLine n="4"  :visible="4  <= revealed">&nbsp;&nbsp;<span class="t-fn">role</span><span class="t-bk">:</span> <span class="t-st">'{{ me.role }}'</span><span class="t-bk">,</span></WinLine>
        <WinLine n="5"  :visible="5  <= revealed">&nbsp;&nbsp;<span class="t-fn">school</span><span class="t-bk">:</span> <span class="t-st">'{{ me.school.class }} · {{ me.school.name }}'</span><span class="t-bk">,</span></WinLine>
        <WinLine n="6"  :visible="6  <= revealed">&nbsp;&nbsp;<span class="t-fn">city</span><span class="t-bk">:</span> <span class="t-st">'{{ me.school.city }}'</span><span class="t-bk">,</span></WinLine>
        <WinLine n="7"  :visible="7  <= revealed">&nbsp;&nbsp;<span class="t-fn">coffee</span><span class="t-bk">:</span> <span class="t-nm">{{ t('bio.infinity') }}</span><span class="t-bk">,</span></WinLine>
        <WinLine n="8"  :visible="8  <= revealed"><span class="t-bk">};</span></WinLine>
        <WinLine n="9"  :visible="9  <= revealed">&nbsp;</WinLine>
        <WinLine n="10" :visible="10 <= revealed"><span class="t-nm">dev</span><span class="t-bk">.</span><span class="t-fn">ship</span><span class="t-bk">();</span> <span class="t-cm">{{ t('bio.ship_comment') }}<span class="caret"></span></span></WinLine>
      </div>

      <!-- stack.json -->
      <div v-else-if="activeTab === 'stack.json'" key="stack">
        <WinLine n="1"  :visible="1  <= revealed"><span class="t-cm">{{ t('bio.stack_comment') }}</span></WinLine>
        <WinLine n="2"  :visible="2  <= revealed"><span class="t-kw">const</span> <span class="t-nm">stack</span> <span class="t-bk">= {</span></WinLine>
        <WinLine n="3"  :visible="3  <= revealed">&nbsp;&nbsp;<span class="t-fn">foundations</span><span class="t-bk">:</span> <span class="t-bk">[</span><span class="t-st">'HTML'</span><span class="t-bk">,</span> <span class="t-st">'CSS'</span><span class="t-bk">],</span></WinLine>
        <WinLine n="4"  :visible="4  <= revealed">&nbsp;&nbsp;<span class="t-fn">language</span><span class="t-bk">:</span>    <span class="t-bk">[</span><span class="t-st">'JavaScript'</span><span class="t-bk">,</span> <span class="t-st">'PHP'</span><span class="t-bk">],</span></WinLine>
        <WinLine n="5"  :visible="5  <= revealed">&nbsp;&nbsp;<span class="t-fn">frontend</span><span class="t-bk">:</span>    <span class="t-bk">[</span><span class="t-st">'Vue'</span><span class="t-bk">,</span> <span class="t-st">'Bootstrap'</span><span class="t-bk">,</span> <span class="t-st">'Tailwind'</span><span class="t-bk">],</span></WinLine>
        <WinLine n="6"  :visible="6  <= revealed">&nbsp;&nbsp;<span class="t-fn">backend</span><span class="t-bk">:</span>     <span class="t-bk">[</span><span class="t-st">'Laravel'</span><span class="t-bk">,</span> <span class="t-st">'MySQL'</span><span class="t-bk">],</span></WinLine>
        <WinLine n="7"  :visible="7  <= revealed">&nbsp;&nbsp;<span class="t-fn">gamedev</span><span class="t-bk">:</span>     <span class="t-bk">[</span><span class="t-st">'Kaplay JS'</span><span class="t-bk">,</span> <span class="t-st">'Canvas 2D'</span><span class="t-bk">],</span></WinLine>
        <WinLine n="8"  :visible="8  <= revealed">&nbsp;&nbsp;<span class="t-fn">passion</span><span class="t-bk">:</span>     <span class="t-st">'{{ t('bio.passion') }}'</span><span class="t-bk">,</span></WinLine>
        <WinLine n="9"  :visible="9  <= revealed"><span class="t-bk">};</span></WinLine>
        <WinLine n="10" :visible="10 <= revealed">&nbsp;</WinLine>
        <WinLine n="11" :visible="11 <= revealed"><span class="t-nm">stack</span><span class="t-bk">.</span><span class="t-fn">forEach</span><span class="t-bk">(</span><span class="t-fn">learn</span><span class="t-bk">);</span> <span class="t-cm">{{ t('bio.learning') }}<span class="caret"></span></span></WinLine>
      </div>

      <!-- stats.json -->
      <div v-else key="stats">
        <WinLine n="1"  :visible="1  <= revealed"><span class="t-cm">{{ t('bio.stats_comment') }}</span></WinLine>
        <WinLine n="2"  :visible="2  <= revealed"><span class="t-kw">const</span> <span class="t-nm">stats</span> <span class="t-bk">= {</span></WinLine>
        <WinLine n="3"  :visible="3  <= revealed">&nbsp;&nbsp;<span class="t-fn">projects</span><span class="t-bk">:</span> <span class="t-nm">12</span><span class="t-bk">,</span>              <span class="t-cm">{{ t('bio.stats_counting') }}</span></WinLine>
        <WinLine n="4"  :visible="4  <= revealed">&nbsp;&nbsp;<span class="t-fn">commits</span><span class="t-bk">:</span> <span class="t-nm">847</span><span class="t-bk">,</span>             <span class="t-cm">{{ t('bio.stats_typo') }}</span></WinLine>
        <WinLine n="5"  :visible="5  <= revealed">&nbsp;&nbsp;<span class="t-fn">bugs_fixed</span><span class="t-bk">:</span> <span class="t-st">'most of them'</span><span class="t-bk">,</span></WinLine>
        <WinLine n="6"  :visible="6  <= revealed">&nbsp;&nbsp;<span class="t-fn">coffee_today</span><span class="t-bk">:</span> <span class="t-nm">{{ t('bio.infinity') }}</span><span class="t-bk">,</span></WinLine>
        <WinLine n="7"  :visible="7  <= revealed">&nbsp;&nbsp;<span class="t-fn">favorite_key</span><span class="t-bk">:</span> <span class="t-st">'Ctrl+Z'</span><span class="t-bk">,</span>   <span class="t-cm">{{ t('bio.stats_fav_key') }}</span></WinLine>
        <WinLine n="8"  :visible="8  <= revealed">&nbsp;&nbsp;<span class="t-fn">tabs_vs_spaces</span><span class="t-bk">:</span> <span class="t-st">'tabs'</span><span class="t-bk">,</span>  <span class="t-cm">{{ t('bio.stats_tabs') }}</span></WinLine>
        <WinLine n="9"  :visible="9  <= revealed"><span class="t-bk">};</span></WinLine>
        <WinLine n="10" :visible="10 <= revealed">&nbsp;</WinLine>
        <WinLine n="11" :visible="11 <= revealed"><span class="t-cm">{{ t('bio.compiling') }}<span class="caret"></span></span></WinLine>
      </div>
    </Transition>
  </AppWindow>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useLineReveal } from '@/composables/useLineReveal'
import AppWindow from '@/components/ui/AppWindow.vue'
import WinLine from '@/components/ui/WinLine.vue'
import me from '@/data/me.json'

const activeTab = ref('about.json')
const { t } = useLocale()
const alienSrc = '/images/alienSleeping.avif'

const lineCounts = { 'about.json': 10, 'stack.json': 11, 'stats.json': 11 }
const { revealed, start } = useLineReveal({ speed: 60 })

let tabTimer = null

function onTabChange(tab) {
  activeTab.value = tab
  revealed.value = 0
  clearTimeout(tabTimer)
  // aspetta la fade-out (180ms) poi avvia il reveal sul nuovo contenuto
  tabTimer = setTimeout(() => start(lineCounts[tab]), 200)
}

onMounted(() => start(lineCounts[activeTab.value]))
onUnmounted(() => clearTimeout(tabTimer))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
