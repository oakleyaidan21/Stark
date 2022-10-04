import { useSelector, useDispatch } from 'react-redux';

const useStarkStorage = () => {
  const { refreshToken, authCode } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  return { refreshToken, authCode };
};

export default useStarkStorage;
