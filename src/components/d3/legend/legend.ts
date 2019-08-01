const config = [
  {
    name: 'Society',
    color: 'YlOrBr'
  },
  {
    name: 'Economy',
    color: 'BuPu'
  },
  {
    name: 'Government',
    color: 'PuBu'
  },
  {
    name: 'Environment',
    color: 'Greens'
  },
  {
    name: 'No data',
    color: 'none'
  }
];

const rectSize = 12;
const margin = 12;

function render(svg) {
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(60,90)');

  legend.append('text')
    .attr('x', 0)
    .style('font-size', '0.75rem')
    .attr('fill', 'white')
    .attr('y', -8)
    .text('weak');

  legend.append('text')
    .attr('x', 110)
    .style('font-size', '0.75rem')
    .attr('fill', 'white')
    .attr('y', -8)
    .attr('text-anchor', 'end')
    .text('strong');

  config.forEach((c, i) => renderLegendRow(legend)(c, i));
}


function renderLegendRow(legend) {

  return (c: any, i: number) => {
    const rectG = legend.append('g')
    .attr('transform', `translate(${0}, ${i * ( rectSize + margin )})`);

    rectG.append('rect')
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-opacity', 0.5)
      .attr('x', c.name === 'No data' ? 110 - rectSize : 0)
      .attr('y', 0)
      .attr('width', c.name === 'No data' ? rectSize : 110)

      .attr('height', rectSize);

    rectG.append('rect')
      .attr('fill', `url(#${c.color})`)
      .attr('opacity', c.name === 'No data' ? 0.4 :  1)
      .attr('x', c.name === 'No data' ? 110 - rectSize : 0)
      .attr('y', 0)
      .attr('width', c.name === 'No data' ? rectSize : 110)
      .attr('height', rectSize);

    const textG = legend.append('g')
      .attr('transform',
            `translate(${120}, ${7 + i * (rectSize + margin)})`);
    textG.append('text')
      .attr('font-size', '0.875rem')
      .attr('fill', 'white')
      .attr('alignment-baseline', 'middle')
      .text(c.name);
  };

}

export default {
  render
};
