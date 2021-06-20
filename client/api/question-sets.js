const SERVICE_NAME = 'question-sets';
import backend from "@/lib/backend";
export default axios => ({
    getAll(){
        return backend(axios, SERVICE_NAME).getAll();
    },
    find( data ){
        return backend(axios, SERVICE_NAME).find(data);
    },
    get( id ){
        return backend(axios, SERVICE_NAME).get(id);
    },
    create(data){
        return backend(axios, SERVICE_NAME).create(data);
    },
    patch(id,data){
        return backend(axios, SERVICE_NAME).patch(id, data);
    },
    update(id,data){
        return backend(axios, SERVICE_NAME).put(id, data);
    },
    delete(id){
        return backend(axios, SERVICE_NAME).delete(id);
    }
});