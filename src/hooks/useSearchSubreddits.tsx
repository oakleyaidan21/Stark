import { useContext, useEffect, useState } from 'react';
import { Listing, Subreddit } from 'snoowrap';
import StarkContext from '../context/StarkContext';

const useSearchSubreddits = (searchText?: string) => {
  const [results, setResults] = useState<Listing<Subreddit>>();
  const [errored, setErrored] = useState(false);
  const [loading, setLoading] = useState(false);
  const { snoowrap } = useContext(StarkContext);

  const searchSubs = () => {
    if (searchText !== undefined) {
      if (searchText.length === 0) {
        setResults(undefined);
        return;
      }
      if (snoowrap) {
        setLoading(true);
        snoowrap
          .searchSubreddits({ query: searchText })
          .then(results => {
            if (results.length > 0) setResults(results);
          })
          .catch(error => {
            console.log('Error searching subs', error);
            setErrored(true);
          })
          .finally(() => setLoading(false));
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(searchSubs, 400);
    return () => clearTimeout(timeout);
  }, [searchText]);

  return { results, errored, loading };
};

export default useSearchSubreddits;
