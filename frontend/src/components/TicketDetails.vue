<template>
    <div v-if="ticketDetails.doc">
      <div>
        <h1>
          {{ ticketDetails.doc.description }}
        </h1>
        <Badge>{{ ticketDetails.doc.status }}</Badge>
      </div>
      <Button @click="ticketDetails.setValue.submit({ status: 'Closed' })">
        Mark as Closed
      </Button>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { createDocumentResource, Button, Badge } from 'frappe-ui';
  
  const route = useRoute();
  
  let ticketDetails = createDocumentResource({
    doctype: 'Support Ticket',
    name: route.params.name,
  });
  
  console.log('ticketDetails:', ticketDetails);
  
  const markAsClosed = () => {
    ticketDetails.setValue({ status: 'Closed' }).then(() => {
      ticketDetails.reload();
    });
  };
  </script>