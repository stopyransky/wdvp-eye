
export interface RadialSchema {
  dataItems: any[];
  countries: CountryRecord[];
  categories: string[];
  indicators: Indicators;
}
export interface DatapointSchema {
  id: string;
  country: string;
  code: string;
  indicator: string;
  normalized: number | null;
  value: number | null;
  desc: boolean;
  useSqrt: boolean;
}

export interface RadialProps {
  data: any;
  width: number;
  height: number;
  setCurrentCountry: (countryName: string) => void;
  setCurrentIndicator: (indicatorName: string) => void;
}

export interface RadialState {
  width: number;
  height: number;
  data: RadialSchema;
  currentCountry: any;
  currentIndicator: any;
}

export interface DefaultAction {
  type: string;
  value: any;
}

export interface ResizeAction {
  type: string;
  width: number;
  height: number;
}

export interface PanelProps {
  indicator: any;
  country: any;
}

export interface CSVData extends Array<CountryRecord> {
  columns: string[];
  value: d3.DSVParsedArray<CountryRecord>;
}

export interface CountryRecord {
  EFConsPerCap: number | null;
  EFConsTotGHA: number | null;
  GDP: number | null;
  GDPgrowth: number | null;
  GDPpercapita: number | null;
  GINIindex: number | null;
  ISO: string;
  ISO2: string;
  Inflation: number | null;
  Unemployment: number | null;
  civillibertiesscore: number | null;
  co2emissions: number | null;
  co2emissionspercapita: number | null;
  controlofcorruption: number | null;
  country: string;
  educationexpenditure: number | null;
  educationexpenditureperperson: number | null;
  financialfreedomscore: number | null;
  freedomscore: number | null;
  governmenteffectiveness: number | null;
  governmentexpenditure: number | null;
  governmentintegrityscore: number | null;
  governmentspendingscore: number | null;
  happyplanetindex: number | null;
  healthexpenditure: number | null;
  healthexpenditureperperson: number | null;
  humandevelopmentindex: number | null;
  judicialeffectivenessscore: number | null;
  overalleconomicfreedomscore: number | null;
  politicalrightsscore: number | null;
  politicalstabilityandabsenceofviolence: number | null;
  population: number | null;
  propertyrightsscore: number | null;
  region: string;
  regulatoryquality: number | null;
  renewableenergy: number | null;
  ruleoflaw: number | null;
  schoollifeexpectancy: number | null;
  subregion: string;
  surfacearea: number | null;
  sustainableeconomicdevelopmentassessment: number | null;
  taxburdenscore: number | null;
  womenMPs: number | null;
  worldgovernanceindicatorsaverage: number | null;
  worldhappinessreportscore: number | null;
}

export interface IndicatorValue {
  country: string;
  value: number | null;
  normalized?: number | null;
}

export interface IndicatorStats {
  values: IndicatorValue[];
  extent: [number, number];
  min: number;
  max: number;
  sum: number;
  average: number;
  normAverage: number;
  desc: boolean;
}

export interface Indicators {
  [indicatorName: string]: IndicatorStats;
}
