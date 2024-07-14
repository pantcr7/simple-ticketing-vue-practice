<template>
  <div class="overflow-x-hidden ">
    <ListView :options="options" :columns="columns" :rows="rows">
      <template #cell="{ item, row, column }">
        <Badge v-if="column.key === 'status'"
          :variant="'subtle'"
          :theme="getStatusColor(row.status)"
          size="sm"
          :label="row.status"
        />
        <span v-else>{{ item }}</span>
      </template>
    </ListView>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { Button, ListView, Dialog, FormControl, Badge } from 'frappe-ui';
import ticketStore from '@/state/ticketStore';

const ticket = ticketStore;

// Debugging: Log the ticketStore data
watchEffect(() => {
  console.log('ticketStore data:', ticketStore.data);
});

const columns = ref([
  { label: 'Title', key: 'title', width: '200px' },
  { label: 'Category', key: 'category', width: '200px' },
  { label: 'Purchase Date', key: 'purchase_date', width: '200px' },
  { label: 'Status', key: 'status', width: '200px' },
  { label: 'Description', key: 'description', width: '200px' },
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

const rows = computed(() => {
  return ticket.data ? ticket.data.map(t => ({ ...t })) : [];
});

// Debugging: Log the computed rows
watchEffect(() => {
  ticket.fetch();
});

// Fetch data on component mount


// Computed property to get the color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'Open':
      return 'red';
    case 'Resolved':
      return 'blue';
    case 'Closed':
      return 'green';
    default:
      return 'gray';
  }
};

</script>