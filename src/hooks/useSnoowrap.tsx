import { useEffect, useState } from 'react';
import Snoowrap, { RedditUser } from 'snoowrap';
import snoowrapConfig from '../config/snoowrapConfig';
import useStarkStorage from './useStarkStorage';

const useSnoowrap = () => {
  const [snoowrap, setSnoowrap] = useState<Snoowrap>();
  const { refreshToken, authCode, setRefreshToken, addUser, setAuthCode } =
    useStarkStorage();
  const [user, setUser] = useState<RedditUser>();

  const handleTokenChange = async () => {
    if (refreshToken) {
      console.log('creating snoowrap from refresh token');
      const snoo = new Snoowrap({
        clientId: snoowrapConfig.clientId,
        clientSecret: snoowrapConfig.clientSecret,
        refreshToken: refreshToken,
        userAgent: snoowrapConfig.userAgent,
      });
      snoo._nextRequestTimestamp = -1;
      snoo.config({ proxies: false });
      snoo.getMe().then(result => {
        setUser(result);
        setSnoowrap(snoo);
      });
    } else if (authCode) {
      console.log('creating snoowrap from auth code', authCode);
      try {
        const snoo = await Snoowrap.fromAuthCode({
          code: authCode,
          userAgent: snoowrapConfig.userAgent,
          clientId: snoowrapConfig.clientId,
          redirectUri: 'https://localhost:8080',
        });
        snoo._nextRequestTimestamp = -1;
        snoo.config({ proxies: false });
        snoo.getMe().then(result => {
          setUser(result);
          setRefreshToken(snoo.refreshToken);
          setAuthCode(null);
          addUser(result, snoo.refreshToken);
          setSnoowrap(snoo);
        });
      } catch (error) {
        throw error;
      }
    } else {
      console.log('creating snoowrap from application only auth');
      try {
        const snoo = await Snoowrap.fromApplicationOnlyAuth({
          ...snoowrapConfig,
          permanent: false,
          deviceId: 'DO_NO_TRACK_THIS_DEVICE',
        });
        snoo._nextRequestTimestamp = -1;
        snoo.config({ proxies: false });
        setUser(undefined);
        setSnoowrap(snoo);
      } catch (error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    handleTokenChange().catch(error => {
      console.log('error creating snoowrap', error, error.body);
    });
  }, [refreshToken, authCode]);

  return { snoowrap, user };
};

export default useSnoowrap;
