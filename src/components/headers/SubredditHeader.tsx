import { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { Subreddit } from 'snoowrap';
import useGetSubredditIcon from '../../hooks/useGetSubredditIcon';
import { SortType } from '../../hooks/useListingSort';
import ConfigHeader from './ConfigHeader';

export interface SubredditHeaderProps {
  subreddit: Subreddit;
  setSortType: any;
  sort: SortType;
}

const SubredditHeader = ({
  subreddit,
  sort,
  setSortType,
}: SubredditHeaderProps) => {
  const {
    display_name,
    subscribers,
    public_description,
    banner_img,
    banner_background_image,
    primary_color,
  } = subreddit;

  const bannerImg =
    banner_img.length > 0
      ? banner_img
      : banner_background_image.length > 0
      ? banner_background_image
      : '';

  const iconImg = useGetSubredditIcon(subreddit);

  const hasBannerImage = bannerImg.length > 0;

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
      <ConfigHeader
        title={'Subreddit'}
        subtitle={sort}
        onSortOptionPress={setSortType}
        leftIconBehavior="back"
        backgroundColor="rgba(0, 0, 0, 0.4)"
      />
      <View style={{ height: 100, backgroundColor: Colors.primary }}>
        {hasBannerImage && (
          <Image source={{ uri: bannerImg }} style={{ flex: 1 }} />
        )}
      </View>
      <View paddingH-10 paddingT-20 marginB-10>
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
          <Text style={{ color: Colors.tertiaryText, size: 5 }} marginV-5>
            {subscribers.toLocaleString()} members
          </Text>
        </View>
        <Text>{public_description}</Text>
      </View>
      <View
        height={80}
        width={80}
        style={{
          position: 'absolute',
          left: 20,
          top: 90,
          borderRadius: 40,
          backgroundColor:
            primary_color.length > 0 ? primary_color : Colors.oBgColor,
        }}
        center>
        <Image
          source={{ uri: iconImg }}
          style={{ borderRadius: 35, height: 70, width: 70 }}
        />
      </View>
    </View>
  );
};

export default SubredditHeader;
