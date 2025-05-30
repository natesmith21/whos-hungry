import axios from "axios";

const API_URL = (import.meta.env.DEV === true) ? 'http://localhost:1001' : import.meta.env.VITE_BASE_URL;

class dbApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        // console.debug("API Call fe:", API_URL, endpoint, data, method);
    
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${API_URL}/${endpoint}`;
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

      /** get random recipe */
      static async getRandomRecipe(){
        let res = await this.request('recipes/random');
        return res.recipe;
      }

      /**get a specifc recipe */
      static async getRecipe(id){
        let res = await this.request(`recipes/${id}`);
        return res.recipe;
      }

      static async searchRecipes(data){
        let res = await this.request(`recipes/search/`, data);
        return res;
      }

      /**save a recipe to a user */
      static async saveRecipe(recipeId, data) {
        let res = await this.request(`recipes/${recipeId}/save`, data, 'post');
        return res;
      }

      /**get a user's saved recipes */
      static async getSavedRecipes(username) {
        let res = await this.request(`users/${username}/saved`);
        return res.saved;
      }

      /**remove a recipe from a user's saves */
      static async removeSavedRecipe(username, recipeId) {
        let res = await this.request(`users/${username}/${recipeId}`, {}, 'delete');
        return res;
      }
}

export default dbApi;