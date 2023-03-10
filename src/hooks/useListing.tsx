import { useEffect, useState } from 'react';
import { Listing } from 'snoowrap';
import { ListingOptions, SortedListingOptions } from 'snoowrap/dist/objects';
import { TimeSortType } from './useListingSort';

export interface UseListingProps {
  getListing: (
    options: ListingOptions | SortedListingOptions,
  ) => Promise<Listing<any>>;
  sortable?: boolean;
  timeSort?: TimeSortType;
  setTimeSort?: any;
}

const useListing = ({
  getListing,
  sortable = false,
  timeSort,
  setTimeSort,
}: UseListingProps) => {
  const [listing, setListing] = useState<Listing<any>>();
  const [errored, setErrored] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(25);

  const options = {
    limit: limit,
  };

  const sortedOptions = { ...options, time: timeSort?.toLowerCase() };

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
      return moreItems;
    } catch (error) {
      console.log('error fetching more', error);
      setErrored(true);
      throw error;
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
  };
};

export default useListing;
