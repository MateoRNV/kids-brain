const SERVICE_NAME = 'uploads';
import backend from "@/lib/backend";
export default axios => ({
    create(data){
        return backend(axios, SERVICE_NAME).create(data);
    },
    patch(id,data){
        return backend(axios, SERVICE_NAME).patch(id, data);
    },
    delete(id){
        return backend(axios, SERVICE_NAME).delete(id);
    },
});