import { render, screen } from '@testing-library/react';
import { makeComment } from '../../mock/mock';
import ReviewsList from './reviews-list';

const comments = new Array(3).fill(makeComment());

const fakeApp = (
  <ReviewsList comments={comments} />
);

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByTestId('reviiew-list')).toBeInTheDocument();
  });
});
