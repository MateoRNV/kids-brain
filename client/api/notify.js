const SERVICE_NAME = 'notify';
import backend from "@/lib/backend";
export default axios => ({
    sendVarificationMail(data){
        return backend(axios, `${SERVICE_NAME}/sendEmailVarification`).create(data);
    }
});