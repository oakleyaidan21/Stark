import { useEffect, useState } from 'react';
import { Subreddit } from 'snoowrap';
import { getJSON, setJSON } from '../util/AsyncStorageUtil';

const STORAGE_KEY = 'SUBREDDIT_ICONS';

const useGetSubredditIcon = (subreddit: Subreddit) => {
  const { display_name } = subreddit;
  const [iconUrl, setIconUrl] = useState('');

  useEffect(() => {
    // check if in cache
    getJSON(STORAGE_KEY).then(urls => {
      if (urls[display_name] !== undefined) {
        setIconUrl(urls[display_name]);
      } else {
        subreddit.fetch().then(fullSubreddit => {
          const { icon_img, community_icon } = fullSubreddit;
          const iconUrl = icon_img.length > 0 ? icon_img : community_icon;
          setIconUrl(iconUrl);
          let newIconUrls = { ...urls };
          newIconUrls[display_name] = iconUrl;
          setJSON(STORAGE_KEY, newIconUrls);
        });
      }
    });
    // if not, fetch subreddit and cache icon url with name
  }, [setIconUrl, getJSON, setJSON, subreddit]);

  return (
    iconUrl ??
    'https://cdn.iconscout.com/icon/free/png-256/reddit-74-434748.png'
  );
};

export default useGetSubredditIcon;
