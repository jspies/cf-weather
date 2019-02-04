jest.mock('../../utils/weatherApi', () => ({
  getForecast: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      list: [
        {
          dt_txt: '2019-01-30',
          main: {
            temp_max: 23.14,
            temp_min: 21.87,
          },
          weather: [
            {
              icon: "01n",
              description: "clear sky",
            },
          ],
        },
        {
          dt_txt: '2019-01-31',
          main: {
            temp_max: 23.14,
            temp_min: 21.87,
          },
          weather: [
            {
              icon: "01n",
              description: "cloudy sky",
            },
          ],
        },
      ],
    });
  })
}));

import { felaShallow } from '@cloudflare/util-testing';
import ForecastDetail from '../ForecastDetail';
import { getForecast } from '../../utils/weatherApi';

describe('ForecastDetail', () => {
  let defaultProps;

  beforeEach(async () => {
    defaultProps = await ForecastDetail.getInitialProps({ query: { cityName: 'Austin' } });
  });

  it('should render the forecast details', done => {
    const { snapshot, wrapper } = felaShallow(
      <ForecastDetail {...defaultProps} />
    );

    setTimeout(() => {
      wrapper.update();
      expect(snapshot(wrapper)).toMatchSnapshot();
      done();
    });
  });
});
