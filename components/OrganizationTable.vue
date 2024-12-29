<template>
    <div>
        <UButton label="Ajouter une organisation" @click="openModal = true" />
        <UTable :columns="columns" :data="organizationRequest.data.value?.organizations" :loading="loading" />
        <UPagination v-model:page="page" :total="organizationRequest.data.value?.total" :items-per-page="2"
            :disabled="loading" />
        <OrganizationModal v-model="openModal" @organization-created="fetchOrganizations" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineModel } from 'vue';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types'

const openModal = ref(false);
const page = ref(1)
const organizations = ref([]);
const totalOrganizations = ref(0);

const loading = ref(false);


const columns = ref<TableColumn[]>([
    {
        accessorKey: 'display',
        header: 'Name'
    },
    {
        accessorKey: 'domain',
        header: 'Domaine'
    },
    {
        accessorKey: 'id',
        header: 'Admin',
        cell: ({ row }) => {
            const user = row.UserOrganization?.[0]?.user
            return !user ? '-' : `${user.firstname} ${user.lastname}`
        }
    }
]);

const organizationRequest = useFetch('/api/organizations', {
    query: {
        page
    },

});

const fetchOrganizations = async () => {
    //   loading.value = true;
    //   const { data, error } = await useFetch('/api/organizations', {
    //       query: {
    //           page: page.value
    //       }
    //   });

    //   if (error.value) {
    //       console.error('Failed to fetch organizations', error.value);
    //        loading.value = false;
    //       return
    //   }


    //   if (data.value) {
    //       organizations.value = data.value.organizations;
    //       totalOrganizations.value = data.value.total;
    //        loading.value = false;
    //   }
};
watch(page, () => {
    fetchOrganizations()
});
//   onMounted(fetchOrganizations);
</script>