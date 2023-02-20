import { useCallback, useEffect, useState } from 'react';
import { Listing, Submission } from 'snoowrap';
import useSnoowrap from './useSnoowrap';

const useSearchPosts = (query: string) => {
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [results, setResults] = useState<Listing<Submission>>();
  const { snoowrap } = useSnoowrap();

  const search = useCallback(() => {
    if (snoowrap) {
      snoowrap
        .search({ query: query, time: 'all', sort: 'relevance' })
        .then(res => {
          setLoading(false);
          setResults(res);
        })
        .catch(error => {
          console.log('Error searching posts', error);
          setErrored(true);
        });
    }
  }, [query, snoowrap]);

  const getMore = () => {
    results?.fetchMore({ amount: 25 });
  };

  useEffect(() => {
    search();
  }, [search]);

  return { search, loading, errored, results, getMore };
};

export default useSearchPosts;
