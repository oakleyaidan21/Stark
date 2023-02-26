import { memo } from 'react';
import { View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import ContentActionBar from './ContentActionBar';
import SubmissionBody from './SubmissionBody';
import SubmissionInfo from './SubmissionInfo';

export interface SubmissionCardProps {
  submission: Submission;
  inView: boolean;
}

const SubmissionCard = ({ submission, inView }: SubmissionCardProps) => {
  return (
    <View bg-bgColor>
      <SubmissionInfo submission={submission} />
      {/* content */}
      <SubmissionBody submission={submission} inView={inView} />
      <ContentActionBar content={submission} />
    </View>
  );
};

export default memo(SubmissionCard, (prevProps, newProps) => {
  return (
    prevProps.submission.id === newProps.submission.id &&
    prevProps.inView === newProps.inView
  );
});
