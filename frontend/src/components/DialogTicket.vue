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
  
          <span class="text-sm text-gray-600">Description</span>
          <TextEditor
            ref="editor"
            :fixedMenu="true"
            editorClass="prose-sm max-w-none p-2 min-h-28"
            placeholder="Describe your problem..."
            @change="val => ticketDetails.description = val"
            label="Description"
          />
     
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { Dialog, FormControl, TextEditor } from 'frappe-ui';
import { displayDialog } from '@/state/displayDialog';
import { ref } from 'vue';

import ticketStore from '@/state/ticketStore';

const ticket = ticketStore;

const ticketDetails = ref({
  title: "",
  category: "",
  purchase_date: "",
  status: "",
  // description: "",
});

const dialogOptions = {
  title: 'Add Ticket',
  description: 'Add a new ticket',
  size: 'xl',
  actions: [
    {
      label: 'Confirm',
      variant: 'solid',
      onClick: insertTicket,
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

function insertTicket() {
  ticket.insert.submit({
    title: ticketDetails.value.title,
    category: ticketDetails.value.category,
    purchase_date: ticketDetails.value.purchase_date,
    status: ticketDetails.value.status,
    description: ticketDetails.value.description,
  }).then(() => {
    displayDialog.isDisplay = false;
    ticket.fetch(); // Ensure this method exists and is correctly called to refresh the list
  }).catch(error => {
    console.error('Error inserting ticket:', error);
    // Consider adding user feedback here, e.g., a toast notification
  });
}
</script>

