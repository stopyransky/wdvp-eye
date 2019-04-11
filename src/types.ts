export interface RadialData {
  dataItems: any[];
  rawData: any[];
  categories: any[];
  indicators: any;
  countryData: any[];
}

export interface RadialProps {
  data: any;
  width: number;
  height: number;
  setCurrentCountry: (countryName: string) => void;
  setCurrentIndicator: (indicatorName: string) => any;
}

export interface RadialState {
  width: number;
  height: number;
  data: any;
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
