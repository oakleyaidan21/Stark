import { useContext, useEffect, useState } from 'react';
import { RedditUser } from 'snoowrap';
import StarkContext from '../context/StarkContext';

const useGetRedditUser = (name?: string, user?: RedditUser) => {
  const [fullUser, setFullUser] = useState<RedditUser>();
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { snoowrap } = useContext(StarkContext);

  const getUser = (username: string | undefined) => {
    if (username) {
      setLoading(true);
      snoowrap
        .getUser(username)
        .fetch()
        .then(setFullUser)
        .catch(error => {
          setErrored(true);
          console.log('Error getting user', error);
        })
        .finally(() => {
          setLoading(false);
          setRefreshing(false);
        });
    }
  };

  useEffect(() => {
    if (user) {
      setFullUser(user);
      setLoading(false);
    } else if (name !== undefined) {
      getUser(name);
    }
  }, [user, name]);

  return {
    loading,
    errored,
    refreshing,
    fullUser,
  };
};

export default useGetRedditUser;
