import { useContext, useEffect, useState } from 'react';
import { Listing, Submission } from 'snoowrap';
import { Comment, ListingOptions } from 'snoowrap/dist/objects';
import StarkContext from '../context/StarkContext';
import { getSubPosts } from '../util/RedditUtil';

export interface UseSubmissionListingProps {
  subredditName?: string;
  options: ListingOptions;
}

const useSubmissionListing = ({
  subredditName,
  options,
}: UseSubmissionListingProps) => {
  const { snoowrap } = useContext(StarkContext);

  const [listing, setListing] = useState<Listing<Submission | Comment>>();
  const [refreshing, setRefreshing] = useState(false);

  const getPosts = () => {
    if (snoowrap) {
      getSubPosts(snoowrap, subredditName, options)
        .then(listing => {
          setListing(listing);
          setRefreshing(false);
        })
        .catch(error => {
          console.log('Error getting posts', error.body);
        });
    }
  };

  useEffect(() => {
    getPosts();
  }, [subredditName, snoowrap, setListing]);

  const refresh = () => {
    setRefreshing(true);
    getPosts();
  };

  const fetchMore = async () => {
    try {
      const moreSubmissions = await listing?.fetchMore({
        amount: 25,
        append: true,
      });
      setListing(moreSubmissions);
    } catch (error) {
      console.log('error fetching more', error);
    }
  };

  return { listing, refresh, refreshing, subredditName, fetchMore };
};

export default useSubmissionListing;
