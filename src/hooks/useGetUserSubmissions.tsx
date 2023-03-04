import { useCallback, useContext } from 'react';
import { RedditUser } from 'snoowrap';
import { ListingOptions } from 'snoowrap/dist/objects';
import StarkContext from '../context/StarkContext';
import useListing from './useListing';
import useListingSort from './useListingSort';

const useGetUserSubmissions = (user: RedditUser) => {
  const { snoowrap } = useContext(StarkContext);

  const { sort, setSort } = useListingSort('Hot');

  const getPosts = useCallback(
    (options: ListingOptions) => {
      return user.getSubmissions(options);
    },
    [user, sort, snoowrap],
  );

  const { listing, loading, refreshing, refresh, fetchMore, errored } =
    useListing({
      getListing: getPosts,
      sortable: sort === 'Top',
    });

  return {
    listing,
    refresh,
    refreshing,
    fetchMore,
    loading,
    sort,
    setSort,
    errored,
  };
};

export default useGetUserSubmissions;
