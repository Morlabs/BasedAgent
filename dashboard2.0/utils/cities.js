export const fetchCities = async (countryName) => {
  const accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
  const url = `http://api.geonames.org/searchJSON?q=${countryName}&maxRows=1000&username=bilal09`;
  // &access_token=${accessToken}
  try {
      const response = await fetch(url);
      const data = await response.json();
      const cities = data.geonames.map(feature => feature.name);
      return cities;
  } catch (error) {
      console.log('Error fetching cities:', error);
  }
};

// https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(countryName)}.json?types=place
//