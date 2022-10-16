import { useEffect, useState } from 'react';
import { Comment, Listing, Submission } from 'snoowrap';

const useSubmissionComments = (submission: Submission) => {
  const [comments, setComments] = useState<Listing<Comment>>();
  const [fetchingComments, setFetchingComments] = useState(false);

  const fetchComments = async () => {
    setFetchingComments(true);
    try {
      const commentList = comments ?? submission.comments;
      const moreComments = await commentList.fetchMore({
        amount: 10,
        append: true,
      });
      setComments(moreComments);
    } catch (error) {
      console.log('Error getting comments:', error);
    } finally {
      setFetchingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [submission.id]);

  return { comments, fetchingComments };
};

export default useSubmissionComments;
