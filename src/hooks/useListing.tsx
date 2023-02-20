import { useEffect, useState } from 'react';
import { Listing } from 'snoowrap';
import { ListingOptions, SortedListingOptions } from 'snoowrap/dist/objects';

export interface UseListingProps {
  getListing: (
    options: ListingOptions | SortedListingOptions,
  ) => Promise<Listing<any>>;
  sortable?: boolean;
}

const useListing = ({ getListing, sortable = false }: UseListingProps) => {
  const [listing, setListing] = useState<Listing<any>>();
  const [errored, setErrored] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(25);
  const [time, setTime] = useState('all');

  const options = {
    limit: limit,
  };

  const sortedOptions = { ...options, time: time };

  useEffect(() => {
    get();
  }, [getListing]);

  const get = () => {
    if (getListing !== undefined) {
      setLoading(true);
      getListing(sortable ? sortedOptions : options)
        .then(list => {
          setListing(list);
        })
        .catch(error => {
          console.log('error getting listing', error);
          setErrored(true);
        })
        .finally(() => {
          setRefreshing(false);
          setLoading(false);
        });
    }
  };

  const fetchMore = async () => {
    try {
      const moreItems = await listing?.fetchMore({
        amount: 25,
        append: true,
      });
      setListing(moreItems);
    } catch (error) {
      console.log('error fetching more', error);
      setErrored(true);
    }
  };

  const refresh = () => {
    setRefreshing(true);
    get();
  };

  return {
    listing,
    fetchMore,
    errored,
    refreshing,
    loading,
    refresh,
    limit,
    setLimit,
    time,
    setTime,
  };
};

export default useListing;
