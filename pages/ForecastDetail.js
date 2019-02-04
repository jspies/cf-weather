import React from 'react';
import Link from 'next/link';
import ForecastLayout from '../components/ForecastLayout';
import { getForecast } from '../utils/weatherApi';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from 'cf-component-table';
import { createComponent } from '@cloudflare/style-container';

const WeatherIcon = createComponent(
  () => ({
    width: '75px',
    height: '75px',
    borderRadius: '2px 2px 0 0',
    display: 'inline-block',
  }),
  'img',
  ['src']
);

const Title = createComponent(() => ({
  fontSize: '75px',
  textAlign: 'center',
}));

const Center = createComponent(() => ({
  fontSize: '30px',
  textAlign: 'center',
}));

const ForecastDetail = ({ cityName, weather }) => {
  return (
    <ForecastLayout>
      <Title>{cityName}</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Day
            </TableCell>
            <TableCell>
              Description
            </TableCell>
            <TableCell>
              High/Low
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weather.length > 0 ?
            weather.map((row, r) => (
              <TableRow key={r}>
                {row.map((cell, c) => (
                  <TableCell key={c}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
            : null}
        </TableBody>
      </Table>
      <Center>
        <Link href={'/'}>
          <a>Back To Favorites</a>
        </Link>
      </Center>
    </ForecastLayout>
  );
};

/**
 * makes call for the forecast of the given city and sends as props to the stateless component
 * @param cityName - the city to get the forecast for
 */
ForecastDetail.getInitialProps = async ({ query: { cityName } }) => {
  const data = await getForecast(cityName);

  const weather = [];
  let currentDay;
  for (let i = 0; i < data.list.length; i++) {
    const day = data.list[i].dt_txt.split(' ')[0];
    const parts = day.split('-');
    if (currentDay !== day) {
      currentDay = day;
      weather.push([
        <div>
          <h3>{new Date(parts[0], parts[1] - 1, parts[2]).toDateString()}</h3>
          <WeatherIcon src={`http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`} />
        </div>,
        data.list[i].weather[0].description,
        `${data.list[i].main.temp_max}°/${data.list[i].main.temp_min}°`,
      ]);
    }
  }

  return {
    cityName,
    weather,
  };
}

export default ForecastDetail;
