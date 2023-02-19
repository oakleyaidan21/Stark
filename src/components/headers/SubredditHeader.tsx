import { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { Subreddit } from 'snoowrap';

export interface SubredditHeaderProps {
  subreddit: Subreddit;
}

const SubredditHeader = ({ subreddit }: SubredditHeaderProps) => {
  const {
    display_name,
    subscribers,
    public_description,
    banner_img,
    community_icon,
    banner_background_image,
  } = subreddit;

  const bannerImg =
    banner_img.length > 0
      ? banner_img
      : banner_background_image.length > 0
      ? banner_background_image
      : '';

  const hasBannerImage = bannerImg.length > 0;
  const hasCommunityIcon = community_icon.length > 0;

  const [subscribing, setSubscribing] = useState(false);
  const [joined, setJoined] = useState(subreddit.user_is_subscriber);

  const subscribe = () => {
    if (joined) {
      setSubscribing(true);
      subreddit.unsubscribe().then(() => {
        setSubscribing(false);
        setJoined(false);
      });
    } else {
      setSubscribing(true);
      subreddit.subscribe().then(() => {
        setSubscribing(false);
        setJoined(true);
      });
    }
  };

  return (
    <View bg-bgColor marginB-10 style={{ position: 'relative' }}>
      <View style={{ height: 150, backgroundColor: Colors.primary }}>
        {hasBannerImage && (
          <Image source={{ uri: bannerImg }} style={{ flex: 1 }} />
        )}
      </View>
      <View
        paddingH-10
        style={{ paddingTop: hasCommunityIcon ? 20 : 0 }}
        marginB-10>
        <View row centerV spread>
          <Text bold style={{ fontSize: 25 }}>
            {display_name}
          </Text>
          <View>
            <TouchableOpacity onPress={subscribe} disabled={subscribing}>
              <Text bold style={{ color: Colors.primary }}>
                {joined ? 'Joined' : 'Join'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View row>
          <Text style={{ color: Colors.tertiaryText, size: 5 }}>
            {subscribers} members
          </Text>
        </View>
        <Text>{public_description}</Text>
      </View>
      {hasCommunityIcon && (
        <View
          style={{
            position: 'absolute',
            height: 80,
            width: 80,
            left: 20,
            top: 90,
            backgroundColor: Colors.oBgColor,
            borderRadius: 40,
          }}
          center>
          <Image
            source={{ uri: community_icon }}
            style={{ borderRadius: 35, height: 70, width: 70 }}
          />
        </View>
      )}
    </View>
  );
};

export default SubredditHeader;
