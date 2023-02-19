import { useEffect, useState } from 'react';
import { getJSON, setJSON } from '../util/AsyncStorageUtil';

const STORAGE_KEY = 'RG_TOKEN';

export const getRGAuthInfo = async () => {
  try {
    const response = await fetch('https://api.redgifs.com/v2/auth/temporary', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const body = await response.json();
    return body;
  } catch (e) {
    console.log('Error getting RG token:', e);
  }
};

const useGetRGAuthInfo = () => {
  const [authInfo, setAuthInfo] = useState<any>();

  const getInfo = () => {
    getJSON(STORAGE_KEY).then(async info => {
      // if expired or doesn't exist, get a new one
      let expired = false;
      if (Object.keys(info).length === 0) {
        expired = true;
      }
      if (expired) {
        try {
          const auth = await getRGAuthInfo();
          setJSON(STORAGE_KEY, auth);
          setAuthInfo(auth);
        } catch (e) {
          console.log('Error getting RG token:', e);
        }
      } else {
        setAuthInfo(info);
      }
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return { authInfo, getInfo };
};

export default useGetRGAuthInfo;
