import { useEffect, useState } from 'react';
import useGetRGToken from './useGetRGAuthInfo';

const useGetRGInfo = (identifier: string) => {
  const { authInfo } = useGetRGToken();
  const [info, setInfo] = useState();

  useEffect(() => {
    if (authInfo) {
      console.log('token haha!!', authInfo.token);
      fetch(`https://api.redgifs.com/v2/gifs/${identifier}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authInfo.token}`,
        },
      })
        .then(response => response.json())
        .then(info => setInfo(info))
        .catch(e => console.log('Error getting RG info:', e));
    }
  }, [authInfo]);

  return { info };
};

export default useGetRGInfo;
