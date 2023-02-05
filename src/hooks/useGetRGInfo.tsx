import { useEffect, useState } from 'react';
import useGetRGToken from './useGetRGAuthInfo';

const useGetRGInfo = (identifier: string) => {
  const { authInfo } = useGetRGToken();
  const [gifInfo, setGifInfo] = useState<any>();

  useEffect(() => {
    if (authInfo) {
      const url = `https://api.redgifs.com/v2/gifs/${identifier}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authInfo.token}`,
        },
      })
        .then(response => response.json())
        .then(info => setGifInfo(info))
        .catch(e => console.log('Error getting RG info:', e));
    }
  }, [authInfo]);

  return { gifInfo, authInfo };
};

export default useGetRGInfo;
