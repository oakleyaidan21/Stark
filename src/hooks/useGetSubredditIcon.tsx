import { useEffect, useState } from 'react';
import { Subreddit } from 'snoowrap';
import { getJSON, setJSON } from '../util/AsyncStorageUtil';

const STORAGE_KEY = 'SUBREDDIT_ICONS';

const missingUrl =
  'https://cdn.iconscout.com/icon/free/png-256/reddit-74-434748.png';

const useGetSubredditIcon = (subreddit: Subreddit | string) => {
  const display_name =
    typeof subreddit === 'string' ? subreddit : subreddit.display_name;
  const [iconUrl, setIconUrl] = useState<string>('');

  useEffect(() => {
    if (typeof subreddit !== 'string' && subreddit.icon_img !== undefined) {
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
          if (typeof subreddit === 'string') {
            setIconUrl(urls[display_name] ?? '');
          } else {
            subreddit?.fetch().then(fullSubreddit => {
              const { icon_img, community_icon } = fullSubreddit;
              const url = icon_img.length > 0 ? icon_img : community_icon;
              setIconUrl(url);
              let newIconUrls = { ...urls };
              newIconUrls[display_name] = url;
              setJSON(STORAGE_KEY, newIconUrls);
            });
          }
        }
      });
    }
  }, [setIconUrl, getJSON, setJSON, subreddit]);

  return iconUrl.length > 0 ? iconUrl : missingUrl;
};

export default useGetSubredditIcon;
