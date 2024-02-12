import { Comment, Listing, RedditUser, Submission, Subreddit } from 'snoowrap';

type ScreenProps = {
  Submission: { submission?: Submission; id?: string };
  SubredditScreen: { subreddit: Subreddit | string };
  SearchResultScreen: { query: string };
  UserScreen: { name?: string; user?: RedditUser };
  UserSubScreen: { changeSubreddit: any; searchString?: string };
  PostSwiper: {
    initialIndex: number;
    submissions: Array<Submission>;
    fetchMore: any;
  };
  CreateCommentScreen: { content: Submission | Comment };
  Tabs: undefined;
  Login: undefined;
  Web: { url: string };
};

export default ScreenProps;
