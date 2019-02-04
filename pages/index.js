import FavoritesPage from './FavoritesPage';
import { getFavorites, addFavorite } from '../utils/favoritesApi';
import { getCitiesMatchingQuery } from '../utils/citiesApi';
export default () => {
  return (
    <FavoritesPage
      getFavorites={getFavorites}
      addFavorite={addFavorite}
      getCitiesMatchingQuery={getCitiesMatchingQuery}
    />
  );
};
