const SERVICE_NAME = 'question-types';
import backend from "@/lib/backend";
export default axios => ({
    getAll(){
        return backend(axios, SERVICE_NAME).getAll();
    },
    find( data ){
        return backend(axios, SERVICE_NAME).find(data);
    },
    update(id,data){
        return backend(axios, SERVICE_NAME).put(id, data);
    }
});