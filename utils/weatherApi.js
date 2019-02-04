const APP_ID = 'd25483c53dd033e2c5de052978f9f9ee';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const appendAppId = url => `${url}&appid=${APP_ID}`;

const makeApiCall = async (city, action) => {
  const url = appendAppId(`${BASE_URL}/${action}?q=${city}&units=Imperial`);
  const result = await fetch(url);
  const json = await result.json();
  return json;
};
export const getWeather = city => {
  return makeApiCall(city, 'weather');
};

export const getForecast = city => {
  return makeApiCall(city, 'forecast');
};
