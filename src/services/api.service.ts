import axios from'axios'
import usersModel from '../models/userModel';
export default new class ApiService {
    
    BASE_URL="https://jsonplaceholder.typicode.com/users";
   
    getListApi(){
        return axios.get(`${this.BASE_URL}`);
        

    }
    deleteUser(userId:string){
        return axios.delete(`${this.BASE_URL}/${userId}`)
    }
}