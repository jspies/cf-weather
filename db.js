const cities = require('./city.list.json');

module.exports = () => {
  return {
    favorites: [{ id: 0, city: 'london' }],
    cities
  };
};
