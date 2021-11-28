import { render, screen } from '@testing-library/react';
import { makeComment } from '../../mock/mock';
import ReviewsItem from './reviews-item';

const comment = makeComment();

const fakeApp = (
  <ReviewsItem comment={comment} />
);

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
  });
});
