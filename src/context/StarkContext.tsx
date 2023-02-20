import { createContext } from 'react';
import Snoowrap, {
  Comment,
  Listing,
  PrivateMessage,
  RedditUser,
  Subreddit,
} from 'snoowrap';
import snoowrapConfig from '../config/snoowrapConfig';

interface StarkContextInterface {
  snoowrap: Snoowrap;
  user?: RedditUser;
  setUser?: any;
  userSubs?: Listing<Subreddit>;
  setUserSubs?: () => void;
  inbox?: Listing<PrivateMessage | Comment>;
  setUnreadInbox?: any;
}

// we don't define snoowrap here since we don't have access to
// the necessary info to log in. Just ignore the compiler errors :)
const StarkContext = createContext<StarkContextInterface>({
  // snoowrap: new Snoowrap({ userAgent: snoowrapConfig.userAgent }),
  user: undefined,
  setUser: null,
  userSubs: undefined,
  setUserSubs: undefined,
  inbox: undefined,
  setUnreadInbox: null,
});

export default StarkContext;
