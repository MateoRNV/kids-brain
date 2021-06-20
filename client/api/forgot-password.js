const SERVICE_NAME = 'forgot-password';
import backend from "@/lib/backend";
export default axios => ({

    find(data) {
        return backend(axios, `${SERVICE_NAME}`).find(data);
    },
    create(data) {
        return backend(axios, SERVICE_NAME).create(data);
    },
    update(id, data) {
        return backend(axios, SERVICE_NAME).update(id, data);
    },
    patch(id, data) {
        return backend(axios, SERVICE_NAME).patch(id, data);
    },
});