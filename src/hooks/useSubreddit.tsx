import { useEffect, useState } from 'react';
import { Subreddit } from 'snoowrap';
import useSnoowrap from './useSnoowrap';

const useSubreddit = (subreddit: Subreddit | string) => {
  const inputIsSub = typeof subreddit !== 'string';

  const [subredditInfo, setSubredditInfo] = useState<Subreddit>();
  const [errored, setErrored] = useState(false);

  const { snoowrap } = useSnoowrap();

  useEffect(() => {
    if (!inputIsSub && snoowrap !== undefined) {
      snoowrap
        .getSubreddit(subreddit)
        .fetch()
        .then(setSubredditInfo)
        .catch(error => {
          console.log('Error getting subreddit', error);
          setErrored(true);
        });
    }
  }, [snoowrap]);

  return {
    sub: inputIsSub ? subreddit : subredditInfo,
    loading: !inputIsSub && !subredditInfo,
    errored,
  };
};

export default useSubreddit;
