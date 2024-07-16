<template>
    <header class="flex justify-between">
        <!-- <img class="text-left" :src="imageUrl" height="35px" width="35px"/> -->
        <p class="glowing-text">Prasant Design</p>
       
        <Dropdown :options="showOptions">
            <Avatar v-if="userResource && userResource.data"
                :shape="'circle'"
                :image="userResource.data.message.user_image || ''"
                :label="userResource.data.message.user_image ? '' : initials"
                size="lg"
                class="cursor-pointer"
             />
        </Dropdown>
    </header>
</template>

<script setup>
import { Avatar } from 'frappe-ui';
import { Dropdown } from 'frappe-ui';
import { ref,computed } from 'vue';
import { inject } from 'vue';
import { session } from '@/state/logout'

const userResource = inject("userResource");

const initials = computed(() => {
    if (userResource && userResource.data && userResource.data.message) {
        const user_name = userResource.data.message.full_name;
        const words = user_name.split(' ');
        return words.map(word => word[0]).join('');
    }
    return 'G';
});

const imageUrl = ref('https://i.pravatar.cc/100');

const showOptions = [
    {
        label: 'Desk',
        onClick: () => {
            window.location.href = '/app';
        }
    },
    {
        label: 'Logout',
        onClick: () => {
            session.logout.submit()
        }
    }
];
</script>

<style scoped>
.glowing-text {
  font-weight: bold;
  color: #edeff4; /* Tailwind's text-blue-700 */
  text-shadow: 0 0 5px #1e3a8a, 0 0 10px #1e3a8a, 0 0 15px #1e3a8a, 0 0 20px #1e3a8a, 0 0 25px #1e3a8a, 0 0 30px #1e3a8a, 0 0 35px #1e3a8a;
}
</style>