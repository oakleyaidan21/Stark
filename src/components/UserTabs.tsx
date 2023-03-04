import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, Text, Colors } from 'react-native-ui-lib';
import { RedditUser } from 'snoowrap';
import UserPostList from './user/UserPostList';
// import UserCommentList from "./UserCommentList";
// import UserUpvotedList from "./UserUpvotedList";
// import UserDownvotedList from "./UserDownvotedList";
// import UserTrophyList from "./UserTrophyList";

const routes = [
  { key: 'posts', title: 'Posts' },
  { key: 'comments', title: 'Comments' },
  { key: 'upvoted', title: 'Upvoted' },
  { key: 'downvoted', title: 'Downvoted' },
  { key: 'trophies', title: 'Trophies' },
  { key: 'hidden', title: 'Hidden' },
];

const initialLayout = { width: Dimensions.get('window').width };

type Props = {
  user: RedditUser;
};

const UserTabs = ({ user }: Props) => {
  const [index, setIndex] = useState<number>(0);

  const PostRoute = useCallback(() => <UserPostList user={user} />, [user]);

  //   const CommentRoute = useCallback(
  //     () => <UserCommentList user={user} navigation={props.navigation} />,
  //     [user],
  //   );

  //   const UpvoteRoute = useCallback(
  //     () => <UserUpvotedList user={user} navigation={props.navigation} />,
  //     [user],
  //   );

  //   const DownvoteRoute = useCallback(
  //     () => <UserDownvotedList user={user} navigation={props.navigation} />,
  //     [user],
  //   );

  //   const TrophyRoute = useCallback(
  //     () => <UserTrophyList user={user} navigation={props.navigation} />,
  //     [user],
  //   );

  const ImplRoute = useCallback(
    () => (
      <View>
        <Text>Impl</Text>
      </View>
    ),
    [user],
  );

  const renderScene = SceneMap({
    posts: PostRoute,
    comments: ImplRoute,
    upvoted: ImplRoute,
    downvoted: ImplRoute,
    trophies: ImplRoute,
    hidden: ImplRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      scrollEnabled={true}
      tabStyle={{ width: 130 }}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: Colors.bgColor }}
    />
  );

  return (
    <View flex>
      <TabView
        style={{ flex: 1 }}
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        lazy
      />
    </View>
  );
};

export default UserTabs;
