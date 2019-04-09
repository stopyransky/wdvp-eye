import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { categoryMap } from '../../metadata';
import { formatNumber } from '../../data-helpers';

export default function Panel({indicator, country}) {
  const [show, setShow] = useState(false);
  const [ indicatorInfo, setIndicatorInfo ] = useState(null);

  useEffect(() => {
    setIndicatorInfo(categoryMap[indicator]);
  }, [ indicator ]);

  return (
    <div className='fh-panel'>
      { !show && <div className='fh-panel fh-panel--collapsed' onClick={()=> setShow(true)}>info</div>}
      { show && <div className='fh-panel fh-panel--expanded'>
        <span className='close' onClick={() => setShow(false)}>close</span>
        {!country && !indicatorInfo && <div className='panel-info empty'>
          <p>{'This is information panel where you\'ll find data about selected indicator and country.'}
          </p>
          <p>{'Select country or indicator on main graph by clicking its label to see details here.'}</p>
        </div>}
        {country && <div className='panel-info'>
          <h1>{country.country}</h1>
          <div><span>Region: </span>{country.region}</div>
          <div><span>Subregion: </span>{country.subregion}</div>
          <div><span>Population: </span>{formatNumber(country.population, 0)}</div>
          <div><span>Area (km2): </span>{formatNumber(country.surfacearea, 0)}</div>
          <div><span>GDP ($bln PPP): </span>{formatNumber(country.GDP)}</div>
        </div>}
        {indicatorInfo && <div className='panel-info'>
          <h1>{indicatorInfo.label} {indicatorInfo.unit ? `(${indicatorInfo.unit})` : '' }</h1>
          <div>
            <span>Source: </span>
            <a href={indicatorInfo.url}
              rel='noopener noreferrer'
              target='_blank'>{indicatorInfo.source}
            </a>
            <span> ({indicatorInfo.year})</span>
          </div>
          <div>
            <span>Description: </span>
            <p>{indicatorInfo.description}</p>
            <p>{indicatorInfo.details}</p>
          </div>
        </div>}
      </div>}
    </div>
  );
}

Panel.propTypes = {
  indicator: PropTypes.string,
  country: PropTypes.object
};

