import { useEffect, useState } from 'react';
import useGetRGToken from './useGetRGAuthInfo';

const useGetRGInfo = (identifier: string) => {
  const { authInfo, getInfo } = useGetRGToken();
  const [gifInfo, setGifInfo] = useState<any>();
  const [error, setError] = useState<string>();

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
        .then(info => {
          if (info['error']) {
            getInfo(true);
          } else {
            setGifInfo(info);
          }
        })
        .catch(e => console.log('Error getting RG info:', e));
    }
  }, [authInfo]);

  return { gifInfo, authInfo };
};

export default useGetRGInfo;
