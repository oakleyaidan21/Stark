import { useCallback, useContext } from 'react';
import StarkContext from '../context/StarkContext';
import { getSavedSubmissions } from '../util/RedditUtil';
import useListing from './useListing';

export const useGetSavedContent = () => {
  const { snoowrap } = useContext(StarkContext);

  const get = useCallback(() => {
    return getSavedSubmissions(snoowrap);
  }, [snoowrap]);

  const { listing, loading, refreshing, fetchMore } = useListing({
    getListing: get,
  });

  return { listing, loading, refreshing, fetchMore };
};
