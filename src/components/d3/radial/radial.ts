import * as d3 from 'd3';

import legend from './../legend/legend';
import indicatorRing from './indicator-ring';
import heatmapRing from './heatmap-ring';
import {
  RadialProps,
  RadialMainGroupSelection,
  Datapoint,
  RadialData
} from '../../../types';

let data: RadialData;
let selectedIndicatorName: string;
let selectedCountryName: string;
let parentProps: RadialProps;

function addGradients(defs) {
  const YlOrBr = defs.append('linearGradient')
    .attr('id', 'YlOrBr')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%');

  YlOrBr.append('stop').attr('offset', '0%').attr('style', 'stop-color:#fff7bc;stop-opacity:1');
  YlOrBr.append('stop').attr('offset', '50%').attr('style', 'stop-color:#fec44f;stop-opacity:1');
  YlOrBr.append('stop').attr('offset', '100%').attr('style', 'stop-color:#fec44f;stop-opacity:1');

  const BuPu = defs.append('linearGradient')
    .attr('id', 'BuPu')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%');

  BuPu.append('stop').attr('offset', '0%').attr('style', 'stop-color:#e0ecf4;stop-opacity:1');
  BuPu.append('stop').attr('offset', '100%').attr('style', 'stop-color:#8856a7;stop-opacity:1');

  const PuBu = defs.append('linearGradient')
    .attr('id', 'PuBu')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%');


  PuBu.append('stop').attr('offset', '0%').attr('style', 'stop-color:#fdf8f4;stop-opacity:1');
  PuBu.append('stop').attr('offset', '100%').attr('style', 'stop-color:#2b8cbe;stop-opacity:1');
  const Greens = defs.append('linearGradient')
    .attr('id', 'Greens')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%');


  Greens.append('stop').attr('offset', '0%').attr('style', 'stop-color:#e5f5e0;stop-opacity:1');
  Greens.append('stop').attr('offset', '100%').attr('style', 'stop-color:#31a354;stop-opacity:1');
}

function init(containerEl: HTMLElement, props: RadialProps): void {

  const { width, height } = props;
  parentProps = props;

  data = props.data;
  const indicatorStats = props.data.indicators;

  const svg = d3.select(containerEl).append('svg')
    .attr('class', 'radial-graph')
    .attr('width', width)
    .attr('height', height);

  addGradients(svg.append('defs'));
  legend.render(svg);

  const mainGroup: RadialMainGroupSelection = svg.append('g')
    .attr('transform', `translate(${width * 0.5}, ${height * 0.5})`);

  indicatorRing.init(mainGroup, dataForIndicatorRing(), indicatorStats);
  heatmapRing.init(mainGroup, props.data);
}

function dataForIndicatorRing(): Datapoint[] {
  if (!selectedCountryName) { return null; }
  return data.dataItems
    .filter((d: Datapoint) => d.country === selectedCountryName)
    .filter((d: Datapoint) => d.indicator !== 'Total');
}

// triggered by heatmap-ring country labels
export function updateOnCountryChange(countryName: string): void {
  selectedCountryName = countryName;
  indicatorRing.updateOnCountryChange(dataForIndicatorRing(), selectedCountryName);
  parentProps.setCurrentCountry(countryName);
}

// triggered by heatmap-ring indicator labels
export function updateOnIndicatorChange(indicatorName: string): void {
  selectedIndicatorName = indicatorName;
  parentProps.setCurrentIndicator(selectedIndicatorName);
}

export default { init, updateOnCountryChange, updateOnIndicatorChange };
