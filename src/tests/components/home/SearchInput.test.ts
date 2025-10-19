import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchInput from '@/components/home/SearchInput.vue';

describe('SearchInput', () => {
  it('renders with placeholder text', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
    });

    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('Search for a country...');
  });

  it('displays the modelValue', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: 'Germany' },
    });

    const input = wrapper.find('input');
    expect(input.element.value).toBe('Germany');
  });

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
    });

    const input = wrapper.find('input');
    await input.setValue('France');

    expect(wrapper.emitted('update:modelValue')).toEqual([['France']]);
  });
});
