import Snoowrap, { Submission } from 'snoowrap';

export const postRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)$/;

export const determinePostType = (data: Submission) => {
  if (data.is_self) {
    return { code: 'SLF' };
  }
  if (data.crosspost_parent_list) {
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

  if (data.domain == 'redgifs.com') {
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
