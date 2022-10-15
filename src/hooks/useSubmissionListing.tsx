import { useContext, useEffect, useState } from 'react';
import { Listing, Submission } from 'snoowrap';
import { ListingOptions } from 'snoowrap/dist/objects';
import StarkContext from '../context/StarkContext';

export interface UseSubmissionListingProps {
  subredditName: string;
  options: ListingOptions;
}

const useSubmissionListing = ({
  subredditName,
  options,
}: UseSubmissionListingProps) => {
  const { snoowrap } = useContext(StarkContext);

  const [listing, setListing] = useState<Listing<Submission>>();

  useEffect(() => {
    snoowrap
      ?.getHot(
        subredditName === 'Front Page' ? undefined : subredditName,
        options,
      )
      .then(listing => {
        setListing(listing);
      })
      .catch(e => {
        console.log('e', e.body);
      });
  }, [subredditName, snoowrap, setListing]);

  return { listing };
};

export default useSubmissionListing;
