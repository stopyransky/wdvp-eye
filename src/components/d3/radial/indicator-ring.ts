
// tslint:disable:variable-name
import * as d3 from 'd3';
import { categoryMap } from '../../../metadata';
import { formatNumber } from '../../../data-helpers';
import { RadialMainGroupSelection, RadialData, Indicators, Datapoint, IndicatorValue } from '../../../types';

const irInnerRadius = 60;
const irOuterRadius = 110;
const r = irOuterRadius + 8;
const strongLabelRadius = irOuterRadius + 6;
const ri = irInnerRadius - 10;
const selectCountryHint = 'Select a country to view details here.';

let _container: RadialMainGroupSelection;
let _data: Datapoint[];
let _indicatorStats: any;
let _selectedCountryName: string;
let _indicatorRingGroup = null;
let _irAngleScaleShift = null;
let _radialLineGenerator = null;
let _legendLabels = null;
let _labels = null;

function makeScale(stats: Indicators): (i: string) => d3.ScaleQuantile<number> {

  return function quantileScaleOf(indicatorName: string): d3.ScaleQuantile<number> {
    const quantileCount = 50;
    const step = (irOuterRadius - irInnerRadius) / quantileCount;
    const range = d3.range(quantileCount).map((d, i) => irInnerRadius + i * step);
    const domain = stats[indicatorName].values.map(v => v.normalized);

    return d3.scaleQuantile().domain(domain).range(range);
  };
}

function init(container: RadialMainGroupSelection, data: Datapoint[], indicatorStats: Indicators) {

  _container = container;
  _data = data;
  _indicatorStats = indicatorStats;
  _indicatorRingGroup = container.append('g').attr('class', 'indicator-ring-group');

  const scale = makeScale(_indicatorStats);
  _indicatorRingGroup.selectAll('circle')
    .data([irInnerRadius, irOuterRadius + 3])
    .enter()
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', d => d)
    .attr('class', 'ir-ring-helper')
    .attr('fill', 'transparent')
    .attr('stroke-dasharray', '1 10')
    .style('opacity', 0);

  _indicatorRingGroup.append('text')
    .attr('class', 'radial-graph-label')
    .attr('alignment-baseline', 'central')
    .attr('text-anchor', 'middle')
    .attr('y', 0)
    .attr('x', 0)
    .style('fill', 'white')
    .style('pointer-events', 'none')
    .text(_selectedCountryName ? _selectedCountryName : selectCountryHint);


  const averageData = getDataForRadialLine(_indicatorStats, 'normAverage');

  const angleScaleDomain = d3.range(19).map((d, i) => i);

  const irAngleScale = d3.scaleBand()
    .domain(angleScaleDomain as any)
    .range([ 0, 2 * Math.PI ]);

  _irAngleScaleShift = d3.scaleBand()
    .domain(angleScaleDomain as any)
    .range([ -Math.PI / 2, 2 * Math.PI - Math.PI / 2 ]);

  _radialLineGenerator = d3.radialLine()
    .curve(d3.curveCatmullRomClosed)
    .angle((d: any, i: any) => irAngleScale(i))
    .radius((d: any) => d[0] && scale(d[0])(d[1]));

  _indicatorRingGroup.append('path')
    .attr('class', 'ir-indicator-radial')
    .attr('d', _selectedCountryName ? _radialLineGenerator(averageData) : 'M0,0')
    .attr('opacity', '0')
    .attr('fill', 'transparent');

  const cg = _indicatorRingGroup.append('g').attr('class', 'ir-circle-group');

  cg.selectAll('circle').data(averageData)
    .enter()
    .append('circle')
    .attr('class', 'ir-marker')
    .attr('cx', (d, i) => d[0] && scale(d[0])(d[1]) * Math.cos(_irAngleScaleShift(i)))
    .attr('cy', (d, i) => d[0] && scale(d[0])(d[1]) * Math.sin(_irAngleScaleShift(i)))
    .attr('fill', d => d[1] === null ? 'transparent' : 'white' )
    .attr('stroke', 'white')
    .call(handleEvents);

  _labels = _indicatorRingGroup
    .append('g')
    .classed('labels', true)
    .classed('segment', true)
    .style('pointer-events', 'none')
    .attr('transform', 'rotate(30)');

  _labels.append('def')
    .append('path')
    .attr('id', 'segment-label-path-' + 1)
    .attr('d', 'm0 -' + (r + 2) + ' a' + (r + 2) + ' ' + (r + 2) + ' 0 1 1 -1 0');

  _labels.append('def')
    .append('path')
    .attr('id', 'segment-label-path-' + 2)
    .attr('d', 'm0 -' + ri + ' a' + ri + ' ' + ri + ' 0 1 1 -1 0');

  const segmentLabels = [
    {type: '', label: 'SOCIETY', angle: 0.0},
    {type: '', label: 'ECONOMY', angle: 0.0},
    {type: '', label: 'GOVERNMENT', angle: 0.0},
    {type: '', label: 'ENVIRONMENT', angle: 0.0},
  ];

  _labels
    .selectAll('text')
    .data(segmentLabels)
    .enter()
    .append('text')
    .attr('opacity', 0)
    .append('textPath')
    .attr('xlink:href', '#segment-label-path-' + 1)
    .style('font-size', '8px')
    .style('fill', 'white')
    .attr('startOffset', (d, i) => i * 100 / 4 + '%')
    .text(d => d.label);

  _legendLabels = _indicatorRingGroup
    .append('g')
    .classed('legend-labels', true)
    .classed('label', true)
    .style('pointer-events', 'none');

  _legendLabels
    .append('def')
    .append('path')
    .attr('id', 'legend-label-path-1')
    .attr('d', 'm0 -' + strongLabelRadius + ' a' + strongLabelRadius + ' ' + strongLabelRadius + ' 0 1 1 -1 0');

  _legendLabels
    .append('def')
    .append('path')
    .attr('id', 'legend-label-path-2')
    .attr('d', 'm0 -' + ri + ' a' + ri + ' ' + ri + ' 0 1 1 -1 0');

  _legendLabels
    .append('text')
    .attr('opacity', 0)
    .attr('transform', 'rotate(-8)')
    .append('textPath')
    .attr('xlink:href', '#legend-label-path-1')
    .style('font-size', '10px')
    .attr('startOffset', '0')
    .text('strong');

  _legendLabels
    .append('text')
    .attr('opacity', 0)
    .attr('transform', 'rotate(-11)')
    .append('textPath')
    .attr('xlink:href', '#legend-label-path-2')
    .style('font-size', '10px')
    .attr('startOffset', '0')
    .text('weak');
}

function getIndicatorValue(countryName: string, indicator: string): number {
  return _indicatorStats[indicator].values.find(v => v.country === countryName).value;
}

function handleEvents(selection) {
  selection.on('mouseover', function(d) {
    d3.select(this).classed('hover', true);
    const averageData = _indicatorStats[d[0]].average;
    const value = getIndicatorValue(_selectedCountryName, d[0]);
    const tooltipText = `${categoryMap[d[0]].label}: ${value === null ? 'no data' : formatNumber(value, 2)}`;
    const averageText = `Average: ${formatNumber(averageData, 2)}`;
    const x = d3.mouse(this)[0];
    const y = d3.mouse(this)[1];

    const tooltip = _container.append('g')
      .attr('id', 'radial-tooltip')
      .attr('class', 'tooltip')
      .attr('transform', `translate(${x}, ${y})`);

    const tooltipRect = tooltip.append('rect')
      .attr('x', 12)
      .attr('y', 0)
      .attr('rx', '3')
      .attr('ry', '3')
      .attr('height', 42)
      .style('pointer-events', 'none')
      .style('fill', 'white')
      .style('opacity', '0.9');

    const tooltipTextSelection = tooltip.append('text')
      .attr('id', 'radial-tooltip-text')
      .attr('alignment-baseline', 'central')
      .attr('y', 12)
      .style('pointer-events', 'none')
      .style('fill', 'black');

    tooltipTextSelection.append('tspan')
      .attr('x', 12 + 2)
      .attr('dy', '0.2em')
      .text(tooltipText);
    tooltipTextSelection.append('tspan')
      .attr('x', 12 + 2)
      .attr('dy', '1.2em')
      .text(averageText);

    const textWidth = tooltipTextSelection.node().getComputedTextLength() + 6;

    tooltipTextSelection
      .attr('x', 12 + 2)
      .attr('text-anchor', 'start');

    tooltipRect.attr('width', textWidth);
  });

  selection.on('mouseout', function() {
    d3.select(this).classed('hover', false);
    d3.select('#radial-tooltip').remove();
  });
}

function updateOnCountryChange(data, selectedCountryName) {

  _data = data;
  _selectedCountryName = selectedCountryName;

  const radialData = getDataForRadialLine(_data, 'normalized');

  _indicatorRingGroup.select('.radial-graph-label').text(_selectedCountryName);
  _indicatorRingGroup.selectAll('.ir-average-radial').transition().attr('opacity', 1);

  _indicatorRingGroup.selectAll('.ir-ring-helper').transition().style('opacity', 1);

  _indicatorRingGroup.select('.ir-indicator-radial')
    .transition()
    .attr('d', _radialLineGenerator(radialData))
    .attr('fill', 'transparent')
    .transition().attr('opacity', 1);

  const quantileScale = makeScale(_indicatorStats);
  _indicatorRingGroup.selectAll('.ir-marker').data(radialData)
    .transition()
    .attr('cx', (d, i) => d[0] && quantileScale(d[0])(d[1]) * Math.cos(_irAngleScaleShift(i)))
    .attr('cy', (d, i) => d[0] && quantileScale(d[0])(d[1]) * Math.sin(_irAngleScaleShift(i)))
    .attr('r', 3)
    .attr('fill', d => d[1] === null ? 'black' : 'white' )
    .attr('stroke', 'white');

  _labels.selectAll('text').transition().attr('opacity', 1);
  _legendLabels.selectAll('text').transition().attr('opacity', 1);
}

function getDataForRadialLine(data: Datapoint[], accessor: string) {

  const points = [];
  const keys = Object.keys(data);
  keys.forEach(k => {
    const desc = data[k].desc;
    const val = data[k][accessor];
    points.push([ data[k].indicator, val, desc ]);
  });

  return points;
}

export default {
  init,
  updateOnCountryChange
};
