<template>
  <div
    ref="root"
    class="destructive-confirm"
    :class="{ 'destructive-confirm--instant': instantTransition }"
    @keydown.esc="cancelConfirmation({ restoreFocus: true, message: cancelledMessage })"
  >
    <button
      v-if="!open"
      ref="trigger"
      class="destructive-confirm__button destructive-confirm__button--trigger"
      type="button"
      :disabled="disabled"
      :aria-expanded="false"
      :aria-controls="groupId"
      :aria-describedby="statusId"
      @click="openConfirmation"
    >
      <span>{{ label }}</span>
    </button>

    <Transition name="confirmation">
      <div
        v-if="open"
        :id="groupId"
        class="destructive-confirm__question"
        role="group"
        :aria-label="groupLabel"
      >
        <span class="destructive-confirm__prompt">{{ question }}</span>
        <button
          class="destructive-confirm__button destructive-confirm__button--confirm"
          type="button"
          @click="confirmAction"
        >
          {{ confirmLabel }}
        </button>
        <button
          ref="cancelButton"
          class="destructive-confirm__button destructive-confirm__button--cancel"
          type="button"
          @click="cancelConfirmation({ restoreFocus: true, message: cancelledMessage })"
        >
          {{ cancelLabel }}
        </button>
      </div>
    </Transition>

    <p :id="statusId" class="destructive-confirm__status" aria-live="polite">
      {{ status }}
    </p>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'

const props = defineProps({
  label: { type: String, default: 'Svuota il quaderno' },
  question: { type: String, default: 'Sicuro?' },
  groupLabel: { type: String, default: 'Conferma azione distruttiva' },
  confirmLabel: { type: String, default: 'Sì, svuota' },
  cancelLabel: { type: String, default: 'No' },
  confirmedMessage: { type: String, default: 'Azione confermata.' },
  cancelledMessage: { type: String, default: 'Niente modificato.' },
  expiredMessage: { type: String, default: 'Conferma scaduta. Niente modificato.' },
  timeout: { type: Number, default: 5000 },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['confirm', 'cancel'])
const instanceId = useId()
const groupId = `destructive-confirm-${instanceId}`
const statusId = `destructive-confirm-status-${instanceId}`
const root = ref(null)
const trigger = ref(null)
const cancelButton = ref(null)
const open = ref(false)
const status = ref('')
const instantTransition = ref(false)
let timerId

async function openConfirmation(event) {
  instantTransition.value = event.detail === 0
  status.value = ''
  open.value = true
  clearTimer()
  await nextTick()
  cancelButton.value?.focus()

  if (props.timeout > 0) {
    timerId = window.setTimeout(() => {
      cancelConfirmation({ restoreFocus: true, message: props.expiredMessage })
    }, props.timeout)
  }
}

async function closeConfirmation({ restoreFocus, message }) {
  clearTimer()
  status.value = message
  open.value = false
  await nextTick()

  if (restoreFocus) {
    trigger.value?.focus()
  }

  instantTransition.value = false
}

function confirmAction() {
  emit('confirm')
  closeConfirmation({ restoreFocus: true, message: props.confirmedMessage })
}

function cancelConfirmation({ restoreFocus = false, message = '' } = {}) {
  if (!open.value) return
  emit('cancel')
  closeConfirmation({ restoreFocus, message })
}

function clearTimer() {
  if (timerId) {
    window.clearTimeout(timerId)
    timerId = undefined
  }
}

function handleOutsidePointer(event) {
  if (open.value && !root.value?.contains(event.target)) {
    cancelConfirmation()
  }
}

onMounted(() => document.addEventListener('pointerdown', handleOutsidePointer))
onBeforeUnmount(() => {
  clearTimer()
  document.removeEventListener('pointerdown', handleOutsidePointer)
})
</script>

<style scoped>
.destructive-confirm {
  display: grid;
  justify-items: start;
  font-family: var(--font-hand);
}

.destructive-confirm__question {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: center;
}

.destructive-confirm__button {
  min-height: 2.75rem;
  color: var(--pen-red);
  font: inherit;
  font-size: 1.28rem;
  font-weight: 700;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform var(--transition-fast),
    background-color var(--duration-fast) ease;
}

.destructive-confirm__button:active {
  transform: scale(0.97);
}

.destructive-confirm__button:focus-visible {
  outline: 0.1875rem dashed var(--pen-red);
  outline-offset: 0.25rem;
}

.destructive-confirm__button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.destructive-confirm__button--trigger {
  padding: 0 1.1rem;
  background: var(--paper);
  border: 0.16rem solid var(--pen-red);
  border-radius: 0.5rem 0.7rem 0.42rem 0.62rem;
}

.destructive-confirm__button--trigger span {
  background: linear-gradient(var(--pen-red), var(--pen-red)) no-repeat 0 58% / 0 0.14rem;
  transition: background-size var(--duration-short) var(--ease-out);
}

.destructive-confirm__button--trigger:active {
  background: #f6ded8;
}

.destructive-confirm__prompt {
  color: var(--pen-red);
  font-size: 1.28rem;
  font-weight: 700;
}

.destructive-confirm__button--confirm {
  padding: 0 0.9rem;
  color: var(--paper);
  background: var(--pen-red);
  border: 0.125rem solid #73302b;
  border-radius: 0.42rem 0.55rem 0.38rem 0.5rem;
}

.destructive-confirm__button--confirm:active {
  background: #853a34;
}

.destructive-confirm__button--cancel {
  padding: 0 0.65rem;
  color: var(--ink-strong);
  text-decoration: underline;
  text-decoration-thickness: 0.1rem;
  text-underline-offset: 0.25rem;
  background: none;
  border: 0;
}

.destructive-confirm__status {
  min-height: 1.4em;
  margin: var(--space-2) 0 0;
  color: var(--ink-description);
  font-size: 1.05rem;
}

.confirmation-enter-active {
  transition:
    opacity 180ms var(--ease-out),
    transform 180ms var(--ease-out);
}

.confirmation-leave-active {
  transition:
    opacity var(--duration-micro) var(--ease-in),
    transform var(--duration-micro) var(--ease-in);
}

.confirmation-enter-from,
.confirmation-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.destructive-confirm--instant .confirmation-enter-active {
  transition: none;
}

@media (hover: hover) and (pointer: fine) {
  .destructive-confirm__button--trigger:hover {
    background: #fbefeb;
  }

  .destructive-confirm__button--trigger:hover span {
    background-size: 100% 0.14rem;
  }

  .destructive-confirm__button--confirm:hover {
    background: #913b35;
  }
}

@media (prefers-reduced-motion: reduce) {
  .destructive-confirm__button,
  .destructive-confirm__button--trigger span,
  .confirmation-enter-active,
  .confirmation-leave-active {
    transition: none;
  }

  .confirmation-enter-from,
  .confirmation-leave-to,
  .destructive-confirm__button:active {
    transform: none;
  }

  .destructive-confirm__button:active {
    opacity: 0.75;
  }
}
</style>
