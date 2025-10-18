import axios from "axios";
import type { CountryRequest, CountryResponse } from "../models/countries.models";

class BaseApi {
  constructor(protected baseURL: string) {}

  protected async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(`${this.baseURL}${url}`);
    return response.data;
  }
}

class CountryApi extends BaseApi {
  private defaultFields = "name,flags,capital,region,population";

  constructor() {
    super("https://restcountries.com/v3.1");
  }

 
  getAllCountries(request: CountryRequest = {}): Promise<CountryResponse[]> {
    const fields = request.fields?.length ? request.fields.join(",") : this.defaultFields;
    return this.get<CountryResponse[]>(`/all?fields=${fields}`);
  }

}

export default new CountryApi();
