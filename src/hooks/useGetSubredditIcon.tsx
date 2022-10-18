import { useEffect, useState } from 'react';
import { Subreddit } from 'snoowrap';
import { getJSON, setJSON } from '../util/AsyncStorageUtil';

const STORAGE_KEY = 'SUBREDDIT_ICONS';

const useGetSubredditIcon = (subreddit: Subreddit) => {
  const { display_name } = subreddit;
  const [iconUrl, setIconUrl] = useState('');

  useEffect(() => {
    if (subreddit.icon_img !== undefined) {
      const url =
        subreddit.icon_img.length > 0
          ? subreddit.icon_img
          : subreddit.community_icon;
      setIconUrl(url);
    } else {
      // check if in cache
      getJSON(STORAGE_KEY).then(urls => {
        if (urls[display_name] !== undefined) {
          setIconUrl(urls[display_name]);
        } else {
          subreddit.fetch().then(fullSubreddit => {
            const { icon_img, community_icon } = fullSubreddit;
            const url = icon_img.length > 0 ? icon_img : community_icon;
            setIconUrl(url);
            let newIconUrls = { ...urls };
            newIconUrls[display_name] = url;
            setJSON(STORAGE_KEY, newIconUrls);
          });
        }
      });
    }
  }, [setIconUrl, getJSON, setJSON, subreddit]);

  return (
    iconUrl ??
    'https://cdn.iconscout.com/icon/free/png-256/reddit-74-434748.png'
  );
};

export default useGetSubredditIcon;
