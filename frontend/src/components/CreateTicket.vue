<template>
  <div>
    <div class="mt-5 flex justify-between mb-3">
      <h2>Support Ticket</h2>
      <div>
        <Button variant="solid" @click="displayDialog.isDisplay=true">+ Add Ticket</Button>
      </div>
    </div>
    <DialogTicket v-model="displayDialog.isDisplay" />
  </div>
</template>

<script setup>
import {Button} from 'frappe-ui';
import {ref} from 'vue';
import DialogTicket from './DialogTicket.vue';
import { displayDialog } from '@/state/displayDialog';


</script>

