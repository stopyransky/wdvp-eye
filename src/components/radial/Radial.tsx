import * as React from 'react';
import { useReducer, useRef, useEffect } from 'react';
import * as d3 from 'd3';

import * as github from '../../assets/github.png';
import { dataSource, modelData, makeData } from '../../data-helpers';
import radialChart from '../d3/radial/radial';
import Panel from '../panel/Panel';
import { RadialProps, RadialData, RadialState } from '../../types';
import { baseReducer } from '../../utils';
import { categoryMap } from '../../metadata';

const defaultState: RadialState = {
  width: window.innerWidth,
  height: window.innerHeight > 1024 ? window.innerHeight : 1024,
  data: null,
  currentCountry: null,
  currentIndicator: null,
};

function radialReducer(state: RadialState, action: any): any {
  switch (action.type) {
  case 'resize': {
    return {
      ...state,
      width: action.width,
      height: action.height,
    };
  }
  default:
    return baseReducer(state, action);
  }
}

export default function RadialGraph() {

  const radialRef = useRef(null);
  const [ state, dispatch ] = useReducer(radialReducer, defaultState);
  const { data, width, height, currentCountry, currentIndicator } = state;

  const setState = (type: string, value: any): void => dispatch({ type, value });

  const handleCountryUpdate = (countryName: string): void => {
    const countryData = data.rawData.find(d => d.country === countryName);
    setState('currentCountry', countryData);
  };

  const handleIndicatorUpdate =  (indicatorName: string): void => {
    setState('currentIndicator', categoryMap[indicatorName]);
  };

  useEffect(fetchData, []);
  useEffect(init, [data]);

  function fetchData(): void {
    d3.dsv(';', dataSource, modelData)
      .then(makeData)
      .then(({ dataItems, indicators, rawData }: RadialData) => {
        setState('data', { dataItems, indicators, rawData });
      });
    }

  function init(): void {
    if (data) {
      const radialProps: RadialProps = {
        data,
        width,
        height,
        setCurrentCountry: handleCountryUpdate,
        setCurrentIndicator: handleIndicatorUpdate
      };
      radialChart._init(radialRef.current, radialProps);
    }
  }

  return (
    <div className='radial-screen parallax svg-parallax'>
      <div id='radial-container' ref={radialRef}></div>
      <Panel country={currentCountry} indicator={currentIndicator}/>
      <a
        href='https://github.com/stopyransky/wdvp-eye'
        rel='noreferrer noopener'
        title='Visit repository on Github'>
        <span className='gh'>
          <img src={github}/>
        </span>
      </a>
    </div>
  );
}
