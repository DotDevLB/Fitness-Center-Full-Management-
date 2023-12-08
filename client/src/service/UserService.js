import axios from 'axios';

const User_API_GET="http://localhost:8080/user/getAll"

class UserSerice{
    getUser(){
        return axios.get(User_API_GET)
    }

    createUser(user) {
        // Assuming 'user' is an object containing user details
        return axios.post("http://localhost:8080/user/add", user);
      }


    loginUser(formData){
        return axios.post("http://localhost:8080/user/login",formData)
    }
    getUserById(id) {
        return axios.get(`http://localhost:8080/user/getUser/${id}`);
    }
    editUser(User,id){
        return axios.put(`http://localhost:8080/user/update/${id}`,User);
    }
    deleteUSer(id){
        return axios.delete(`http://localhost:8080/user/deleteUser/${id}`)
    }
   
}
export default new UserSerice()