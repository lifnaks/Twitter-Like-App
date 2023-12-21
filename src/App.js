import React from 'react';
import TweetList from './components/TweetList';
import tweets from './components/tweetStore';

function App() {
  return (
    <div className="app">
      <h1>Twitter-like Website</h1>
      <TweetList tweets={tweets}/>
    </div>
  );
}

export default App;
