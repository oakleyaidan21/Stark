import { Listing, Submission, Subreddit } from 'snoowrap';

type ScreenProps = {
  Submission: { submission: Submission; id?: string };
  SubredditScreen: { subreddit: Subreddit | string };
  SearchResultScreen: { query: string };
  PostSwiper: {
    index: number;
    submissions: Listing<Submission>;
    fetchMore: any;
  };
  Tabs: undefined;
  Login: undefined;
  Web: undefined;
};

export default ScreenProps;
