<template>
  <Dialog :options="dialogOptions" v-model="displayDialog.isDisplay">
    <template #body-content>
      <div class="p-2">
        <FormControl
          type="text"
          size="sm"
          variant="subtle"
          placeholder="title"
          :disabled="false"
          label="Title"
          v-model="ticketDetails.title"
        />
        <FormControl
          type="select"
          size="sm"
          variant="subtle"
          placeholder="category"
          :disabled="false"
          label="Category"
          v-model="ticketDetails.category"
          :options="categoryOptions"
        />
        <FormControl
          type="date"
          size="sm"
          variant="subtle"
          placeholder="purchase_date"
          :disabled="false"
          label="Purchase Date"
          v-model="ticketDetails.purchase_date"
        />
        <FormControl
          type="select"
          size="sm"
          variant="subtle"
          placeholder="status"
          :disabled="false"
          label="Status"
          v-model="ticketDetails.status"
          :options="statusOptions"
        />
        <FormControl
          type="text"
          size="sm"
          variant="subtle"
          placeholder="description"
          :disabled="false"
          label="Description"
          v-model="ticketDetails.description"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { Dialog, FormControl } from 'frappe-ui';
import { displayDialog } from '@/state/displayDialog';
import { ref } from 'vue';
import ListView from './ListView.vue'; // Ensure ListView is correctly imported and used

const ticketDetails = ref({
  title: "",
  category: "",
  purchase_date: "",
  status: "",
  description: "",
});

const dialogOptions = {
  title: 'Add Ticket',
  description: 'Add a new ticket',
  size: 'xl',
  actions: [
    {
      label: 'Confirm',
      variant: 'solid',
      onClick: createTicket,
    },
  ],
};

const categoryOptions = [
  { label: 'Delivery', value: 'Delivery' },
  { label: 'Paper Quality', value: 'Paper Quality' },
  { label: 'Other', value: 'Other' },
];

const statusOptions = [
  { label: 'Open', value: 'Open' },
  { label: 'Resolved', value: 'Resolved' },
  { label: 'Closed', value: 'Closed' },
];

function createTicket() {
  ListView.methods.ticket.insert.submit({
    title: ticketDetails.value.title,
    category: ticketDetails.value.category,
    purchase_date: ticketDetails.value.purchase_date,
    status: ticketDetails.value.status,
    description: ticketDetails.value.description,
  }).then(() => {
    displayDialog.isDisplay = false;
    ListView.methods.ticket.fetch(); // Ensure this method exists and is correctly called to refresh the list
  }).catch(error => {
    console.error('Error inserting ticket:', error);
    // Consider adding user feedback here, e.g., a toast notification
  });
}
</script>