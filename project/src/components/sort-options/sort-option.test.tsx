import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import SortOptions from './sort-options';

const mockStore = configureMockStore();
const store = mockStore({});

const fakeApp = (
  <Provider store={store}>
    <SortOptions />
  </Provider>
);

describe('Component: SortOptions', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
  });
});
