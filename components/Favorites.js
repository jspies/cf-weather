import React from 'react';
import Favorite from './Favorite';
import { createComponent } from '@cloudflare/style-container';
import { getWeather } from '../utils/weatherApi';
import PropTypes from 'prop-types';

const Wrapper = createComponent(() => ({
  marginTop: '10'
}));

const Favorites = ({ favorites }) => {
  return (
    <Wrapper>
      {favorites.map(({ id, city }) => {
        return <Favorite key={id} city={city} getWeather={getWeather} />;
      })}
    </Wrapper>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Favorites;
