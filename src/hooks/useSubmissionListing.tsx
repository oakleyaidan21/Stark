import { useContext, useEffect, useState } from 'react';
import { Listing, Submission } from 'snoowrap';
import { ListingOptions } from 'snoowrap/dist/objects';
import StarkContext from '../context/StarkContext';

export interface UseSubmissionListingProps {
  subName?: string;
  options: ListingOptions;
}

const useSubmissionListing = ({
  subName,
  options,
}: UseSubmissionListingProps) => {
  const { snoowrap } = useContext(StarkContext);

  const [listing, setListing] = useState<Listing<Submission>>();
  const [refreshing, setRefreshing] = useState(false);
  const [subredditName, setSubredditName] = useState(subName);

  const getPosts = () => {
    snoowrap
      ?.getHot(
        subredditName === 'Front Page' ? undefined : subredditName,
        options,
      )
      .then(listing => {
        setListing(listing);
        setRefreshing(false);
      })
      .catch(e => {
        console.log('Error getting posts', e.body);
      });
  };

  useEffect(() => {
    getPosts();
  }, [subredditName, snoowrap, setListing, subredditName]);

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
