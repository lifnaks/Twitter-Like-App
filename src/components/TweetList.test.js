import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TweetList from './TweetList';
import tweets from './tweetStore';

describe('TweetList', () => {
  it('renders without errors', () => {
    render(<TweetList tweets={tweets} />);
  });

  it('Toggle the "Show Liked Tweets" and "Show All Tweets" button', () => {
    render(<TweetList tweets={tweets} />);
    const showLikedButton = screen.getByText('Show Liked Tweets');
    expect(showLikedButton).toBeInTheDocument();
    fireEvent.click(showLikedButton);
    expect(screen.getByText("Show All Tweets"));
  });

  it('updates the liked tweets count when "Like" button is clicked', () => {
    render(<TweetList tweets={tweets} />);
    setTimeout(() => {
      fireEvent.click(screen.getByText('Like'));
      expect(screen.getByText('Liked Tweets: 1')).toBeInTheDocument();
    }, 3000);
  });

  it('updates the liked tweets count when "Unlike" button is clicked', () => {
    render(<TweetList tweets={tweets} />);
    setTimeout(() => {
      fireEvent.click(screen.getByText('Like'));
      const unlikeButton = screen.getByText('Unlike');
      fireEvent.click(unlikeButton);
      const likedTweetsCounter = screen.getByText('Liked Tweets: 0');
      expect(likedTweetsCounter).toBeInTheDocument();
    }, 3000);
  });
});
