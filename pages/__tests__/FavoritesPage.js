import { felaShallow } from '@cloudflare/util-testing';
import FavoritesPage from '../FavoritesPage';

const addFavorite = () => {
  return Promise.resolve({ id: 1, city: 'san francisco' });
};

const getFavorites = () => {
  return Promise.resolve([{ id: 0, city: 'london' }]);
};

const getCitiesMatchingQuery = () => {
  return Promise.resolve([
    {
      id: 707860,
      name: 'Hurzuf',
      country: 'UA',
      coord: {
        lon: 34.283333,
        lat: 44.549999
      }
    },
    {
      id: 519188,
      name: 'Novinki',
      country: 'RU',
      coord: {
        lon: 37.666668,
        lat: 55.683334
      }
    }
  ]);
};

const defaultProps = {
  addFavorite,
  getFavorites,
  getCitiesMatchingQuery
};

describe('FavoritesPage', () => {
  it('should render ', done => {
    const { snapshot, wrapper } = felaShallow(
      <FavoritesPage {...defaultProps} />
    );
    expect(snapshot(wrapper)).toMatchSnapshot();

    //need to check snapshot after the getFavorites call's promise has resolved
    setTimeout(() => {
      wrapper.update();
      expect(snapshot(wrapper)).toMatchSnapshot();
      done();
    });
  });
});
