import { createListResource } from 'frappe-ui';


const ticketStore = createListResource({
    doctype: 'Support Ticket',
    fields: ['title', 'category', 'purchase_date', 'status', 'description'],
    orderBy: 'creation desc',
    insert: {
      onSuccess: (d) => {
        console.log('Inserted');
      },
    }
  });





export default ticketStore;

