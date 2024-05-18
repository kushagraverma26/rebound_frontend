import axios from "axios";

const client = axios.create({ baseURL: "http://127.0.0.1:8000" });

export const get = (endpoint) => client.get(endpoint).then((res) => res.data);

export const post = (endpoint, data) =>
  client.post(endpoint, data).then((res) => res.data);
