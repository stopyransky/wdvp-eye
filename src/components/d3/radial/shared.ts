import * as d3 from 'd3';
import { categoryMap } from '../../../metadata';
import { Datapoint } from '../../../types';

export function tooltipGen(
  selection: d3.Selection<SVGPathElement, Datapoint, SVGGElement, {}>,
  container: d3.Selection<SVGGElement, {}, null, undefined>,
): void {
  selection.on('mouseover', (d, i, n) => {
    d3.select(n[i]).classed('hover', true);

    const tooltipText = `${categoryMap[d.indicator].label}: ${d.value === null ? 'no data' : d.value}`;

    const x = d3.mouse(n[i])[0];
    const y = d3.mouse(n[i])[1];

    const tooltip = container.append('g')
      .attr('id', 'radial-tooltip')
      .attr('class', 'tooltip')
      .attr('transform', `translate(${x}, ${y})`);

    const tooltipRect = tooltip.append('rect')
      .attr('x', 12)
      .attr('y', 0)
      .attr('rx', '3')
      .attr('ry', '3')
      .attr('height', 22)
      .style('pointer-events', 'none')
      .style('fill', 'white')
      .style('opacity', '0.9');

    const tooltipTextSelection = tooltip.append('text')
      .attr('id', 'radial-tooltip-text')
      .attr('alignment-baseline', 'central')
      .attr('y', 12)
      .style('pointer-events', 'none')
      .style('fill', 'black')
      .text(tooltipText);

    const textWidth = tooltipTextSelection.node().getComputedTextLength() + 6;

    tooltipTextSelection
      .attr('x', 12 + 2)
      .attr('text-anchor', 'start');

    tooltipRect.attr('width', textWidth);
  });

  selection.on('mouseout', (d, i, n) => {
    d3.select(n[i]).classed('hover', false);
    d3.select('#radial-tooltip').remove();
  });
}
