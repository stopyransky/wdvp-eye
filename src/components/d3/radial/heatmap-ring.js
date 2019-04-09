import * as d3 from 'd3';
import { colorize, desaturate } from '../../../data-helpers';
import { handleHoverEvents } from './shared';
import radialParent from './radial';
import { categoryMap } from '../../../metadata';

export const hrInnerRadius = 140;
export const hrCellHeight = 12;

const hrLabelLength = 120;
const hrLabelPadding = 2;
const radialLabelGroupRotation = (10 * 200 / 360);
const hrOffset = 0.15;
const hrFactor = 1.76;
const drawArc = d3.arc();
const timing = {
  inOut: 1200,
  in: 600,
  dur: 3000,
  out: 600
};

let _selectedIndicatorName = null;
let _selectedCountryName = null;
let _container = null;
let _data = null;
let _indicatorNames = null;
let _countryNames = null;
let _indicatorStats = null;
let _prevCountryNames = null;
let _empties = null;
let _sortDescending = true;
let _hrOuterRadius = 0;
let _hrLinearAngleScale = null;
let _hrAngleScale = null;
let _hrRadiusScale = null;


function init(container, data) {

  _container = container;
  _data = data.dataItems;
  _indicatorStats = data.indicators;
  _indicatorNames = d3.set(_data.map(item => item.indicator)).values();
  _countryNames = d3.set(_data.map(item => item.country)).values();
  _prevCountryNames = [..._countryNames];
  _hrOuterRadius = hrInnerRadius + hrCellHeight * _indicatorNames.length;

  _hrAngleScale = d3.scaleBand()
    .domain(_countryNames.map((d, i) => i))
    .range([hrOffset, hrOffset + hrFactor * Math.PI])
    .align(0);

  _hrLinearAngleScale = d3.scaleLinear()
    .domain([0, _countryNames.length])
    .range([hrOffset, hrOffset + hrFactor * Math.PI]);

  _hrRadiusScale = d3.scaleLinear()
    .domain([0, _indicatorNames.length])
    .range([hrInnerRadius, _hrOuterRadius]);

  initHeatmapRing();
  initIndicatorLabels();
  initCountryLabels();
}

function initHeatmapRing() {
  const heatmapRingGroup = _container.append('g')
    .attr('class', 'heatmap-ring');

  heatmapRingGroup.selectAll('path')
    .data(_data, d => d.id)
    .enter()
    .append('path')
    .attr('class', d => `heatmap-ring-path ${d.code} ${d.indicator}`)
    .attr('fill', d => desaturate(getColor(d), 0.25))
    .attr('display', d => d.value === null ? 'none' : null)
    .attr('d', makeHeatmapPath)
    .on('mouseup', (d) => {

      if(_selectedCountryName !== d.country)  {
        _selectedCountryName = d.country;
        const countryCode = d.code;
        d3.select('.country-label.selected').classed('selected', false);
        d3.select(`.country-label.${countryCode}`).classed('selected', true);
        d3.selectAll(`.heatmap-ring-path.selected:not(.${_selectedIndicatorName})`).classed('selected', false);
        d3.selectAll(`.heatmap-ring-path.${countryCode}`).classed('selected', true);

        radialParent.updateOnCountryChange(_selectedCountryName);
      }
    })
    .call(s => handleHoverEvents(s, _container));
}

function initCountryLabels() {

  const countryLabelsGroup = d3.select('.heatmap-ring').append('g')
    .attr('class', 'heatmap-ring-country-labels')
    .attr('transform', 'rotate(-0.15)');

  countryLabelsGroup.selectAll('path')
    .data(_countryNames)
    .enter()
    .append('path')
    .attr('opacity', 0)
    .attr('class', 'country-label-path')
    .attr('id', d => 'country-label-path-' + lookupCountryByCountryName(d).code)
    .attr('d', makeCountryLabelPath);

  countryLabelsGroup.selectAll('text')
    .data(_countryNames, d => d)
    .enter()
    .append('text')
    .attr('class', d => `label country-label ${lookupCountryByCountryName(d).code}`)
    .attr('alignment-baseline', 'central')
    .style('text-anchor', setTextAnchor)
    .call(handleCountryLabelEvents)
    .append('textPath')
    .attr('class', 'country-label-textpath')
    .attr('startOffset','50%')
    .attr('xlink:href', d => '#country-label-path-' + lookupCountryByCountryName(d).code)
    .text(d => d);

  function handleCountryLabelEvents(selection) {
    selection
      .on('mouseover', function() {
        d3.select(this).classed('text-hover', true);

      })
      .on('mouseout', function() {
        d3.select(this).classed('text-hover', false);
      })
      .on('mouseup', function(d) {

        if(_selectedCountryName !== d)  {
          _selectedCountryName = d;
          const countryCode = lookupCountryByCountryName(d).code;

          d3.select('.country-label.selected').classed('selected', false);
          d3.select(this).classed('selected', true);
          d3.selectAll(`.heatmap-ring-path.selected:not(.${_selectedIndicatorName})`).classed('selected', false);
          d3.selectAll(`.heatmap-ring-path.${countryCode}`).classed('selected', true);

          radialParent.updateOnCountryChange(_selectedCountryName);
        }
      });
  }
}

function setTextAnchor(d, i) {
  return _hrAngleScale(i) >= Math.PI ? 'end' : 'start';
}

function initIndicatorLabels() {

  const radialLabelsGroup = d3.select('.heatmap-ring').append('g')
    .attr('class', 'heatmap-ring-indicator-labels')
    .attr('transform', `rotate(${radialLabelGroupRotation})`);

  radialLabelsGroup.selectAll('path')
    .data(_indicatorNames.map(d => ({ name: d })), d => d.name)
    .enter()
    .append('path')
    .attr('fill', 'transparent')
    .attr('class', 'radial-label-path')
    .attr('id', (d, i) => 'radial-label-path-' + i)
    .attr('d', makeIndicatorLabelPath);

  radialLabelsGroup.selectAll('text')
    .data(_indicatorNames.map(d => ({ name: d })), d => d.name)
    .enter()
    .append('text')
    .attr('class', 'label label-radial')
    .style('text-anchor', 'end')
    .attr('alignment-baseline', 'central')
    .call(handleIndicatorLabelEvents)
    .append('textPath')
    .attr('xlink:href', (d, i) => '#radial-label-path-' + i)
    .attr('startOffset','100%')
    .text(d => categoryMap[d.name].label);

  function handleIndicatorLabelEvents(selection) {
    selection
      .on('mouseover', function() {
        d3.select(this).classed('text-hover', true);
      })
      .on('mouseout', function() {
        d3.select(this).classed('text-hover', false);
      })
      .on('mouseup', function handleIndicatorLabelClick(d) {

        if(_selectedIndicatorName === d.name) {

          _sortDescending = !_sortDescending;

        } else {
          _selectedIndicatorName = d.name;
          const countryCode = _selectedCountryName ? lookupCountryByCountryName(_selectedCountryName).code : '';
          d3.select('.label-radial.selected').classed('selected', false);
          d3.select(this).classed('selected', true);

          const excludeCountrySelectionPaths = countryCode ? `:not(.${countryCode})` : '';
          d3.selectAll(`.heatmap-ring-path.selected${excludeCountrySelectionPaths}`).classed('selected', false);
          d3.selectAll(`.heatmap-ring-path.${d.name}`).classed('selected', true);
        }
        sortByIndicator(d.name);
      });
  }
}

function makeHeatmapPath(d) {
  let indicatorIndex = _indicatorNames.indexOf(d.indicator);
  d.innerRadius = _hrRadiusScale(indicatorIndex);
  d.outerRadius = _hrRadiusScale(indicatorIndex + 1);

  let countryIndex = lookupCountryIndex(d.country);
  d.startAngle = _hrAngleScale(countryIndex);
  d.endAngle = d.startAngle + _hrAngleScale.bandwidth();
  d.padAngle = 0.003;

  return drawArc({
    innerRadius: d.innerRadius,
    outerRadius: d.outerRadius,
    startAngle: d.startAngle,
    endAngle: d.endAngle,
    padAngle: d.padAngle
  });
}

function makeCountryLabelPath(d) {
  let countryIndex = lookupCountryIndex(d);
  let startAngle = _hrAngleScale(countryIndex);
  let bandWidth = _hrAngleScale.bandwidth();
  startAngle = startAngle >= Math.PI ? startAngle + 0.01 : startAngle + bandWidth;

  return drawArc({
    innerRadius: _hrOuterRadius + hrLabelPadding,
    outerRadius: _hrOuterRadius + hrLabelLength,
    padRadius: hrInnerRadius,
    startAngle: startAngle,
    endAngle: startAngle
  });
}

function makeIndicatorLabelPath(d, i) {
  const r = hrInnerRadius + 2 + i * hrCellHeight;
  const x = r * Math.sin(0.01);
  const y = r * Math.cos(0.025);

  // [m] startX startY [a] rX rY rotation long-arc-flag sweep-flag endX endY
  return `m ${x} -${y} a ${r} ${r} 0 1 1 -1 0`;
}

function sortByIndicator(indicatorName) {
  const values = [];
  _empties = [];

  d3.selectAll(`.${indicatorName}`).each(d => {
    if(d.value) {
      values.push(d);
    } else {
      _empties.push(d);
    }
  });

  const sortFn = (a, b) => {
    const isDesc = a.desc;
    if(_sortDescending) {
      return isDesc ?  a.value - b.value : b.value - a.value;
    } else {
      return isDesc ?  b.value - a.value : a.value - b.value;
    }
  };

  values.sort(sortFn).push(..._empties);

  const countryNames = values.map(d => d.country);
  _prevCountryNames = _countryNames;
  _countryNames = countryNames;

  updateOnIndicatorSort();

}

function updateOnIndicatorSort() {
  radialParent.updateOnIndicatorChange(_selectedIndicatorName);

  updateHeatmapRingOnSort();
  updateCountryLabelsOnSort();
}

function updateHeatmapRingOnSort() {

  const codes = _empties.map(d => d.code);
  const paths = d3.selectAll('.heatmap-ring-path');
  paths
    .transition()
    .delay(sortDuration)
    .duration(d => timing.inOut - sortDuration(d))
    .attr('opacity', 0.4)
    .transition()
    .ease(d3.easeExpInOut)
    .delay(d => d.normalized * 100)
    .duration(timing.dur)
    .attr('opacity', 0.4)
    .attrTween('d', tweenHeatmapPathAngles)
    .transition()
    .duration(sortDuration)
    .attr('opacity', d => codes.includes(d.code) ? 0.4 : 1.0);

}

function sortDuration(d) {
  return timing.in + timing.in * (_sortDescending ? 1 - d.normalized : d.normalized);
}

function updateCountryLabelsOnSort() {

  const labels =  d3.select('.heatmap-ring-country-labels');

  labels.selectAll('path')
    .transition()
    .duration(timing.dur)
    .attrTween('d', d => tweenCountryLabelPaths(d, 10000));

  labels.selectAll('text')
    .transition().duration(timing.inOut)
    .attr('opacity', 0.0)
    .transition()
    .duration(timing.dur)
    .style('text-anchor', (d, i) => (i = lookupCountryIndex(d), setTextAnchor(d, i)))
    .transition()
    .duration(timing.inOut)
    .attr('opacity', 1.0);
}

function tweenHeatmapPathAngles(d) {

  const prevCountryIndex = _prevCountryNames.indexOf(d.country);
  const nextCountryIndex = _countryNames.indexOf(d.country);
  const interpolate = d3.interpolate(prevCountryIndex, nextCountryIndex);
  const bandwidth = _hrAngleScale.bandwidth();

  return function(t) {

    d.startAngle = _hrLinearAngleScale(interpolate(t));
    d.endAngle = d.startAngle + bandwidth;

    return drawArc({
      innerRadius: d.innerRadius,
      outerRadius: d.outerRadius,
      startAngle: d.startAngle,
      endAngle: d.endAngle,
      padAngle: d.padAngle
    });
  };
}

function tweenCountryLabelPaths(d, dist) {

  const prevCountryIndex = _prevCountryNames.indexOf(d);
  const nextCountryIndex = _countryNames.indexOf(d);
  const interpolate = d3.interpolate(prevCountryIndex, nextCountryIndex);
  const bandWidth = _hrAngleScale.bandwidth();
  const innerRadius = _hrOuterRadius + hrLabelPadding;
  const outerRadius = _hrOuterRadius + hrLabelLength;

  return function(t) {

    const T = slingshotT(t, 0.5, dist);
    let startAngle = _hrLinearAngleScale(interpolate(t));
    startAngle = startAngle >= Math.PI ? startAngle + 0.01 : startAngle + bandWidth;

    return drawArc({
      innerRadius: innerRadius + T,
      outerRadius: outerRadius + T,
      padRadius: hrInnerRadius,
      startAngle,
      endAngle: startAngle
    });
  };
}

function slingshotT(t, treshold, r) {
  if(t < treshold) return t * r;
  else return (1 - t) * r;
}

function getColor(d) {

  if(d.indicator === 'Total') {
    return colorize(d.indicator)(d.normalized);
  }

  const stats = _indicatorStats[d.indicator].values.map(v => v.normalized).sort((a,b) => a - b);
  const val = stats.indexOf(d.normalized) / stats.length;
  const color = colorize(d.indicator)(val);
  return color;
}

function lookupCountryIndex(countryName) {
  return _countryNames.indexOf(countryName);
}

function lookupCountryByCountryName(countryName){
  return _data.find(d => d.country === countryName);
}

export default {
  init
};
