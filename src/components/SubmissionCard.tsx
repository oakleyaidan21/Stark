import { memo } from 'react';
import { Colors, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import ContentActionBar from './ContentActionBar';
import SubmissionBody from './SubmissionBody';
import SubmissionInfo from './SubmissionInfo';

export interface SubmissionCardProps {
  submission: Submission;
}

const SubmissionCard = ({ submission }: SubmissionCardProps) => {
  return (
    <View
      bg-bgColor
      style={{ borderColor: Colors.borderColor, borderBottomWidth: 1 }}>
      <SubmissionInfo submission={submission} />
      <SubmissionBody submission={submission} />
      <ContentActionBar content={submission} />
    </View>
  );
};

export default SubmissionCard;
