import { SortType } from '../models/countries.models';

export const regionOptions = [
  { value: 'Africa', label: 'Africa' },
  { value: 'Americas', label: 'Americas' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
];

export const sortOptions = [
  { value: SortType.NAME_ASC, label: 'Name (A-Z)' },
  { value: SortType.NAME_DESC, label: 'Name (Z-A)' },
  { value: SortType.POPULATION_ASC, label: 'Population (Low to High)' },
  { value: SortType.POPULATION_DESC, label: 'Population (High to Low)' },
];