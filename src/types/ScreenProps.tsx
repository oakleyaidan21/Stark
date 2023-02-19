import { Submission, Subreddit } from 'snoowrap';

type ScreenProps = {
  Submission: { submission: Submission };
  SubredditScreen: { subreddit: Subreddit | string };
  Tabs: undefined;
  Login: undefined;
  Web: undefined;
};

export default ScreenProps;
