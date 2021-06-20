const SERVICE_NAME = 'countries';
import backend from "@/lib/backend";
export default axios => ({
    getAll(){
        return backend(axios, SERVICE_NAME).find();
    }
});