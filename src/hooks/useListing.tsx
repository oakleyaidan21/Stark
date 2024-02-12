import { useEffect, useState } from 'react';
import { Listing } from 'snoowrap';
import {
  Comment,
  ListingOptions,
  SortedListingOptions,
  Submission,
  VoteableContent,
} from 'snoowrap/dist/objects';
import { TimeSortType } from './useListingSort';
import { isComment } from '../util/RedditUtil';

export interface UseListingProps {
  getListing: (
    options: ListingOptions | SortedListingOptions,
  ) => Promise<Listing<Comment | Submission>>;
  sortable?: boolean;
  timeSort?: TimeSortType;
  setTimeSort?: any;
}

export interface UseListingResult {
  listing: Listing<Submission | Comment> | undefined;
  contentSet: Array<Submission | Comment>;
  submissions: Array<Submission>;
  comments: Array<Comment>;
  fetchMore: () => void;
  errored: boolean;
  refreshing: boolean;
  loading: boolean;
  refresh: () => void;
  limit: number;
  setLimit: (newLimit: number) => void;
}

function useListing({
  getListing,
  sortable = false,
  timeSort,
  setTimeSort,
}: UseListingProps): UseListingResult {
  const [listing, setListing] = useState<Listing<Comment | Submission>>();
  const [contentSet, setContentSet] = useState<Array<T>>([]);
  const [submissions, setSubmissions] = useState<Array<Submission>>([]);
  const [comments, setComments] = useState<Array<Comment>>([]);
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

  const setListingInfo = (list: Listing<Submission | Comment>) => {
    setListing(list);
    const filtered = filterDuplicates(list);
    setContentSet(filtered);
    const [subs, comms] = partitionContent(filtered);
    setSubmissions(subs);
    setComments(comms);
  };

  const get = () => {
    if (getListing !== undefined) {
      setLoading(true);
      getListing(sortable ? sortedOptions : options)
        .then(setListingInfo)
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
      if (moreItems) {
        setListingInfo(moreItems);
      }
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
    contentSet,
    submissions,
    comments,
    fetchMore,
    errored,
    refreshing,
    loading,
    refresh,
    limit,
    setLimit,
  };
}

// not very performant but listings shouldn't be that long
// anyway with a limit
function filterDuplicates<T extends VoteableContent<T>>(
  listing: Listing<T>,
): Array<T> {
  return listing.filter((elem, index, self) => {
    return index === self.findIndex(item => item.id === elem.id);
  });
}

function partitionContent(
  arr: Array<Submission | Comment> | Listing<Submission | Comment>,
): [Array<Submission>, Array<Comment>] {
  const partitioned: [Array<Submission>, Array<Comment>] = [[], []];
  arr.forEach((val: Submission | Comment) => {
    if (!isComment(val)) {
      partitioned[0].push(val as Submission);
    } else {
      partitioned[1].push(val as Comment);
    }
  });
  return partitioned;
}

export default useListing;
