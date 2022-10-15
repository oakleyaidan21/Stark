import { useSelector, useDispatch } from 'react-redux';

const useStarkStorage = () => {
  const { refreshToken, authCode, users } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const setRefreshToken = (token: string | null) => {
    dispatch({ type: 'SET_REFRESH_TOKEN', refreshToken: token });
  };

  const setAuthCode = (code: string | null) => {
    dispatch({ type: 'SET_AUTH_CODE', authCode: code });
  };

  const addUser = (name: string, token: string) => {
    let newUsers = { ...users };
    newUsers[name] = token;
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
