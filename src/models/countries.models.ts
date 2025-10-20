export interface CountriesRequest {
  fields?: string[];
  name?: string;
}

export interface CountriesResponse {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: {
    svg: string;
    png: string;
  };
  capital?: string[];
  region: string;
  population: number;
  cca3: string;
}
export interface CountryDetailResponse {
  name: CountryName;
  flags: CountryFlags;
  capital?: string[];
  region: string;
  subregion?: string;
  tld?: string[];
  currencies?: Record<string, CurrencyDetail>;
  languages?: Record<string, string>;
  borders?: string[];
  population: number;
  cca3: string;
}

interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, { official: string; common: string }>;
}

interface CountryFlags {
  svg: string;
  png: string;
}

interface CurrencyDetail {
  name: string;
  symbol: string;
}

export enum SortType {
  NONE = '',
  NAME_ASC = 'name-asc',
  NAME_DESC = 'name-desc',
  POPULATION_ASC = 'population-asc',
  POPULATION_DESC = 'population-desc'
}
