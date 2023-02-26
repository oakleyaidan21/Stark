import { memo } from 'react';
import { View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import ContentActionBar from './ContentActionBar';
import SubmissionBody from './SubmissionBody';
import SubmissionInfo from './SubmissionInfo';

export interface SubmissionCardProps {
  submission: Submission;
  visible: boolean;
}

const SubmissionCard = ({ submission, visible }: SubmissionCardProps) => {
  return (
    <View bg-bgColor>
      <SubmissionInfo submission={submission} />
      {/* content */}
      <SubmissionBody submission={submission} visible={visible} />
      <ContentActionBar content={submission} />
    </View>
  );
};

export default memo(SubmissionCard, (prevProps, newProps) => {
  return (
    prevProps.submission.id === newProps.submission.id &&
    prevProps.visible === newProps.visible
  );
});
