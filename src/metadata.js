export const COUNTRY_DATA = 'countryData';
export const ECONOMY = 'economy';
export const ENVIRONMENT = 'environment';
export const SOCIAL = 'social';
export const GOVERNMENT = 'government';
export const REGION = 'region';
export const SUBREGION = 'subregion';
export const categoryMap = {
  country: {
    label: 'Country',
    id: 0,
    description: 'Name of the country',
    group: COUNTRY_DATA,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: '',
    url: '',
    year: '2019',
    details: '',
    flipColor: 0
  },
  ISO: {
    label: 'ISO Country Code',
    id: 1,
    description: 'ISO alpha-3 code',
    group: COUNTRY_DATA,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'FAO',
    url: 'http://www.fao.org/countryprofiles/iso3list/en/',
    year: '',
    details: '',
    flipColor: 0
  },
  ISO2: {
    label: 'ISO2 Country Code',
    id: 2,
    description: 'ISO alpha-2 code',
    group: COUNTRY_DATA,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'Wikipedia, UN Statistics',
    url: 'https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes',
    year: '2018',
    details: '',
    flipColor: 0
  },
  population: {
    label: 'Population',
    id: 3,
    description: 'Population of a country',
    group: COUNTRY_DATA,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'World Bank Data',
    url: 'https://data.worldbank.org/indicator/SP.POP.TOTL',
    year: '2018',
    details: '',
    flipColor: 0
  },
  surfacearea: {
    label: 'Surface Area',
    id: 4,
    description: 'Surface area of a country',
    group: COUNTRY_DATA,
    desc: 0,
    unit: 'km2',
    useSqrt: 0,
    source: 'CIA World Factbook',
    url:
      'https://www.cia.gov/library/publications/the-world-factbook/fields/2147.html#al',
    year: '2018',
    details: '',
    flipColor: 0
  },
  region: {
    label: 'Region',
    id: 5,
    description: 'Region',
    group: COUNTRY_DATA,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'Wikipedia, UN Statistics',
    url: 'https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes',
    year: '2018',
    details: '',
    flipColor: 0
  },
  subregion: {
    label: 'Subregion',
    id: 6,
    description: 'Subregion',
    group: COUNTRY_DATA,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'Wikipedia, UN Statistics',
    url: 'https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes',
    year: '2018',
    details: '',
    flipColor: 0
  },
  GINIindex: {
    label: 'GINI Index',
    id: 7,
    description:
      'Inequality in the distribution of family income. Lower = better.',
    group: SOCIAL,
    desc: 1,
    unit: '',
    useSqrt: 0,
    source: 'CIA World Factbook',
    url:
      'https://www.cia.gov/library/publications/the-world-factbook/rankorder/2172rank.html',
    year: 'varies per country',
    details: '',
    flipColor: 0
  },
  happyplanetindex: {
    label: 'Happy Planet Index',
    id: 8,
    description:
      'Well being + life expectancy + inequalities + ecological footprint. Higher = better.',
    group: SOCIAL,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'Happy Planet Index',
    url: 'http://happyplanetindex.org/',
    year: '2016',
    details: '',
    flipColor: 0
  },
  humandevelopmentindex: {
    label: 'Human Development Index',
    id: 9,
    description:
      'Healthy life,knowledge, standard of living. Higher = better.',
    group: SOCIAL,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'UNDP',
    url: 'http://hdr.undp.org/en/data#',
    year: '2017',
    details: '',
    flipColor: 0
  },
  worldhappinessreportscore: {
    label: 'World Happiness Report Score',
    id: 10,
    description:
      'Polled inhabitants rate their quality of life from 1-10. Higher = better.',
    group: SOCIAL,
    desc: 0,
    unit: '1 to 10',
    useSqrt: 0,
    source: 'World Happiness Report',
    url: 'http://worldhappiness.report/ed/2018/',
    year: '2017',
    details: '',
    flipColor: 0
  },
  sustainableeconomicdevelopmentassessment: {
    label: 'SEDA',
    id: 11,
    description:
      'An assessment based on 40 indicators in sustainability, economics, & investments. Higher = better.',
    group: SOCIAL,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'Boston Consulting Group',
    url:
      'https://www.bcg.com/en-gb/publications/interactives/seda-2018-guide.aspx',
    year: '2018',
    details: '',
    flipColor: 0
  },
  womenMPs: {
    label: 'Women MPs',
    id: 12,
    description:
      'Proportion of seats held by women in national parliaments (%)',
    group: SOCIAL,
    desc: 0,
    unit: '%',
    useSqrt: 0,
    source: 'World Bank',
    url: 'https://data.worldbank.org/indicator/SG.GEN.PARL.ZS',
    year: '2017',
    details:
      'Women in parliaments are the percentage of parliamentary seats in a single or lower chamber held by women.',
    flipColor: 0
  },
  GDP: {
    label: 'GDP',
    id: 13,
    description: 'Gross Domestic Product',
    group: ECONOMY,
    desc: 0,
    unit: 'billions PPP',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  GDPpercapita: {
    label: 'GDP per person',
    id: 14,
    description: 'Gross Domestic Product per person',
    group: ECONOMY,
    desc: 0,
    unit: 'PPP',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  GDPgrowth: {
    label: 'GDP Growth',
    id: 15,
    description: 'Annual growth of GDP.',
    group: ECONOMY,
    desc: 0,
    unit: '%',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  healthexpenditure: {
    label: 'Health Expenditure',
    id: 16,
    description: 'Current health expenditure expressed as a percentage of GDP.',
    group: ECONOMY,
    desc: 0,
    unit: '% of GDP',
    useSqrt: 0,
    source: 'World Bank',
    url: 'https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS',
    year: '2015',
    details:
      'Level of current health expenditure expressed as a percentage of GDP. Estimates of current health expenditures include healthcare goods and services consumed during each year. This indicator does not include capital health expenditures such as buildings, machinery, IT and stocks of vaccines for emergency or outbreaks.',
    flipColor: 0
  },
  healthexpenditureperperson: {
    label: 'Health Expenditure per person',
    id: 17,
    description:
      'Current expenditures on health per capita expressed in international dollars at purchasing power parity (PPP).',
    group: ECONOMY,
    desc: 0,
    unit: 'USD',
    useSqrt: 0,
    source: 'World Bank',
    url: 'https://data.worldbank.org/indicator/SH.XPD.CHEX.PP.CD',
    year: '2015',
    details: '',
    flipColor: 0
  },
  educationexpenditure: {
    label: 'Education Expenditure',
    id: 18,
    description: 'General government expenditure on education.',
    group: ECONOMY,
    desc: 0,
    unit: '% of GDP',
    useSqrt: 0,
    source: 'World Bank',
    url: 'https://data.worldbank.org/indicator/SE.XPD.TOTL.GD.ZS?view=chart',
    year: '2014',
    details:
      'General government expenditure on education (current, capital, and transfers) is expressed as a percentage of GDP. It includes expenditure funded by transfers from international sources to government. General government usually refers to local, regional and central governments.',
    flipColor: 0
  },
  educationexpenditureperperson: {
    label: 'Education Expenditure per person',
    id: 19,
    description: 'General government expenditure on education per person.',
    group: ECONOMY,
    desc: 0,
    unit: 'USD',
    useSqrt: 0,
    source: 'own calculation',
    url: '',
    year: '2014',
    details:
      'General government expenditure on education (current, capital, and transfers) per person. It includes expenditure funded by transfers from international sources to government. General government usually refers to local, regional and central governments.',

    flipColor: 0
  },
  governmentspendingscore: {
    label: 'Government Spending Score',
    id: 20,
    description:
      'Burden of government spending on the country. Lower = Better.',
    group: GOVERNMENT,
    desc: 1,
    unit: '1 to 100',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  governmentexpenditure: {
    label: 'Government Expenditure',
    id: 21,
    description: '',
    group: GOVERNMENT,
    desc: 0,
    unit: '% of GDP',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  schoollifeexpectancy: {
    label: 'School Life Expectancy',
    id: 22,
    description: 'Average male & female, primary to tertiary (years).',
    group: SOCIAL,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'CIA World Factbook',
    url:
      'https://www.cia.gov/library/publications/the-world-factbook/fields/2205.html#202',
    year: '2018',
    details: '',
    flipColor: 0
  },
  Unemployment: {
    label: 'Unemployment Rate',
    id: 23,
    description:
      'Unemployment refers to the share of the labor force that is without work but available for and seeking employment. Definitions of labor force and unemployment differ by country.',
    group: ECONOMY,
    desc: 1,
    unit: '%',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  Inflation: {
    label: 'Inflation Rate',
    id: 24,
    description:
      'Inflation as measured by the consumer price index reflects the annual percentage change in the cost to the average consumer of acquiring a basket of goods and services',
    group: ECONOMY,
    desc: 1,
    unit: '%',
    useSqrt: 0,
    source: 'World Bank',
    url: 'https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG',
    year: '2018',
    details: '',
    flipColor: 0
  },
  politicalrightsscore: {
    label: 'Political Rights Score',
    id: 25,
    description:
      'The political rights rating, with 1 representing the most free and 7 the least free.',
    group: GOVERNMENT,
    desc: 1,
    unit: '1 to 7',
    useSqrt: 0,
    source: 'Freedom House',
    url: 'https://freedomhouse.org/report/freedom-world-2015/methodology',
    year: '2017',
    details:
      'The political rights questions are grouped into three subcategories: Electoral Process, Political Pluralism and Participation, and Functioning of Government. See link for more details.',
    flipColor: 0
  },
  civillibertiesscore: {
    label: 'Civil Liberties Score',
    id: 26,
    description:
      'The civil liberties rating range from 1 to 7, with 1 representing the most free and 7 the least free.',
    group: GOVERNMENT,
    desc: 1,
    unit: '1 to 7',
    useSqrt: 0,
    source: 'Freedom House',
    url: 'https://freedomhouse.org/report/freedom-world-2015/methodology',
    year: '2017',
    details:
      'The civil liberties questions are grouped into four subcategories: Freedom of Expression and Belief, Associational and Organizational Rights, Rule of Law, and Personal Autonomy and Individual Rights. See source link for more details.',
    flipColor: 0
  },
  freedomscore: {
    label: 'Freedom Score',
    id: 27,
    description:
      'The average of the political rights and civil liberties ratings. 1 = most free, 7 = least free',
    group: GOVERNMENT,
    desc: 1,
    unit: '1 to 7',
    useSqrt: 0,
    source: 'Freedom House',
    url: 'https://freedomhouse.org/report/freedom-world-2015/methodology',
    year: '2017',
    details:
      'Arithmetic mean of Political Rights and Civil Liberties rankings.',
    flipColor: 0
  },
  politicalstabilityandabsenceofviolence: {
    label: 'Political Stability and Absence of Violence',
    id: 28,
    description: 'From 2.5 (most stable) to -2.5 (least stable)',
    group: GOVERNMENT,
    desc: 0,
    unit: '-2.5 to +2.5',
    useSqrt: 0,
    source: 'World Bank',
    url: 'http://info.worldbank.org/governance/wgi/#doc',
    year: '2017',
    details:
      'Political Stability and Absence of Violence measures perceptions of the likelihood of political instability and/or politicallymotivated violence, including terrorism. This measure is based on over 30 indicators.',
    flipColor: 0
  },
  governmenteffectiveness: {
    label: 'Government Effectiveness',
    id: 29,
    description:
      'Quality of public services, civil service, policy formation, government commitment. 2.5 = most effective.',
    group: GOVERNMENT,
    desc: 0,
    unit: '-2.5 to +2.5',
    useSqrt: 0,
    source: 'World Bank',
    url: 'http://info.worldbank.org/governance/wgi/#doc',
    year: '2017',
    details:
      'Government effectiveness captures perceptions of the quality of public services, the quality of the civil service and the degree of its independence from political pressures, the quality of policy formulation and implementation, and the credibility of the government\'s commitment to such policies.',
    flipColor: 0
  },
  regulatoryquality: {
    label: 'Regulatory Quality',
    id: 30,
    description: 'Level of policies to support private sector.',
    group: GOVERNMENT,
    desc: 0,
    unit: '-2.5 to +2.5',
    useSqrt: 0,
    source: 'World Bank',
    url: 'http://info.worldbank.org/governance/wgi/#doc',
    year: '2017',
    details:
      'Regulatory quality captures perceptions of the ability of the government to formulate and implement sound policies and regulations that permit and promote private sector development. ',
    flipColor: 0
  },
  ruleoflaw: {
    label: 'Rule of Law',
    id: 31,
    description: 'Quality of rule of law + likelihood of crime / violence.',
    group: GOVERNMENT,
    desc: 0,
    unit: '-2.5 to +2.5',
    useSqrt: 0,
    source: 'World Bank',
    url: 'http://info.worldbank.org/governance/wgi/#doc',
    year: '2017',
    details:
      'Rule of law captures perceptions of the extent to which agents have confidence in and abide by the rules of society, and in particular the quality of contract enforcement, property rights, the police, and the courts, as well as the likelihood of crime and violence.',
    flipColor: 0
  },
  controlofcorruption: {
    label: 'Control of Corruption',
    id: 32,
    description:
      'Captures perceptions of the extent to which public power is exercised for private gain.',
    group: GOVERNMENT,
    desc: 0,
    unit: '-2.5 to +2.5',
    useSqrt: 0,
    source: 'World Bank',
    url: 'http://info.worldbank.org/governance/wgi/#doc',
    year: '2017',
    details:
      'Control of corruption captures perceptions of the extent to which public power is exercised for private gain, including both petty and grand forms of corruption, as well as \'capture\' of the state by elites and private interests. ',
    flipColor: 0
  },
  worldgovernanceindicatorsaverage: {
    label: 'World Governance Indicators Score',
    id: 33,
    description:
      'Average of World Governance Indicators',
    group: GOVERNMENT,
    desc: 0,
    unit: '-2.5 to +2.5',
    useSqrt: 0,
    source: 'based on World Bank',
    url: 'http://info.worldbank.org/governance/wgi/#doc',
    year: '2017',
    details:
      'Index (arithmetic mean) of World Bank\'s Government Indicators: Political Stability and Absence of Violence, Government Effectiveness, Regulatory Quality, Rule of Law, Control of Corruption. See link to source for more information. ',
    flipColor: 0
  },
  judicialeffectivenessscore: {
    label: 'Judicial Effectiveness Score',
    id: 34,
    description:
      'Judicial independence + quality of the judicial process, fairness (/100).',
    group: GOVERNMENT,
    desc: 0,
    unit: '0 to 100',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  governmentintegrityscore: {
    label: 'Government Integrity Score',
    id: 35,
    description: 'Public trust + transparency + corruption control.',
    group: GOVERNMENT,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  propertyrightsscore: {
    label: 'Property Rights Score',
    id: 36,
    description: 'How freely can inhabitants acquire private property.',
    group: GOVERNMENT,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  taxburdenscore: {
    label: 'Tax Burden Score',
    id: 37,
    description:
      'Tax burden Score rates country by measuring individual tax rate + corporate tax rate + total tax as % of GDP. Highier values mean lower tax burden = better',
    group: GOVERNMENT,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  overalleconomicfreedomscore: {
    label: 'Overall Economic Freedom Score',
    id: 38,
    description: 'Economic freedom is the fundamental right of every human to control his or her own labor and property',
    group: GOVERNMENT,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2017',
    details: 'Economic freedom is the fundamental right of every human to control his or her own labor and property. In an economically free society, individuals are free to work, produce, consume, and invest in any way they please.',
    flipColor: 0
  },
  financialfreedomscore: {
    label: 'Financial Freedom Score',
    id: 39,
    description:
      'Level of government regulation of financial services, foreign competition, credit & capital development.',
    group: GOVERNMENT,
    desc: 0,
    unit: '',
    useSqrt: 0,
    source: 'Heritage Foundation',
    url: 'https://www.heritage.org/index/explore',
    year: '2018',
    details: '',
    flipColor: 0
  },
  co2emissions: {
    label: 'CO2 Emissions',
    id: 40,
    description:
      'Carbon dioxide produced during consumption of solid, liquid, and gas fuels and gas flaring. Lower = better.',
    group: ENVIRONMENT,
    desc: 1,
    unit: 'thousand metric tons',
    useSqrt: 0,
    source: 'World Bank',
    url: 'https://data.worldbank.org/indicator/EN.ATM.CO2E.KT?view=chart',
    year: '2014',
    details:
      'Carbon dioxide emissions are those stemming from the burning of fossil fuels and the manufacture of cement. They include carbon dioxide produced during consumption of solid, liquid, and gas fuels and gas flaring.',
    flipColor: 0
  },
  co2emissionspercapita: {
    label: 'CO2 Emissions per capita',
    id: 41,
    description:
      'Carbon dioxide per capita, produced during consumption of solid, liquid, and gas fuels and gas flaring.',
    group: ENVIRONMENT,
    desc: 1,
    unit: 'metric tons',
    useSqrt: 0,
    source: 'World Bank',
    url: 'https://data.worldbank.org/indicator/EN.ATM.CO2E.KT?view=chart',
    year: '2014',
    details:
      'Carbon dioxide emissions are those stemming from the burning of fossil fuels and the manufacture of cement. They include carbon dioxide produced during consumption of solid, liquid, and gas fuels and gas flaring.',
    flipColor: 0
  },
  renewableenergy: {
    label: 'Renewable Energy Output',
    id: 42,
    description:
      'Renewable Energy production as percent of total energy production.',
    group: ENVIRONMENT,
    desc: 0,
    unit: '%',
    useSqrt: 0,
    source: 'World Bank',
    url: 'https://data.worldbank.org/indicator/EG.ELC.RNEW.ZS',
    year: '2015',
    details: 'Renewable Energy production as percent of total energy output.',
    flipColor: 0
  },
  EFConsPerCap: {
    label: 'Ecological Footprint per person',
    id: 43,
    description:
      'Ecological Footprint of consumption per person . Lower = better.',
    group: ENVIRONMENT,
    desc: 1,
    unit: 'global hectares (gha)',
    useSqrt: 0,
    source: '',
    url: 'http://data.footprintnetwork.org/#/abouttheData',
    year: '2014',
    details:
      'A global hectare is a biologically productive hectare of land or water with world average biological productivity for a given year.',
    flipColor: 0
  },
  EFConsTotGHA: {
    label: 'Total Ecological Footprint',
    id: 44,
    description:
      'Total Ecological Footprint of consumption in global hectares (gha). Lower = better.',
    group: ENVIRONMENT,
    desc: 1,
    unit: 'gha',
    useSqrt: 0,
    source: '',
    url: 'http://data.footprintnetwork.org/#/abouttheData',
    year: '2014',
    details:
      'A measure of how much area of biologically productive land and water an individual, population or activity requires to produce all the resources it consumes and to absorb the waste it generates, using prevailing technology and resource management practices. The Ecological Footprint is usually measured in global hectares. A global hectare is a biologically productive hectare with world average biological productivity for a given year.',
    flipColor: 0
  },
  Total: {
    label: 'Total score',
    id: 45,
    description: 'Combined value of all indicators. 1 = best',
    group: 'total',
    desc: 0,
    unit: '0 to 1',
    useSqrt: 0,
    source: 'own calculation',
    url: '',
    year: '2019',
    details:
      'All indicators were normalized to range between 0 and 1 (flipped when necessary) and then averaged giving overal ranking ranging from 0 (worst) to 1 (best). Indicators with missing data are not considered when averaging.'
  },
  [SOCIAL]: {
    group: '',
    name: SOCIAL
  },
  [ECONOMY]: {
    group: '',
    name: ECONOMY
  },
  [GOVERNMENT]: {
    group: '',
    name: GOVERNMENT
  },
  [ENVIRONMENT]: {
    group: '',
    name: ENVIRONMENT
  },
  [COUNTRY_DATA]: {
    group: '',
    name: COUNTRY_DATA
  }
};

