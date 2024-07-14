<template>
    <header class="flex justify-between">
        <img class="text-left" :src="imageUrl" height="35px" width="35px"/>
        
        <Dropdown
            :options="showOptions"
>           <Avatar
                :shape="'circle'"
                image="https://i.pravatar.cc/100"
                label="EY"
                size="lg"
                class="cursor-pointer"
             />
        </Dropdown>
    </header>
</template>
<script setup>
import {Avatar} from 'frappe-ui';
import {Dropdown} from 'frappe-ui';
import {ref} from 'vue';

const imageUrl = ref('https://i.pravatar.cc/100');

const showOptions = [
    {
        label: 'Desk',
        onClick: () => {
            window.location.href = '/app';
        }
    },
    
];

</script>