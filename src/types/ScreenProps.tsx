import { Listing, RedditUser, Submission, Subreddit } from 'snoowrap';

type ScreenProps = {
  Submission: { submission: Submission; id?: string };
  SubredditScreen: { subreddit: Subreddit | string };
  SearchResultScreen: { query: string };
  UserScreen: { name?: string; user?: RedditUser };
  UserSubScreen: { changeSubreddit: any; searchString?: string };
  PostSwiper: {
    initialIndex: number;
    submissions: Listing<Submission>;
    fetchMore: any;
  };
  Tabs: undefined;
  Login: undefined;
  Web: undefined;
};

export default ScreenProps;
