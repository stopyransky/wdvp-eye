import * as React from 'react';
import { useState } from 'react';

import { formatNumber } from '../../data-helpers';
import { PanelProps } from '../../types';

export default function Panel(props: PanelProps) {
  const [show, setShow] = useState(false);
  const { indicator, country } = props;
  console.log(country, indicator);
  return (
    <div className='fh-panel'>
      { !show && <div className='fh-panel fh-panel--collapsed' onClick={() => setShow(true)}>info</div>}
      { show && <div className='fh-panel fh-panel--expanded'>
        <span className='close' onClick={() => setShow(false)}>close</span>
        {!country && !indicator && <div className='panel-info empty'>
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
        {indicator && <div className='panel-info'>
          <h1>{indicator.label} {indicator.unit ? `(${indicator.unit})` : '' }</h1>
          <div>
            <span>Source: </span>
            <a href={indicator.url}
              rel='noopener noreferrer'
              target='_blank'>{indicator.source}
            </a>
            <span> ({indicator.year})</span>
          </div>
          <div>
            <span>Description: </span>
            <p>{indicator.description}</p>
            <p>{indicator.details}</p>
          </div>
        </div>}
      </div>}
    </div>
  );
}
