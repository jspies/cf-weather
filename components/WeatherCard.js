import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  WeatherIcon
} from '../components/Card';
import { createComponent } from '@cloudflare/style-container';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Center = createComponent(({ theme }) => ({
  margin: '0px auto',
  textAlign: 'center'
}));

const WeatherCard = ({ weather }) => {
  const { main: { temp }, name, weather: [{ description, icon }] } = weather;
  return (
    <Link href={`/ForecastDetail?cityName=${name}`}>
      <a>
        <Card>
          <CardHeader>{name}</CardHeader>
          <CardBody>
            <Center>
              <WeatherIcon
                src={`http://openweathermap.org/img/w/${icon}.png`}
              />
            </Center>
            <Center>{description}</Center>
            <Center>{temp}</Center>
          </CardBody>
        </Card>
      </a>
    </Link>
  );
};

WeatherCard.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
      })
    ).isRequired
  })
};

export default WeatherCard;
