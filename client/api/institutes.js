const SERVICE_NAME = 'institutes';
import backend from "@/lib/backend";
export default axios => ({
    getAll(){
        return backend(axios, SERVICE_NAME).getAll();
    }
});