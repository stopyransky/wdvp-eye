import React from 'react';
import PropTypes from 'prop-types';

export default function IndicatorInfo({ indicatorInfo }) {

  return (
    <div className='indicator-info'>
      <h1>{indicatorInfo.label}</h1>
      <div><span>Source: <a href={indicatorInfo.url}
        rel='noopener noreferrer' target='_blank'>{indicatorInfo.source}</a></span></div>
      <div><span>Year: {indicatorInfo.year}</span></div>
      <div>
        <p>Description: </p>
        <p>{indicatorInfo.description}</p>
      </div>
    </div>
  );
}

IndicatorInfo.propTypes = {
  indicatorInfo: PropTypes.object
};


