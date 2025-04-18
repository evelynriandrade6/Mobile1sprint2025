import axios  from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000/api/reservas/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postLogin:(user)=>api.post("user/login/",user),
    postCadastro:(user)=>api.post("user/",user)

}

export default sheets;