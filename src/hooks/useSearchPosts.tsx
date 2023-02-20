import { useCallback, useContext, useEffect, useState } from 'react';
import { Listing, Submission } from 'snoowrap';
import StarkContext from '../context/StarkContext';

const useSearchPosts = (query: string) => {
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [results, setResults] = useState<Listing<Submission>>();

  const { snoowrap } = useContext(StarkContext);

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

  const getMore = async () => {
    const moreResults = await results?.fetchMore({ amount: 25, append: true });
    setResults(moreResults);
  };

  useEffect(() => {
    search();
  }, [search]);

  return { search, loading, errored, results, getMore };
};

export default useSearchPosts;
