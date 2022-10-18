import { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Dialog, Text, View } from 'react-native-ui-lib';
import { Subreddit } from 'snoowrap';
import StarkContext from '../context/StarkContext';
import SubmissionListingContext from '../context/SubmissionListingContext';
import useStarkStorage from '../hooks/useStarkStorage';

export interface SubListProps {
  visible: boolean;
  setVisible: any;
}

const SubList = ({ visible, setVisible }: SubListProps) => {
  const { changeSubreddit } = useContext(SubmissionListingContext);

  const { userSubs } = useContext(StarkContext);

  const onSubPress = (sub: Subreddit) => {
    if (changeSubreddit) {
      changeSubreddit(sub.display_name);
      setVisible(false);
    }
  };

  return (
    <Dialog
      useSafeArea
      top
      height={'100%'}
      style={{ backgroundColor: Colors.bgColor }}
      panDirection={Dialog.directions.DOWN}
      containerStyle={styles.roundedDialog}
      visible={visible}
      onDismiss={() => setVisible(false)}
      supportedOrientations={['portrait']}>
      <View center flex>
        <TouchableOpacity
          onPress={() =>
            changeSubreddit ? changeSubreddit('Front Page') : null
          }>
          <View>
            <Text>Front Page</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => (changeSubreddit ? changeSubreddit('all') : null)}>
          <View>
            <Text>All</Text>
          </View>
        </TouchableOpacity>
        {userSubs?.map(sub => (
          <TouchableOpacity
            onPress={() => onSubPress(sub)}
            key={sub.display_name}>
            <View>
              <Text>{sub.display_name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Dialog>
  );
};

export default SubList;

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.bgColor,
  },
  roundedDialog: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    borderRadius: 12,
  },
  button: {
    margin: 5,
    alignSelf: 'flex-start',
  },
  verticalScroll: {
    marginTop: 20,
  },
  horizontalTextContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: 10,
  },
});
