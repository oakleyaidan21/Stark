import { Listing, Submission, Subreddit } from 'snoowrap';

type ScreenProps = {
  Submission: { submission: Submission };
  SubredditScreen: { subreddit: Subreddit | string };
  SearchResultScreen: { query: string };
  Tabs: undefined;
  Login: undefined;
  Web: undefined;
};

export default ScreenProps;
