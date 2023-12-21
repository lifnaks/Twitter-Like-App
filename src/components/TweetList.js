import React, { useState, useEffect } from 'react';
import './TweetList.css';

function TweetList({ tweets }) {
  const [tweetsList, setTweetsList] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [showLikedTweets, setShowLikedTweets] = useState(false);
  useEffect(() => {
    const subscription = tweets.subscribe((tweet) => {
      const newTweetsList = [tweet, ...tweetsList];
      const filteredTweets = newTweetsList.filter(
        (t) => Date.now() - t.timestamp <= 30000
      );
      setTweetsList(filteredTweets);
      setLikedTweets((prevLikedTweets) =>
        prevLikedTweets.filter((likedTweet) =>
          filteredTweets.some((t) => t.timestamp === likedTweet.timestamp)
        )
      );
    });
    return () => subscription.unsubscribe();
  }, [tweetsList, tweets]);
  const likeTweet = (tweet) => {
    if (likedTweets.includes(tweet)) {
      setLikedTweets(likedTweets.filter((likedTweet) => likedTweet !== tweet));
    } else {
      setLikedTweets([...likedTweets, tweet]);
    }
  };

  const clearTweets = () => {
    setTweetsList([]);
    setLikedTweets([]);
  };

  return (
    <div className="tweet-list">
      <button onClick={() => setShowLikedTweets(!showLikedTweets)}>
        {showLikedTweets ? 'Show All Tweets' : 'Show Liked Tweets'}
      </button>
      <button onClick={clearTweets}>Clear Tweets</button>
      <div className="liked-counter">Liked Tweets: {likedTweets.length}</div>
      {tweetsList.map((tweet) => (
        (!showLikedTweets || likedTweets.includes(tweet)) && (
          <div
            key={tweet.timestamp}
            className={`tweet ${likedTweets.includes(tweet) ? 'liked' : ''}`}
          >
            <span>{tweet.content}</span>
            <button onClick={() => likeTweet(tweet)}>
              {likedTweets.includes(tweet) ? 'Unlike' : 'Like'}
            </button>
          </div>
        )
      ))}
    </div>
  );
}

export default TweetList;
