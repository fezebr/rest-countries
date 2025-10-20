import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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
    population: 83_240_525,
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
    population: 67_391_582,
    cca3: 'FRA',
  },
];

const mockRouter = { push: vi.fn() };

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}));

const factory = (overrides = {}) =>
  mount(CountryList, {
    props: {
      countries: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      itemsPerPage: 12,
      ...overrides,
    },
  });

describe('CountryList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state', () => {
    const wrapper = factory({ isLoading: true });
    expect(wrapper.text()).toContain('Loading...');
  });

  it('renders country items', () => {
    const wrapper = factory({ countries: mockCountries });
    const items = wrapper.findAllComponents(CountryItem);

    expect(items).toHaveLength(mockCountries.length);
  });

  it('navigates to country details when a country is selected', async () => {
    const wrapper = factory({ countries: mockCountries });
    const firstItem = wrapper.findComponent(CountryItem);

    await firstItem.vm.$emit('select', 'DEU');

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'country-details',
      params: { code: 'DEU' },
    });
  });
});
