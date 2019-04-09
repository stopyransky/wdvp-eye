import * as d3 from 'd3';
import * as src from './data/wdvp-new.csv';
import { categoryMap, COUNTRY_DATA, ENVIRONMENT, SOCIAL, ECONOMY, GOVERNMENT, REGION, SUBREGION } from './metadata';

export const dataSource = src;

export const textualCategories = [
  'ISO', 'ISO2', 'country', 'region', 'subregion',
  SOCIAL, ENVIRONMENT, ECONOMY, GOVERNMENT, COUNTRY_DATA
];

export const excludedCategories = [...textualCategories,
  'population',
  'surfacearea',
  'schoollifeexpectancy',
  'judicialeffectivenessscore',
  'sustainableeconomicdevelopmentassessment',
  'GDP',
  'Inflation',
  'EFConsTotGHA',
  'politicalrightsscore', // included in freedomscore
  'civillibertiesscore', // included in freedomscore
  'regulatoryquality', // included in wgi score
  'controlofcorruption', // included in wgi score
  'ruleoflaw', // included in wgi score
  'governmenteffectiveness', // included in wgi score
  'governmentexpenditure', // reverse correlation with government spending score
  'financialfreedomscore', // overlaps with economic freedom score
  'propertyrightsscore', // overlaps with economic freedom score and government integrity
  'politicalstabilityandabsenceofviolence', // included in wgi
  'co2emissions', // co2emissions per capita used
  'governmenteffectiveness',
  'healthexpenditureperperson', // hard to compare countries as it depends on gdp level,
  'educationexpenditureperperson' // lots of missing data, also depends on gdp level
];

const excludedCountries = [];
const nonTextualOnly = (d: string): boolean => !textualCategories.includes(d);

const validIndicators = (d: string): boolean => !excludedCategories.includes(d);

export const validCountries = (d: string): boolean => !excludedCountries.includes(d);

const normalize = function(v, min, max, { desc }) {
  let normalized;
  if (v === null) {
    normalized = null;
  } else {
    const n = (v - min) / (max - min);
    if (desc) {
      normalized = 1 - n;
    } else {
      normalized = n;
    }
  }
  return normalized;
};

export const dataModel = (row: any) => {
  Object.keys(row).filter(nonTextualOnly)
    .forEach(key => {
      const val = +row[key];
      if (val) {
        row[key] = val;
      } else {
        row[key] = null;
      }
    });
  return {...row};
};

export function makeData(tableData) {
  // rawData = [ { [field names as per csv header] } ]
  const categories = tableData.columns;
  const filteredData = tableData.filter(d => validCountries(d.country));
  const indicators = makeIndicatorData(filteredData);
  const dataItems = makeDataItems(filteredData, indicators);
  const countryData = makeCountryData(dataItems);
  return { dataItems, rawData: filteredData, categories, indicators, countryData };
}

function makeDataItems(tableData, indicators) {

  const allCells = [];

  tableData.filter(validCountries).forEach(row => {

    const rowCells = [];
    const countryName = row.country;
    const byCountryName = v => v.country === countryName;
    const totalIndicator = {
      id: row.ISO + 'Total',
      country: countryName,
      code: row.ISO,
      normalized: 0,
      indicator: 'Total',
      value: undefined,
      desc: undefined,
    };
    Object.keys(row).filter(validIndicators).forEach(indicatorName => {

      const normalized = indicators[indicatorName].values.find(byCountryName).normalized;
      const dataItem = {
        id: row.ISO + indicatorName,
        country: countryName,
        code: row.ISO,
        indicator: indicatorName,
        value: row[indicatorName],
        normalized,
        useSqrt: categoryMap[indicatorName].useSqrt,
        desc: categoryMap[indicatorName].desc
      };

      // if assures nonexistent data is not making impact
      totalIndicator.normalized += normalized;
      // if(normalized) totalIndicator.normalized += normalized;

      rowCells.push(dataItem);
    });

    totalIndicator.normalized = totalIndicator.normalized / rowCells.length;
    // adding only existing data.
    // totalIndicator.normalized = totalIndicator.normalized / rowCells.filter(i => !!i.normalized).length;
    totalIndicator.value = totalIndicator.normalized.toFixed(2);
    totalIndicator.desc = 0;
    rowCells.push(totalIndicator);
    allCells.push(...rowCells);
  });
  // return [{ country, indicator, normalized, value, desc }]
  return allCells;
}

// TODO: redo with array.reduce
function makeIndicatorData(rawData) {
  const indicatorNames = Object.keys(rawData[0]);
  const indicators = {};

  indicatorNames.filter(i => !excludedCategories.includes(i)).forEach(indicatorName => {
    const { desc } = categoryMap[indicatorName];
    const indicatorStats: any = { values: []};

    rawData.forEach(country => {
      const value = country[indicatorName];
      const countryName = country.country;
      indicatorStats.values.push({ country: countryName, value });
    });

    const values = indicatorStats.values.map(v => v.value);
    indicatorStats.extent = d3.extent(values);
    const [ min, max ] = indicatorStats.extent;
    indicatorStats.min = min;
    indicatorStats.max = max;
    indicatorStats.sum = d3.sum(values);
    indicatorStats.average = indicatorStats.sum / values.length;
    indicatorStats.normAverage = normalize(indicatorStats.average, min, max, { desc });
    indicatorStats.desc = desc;
    indicatorStats.values = indicatorStats.values.map(v => {
      const n = normalize(v.value, min, max, { desc });
      return { ...v, normalized: n };
    });
    indicators[indicatorName] = indicatorStats;
  });
  // return {
  //     ...,
  //   [indicatorName]: {
  //    values: [{ country: 'countryName', value, normalized }],
  //    extent: [min, max], sum, average,
  // }}
  return indicators;
}

function makeCountryData(dataItems) {
  // const countryData = {};
  // console.log(dataItems)
  // [
  //  country: 'Andorra'
  //  desc: 1
  //  indicator: 'Unemployment'
  //  normalized: 1
  //  value: null
  // ]
  // const countryData = dataItems.reduce((acc, curr) => {
  //   console.log(acc, curr);
  //   if(acc[curr.country]) {
  //     acc[curr.country].push({...curr});
  //   } else {
  //     acc[curr.country] = [{...curr}];
  //   }
  // }, {});
  // return: { [countryName]: [{ indicatorName, value, normalized, desc, ...}] }
  return dataItems;
}


const interpolateEnvironmentColors = d3.interpolateGreens;
const interpolateSocialColors = d3.interpolateYlOrBr;
const interpolateEconomyColors = d3.interpolateBuPu;
const interpolateGovernmentColors = d3.interpolatePuBu;

export const colorize = (indicator) => {
  const item = categoryMap[indicator];
  const type = item ? item.group : '';
  switch (type) {
  case COUNTRY_DATA: return d3.scaleSequential(d3.interpolatePuBu);
  case ENVIRONMENT: return d3.scaleSequential(interpolateEnvironmentColors);
  case SOCIAL: return d3.scaleSequential(interpolateSocialColors);
  case ECONOMY: return d3.scaleSequential(interpolateEconomyColors);
  case GOVERNMENT: return d3.scaleSequential(interpolateGovernmentColors);
  case REGION: return d3.scaleOrdinal(d3.schemeCategory10);
  case SUBREGION: return d3.scaleOrdinal(d3.schemeCategory10);
  default: return d3.scaleSequential(d3.interpolatePuBu);
  }
};

export function desaturate(color, v) {
  const col = d3.hsl(color);
  col.s = v;
  return col;
}

const colorMap = {
  'Asia': '#F68BAD',
  'Southern Asia': '#A3047D',
  'Western Asia': '#E74F9A',
  'South-eastern Asia': '#F68BAD',
  'Eastern Asia': '#FACECC',
  'Central Asia': '#4E0069',

  'Europe': '#7DAACE',
  'Northern Europe': '#166296',
  'Southern Europe': '#2F83B6',
  'Western Europe': '#3E8DBD',
  'Eastern Europe': '#7DAACE',

  'Africa': '#CFEBA4',
  'Northern Africa': '#6BBE77',
  'Sub-Saharan Africa': '#CFEBA4',

  'Americas': '#C2C1DD',
  'Latin America and the Caribbean': '#7E74B2',
  'Northern America': '#C2C1DD',

  'Australia and New Zealand': '#FCE499',
  'Oceania': '#FDD077',
  'Melanesia': '#FDD077',
  'Micronesia': '#FFF5BF',
  'Polynesia': '#FCE499',
  'none': '#afafaf'
};

export const colorByRegion = (r) => {
  if (r) { return colorMap[r]; }
  return colorMap['none'];
};

export function formatNumber(amount, decimalCount = 2, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount), 10).toString();
    const j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount ? decimal + Math.abs(amount - +i).toFixed(decimalCount).slice(2) : '');
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
}

export const appendFilter = (svg, stdev) => svg.append('defs')
  .append('filter')
  .attr('id', 'blur')
  .append('feGaussianBlur')
  .attr('stdDeviation', stdev);

function toStrat() {
  const table = [];
  Object.keys(categoryMap)
    .filter( c => !['total', 'countryData'].includes(categoryMap[c].group))
    .forEach(k => {
      const g = categoryMap[k].group;
      const group = g ? g : 'root';
      const row = { ...categoryMap[k], name: k, group };
      table.push(row);
    });
  table.push({ name: 'root', group: ''});
  return table;
}

export const stratifiedCategories = d3.stratify()
  .id((d: any) => d.name)
  .parentId((d: any) => d.group)(toStrat());

