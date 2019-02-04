import Layout from '../components/Layout';
import Favorites from '../components/Favorites';
import React from 'react';
import { debounce } from 'lodash';
import {
  Dropdown,
  DropdownLink,
  DropdownSeparator
} from '@cloudflare/component-dropdown';
import { LabeledInput } from '@cloudflare/component-input';
import { createComponent } from '@cloudflare/style-container';
import PropTypes from 'prop-types';

const Selector = createComponent(() => ({
  whieSpace: 'nowrap',
  display: 'inline-block',
  verticalAlign: 'middle',
  position: 'relative'
}));

const FavoritesPage = class Index extends React.Component {
  /**
   * favorites [array] - the cities in the favorite list
   * cities [array] - the cities in the search dropdown
   * dropdownOpen [boolean] - whether or not the search dropdown is open
   */
  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
      cities: [],
      dropdownOpen: false,
    };

    this.debounceSearchCities = debounce(this.searchCities, 500);
  }

  async componentDidMount() {
    const { getFavorites } = this.props;
    const favorites = await getFavorites();
    this.setState({
      favorites
    });
  }

  /**
   * searches cities by the search criteria and updates the state accordingly
   * @param city - the search criteria
   */
  async searchCities(city) {
    const { getCitiesMatchingQuery } = this.props;
    let cities = await getCitiesMatchingQuery(city);
    cities.sort((a, b) => {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    });
    if (cities.length > 20) {
      cities.length = 20;
    }
    this.setState({
      cities,
      dropdownOpen: cities.length > 0,
    });
  }

  /**
   * adds the selected city to the favorites page
   * @param city - the selected city
   */
  async addToFavorites(city) {
    const { addFavorite, getFavorites } = this.props;
    await addFavorite(city);
    const favorites = await getFavorites();
    this.setState({
      favorites,
      dropdownOpen: false,
    });
  }

  render() {
    return (
      <Layout>
        <Selector>
          <LabeledInput
            label="Search for a city"
            mb={0}
            name="citySearch"
            id="citySearch"
            onChange={(e) => {
              this.debounceSearchCities(e.target.value);
            }}
          />
          {this.state.dropdownOpen &&
            <Dropdown
              closed
              onClose={() => {
                this.setState({
                  dropdownOpen: false,
                });
              }}
            >
            {this.state.cities.map((city) => {
              return (
                <DropdownLink
                  key={city.id}
                  className="dropdown-link"
                  onClick={() => this.addToFavorites(city.name)}
                >
                  {city.name}
                </DropdownLink>
              );
            })}
            </Dropdown>
          }
        </Selector>
        <Favorites favorites={this.state.favorites} />
      </Layout>
    );
  }
};

FavoritesPage.propTypes = {
  getFavorites: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  getCitiesMatchingQuery: PropTypes.func.isRequired
};
export default FavoritesPage;
