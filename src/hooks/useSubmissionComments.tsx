import { useCallback } from 'react';
import { Submission } from 'snoowrap';
import useListing from './useListing';

const useSubmissionComments = (submission: Submission) => {
  const getComments = useCallback(async () => {
    return await submission.comments.fetchMore({ amount: 10, append: true });
  }, [submission.id]);

  const { listing, loading, fetchMore } = useListing({
    getListing: getComments,
    sortable: true,
  });

  return { comments: listing, fetchingComments: loading, fetchMore, loading };
};

export default useSubmissionComments;
