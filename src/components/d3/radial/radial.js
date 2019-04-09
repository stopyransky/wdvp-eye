import * as d3 from 'd3';

import indicatorRing from './indicator-ring';
import heatmapRing from './heatmap-ring';

let data = null;
let selectedIndicatorName = null;
let selectedCountryName = null;
let _props = null;

function init(containerEl, props) {

  const { width, height } = props;
  _props = props;

  data = props.data;
  const indicatorStats = props.data.indicators;

  const svg = d3.select(containerEl).append('svg')
    .attr('class', 'radial-graph')
    .attr('width', width)
    .attr('height', height);

  const mainGroup = svg.append('g')
    .attr('transform', `translate(${width * 0.5}, ${height * 0.5})`);

  indicatorRing.init(mainGroup, dataForIndicatorRing(), indicatorStats);
  heatmapRing.init(mainGroup, props.data);
}

function dataForIndicatorRing() {
  if(!selectedCountryName) return null;
  return data.dataItems
    .filter(d => d.country === selectedCountryName)
    .filter(d => d.indicator !== 'Total');
}

// triggered by heatmap-ring country labels
export function updateOnCountryChange(countryName) {
  selectedCountryName = countryName;
  indicatorRing.updateOnCountryChange(dataForIndicatorRing(), selectedCountryName);
  _props.setCurrentCountry(countryName);
}

// triggered by heatmap-ring indicator labels
export function updateOnIndicatorChange(indicatorName) {
  selectedIndicatorName = indicatorName;
  _props.setCurrentIndicator(selectedIndicatorName);
}

export default { _init: init, updateOnCountryChange, updateOnIndicatorChange };
