import axios from "axios";
import type { CountriesRequest, CountriesResponse, CountryDetailResponse } from "../models/countries.models";

class BaseApi {
  constructor(protected baseURL: string) {}

  protected async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(`${this.baseURL}${url}`);
    return response.data;
  }
}

class CountryApi extends BaseApi {
  private getAllCountryFields = "name,flags,capital,region,population,cca3";
  private getCountryFieldsByCode = "name,flags,population,region,subregion,capital,tld,currencies,languages,borders";

  constructor() {
    super("https://restcountries.com/v3.1");
  }

  getAllCountries(request: CountriesRequest = {}): Promise<CountriesResponse[]> {
    const fields = request.fields?.length ? request.fields.join(",") : this.getAllCountryFields;
    return this.get<CountriesResponse[]>(`/all?fields=${fields}`);
  }

  getCountryByCode(code: string): Promise<CountryDetailResponse> {
    const fields =  this.getCountryFieldsByCode;
    return this.get<CountryDetailResponse>(`/alpha/${code}?fields=${fields}`);
  }

}

export default new CountryApi();
