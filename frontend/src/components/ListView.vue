<template>
  <div>
    <ListView :options="options" :columns="columns" :rows="rows" />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted,watchEffect } from 'vue';
import { Button, ListView, Dialog, FormControl } from 'frappe-ui';
import { createListResource } from 'frappe-ui';
 // Ensure this import if confetti is used

const columns = ref([
  { label: 'Title', key: 'title',width: '200px' },
  { label: 'Category', key: 'category',width: '200px' },
  { label: 'Purchase Date', key: 'purchase_date',width: '200px' },
  { label: 'Status', key: 'status',width: '200px' },
  { label: 'Description', key: 'description',width: '200px' },
]);

const options = ref({
  selectable: false,
  resizeColumn: true,
  showTooltip: true,
  emptyState: {
    title: 'No Tickets found',
    description: 'Create a new record to get started',
    button: {
      label: 'New Record',
      variant: 'solid',
      onClick: () => {
        // Implement navigation or action to create a new record
        console.log('Navigating to new record form...');
      },
    },
  },
});

const ticket = createListResource({
  doctype: 'Support Ticket',
  fields: ['title', 'category', 'purchase_date', 'status', 'description'],
  orderBy: 'creation desc',
  auto: true,
  insert: {
    onSuccess: (d) => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
  },
});

const rows = computed(() => {
  return ticket.data ? ticket.data.map(t => ({ ...t })) : [];
});

const stopWatch = watchEffect(() => {
  ticket.fetch()
});

onUnmounted(() => {
  stopWatch(); // Cleanup watchEffect when component unmounts
});
</script>