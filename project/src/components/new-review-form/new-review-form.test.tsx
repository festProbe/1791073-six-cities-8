import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState as authReducerAuthState } from '../../store/auth-reducer/auth-reducer';
import NewReview from './new-review-form';

const fakeId = '1';

const mockStore = configureMockStore();
const store = mockStore({ AUTH: authReducerAuthState });


const fakeApp = (
  <Provider store={store}>
    <NewReview id={fakeId} />
  </Provider>
);

describe('Component: NewReview', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
  });
});
