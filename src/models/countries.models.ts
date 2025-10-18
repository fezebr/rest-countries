 export interface CountryRequest {
  fields?: string[]; 
  name?: string;      
}

 
export interface CountryResponse {
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
}
