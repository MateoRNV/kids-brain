const SERVICE_NAME = 'age-levels';
import backend from "@/lib/backend";
export default axios => ({
    find(data){
        return backend(axios, `${SERVICE_NAME}`).find(data);
    }
});