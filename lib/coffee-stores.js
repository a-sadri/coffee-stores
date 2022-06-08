// Initialize unsplash
import { createApi } from 'unsplash-js';

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 10,
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores('52.52,13.39', 'coffee', 6),
    options
  );

  const data = await response.json();
  console.log(data.results);

  return data.results.map((result, idx) => {
    return { ...result, imgUrl: photos[idx] };
  });
};
