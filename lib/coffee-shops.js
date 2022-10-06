const getUrlForCoffeeShops = (near, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&near=${near}&limit=${limit}`
}


export const fetchCoffeeShops = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.FS_API_KEY
        }
      };
      
      const response = await fetch(getUrlForCoffeeShops("Sacramento, CA", "coffee shops", 6), options);
    
      const data = await response.json();
      return data.results;
      // .catch(err => console.error(err));
        
}