<template>
    <UModal v-model:open="modelValue">
        <template #header>
            Créer une organisation
        </template>
        <template #content>
            <OrganizationForm @organization-submitted="handleOrganizationCreated" />
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { defineEmits, defineModel } from 'vue';

const emit = defineEmits(['organization-created']);
const modelValue = defineModel<boolean>({ required: true });
const handleOrganizationCreated = () => {
    modelValue.value = false
    emit('organization-created')
}

</script>