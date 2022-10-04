import { createContext } from 'react';
import Snoowrap, {
  Comment,
  Listing,
  PrivateMessage,
  RedditUser,
  Subreddit,
} from 'snoowrap';

interface StarkContextInterface {
  snoowrap?: Snoowrap;
  user?: RedditUser;
  setUser?: any;
  userSubs?: Listing<Subreddit>;
  setUserSubs?: () => void;
  inbox?: Listing<PrivateMessage | Comment>;
  setUnreadInbox?: any;
}

const StarkContext = createContext<StarkContextInterface>({
  snoowrap: undefined,
  user: undefined,
  setUser: null,
  userSubs: undefined,
  setUserSubs: undefined,
  inbox: undefined,
  setUnreadInbox: null,
});

export default StarkContext;
