import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import heatmap from '../d3/heatmap/heatmap';
import { dataModel, makeData, dataSource } from '../../data-helpers';

export default function Heatmap() {
  const [ data, setData ] = useState(null);
  const heatmapEl = useRef(null);

  useEffect(() => {
    d3.dsv(';', dataSource, dataModel).then(makeData).then(setData);
  },[]);

  useEffect(() => {
    if(data && data.dataItems && data.dataItems.length) {
      heatmap.init(heatmapEl.current, {data});
    }
  }, [data]);

  return (
    <div className='fh-heatmap'>
      <div id='heatmap-container' ref={heatmapEl}></div>
    </div>
  );
}
