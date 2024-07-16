<template>
  <div v-if="ticketDetails.doc" class="mt-5">
    <div class="flex justify-between items-center">
      <div class="flex justify-between gap-2 items-center">
        <h1 class="text-[20px] cursor-pointer " @click="router.push({'name':'tickets'})">
          🔙
        </h1>
        <span class="text-[20px] text-gray-600">#{{ route.params.name }}</span>
        <h1  class="font-bold text-[25px]">{{ ticketDetails.doc.title }}</h1>
        <Badge
          :variant="'subtle'"
          :theme="getStatusColor(ticketDetails.doc.status)"
          size="sm"
          :label="ticketDetails.doc.status"/>
      </div>
      <div>
        <Button :variant="'solid'" @click="markAsResolved" :disabled="ticketDetails.doc.status === 'Resolved'">
          Mark as Resolved
        </Button> 
      </div>
    </div>

    <!-- Divider -->
    <div class="my-4">
      <hr class="border-t-2 border-gray-300"/>
    </div>

    <!-- description & category-->
    <div class="flex justify-between">
      <div class="">
        <h2 class="text-lg mb-3">Description</h2>
        <strong v-html="ticketDetails.doc.description"></strong>
      
      </div>
      <div class="mr-40 flex justify-end">
        <!--vertical divider-->
        <p class="border-l-2 border-gray-300 mx-4 h-24"></p>
        <div>
          <h3 class="text-lg font-bold">Category</h3>
        <Badge class="text-2xl"
          :variant="'outline'"
          theme="gray"
          size="md"
          :label="ticketDetails.doc.category"
        />
        <h3 class="text-lg font-bold">Purchase Date</h3>
        <p>{{ getFormattedDate(ticketDetails.doc.purchase_date) }}</p>
        </div>
       
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { createDocumentResource, Button, Badge } from 'frappe-ui';
import dayjs from 'dayjs';

const route = useRoute();
const router = useRouter();

let ticketDetails = createDocumentResource({
  doctype: 'Support Ticket',
  name: route.params.name,
  whitelistedMethods: {
    markAsResolved: 'mark_as_resolved',
  },
});

console.log('ticketDetails:', ticketDetails);

const markAsResolved = () => {
  ticketDetails.setValue.submit({ status: 'Resolved' }).then(() => {
    ticketDetails.reload();
  });
};

function getFormattedDate(date) {
  return dayjs(date).format('MMMM DD, YYYY');
}
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
