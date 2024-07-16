import { createResource } from 'frappe-ui';
import { reactive } from 'vue';

function sessionUser() {
    const cookies = new URLSearchParams(document.cookie.split('; ').join('&'));
    let _sessionUser = cookies.get('user_id');
    if (_sessionUser === 'Guest') {
        _sessionUser = null;
    }
    return _sessionUser;
}

export const session = reactive({
    logout: createResource({
        url: 'logout',
        onSuccess() {
            session.user = sessionUser();
            window.location.href = '/login?redirect-to=/tickets';
        },
    }),
});