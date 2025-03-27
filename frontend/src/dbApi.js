import axios from "axios";

const BASE_URL = "http://localhost:3001";

class dbApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${dbApi.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }
    
      // Individual API routes
    
    /** register */
      static async makeUser(data){
        let res = await this.request(`auth/register`, data, 'post');
        return res.token;
      }
    
      /** login  */
      static async getToken(data){
        let res = await this.request(`auth/token`, data, 'post');
        return res;
      }
    
      static async getCurrentUser(username){
        let res = await this.request(`users/${username}`);
        return res.user;
      }
    
      static async updateCurrentUser(username, data){
        let res = await this.request(`users/${username}`, data, 'patch')
        return res;
      }

      /** get random recipie */
      static async getRandomRecipe(){
        let res = await this.request('recipes/random');
        return res.recipe;
      }
}

export default dbApi;