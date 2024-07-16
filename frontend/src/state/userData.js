import { createResource } from 'frappe-ui'

const userResource = createResource({
    url: '/api/method/simple_ticketing_vue_practice.api.get_user_data',
    auto: true, // required, since it should start fetching automatically
    cache: 'current-user'
})

export default userResource