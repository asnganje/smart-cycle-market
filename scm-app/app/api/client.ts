import axios from "axios"

export const baseURL = "http://10.65.8.118:3000"

const client = axios.create({baseURL})

export default client;