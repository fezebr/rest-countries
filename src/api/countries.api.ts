import axios from "axios";
import type { Country } from "../models/countries.models";

 
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

  getAllCountries(fields: string[] = []): Promise<Country[]> {
    const queryFields = fields.length ? fields.join(",") : this.defaultFields;
    return this.get<Country[]>(`/all?fields=${queryFields}`);
  }
}

 
export default new CountryApi();
