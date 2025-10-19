import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CountryList from '@/components/home/CountryList.vue';
import CountryItem from '@/components/home/CountryItem.vue';
import type { CountriesResponse } from '@/models/countries.models';

const mockCountries: CountriesResponse[] = [
  {
    name: { common: 'Germany', official: 'Federal Republic of Germany' },
    flags: {
      svg: 'https://example.com/de.svg',
      png: 'https://example.com/de.png',
    },
    capital: ['Berlin'],
    region: 'Europe',
    population: 83240525,
    cca3: 'DEU',
  },
  {
    name: { common: 'France', official: 'French Republic' },
    flags: {
      svg: 'https://example.com/fr.svg',
      png: 'https://example.com/fr.png',
    },
    capital: ['Paris'],
    region: 'Europe',
    population: 67391582,
    cca3: 'FRA',
  },
];

const mockRouter = {
  push: vi.fn(),
};

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}));

describe('CountryList', () => {
  it('shows loading state', () => {
    const wrapper = mount(CountryList, {
      props: { countries: [], isLoading: true, error: null },
    });

    expect(wrapper.text()).toContain('Loading...');
  });

  it('renders country items', () => {
    const wrapper = mount(CountryList, {
      props: { countries: mockCountries, isLoading: false, error: null },
    });

    const countryItems = wrapper.findAllComponents(CountryItem);
    expect(countryItems).toHaveLength(2);
    expect(countryItems[0].props('country')).toEqual(mockCountries[0]);
  });

  it('navigates to country details when country is selected', async () => {
    const wrapper = mount(CountryList, {
      props: { countries: mockCountries, isLoading: false, error: null },
    });

    const countryItem = wrapper.findComponent(CountryItem);
    await countryItem.vm.$emit('select', 'DEU');

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'country-details',
      params: { code: 'DEU' },
    });
  });
});
