const SERVICE_NAME = 'user-profiles';
import backend from "@/lib/backend";
export default axios => ({
    create(data){
        return backend(axios, SERVICE_NAME).create(data);
    },
    patch(id,data){
        return backend(axios, SERVICE_NAME).patch(id,data);
    },
    find(data){
        return backend(axios, SERVICE_NAME).find(data);
    },
    delete(id){
        return backend(axios, SERVICE_NAME).delete(id);
    }
});