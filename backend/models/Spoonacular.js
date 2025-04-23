
const axios = require('axios');


const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

class Spoonacular {

    static async request(endpoint, data = {}, method = "get") {
        // console.debug("spoon API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {"x-api-key" : API_KEY}
        const params = (method === "get")
            ? data
            : {};

        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }

      static async getRandom(){
        let res = await this.request('recipes/random');
        return res.recipes;
      }

      static async getRecipe(id){
        let res = await this.request(`recipes/${id}/information`)
        return res;
      }

      static async searchRecipes(params) {
        const filters = [];
        for (let k in params) filters.push(`${k}=${params[k]}`);

        let res = await this.request(`recipes/complexSearch?${filters.join('&')}`)
        return res;
      }
}

module.exports = Spoonacular;


// &${filters.join('&')}