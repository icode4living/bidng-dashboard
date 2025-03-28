import axios, { AxiosInstance } from "axios";
import { console } from "node:inspector";
class ApiClient{
private apiClient: AxiosInstance;

    constructor(private uri:string,private apiKey?:string,private token?:string){
        this.apiClient = axios.create({
            baseURL: this.uri,
            timeout: 10000,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`,
                "x-api-key":`${this.apiKey}`
            }

        });
        console.log(this.apiClient)

    }

    async postRequest(url:string, payload:object):Promise<any|null>{
       try{ const response = await this.apiClient.post(url,payload);
        console.log(response)

        if(response.status ==200 || 201){ //throw new Error(`API_ERROR: ${response.status}`)
        console.log(response)
        return response
      }
      else{
        return response
      }
    }
    catch(e){
      console.log(`Request Error: ${e}`)
      return e
    }
    }
    async putRequest(url:string, payload:object):Promise<any|null>{
        const response = await this.apiClient.put(url,payload);
        if(response.status !==200 || 201) //throw new Error(`API_ERROR: ${response.status}`)
       console.log(response)
        return response

    }

    async getRequest(url:string, payload?:object):Promise<any|null>{
        const response = await this.apiClient.get(url,payload!);
    //    if(response.status !==200 || 201) throw new Error(`API_ERROR: ${response.status}`)

        return response
    }
    async patchRequest<T>(url: string, payload: object): Promise<any|null> {
     const resp = await  this.apiClient.patch<T>(url, payload);
     return resp
    }
    async deleteRequest(url:string, payload?:object):Promise<any|null>{
        const response = await this.apiClient.delete(url,payload!);
        if(response.status !==200 || 201) //throw new Error(`API_ERROR: ${response.status}`)
        console.log(response)
        return response
    }
}

export default ApiClient;

/*
import axios, { AxiosInstance, AxiosResponse } from "axios";

class ApiClient {
  private apiClient: AxiosInstance;

  constructor(private uri: string, private apiKey?: string, private token?: string) {
    this.apiClient = axios.create({
      baseURL: this.uri,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token ? `Bearer ${this.token}` : "",
        "x-api-key": this.apiKey || "",
      },
    });
  }

  private async handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const response = await request;
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`API_ERROR: ${response.status} - ${response.statusText}`);
      }
      return response.data;
    } catch (error) {
      console.error("API Request Failed:", error);
      throw error;
    }
  }

  async postRequest<T>(url: string, payload: object): Promise<T> {
    return this.handleRequest(this.apiClient.post<T>(url, payload));
  }

  async putRequest<T>(url: string, payload: object): Promise<T> {
    return this.handleRequest(this.apiClient.put<T>(url, payload));
  }

  async patchRequest<T>(url: string, payload: object): Promise<T> {
    return this.handleRequest(this.apiClient.patch<T>(url, payload));
  }

  async getRequest<T>(url: string, params?: object): Promise<T> {
    return this.handleRequest(this.apiClient.get<T>(url, { params }));
  }

  async deleteRequest<T>(url: string, params?: object): Promise<T> {
    return this.handleRequest(this.apiClient.delete<T>(url, { params }));
  }
}

export default ApiClient;
*/