<template>
  <div class="language-tabs" v-if="languages?.length">
    <v-item-group
      v-if="variant === 'buttons'"
      :model-value="modelValue"
      @update:model-value="v => $emit('update:modelValue', v)"
      mandatory
      class="d-flex justify-center align-center language-tabs flex-md-row flex-wrap"
    >
      <div class="mr-2" v-if="$slots['preText']"><slot name="pre-text"></slot></div>
      <v-item
        v-for="lang in languages"
        :key="lang.id"
        :value="lang.id"
        v-slot="{ isSelected, toggle }"
      >
        <v-btn
          :color="isSelected ? 'primary' : 'default'"
          @click.stop="toggle"
          class="mx-1 mb-1"
        >
          {{ lang.label }}
        </v-btn>
      </v-item>
    </v-item-group>
    <v-select
      v-if="variant === 'dropdown'"
      :model-value="modelValue"
      @update:model-value="v => $emit('update:modelValue', v)"
      :items="languages"
      item-value="id"
      item-title="label"
      density="compact"
      hide-details
      label="Language"
    >
    </v-select>
  </div>
</template>
<script>
export default {
  props: {
    'modelValue': {
    },
    languages: {
      type: Array,
    },
    variant: {
      type: String,
      default: 'buttons',
      validator: (value) => ['buttons', 'dropdown'].includes(value),
    },
  },
  emits: [
    'update:modelValue',
  ],
}
</script>
