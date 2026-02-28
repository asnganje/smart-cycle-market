import axios from "axios"

const baseURL = "http://10.56.22.118:3000"

const client = axios.create({baseURL})

export default client;