import { useCallback, useContext, useEffect, useState } from 'react';
import { Listing, Submission } from 'snoowrap';
import StarkContext from '../context/StarkContext';
import useListing from './useListing';
import useListingSort from './useListingSort';

const useSearchPosts = (query: string) => {
  const { snoowrap } = useContext(StarkContext);

  const { sort } = useListingSort('Relevance');

  const search = useCallback(() => {
    return snoowrap.search({
      query: query,
      time: 'all',
      sort: (sort as string).toLowerCase(),
    });
  }, [sort, query]);

  const { listing, loading, fetchMore, errored, refresh, refreshing } =
    useListing({
      getListing: search,
      sortable: true,
    });

  // const [loading, setLoading] = useState(false);
  // const [errored, setErrored] = useState(false);
  // const [results, setResults] = useState<Listing<Submission>>();

  // const search = useCallback(() => {
  //   if (snoowrap) {
  //     snoowrap
  //       .search({ query: query, time: 'all', sort: 'relevance' })
  //       .then(res => {
  //         setLoading(false);
  //         setResults(res);
  //       })
  //       .catch(error => {
  //         console.log('Error searching posts', error);
  //         setErrored(true);
  //       });
  //   }
  // }, [query, snoowrap]);

  // const getMore = async () => {
  //   const moreResults = await results?.fetchMore({ amount: 25, append: true });
  //   setResults(moreResults);
  // };

  // useEffect(() => {
  //   search();
  // }, [search]);

  return { refresh, loading, errored, results: listing, fetchMore, refreshing };
};

export default useSearchPosts;
