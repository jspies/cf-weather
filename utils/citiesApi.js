const BASE_URL = 'http://localhost:3004/cities';

export const getCitiesMatchingQuery = async query => {
  const result = await fetch(`${BASE_URL}?name_like=${query}`);
  const cities = await result.json();
  return cities;
};
