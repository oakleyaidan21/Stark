import { useEffect, useState } from 'react';
import { Listing } from 'snoowrap';

export interface UseListingProps {
  getListing: () => Promise<Listing<any>>;
}

const useListing = ({ getListing }: UseListingProps) => {
  const [listing, setListing] = useState<Listing<any>>();
  const [errored, setErrored] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get();
  }, [getListing]);

  const get = () => {
    if (getListing !== undefined) {
      setLoading(true);
      getListing()
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

  return { listing, fetchMore, errored, refreshing, loading, refresh };
};

export default useListing;
