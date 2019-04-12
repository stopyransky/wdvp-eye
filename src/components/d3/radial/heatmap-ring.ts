// tslint:disable:variable-name

import * as d3 from 'd3';
import { colorize, desaturate } from '../../../data-helpers';
import { tooltipGen } from './shared';
import radialParent from './radial';
import { categoryMap } from '../../../metadata';
import {
  Datapoint,
  IndicatorValue,
  RadialData,
  Indicators,
  RadialMainGroupSelection,

  CountryLabelPathSelection,
  CountryLabelTextSelection,
  HeatmapRingGroupSelection,
} from '../../../types';

export const hrInnerRadius = 140;
export const hrCellHeight = 12;

const hrLabelLength = 120;
const hrLabelPadding = 2;
const radialLabelGroupRotation = (10 * 200 / 360);
const hrOffset = 0.15;
const hrFactor = 1.76;
const drawArc = d3.arc();
const timing = {
  inOut: 600,
  in: 300,
  dur: 1600,
  out: 200
};

let _selectedIndicatorName: string;
let _selectedCountryName: string;
let _container: RadialMainGroupSelection;
let _data: Datapoint[];
let _indicatorNames: string[];
let _countryNames: string[];
let _indicatorStats: Indicators;
let _prevCountryNames: string[];
let _hrLinearAngleScale: d3.ScaleLinear<any, any>;
let _hrAngleScale: d3.ScaleBand<any>;
let _hrRadiusScale: d3.ScaleLinear<any, any>;
let _sortDescending = true;
let _hrOuterRadius = 0;

let _heatmapRingGroup: HeatmapRingGroupSelection;
let _countryLabelPaths: CountryLabelPathSelection;
let _countryLabels: CountryLabelTextSelection;

function init(container: RadialMainGroupSelection, data: RadialData): void {
  _container = container;
  _data = data.dataItems;
  _indicatorStats = data.indicators;
  _indicatorNames = d3.set(_data.map((item: Datapoint) => item.indicator)).values();
  _countryNames = d3.set(_data.map((item: Datapoint) => item.country)).values();
  _prevCountryNames = [..._countryNames];
  _hrOuterRadius = hrInnerRadius + hrCellHeight * _indicatorNames.length;

  _hrAngleScale = d3.scaleBand()
    .domain(_countryNames.map((d: string, i: number) => i) as any)
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

function initHeatmapRing(): void {

  _heatmapRingGroup = _container.append('g').attr('class', 'heatmap-ring');

  _heatmapRingGroup
    .selectAll('path')
    .data(_data, (d: Datapoint) => d.id)
    .enter()
    .append('path')
    .attr('class', d => `heatmap-ring-path ${d.code} ${d.indicator}`)
    .attr('fill', d => desaturate(getColor(d), 0.25))
    .attr('display', d => d.value === null ? 'none' : null)
    .attr('d', makeHeatmapPath)
    .on('mouseup', d => {
      if (_selectedCountryName !== d.country) {
        _selectedCountryName = d.country;
        const countryCode = d.code;
        d3.select('.country-label.selected').classed('selected', false);
        d3.select(`.country-label.${countryCode}`).classed('selected', true);
        d3.selectAll(`.heatmap-ring-path.selected:not(.${_selectedIndicatorName})`).classed('selected', false);
        d3.selectAll(`.heatmap-ring-path.${countryCode}`).classed('selected', true);
        radialParent.updateOnCountryChange(_selectedCountryName);
      }
    })
    .call(s => tooltipGen(s, _container));
}

function initCountryLabels(): void {
  const countryLabelsGroup = _heatmapRingGroup.append('g')
    .attr('class', 'heatmap-ring-country-labels')
    .attr('transform', 'rotate(-0.15)');

  _countryLabelPaths = countryLabelsGroup.selectAll('path')
    .data(_countryNames)
    .enter()
    .append('path')
    .attr('opacity', 0)
    .attr('class', 'country-label-path')
    .attr('id', d => `country-label-path-${lookupCountryByCountryName(d).code}`)
    .attr('d', makeCountryLabelPath);

  _countryLabels = countryLabelsGroup.selectAll('text')
    .data(_countryNames, (d: string) => d)
    .enter()
    .append('text')
    .attr('class', (d: string) => `label country-label ${lookupCountryByCountryName(d).code}`)
    .attr('alignment-baseline', 'central')
    .style('text-anchor', setTextAnchor)
    .call(handleCountryLabelEvents)
    .append('textPath')
    .attr('class', 'country-label-textpath')
    .attr('startOffset', '50%')
    .attr('xlink:href', d => `#country-label-path-${lookupCountryByCountryName(d).code}`)
    .text(d => d);

  function handleCountryLabelEvents(selection: CountryLabelTextSelection): void {
    selection
      .on('mouseover', (d, i, n) => {
        d3.select(n[i]).classed('text-hover', true);
      })
      .on('mouseout', (d, i, n) => {
        d3.select(n[i]).classed('text-hover', false);
      })
      .on('mouseup', (d, i, n) => {
        if (_selectedCountryName !== d)  {
          _selectedCountryName = d;
          const countryCode = lookupCountryByCountryName(d).code;

          d3.select('.country-label.selected')
            .classed('selected', false);
          d3.select(n[i])
            .classed('selected', true);
          d3.selectAll(`.heatmap-ring-path.selected:not(.${_selectedIndicatorName})`)
            .classed('selected', false);
          d3.selectAll(`.heatmap-ring-path.${countryCode}`)
            .classed('selected', true);

          radialParent.updateOnCountryChange(_selectedCountryName);
        }
      });
  }
}

function setTextAnchor(d: string, i: number): string {
  return _hrAngleScale(i) >= Math.PI ? 'end' : 'start';
}

function initIndicatorLabels(): void {

  const radialLabelsGroup = _heatmapRingGroup.append('g')
    .attr('class', 'heatmap-ring-indicator-labels')
    .attr('transform', `rotate(${radialLabelGroupRotation})`);

  radialLabelsGroup.selectAll('path')
    .data(_indicatorNames, (d: string) => d)
    .enter()
    .append('path')
    .attr('fill', 'transparent')
    .attr('class', 'radial-label-path')
    .attr('id', (d, i) => 'radial-label-path-' + i)
    .attr('d', makeIndicatorLabelPath);

  radialLabelsGroup.selectAll('text')
    .data(_indicatorNames, (d: string) => d)
    .enter()
    .append('text')
    .attr('class', 'label label-radial')
    .style('text-anchor', 'end')
    .attr('alignment-baseline', 'central')
    .call(handleIndicatorLabelEvents)
    .append('textPath')
    .attr('xlink:href', (d, i) => '#radial-label-path-' + i)
    .attr('startOffset', '100%')
    .text(d => categoryMap[d].label);

  function handleIndicatorLabelEvents(
    selection: d3.Selection<SVGTextElement, string, SVGGElement, any>
  ): void {

    selection
      .on('mouseover', (d, i, n) => {
        d3.select(n[i]).classed('text-hover', true);
      })
      .on('mouseout', (d, i, n) => {
        d3.select(n[i]).classed('text-hover', false);
      })
      .on('mouseup', (d, i, n) => {

        if (_selectedIndicatorName === d) {
          _sortDescending = !_sortDescending;
        } else {
          _selectedIndicatorName = d;
          const countryCode = _selectedCountryName ? lookupCountryByCountryName(_selectedCountryName).code : '';
          d3.select('.label-radial.selected').classed('selected', false);
          d3.select(n[i]).classed('selected', true);

          const excludeCountrySelectionPaths = countryCode ? `:not(.${countryCode})` : '';
          d3.selectAll(`.heatmap-ring-path.selected${excludeCountrySelectionPaths}`).classed('selected', false);
          d3.selectAll(`.heatmap-ring-path.${d}`).classed('selected', true);
        }
        sortByIndicator(d);
      });
  }
}

function makeHeatmapPath(d: Datapoint): string {
  const indicatorIndex = _indicatorNames.indexOf(d.indicator);
  d.innerRadius = _hrRadiusScale(indicatorIndex);
  d.outerRadius = _hrRadiusScale(indicatorIndex + 1);

  const countryIndex = lookupCountryIndex(d.country);
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

function makeCountryLabelPath(countryName: string): string {
  const countryIndex = lookupCountryIndex(countryName);
  const bandWidth = _hrAngleScale.bandwidth();
  let startAngle = _hrAngleScale(countryIndex);
  startAngle = startAngle >= Math.PI ? startAngle + 0.01 : startAngle + bandWidth;

  return drawArc({
    innerRadius: _hrOuterRadius + hrLabelPadding,
    outerRadius: _hrOuterRadius + hrLabelLength,
    padRadius: hrInnerRadius,
    startAngle,
    endAngle: startAngle
  } as any);
}

function makeIndicatorLabelPath(d: any, i: number): string {
  const r = hrInnerRadius + 2 + i * hrCellHeight;
  const x = r * Math.sin(0.01);
  const y = r * Math.cos(0.025);

  // [m] startX startY [a] rX rY rotation long-arc-flag sweep-flag endX endY
  return `m ${x} -${y} a ${r} ${r} 0 1 1 -1 0`;
}

function sortByIndicator(indicatorName: string): void {
  const values: Datapoint[] = [];
  const empties: Datapoint[] = [];

  const separateEmpties = (d: Datapoint): void => {
    if (d.value) {
      values.push(d);
    } else {
      empties.push(d);
    }
  };

  d3.selectAll(`.${indicatorName}`).each(separateEmpties);

  values.sort(sortFn).push(...empties);

  const countryNames = values.map(d => d.country);
  _prevCountryNames = _countryNames;
  _countryNames = countryNames;

  updateOnIndicatorSort(empties.map((d: Datapoint) => d.code));

}

function updateOnIndicatorSort(emptyCodes: string[]): void {
  radialParent.updateOnIndicatorChange(_selectedIndicatorName);
  updateHeatmapRingOnSort(emptyCodes);
  updateCountryLabelsOnSort();
}

function updateHeatmapRingOnSort(emptyCodes: string[]): void {

  const paths = d3.selectAll('.heatmap-ring-path');

  paths
    .transition()
    .delay(sortDuration)
    .duration((d: Datapoint) => timing.inOut - sortDuration(d))
    .attr('opacity', 0.4)
    .transition()
    .ease(d3.easeExpInOut)
    .delay((d: Datapoint) => d.normalized * 100)
    .duration(timing.dur)
    .attr('opacity', 0.4)
    .attrTween('d', tweenHeatmapPathAngles)
    .transition()
    .duration(sortDuration)
    .attr('opacity', (d: Datapoint) => emptyCodes.includes(d.code) ? 0.4 : 1.0);

}

function updateCountryLabelsOnSort(): void {

  _countryLabelPaths
    .transition()
    .duration(timing.dur)
    .attrTween('d', (d: string) => tweenCountryLabelPaths(d, 10000));

  _countryLabels
    .transition().duration(timing.inOut)
    .attr('opacity', 0.0)
    .transition()
    .duration(timing.dur)
    .style('text-anchor', (d: string, i: number) => (i = lookupCountryIndex(d), setTextAnchor(d, i)))
    .transition()
    .duration(timing.inOut)
    .attr('opacity', 1.0);
}

function tweenHeatmapPathAngles(d: Datapoint): (t: number) => string {

  const prevCountryIndex = _prevCountryNames.indexOf(d.country);
  const nextCountryIndex = _countryNames.indexOf(d.country);
  const interpolate = d3.interpolate(prevCountryIndex, nextCountryIndex);
  const bandwidth = _hrAngleScale.bandwidth();

  return function(t: number): string {

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

function tweenCountryLabelPaths(countryName: string, distance: number): (t: number) => string {

  const prevCountryIndex = _prevCountryNames.indexOf(countryName);
  const nextCountryIndex = _countryNames.indexOf(countryName);
  const interpolate = d3.interpolate(prevCountryIndex, nextCountryIndex);
  const bandWidth = _hrAngleScale.bandwidth();
  const innerRadius = _hrOuterRadius + hrLabelPadding;
  const outerRadius = _hrOuterRadius + hrLabelLength;

  return function(t: number): string {

    const T = slingshotT(t, 0.5, distance);
    let startAngle = _hrLinearAngleScale(interpolate(t));
    startAngle = startAngle >= Math.PI ? startAngle + 0.01 : startAngle + bandWidth;

    return drawArc({
      innerRadius: innerRadius + T,
      outerRadius: outerRadius + T,
      padRadius: hrInnerRadius,
      startAngle,
      endAngle: startAngle
    } as any);
  };
}

function slingshotT(t: number, treshold: number, r: number): number {
  if (t < treshold) { return t * r; }
  return (1 - t) * r;
}

function getColor(d: Datapoint): string {
  if (d.indicator === 'Total') {
    return colorize(d.indicator)(d.normalized);
  }

  const stats = _indicatorStats[d.indicator].values
    .map((v: IndicatorValue) => v.normalized)
    .sort((a: number, b: number) => a - b);
  const val = stats.indexOf(d.normalized) / stats.length;
  const color = colorize(d.indicator)(val);

  return color;
}

function lookupCountryIndex(countryName: string): number {
  return _countryNames.indexOf(countryName);
}

function lookupCountryByCountryName(countryName: string): Datapoint {
  return _data.find((d: Datapoint) => d.country === countryName);
}

function sortFn(a: Datapoint, b: Datapoint): number {
  const isDesc = a.desc;
  if (_sortDescending) {
    return isDesc ?  a.value - b.value : b.value - a.value;
  } else {
    return isDesc ?  b.value - a.value : a.value - b.value;
  }
}

function sortDuration(d: Datapoint): number {
  return timing.in + timing.in * (_sortDescending ? 1 - d.normalized : d.normalized);
}

export default {
  init
};
