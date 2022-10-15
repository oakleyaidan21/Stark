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

  return {
    refreshToken,
    authCode,
    users,
    dispatch,
    setRefreshToken,
    setAuthCode,
  };
};

export default useStarkStorage;
