import React from 'react';
//TODO: Complete the implementation of this page. Currently just accepts the cityName as a parameter
//and outputs it
export default ({ url: { query: { cityName } } }) => {
  return <div> {cityName} </div>;
};
