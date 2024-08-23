export async function getCityAndCountry(location) {
    try {
      if (!location) return { city: '', country: '', countryCode: '' };
  
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          location
        )}&format=json&addressdetails=1`
      );
  
      const data = await response.json();

      if (data.length > 0) {
        const city = data?.[1]?.address?.village || data?.[1]?.name || '';
        const country = data?.[0]?.address?.country || '';
        const countryCode = data?.[0]?.address?.country_code || '';
  
        return { city, country, countryCode };
      }
  
      return { city: '', country: '', countryCode: '' };
    } catch (error) {
      console.log('Geocoding error:', error);
      return { city: '', country: '', countryCode: '' };
    }
  }
  