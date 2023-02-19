import { useEffect, useState } from 'react';
import Snoowrap, { Listing, Subreddit } from 'snoowrap';
import useSnoowrap from './useSnoowrap';

const useSearchSubreddits = (searchText: string) => {
  const [results, setResults] = useState<Listing<Subreddit>>();
  const [errored, setErrored] = useState(false);
  const { snoowrap } = useSnoowrap();

  const searchSubs = () => {
    if (snoowrap) {
      snoowrap
        .searchSubreddits({ query: searchText })
        .then(results => {
          setResults(results);
        })
        .catch(error => {
          console.log('Error searching subs', error);
          setErrored(true);
        });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(searchSubs, 400);
    return () => clearTimeout(timeout);
  }, [searchText]);

  return { results, errored };
};

export default useSearchSubreddits;
