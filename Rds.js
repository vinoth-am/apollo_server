const { RESTDataSource } = require('apollo-datasource-rest');

 class RDS extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.randomuser.me/';
  }

  async getData() {
    const { data } = await this.get("");
     return  data;
    
    // return this.get(`movies/${id}`);
  }

//   async getMostViewedMovies(limit = 10) {
//     const data = await this.get('movies', {
//       per_page: limit,
//       order_by: 'most_viewed',
//     });
//     return data.results;
//   }
}

module.exports = RDS;