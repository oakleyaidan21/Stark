import { useCallback, useContext } from 'react';
import { ListingOptions } from 'snoowrap/dist/objects';
import StarkContext from '../context/StarkContext';
import { getSubPosts } from '../util/RedditUtil';
import useListing from './useListing';
import useListingSort from './useListingSort';

export interface UseSubmissionListingProps {
  subredditName?: string;
  options: ListingOptions;
}

const useSubmissionListing = ({ subredditName }: UseSubmissionListingProps) => {
  const { snoowrap } = useContext(StarkContext);

  const { sort, setSort, timeSort, setTimeSort } = useListingSort('Hot');

  const getPosts = useCallback(
    (options: ListingOptions) => {
      return getSubPosts(snoowrap, subredditName, options, sort);
    },
    [subredditName, sort, snoowrap, timeSort],
  );

  const { listing, loading, refreshing, refresh, fetchMore, errored } =
    useListing({
      getListing: getPosts,
      sortable: sort === 'Top',
      timeSort: timeSort,
      setTimeSort: setTimeSort,
    });

  return {
    listing,
    refresh,
    refreshing,
    fetchMore,
    subredditName,
    loading,
    sort,
    setSort,
    timeSort,
    setTimeSort,
    errored,
  };
};

export default useSubmissionListing;
