import Snoowrap, { Submission } from 'snoowrap';
import { SortedListingOptions } from 'snoowrap/dist/objects';
import { SortType } from '../hooks/useListingSort';

export const isSubmission = (content: any): content is Submission => {
  const isASubmission = 'title' in content;
  return isASubmission;
};

export const getSubPosts = async (
  snoowrap: Snoowrap,
  subredditName: string | undefined,
  options: SortedListingOptions,
  sort: SortType,
) => {
  console.log(
    `getting ${sort} posts for`,
    subredditName,
    `of the ${options.time}`,
  );
  if (subredditName === 'Saved') {
    return snoowrap.getMe().then(async me => {
      return await me.getSavedContent();
    });
  }
  const subName = subredditName === 'Front Page' ? undefined : subredditName;
  const sortType = sort.toLowerCase();
  switch (sortType) {
    case 'new':
      return await snoowrap.getNew(subName, options);
    case 'top':
      return await snoowrap.getTop(subName, options);
    case 'rising':
      return await snoowrap.getRising(subName, options);
    default:
      return await snoowrap.getHot(subName, options);
  }
};

export const postRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)$/;

export const determinePostType = (data: Submission) => {
  if (data.is_self) {
    return { code: 'SLF' };
  }
  if (!!data.crosspost_parent_list && data.crosspost_parent_list.size > 0) {
    return { code: 'XPT', xpst: data.crosspost_parent_list[0] };
  }
  if (!data.url) return { code: 'IDK' };
  const matches = data.url.match(postRegex);
  if (!matches) {
    return { code: 'IDK' };
  }
  const isGallery = data.is_gallery;
  const isImgur = data.domain == 'imgur.com';
  const isImgurGallery = isImgur
    ? matches[4]
      ? matches[4].substring(0, 3) == '/a/'
      : false
    : false;

  const threeExt = matches[4]
    ? matches[4].substring(matches[4].length - 4, matches[4].length)
    : false;
  const fourExt = matches[4]
    ? matches[4].substring(matches[4].length - 5, matches[4].length)
    : false;

  if (data.domain == 'redgifs.com' || data.domain == 'v3.redgifs.com') {
    return { code: 'RED' };
  }

  if (data.domain == 'gfycat.com') {
    return { code: 'GFY' };
  }
  if (
    threeExt == '.jpg' ||
    threeExt == '.png' ||
    threeExt == '.jpeg' ||
    threeExt == '.webp'
  ) {
    return { code: 'IMG' };
  }

  if (threeExt == '.gif') {
    return { code: 'GIF' };
  }

  if (fourExt == '.gifv' || data.is_video) {
    return { code: 'VID', fourExt: fourExt };
  }

  if (isGallery) {
    return { code: 'GAL' };
  }

  if (isImgurGallery) {
    return { code: 'IGL', hash: matches[4] ? matches[4].substring(3) : '' };
  }
  return { code: 'WEB' };
};

export const abbreviateNumber = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'k';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
};

export const parseLink = (url: string) => {
  const tokens = url.split('/');
  let id = null;
  if (tokens.length < 3) {
    return { type: 'web' };
  }
  switch (tokens[2]) {
    case 'redd.it':
      id = tokens[3];
      break;
    case 'www.reddit.com':
      id = tokens[6];
      break;
    case 'old.reddit.com':
      id = tokens[6];
    default:
      break;
  }
  if (id) {
    return { type: 'post', id: id };
  } else if (tokens[0] === 'about:') {
    if (tokens[3] === 'u') {
      return { type: 'user', name: tokens[4] };
    }
    return { type: 'sub', sub: tokens[4] };
  } else {
    if (tokens[1] == 'r') {
      return { type: 'sub', sub: tokens[2] };
    }
  }
  return { type: 'web' };
};

export const onLinkPress = (url: string, navigation: any) => {
  const r = parseLink(url);
  switch (r.type) {
    case 'post':
      navigation.push('Submission', { id: r.id });
      break;
    case 'sub':
      navigation.push('SubredditScreen', { subreddit: r.sub });
      break;
    case 'user':
      navigation.push('UserScreen', { name: r.name });
      break;
    default:
      navigation.navigate('Web', { url: url });
      break;
  }
};

export const getTimeSincePosted = (utc: number) => {
  let milliseconds = Math.round(new Date().getTime()) - utc * 1000;
  let time = Math.floor(milliseconds / 60000); //starts in minutes
  let timeType = 'm';
  if (time > 60) {
    //hours
    time = Math.floor(time / 60);
    timeType = 'h';
    if (time > 24) {
      //days
      time = Math.floor(time / 24);
      timeType = 'd';
      if (time > 7) {
        //weeks
        time = Math.floor(time / 7);
        timeType = 'w';
        if (time > 4) {
          //months
          time = Math.floor(time / 4);
          timeType = 'mo';
        }
        if (time > 12) {
          //years
          time = Math.floor(time / 12);
          timeType = 'y';
        }
      }
    }
  }
  const toReturn = time + '' + timeType;
  return toReturn == '0m' ? 'Just now' : toReturn;
};

export const mapRedditGalleryImages = (data: Submission) => {
  let idMap = {};
  const gallery_data = (data as any).gallery_data.items;
  let urls = new Array(gallery_data.length);
  for (let i = 0; i < gallery_data.length; i++) {
    const key = gallery_data[i].media_id;
    idMap[key] = { index: i, data: gallery_data[i] };
  }

  const metadata = (data as any).media_metadata;
  for (const i of Object.entries(metadata)) {
    urls[idMap[i[0]].index] = {
      uri: (i[1] as any).s.u,
      data: idMap[i[0]].data,
    };
  }

  return urls;
};
