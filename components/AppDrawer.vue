<script setup lang="ts">

const items = ref([
    [
        {
            label: 'Admin',
            icon: 'i-ph-shield-thin',
            children: [
                {
                    label: 'Organization',
                    description: 'Fully styled and customizable components for Nuxt.',
                    icon: 'i-ph-building-office-light',
                    to: '/admin/organization'
                }
            ]
        },
        {
            label: 'Users',
            icon: 'i-lucide-book-open',
            children: [
                {
                    label: 'List',
                    description: 'Fully styled and customizable components for Nuxt.',
                    icon: 'i-lucide-users',
                    to: '/users'
                }
            ]
        }
    ],
    // [
    //     {
    //         label: 'GitHub',
    //         icon: 'i-simple-icons-github',
    //         badge: '3.8k',
    //         to: 'https://github.com/nuxt/ui',
    //         target: '_blank'
    //     },
    //     {
    //         label: 'Help',
    //         icon: 'i-lucide-circle-help',
    //         disabled: true
    //     }
    // ]
])
</script>

<template>
    <div class="flex flex-col gap-4 ui-bg drawer bg-ui-muted card-base">
        <UUser name="John Doe" description="Software Engineer" :avatar="{
            src: 'https://i.pravatar.cc/150?u=john-doe'
        }" />
        <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
        <UColorModeSelect class="mt-auto" />
    </div>
</template>
