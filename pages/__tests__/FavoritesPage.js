import { felaShallow } from '@cloudflare/util-testing';
import FavoritesPage from '../FavoritesPage';

const addFavorite = jest.fn().mockImplementation(() => {
  return Promise.resolve({ id: 1, city: 'austin' });
});

const getFavorites = jest.fn().mockImplementation(() => {
  return Promise.resolve([
    { id: 0, city: 'london' },
    { id: 1, city: 'austin' },
  ]);
});

const getCitiesMatchingQuery = jest.fn().mockImplementation(() => {
  return Promise.resolve([
    {
      id: 4254010,
      name: "Austin",
      country: "US",
      coord: {
        lon: -85.808029,
        lat: 38.758389
      }
    },
    {
      id: 1001775,
      name: "Glen Austin",
      country: "ZA",
      coord: {
        lon: 28.15,
        lat: -25.966669
      }
    },
  ]);
});

const defaultProps = {
  addFavorite,
  getFavorites,
  getCitiesMatchingQuery
};

describe('FavoritesPage', () => {
  it('should render the favorites', done => {
    const { snapshot, wrapper } = felaShallow(
      <FavoritesPage {...defaultProps} />
    );
    expect(snapshot(wrapper)).toMatchSnapshot();

    // need to check snapshot after the getFavorites call's promise has resolved
    setTimeout(() => {
      wrapper.update();
      expect(snapshot(wrapper)).toMatchSnapshot();
      expect(defaultProps.getFavorites).toHaveBeenCalled();
      expect(wrapper.state().favorites).toEqual([
        { id: 0, city: 'london' },
        { id: 1, city: 'austin' },
      ]);
      done();
    });
  });

  it('should call debounceSearchCities', done => {
    const { snapshot, wrapper } = felaShallow(
      <FavoritesPage {...defaultProps} />
    );

    const debounceSpy = jest.spyOn(wrapper.instance(), 'debounceSearchCities');
    wrapper.find('#citySearch').simulate('change', { target: { value: 'austin' } });
    setTimeout(() => {
      wrapper.update();
      expect(debounceSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should search and add cities to the search dropdown', done => {
    const { snapshot, wrapper } = felaShallow(
      <FavoritesPage {...defaultProps} />
    );

    wrapper.instance().searchCities('austin');
    setTimeout(() => {
      wrapper.update();
      expect(snapshot(wrapper)).toMatchSnapshot();
      expect(defaultProps.getCitiesMatchingQuery).toHaveBeenCalledWith('austin');
      expect(wrapper.state().dropdownOpen).toEqual(true);
      expect(wrapper.state().cities).toEqual([
        {
          id: 4254010,
          name: "Austin",
          country: "US",
          coord: {
            lon: -85.808029,
            lat: 38.758389
          }
        },
        {
          id: 1001775,
          name: "Glen Austin",
          country: "ZA",
          coord: {
            lon: 28.15,
            lat: -25.966669
          }
        },
      ]);
      done();
    });
  });

  it('should add city to favorites on click of a city in the dropdown', done => {
    const { snapshot, wrapper } = felaShallow(
      <FavoritesPage {...defaultProps} />
    );

    const addToFavoritesSpy = jest.spyOn(FavoritesPage.prototype, 'addToFavorites');
    wrapper.setState({
      dropdownOpen: true,
      cities: [
        {
          id: 4254010,
          name: "Austin",
          country: "US",
          coord: {
            lon: -85.808029,
            lat: 38.758389
          }
        },
        {
          id: 1001775,
          name: "Glen Austin",
          country: "ZA",
          coord: {
            lon: 28.15,
            lat: -25.966669
          }
        },
      ],
    }, () => {
      wrapper.update();
      expect(snapshot(wrapper)).toMatchSnapshot();
      wrapper.find('.dropdown-link').first().simulate('click');
      setTimeout(() => {
        expect(addToFavoritesSpy).toHaveBeenCalledWith('Austin');
        expect(defaultProps.addFavorite).toHaveBeenCalledWith('Austin');
        expect(wrapper.state().dropdownOpen).toEqual(false);
        expect(wrapper.state().favorites).toEqual([
          { id: 0, city: 'london' },
          { id: 1, city: 'austin' },
        ]);
        done();
      });
    });
  });
});
