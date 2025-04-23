import axios  from "axios";


const api = axios.create({
    baseURL:"http://localhost:5000/api/reservas/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postLogin:(user)=>api.post("user/login/",user),
    postCadastro:(user)=>api.post("user/",user),
    // postClassroom:(classroom)=>api.post("classroom/",classroom),
    // getClassroom: () => api.get("/classroom"),

}

export default sheets;