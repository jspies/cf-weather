import Layout from '../components/Layout';
import Favorites from '../components/Favorites';
import React from 'react';
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
  state = {
    favorites: []
  };
  async componentDidMount() {
    const { getFavorites } = this.props;
    const favorites = await getFavorites();
    this.setState({
      favorites
    });
  }
  render() {
    return (
      <Layout>
        <Selector>
          <LabeledInput
            label="Search for a city"
            mb={0}
            name="example"
            onChange={() => {}}
          />
          <Dropdown
            onClose={() => {
              console.log('you should close dropdown here');
            }}
          >
            <DropdownLink
              onClick={() => {
                //addFavorite here
              }}
            >
              A city from search results
            </DropdownLink>
          </Dropdown>
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
