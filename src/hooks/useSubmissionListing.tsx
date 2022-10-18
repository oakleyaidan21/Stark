import { useContext, useEffect, useState } from 'react';
import { Listing, Submission } from 'snoowrap';
import { ListingOptions } from 'snoowrap/dist/objects';
import StarkContext from '../context/StarkContext';

export interface UseSubmissionListingProps {
  subredditName?: string;
  options: ListingOptions;
}

const useSubmissionListing = ({
  subredditName,
  options,
}: UseSubmissionListingProps) => {
  const { snoowrap } = useContext(StarkContext);

  const [listing, setListing] = useState<Listing<Submission>>();
  const [refreshing, setRefreshing] = useState(false);

  const getPosts = () => {
    console.log('getting new posts for', subredditName);
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
