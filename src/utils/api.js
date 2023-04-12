import axios from "axios";

const BASE_URL = "http://localhost:3000";

export function sendGetRequest(url,) {
    return axios.get(`${BASE_URL}${url}`);
}

export function sendSingleGetRequest(url,id) {
    return axios.get(`${BASE_URL}${url}${id}`);
}

export function sendDeleteRequest(url,id) {
    return axios.delete(`${BASE_URL}${url}${id}`);
}
export function sendCreateDataRequest(url, data) {
    return axios.post(`${BASE_URL}${url}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
