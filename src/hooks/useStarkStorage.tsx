import { useSelector, useDispatch } from 'react-redux';
import { RedditUser } from 'snoowrap';

const useStarkStorage = () => {
  const { refreshToken, authCode, users } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const setRefreshToken = (token: string | null) => {
    dispatch({ type: 'SET_REFRESH_TOKEN', refreshToken: token });
  };

  const setAuthCode = (code: string | null) => {
    dispatch({ type: 'SET_AUTH_CODE', authCode: code });
  };

  const addUser = (user: RedditUser, token: string) => {
    let newUsers = { ...users };
    const newUser = { refreshToken: token, pfpUrl: user.icon_img };
    newUsers[user.name] = newUser;
    dispatch({ type: 'SET_USERS', users: newUsers });
  };

  return {
    refreshToken,
    authCode,
    users,
    dispatch,
    setRefreshToken,
    setAuthCode,
    addUser,
  };
};

export default useStarkStorage;
