import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:"https://amazon2-backend.onrender.com"
    // baseURL:"http://127.0.0.1:5001/"
    // baseURL:"http://127.0.0.1:5001/project-d57e5/us-central1/api"

    //deploy version of firebase function
    // baseURL:"http://127.0.0.1:5001/project-d57e5/us-central1/api"



});


export {axiosInstance}