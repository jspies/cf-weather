const BASE_URL = 'http://localhost:3004/favorites';

export const getFavorites = async () => {
  const result = await fetch(BASE_URL);
  const favorites = await result.json();
  return favorites;
};

export const addFavorite = async city => {
  const data = {
    city
  };
  await fetch(BASE_URL, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
};
