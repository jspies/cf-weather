# Cloudflare Weather Take-home Challenge

This is a take home challenge intended to gauge the technical expertise of a candidate for the Front End Engineer role at Cloudflare.

It uses
[next.js](https://github.com/zeit/next.js/) - a framework for server-rendered or
statically-exported React apps for painless setup and
[fela](https://github.com/rofrischmann/fela) as a CSS-in-JS solution. If you want to get into the weeds of our CSS-in-JS solution, you might
find this useful:
[CSS vs CSS in JS guide](https://github.com/tajo/fela-workshop).


## Installation

It assumes you have the latest node and yarn installed.

To run the nextjs app:
```
cd cf-weather
yarn install
yarn dev
open http://localhost:3000
```

The app also comes with a simple JSON server to respond to RESTFUL requests for resources associated with the app, `favorites` and `cities`. For forecast information we use `https://openweathermap.org/api`.

<b>we provide all functions for your API needs in `utils/citiesApi`, `utils/favoritesApi` and `utils/weatherApi`. You don't need to any additional code to interface with any of the the API endpoints.</b>

To run the json server, in another terminal:
```
cd cf-weather
yarn start-json-server
```

## Running tests
```
cd cf-weather
yarn test
```

## Your task

### Update the My Favorite Cities page
When you start the app you'll notice that you are taken to the My Favorite Cities page (code `pages/FavoritesPage.js`).

You will notice, this page lists the current weather for your favorite cities (at first just London).

Your task is to complete the page:
#### Finish implementing the city selection dropdown.
1. When the user has entered input into the text input box, make a call to `getCitiesMatchingQuery` and populate the dropdown with the list provided. You will notice that if you were to display all results, it will immediately overwhelm the UI. Truncate the results to the top 20.
2. Debounce the call to `getCitiesMatchingQuery` to 500ms. So we don't make calls to the end point on every key stroke. You can use lodash's debounce function.
3. When the user clicks on a city name, add it to the list of the user's favorites using `addFavorite`. The UI should be updated with the newly added city.
4. Update tests provided in `pages/__tests__/FavoritesPage` for any functionality you add.

### Create new Forecast Detail page.
You will notice that When clicking on a city's card on the initial screen, the user is taken to a new route: `localhost:3000/ForecastDetail?cityName=${cityName}`. We have provided the skeleton for this page for you at `pages/ForecastDetail.js`

This page should display the 5 day forecast for the city in question. Use the `getForecast` function to do this.
You will notice that the response has information for every 3 hours for 5 days. Take the <b>first forecast</b> for each day and display its:
* Temperature forecast
* Icon indicating conditions at the time
* Description of conditions at that time.

At the bottom of the page, provide a link to go back to the initial screen.



### provide tests
Provide as detailed tests as possible for any new components or functions you write.
