import { useCallback, useContext } from 'react';
import { ListingOptions } from 'snoowrap/dist/objects';
import StarkContext from '../context/StarkContext';
import { getSubPosts } from '../util/RedditUtil';
import useListing from './useListing';

export interface UseSubmissionListingProps {
  subredditName?: string;
  options: ListingOptions;
}

const useSubmissionListing = ({ subredditName }: UseSubmissionListingProps) => {
  const { snoowrap } = useContext(StarkContext);

  const getPosts = useCallback(
    (options: ListingOptions) => {
      return getSubPosts(snoowrap, subredditName, options);
    },
    [subredditName],
  );

  const { listing, loading, refreshing, refresh, fetchMore } = useListing({
    getListing: getPosts,
  });

  return { listing, refresh, refreshing, fetchMore, subredditName, loading };
};

export default useSubmissionListing;
