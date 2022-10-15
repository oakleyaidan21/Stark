import { createContext } from 'react';
import { Comment, Listing, Submission, Subreddit } from 'snoowrap';

interface SubmissionListingContextInterface {
  listing?: Listing<Submission | Comment>;
  fetchMore?: () => void;
  refresh?: () => void;
  refreshing?: boolean;
  errored?: boolean;
  subredditName?: string;
  changeSubreddit?: (name: string) => void;
}

const SubmissionListingContext =
  createContext<SubmissionListingContextInterface>({});

export default SubmissionListingContext;
