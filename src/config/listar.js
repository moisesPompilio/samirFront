import { http } from "./configAxios";

export default {
    listar:() => {
        return http.get('produtos')
    }
}