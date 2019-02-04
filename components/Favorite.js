import React from 'react';
import { getWeather } from '../utils/weatherApi';
import WeatherCard from '../components/WeatherCard';
import PropTypes from 'prop-types';

const Favorite = class Favorite extends React.Component {
  state = {
    weather: null
  };
  async componentDidMount() {
    const { city, getWeather } = this.props;
    const weather = await getWeather(city);
    this.setState({ weather });
  }
  render() {
    return (
      <div>
        {this.state.weather ? (
          <WeatherCard weather={this.state.weather} />
        ) : null}
      </div>
    );
  }
};

Favorite.propTypes = {
  city: PropTypes.string.isRequired,
  getWeather: PropTypes.func.isRequired
};

export default Favorite;
