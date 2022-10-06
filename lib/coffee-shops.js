import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
});

const getUrlForCoffeeShops = (near, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&near=${near}&limit=${limit}`
}

const getListOfCoffeePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30,
  });

  const unsplashResults = photos.response.results
  
  return unsplashResults.map((result) => result.urls["small"]);
}

export const fetchCoffeeShops = async () => {
  const photos = await getListOfCoffeePhotos();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FS_API_KEY
    }
  };
  
  const response = await fetch(getUrlForCoffeeShops("Sacramento, CA", "coffee shops", 6), options);

  const data = await response.json();
  return data.results.map((result, idx) => {
    const neighborhood = result.location.neighborhood
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      neighborhood: neighborhood?.length > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    }
  });
  // .catch(err => console.error(err));
        
}