const SERVICE_NAME = 'subjects';
import backend from "@/lib/backend";
export default axios => ({
    getAll(){
        return backend(axios, SERVICE_NAME).getAll();
    },
    find( data ){
        return backend(axios, SERVICE_NAME).find(data);
    }
});