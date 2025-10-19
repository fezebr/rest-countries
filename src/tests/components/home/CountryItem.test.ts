import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CountryItem from '@/components/home/CountryItem.vue';
import type { CountriesResponse } from '@/models/countries.models';

const mockCountry: CountriesResponse = {
  name: { common: 'Germany', official: 'Federal Republic of Germany' },
  flags: {
    svg: 'https://example.com/flag.svg',
    png: 'https://example.com/flag.png',
  },
  capital: ['Berlin'],
  region: 'Europe',
  population: 83240525,
  cca3: 'DEU',
};

describe('CountryItem', () => {
  it('renders country information', () => {
    const wrapper = mount(CountryItem, {
      props: { country: mockCountry },
    });

    expect(wrapper.text()).toContain('Germany');
    expect(wrapper.text()).toContain('83,240,525');
    expect(wrapper.text()).toContain('Europe');
    expect(wrapper.text()).toContain('Berlin');
  });

  it('renders flag image with correct attributes', () => {
    const wrapper = mount(CountryItem, {
      props: { country: mockCountry },
    });

    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('https://example.com/flag.svg');
    expect(img.attributes('alt')).toBe('Germany');
  });

  it('emits select event with country code when clicked', async () => {
    const wrapper = mount(CountryItem, {
      props: { country: mockCountry },
    });

    await wrapper.find('article').trigger('click');

    expect(wrapper.emitted('select')).toEqual([['DEU']]);
  });
});
