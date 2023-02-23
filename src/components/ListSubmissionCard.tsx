import { useState } from 'react';
import { LayoutAnimation, TouchableNativeFeedback } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import SubmissionCard from './SubmissionCard';

type ListSubmissionCardProps = {
  submission: Submission;
  inView: boolean;
  onPress: any;
  index?: number;
};

const ListSubmissionCard = ({
  submission,
  inView,
  onPress,
  index,
}: ListSubmissionCardProps) => {
  const animateBody = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowBody(!showBody);
  };

  const [showBody, setShowBody] = useState(false);

  return (
    <TouchableNativeFeedback
      onPress={() => onPress(index)}
      onLongPress={animateBody}>
      <View>
        <SubmissionCard
          submission={submission}
          inView={inView}
          showBody={showBody}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default ListSubmissionCard;
