
import axios from "axios";


const BASE_URL = 'https://api.spoonacular.com'
const API_KEY = 'ad36707e96c94e188eadb6aa2c50d31e';

class spoonApi {

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {"x-api-key" : API_KEY}
        const params = (method === "get")
            ? data
            : {};
        
            console.log(headers)
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err);
        //   let message = err.response.data.error.message;
        //   throw Array.isArray(message) ? message : [message];
        }
      }

      static async getRandom(){
        let res = await this.request('recipe/random');
        return res.recipes
      }
}

export default spoonApi;

// { Authorization: `Bearer ${API_KEY}` };