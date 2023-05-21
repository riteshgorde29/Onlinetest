import axios from "axios"
const BASE_URL='http://localhost:2020/'
export const fnSendGetReq=(url)=>{
  return axios.get(BASE_URL+url)
}

export const fnSendPostReq=(url,data)=>{
 return axios.post(url,data)
}


export const fnSendPutReq=(url,data)=>{
    return axios.put(url,data)
}

export const fnSendDelReq=(url,data)=>{
    return axios.delete(url,data)
}