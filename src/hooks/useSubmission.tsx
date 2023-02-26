import { useContext, useEffect, useState } from 'react';
import { Submission } from 'snoowrap';
import StarkContext from '../context/StarkContext';

const useSubmission = (submission?: Submission, id?: string) => {
  const [fullSubmission, setFullSubmission] = useState<Submission>();
  const [subId, setSubId] = useState<string>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errored, setErrored] = useState(false);

  const { snoowrap } = useContext(StarkContext);

  const getSubmission = (submissionId: string | undefined) => {
    if (submissionId) {
      setLoading(true);
      snoowrap
        .getSubmission(submissionId)
        .fetch()
        .then(s => {
          setFullSubmission(s);
        })
        .catch(error => {
          setErrored(true);
          console.log('Error getting submission with id', submissionId, error);
        })
        .finally(() => {
          setLoading(false);
          setRefreshing(false);
        });
    }
  };

  const refresh = () => {
    setRefreshing(true);
    getSubmission(id);
  };

  useEffect(() => {
    if (submission) {
      setFullSubmission(submission);
      setSubId(submission.id);
      setLoading(false);
    } else if (id !== undefined) {
      getSubmission(id);
    }
  }, [submission, id]);

  return {
    loading,
    errored,
    refreshing,
    refresh,
    fullSubmission,
    submissionId: subId,
  };
};

export default useSubmission;
