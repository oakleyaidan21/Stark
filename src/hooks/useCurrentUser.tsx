import { useEffect, useState } from 'react';
import useStarkStorage from './useStarkStorage';

const useCurrentUser = () => {
  const { users, refreshToken } = useStarkStorage();
  const [currentUser, setCurrentUser] = useState<any>();

  const getCurrentUser = () => {
    if (users) {
      const currentUser: any = Object.entries(users).find((keyValue: any) => {
        return keyValue[1].refreshToken === refreshToken;
      });
      if (currentUser) {
        return {
          username: currentUser[0],
          pfpUrl: currentUser[1].pfpUrl,
          refreshToken: currentUser[1].refreshToken,
        };
      }
    }
    return null;
  };

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  return { currentUser, getCurrentUser };
};

export default useCurrentUser;
