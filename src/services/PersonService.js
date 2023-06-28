import axios from "axios";
const  PERSON_API_BASE_URL = "http://localhost:8080/test";
class PersonService {
   getPerson(){
    return axios.get(PERSON_API_BASE_URL);
   }
}

export default new PersonService()