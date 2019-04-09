import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { dataSource, dataModel, makeData } from '../../data-helpers';
import radialChart from '../d3/radial/radial';
import Panel from '../panel/Panel';
import github from '../../assets/github.png';
export default function RadialGraph() {

  const theHeight = window.innerHeight > 1024 ?  window.innerHeight : 1024;
  const [ width ] = useState(window.innerWidth);
  const [ height ] = useState(theHeight);
  const [ data, setData ] = useState(null);
  const [ currentCountry, setCurrentCountry ] = useState(null);
  const [ currentIndicator, setCurrentIndicator ] = useState(null);

  const radialChartEl = useRef(null);

  const handleCountryUpdate = (countryName) => {
    const countryData = data.rawData.find(d => d.country === countryName);
    setCurrentCountry(countryData);
  };

  useEffect(() => {
    d3.dsv(';', dataSource, dataModel)
      .then(makeData)
      .then(dataset => {
        const { dataItems, indicators, rawData } = dataset;
        setData({dataItems, indicators, rawData});
      });
  }, []);

  useEffect(() => {
    if(data) {
      radialChart._init(radialChartEl.current, {
        data,
        width,
        height,
        setCurrentCountry: handleCountryUpdate,
        setCurrentIndicator
      });
    }
  }, [data]);


  return (
    <div className='radial-screen parallax svg-parallax'>
      <div id='radial-container' ref={radialChartEl}></div>
      <Panel country={currentCountry} indicator={currentIndicator}/>
      <a href="https://github.com/stopyransky/wdvp-eye"
        title="Visit repository on Github" noreferrer="true" noopener="true">
        <span className='gh'>
          <img src={github}/>
        </span>
      </a>
    </div>
  );
}
