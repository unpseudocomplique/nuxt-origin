<template>
    <UForm :state="formState" :schema="schema" class="gap-4 flex flex-col w-80" @submit="createOrganization">
        <UFormField label="Nom de l'organisation" name="display">
            <UInput v-model="formState.display" />
        </UFormField>
       <UFormField label="Domaine de l'organisation" name="domain">
            <UInput v-model="formState.domain" />
        </UFormField>
        <UFormField label="Prénom de l'admin" name="firstname">
            <UInput v-model="formState.firstname" />
        </UFormField>
         <UFormField label="Nom de l'admin" name="lastname">
            <UInput v-model="formState.lastname" />
        </UFormField>
         <UFormField label="Email de l'admin" name="email">
            <UInput v-model="formState.email" />
        </UFormField>
         <UFormField label="Mot de passe de l'admin" name="password">
            <UInput v-model="formState.password" type="password" />
        </UFormField>
  
      <UButton type="submit" :loading="loading">Créer</UButton>
    </UForm>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue';
  import * as z from 'zod';
  import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
  
  const emit = defineEmits(['organization-submitted']);
  const loading = ref(false);
  
  const schema = z.object({
      display: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
      domain: z.string().min(2, 'Le domaine doit contenir au moins 2 caractères'),
      firstname: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
      lastname: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
      email: z.string().email('L\'email doit être valide'),
      password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  });
  
  type Schema = z.output<typeof schema>;
  
  const formState = reactive<Partial<Schema>>({
      display: '',
      domain: '',
      firstname: '',
      lastname: '',
      email: '',
      password: ''
  });
  
  const createOrganization = async (event: FormSubmitEvent<any>) => {
    loading.value = true
      try {
          const { data, error } = await useFetch('/api/organizations', {
              method: 'POST',
              body: event.data
          });
            if(error.value) {
              console.log('error', error.value)
              loading.value = false
            }
            else if (data.value) {
              console.log('success', data.value)
              emit('organization-submitted')
                loading.value = false
            }
      } catch (error) {
          console.error('Failed to create organization', error);
          loading.value = false
      }
  };
  </script>