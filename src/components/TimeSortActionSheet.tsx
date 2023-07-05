import { ActionSheet, ButtonProps, Colors } from 'react-native-ui-lib';
import { timeOptions, TimeSortType } from '../hooks/useListingSort';
import SortActionItem from './SortActionItem';
import SortActionSheet from './SortActionSheet';
import IconActionSheet from './IconActionSheet';

export interface TimeShortActionSheetProps {
  visible: boolean;
  setVisible: any;
  onSortOptionPress?: (sort: TimeSortType) => void;
}

const TimeSortActionSheet = ({
  visible,
  setVisible,
  onSortOptionPress,
}: TimeShortActionSheetProps) => {
  const sortingOptions = timeOptions.map(type => ({
    label: type,
    onPress: () =>
      !!onSortOptionPress ? onSortOptionPress(type as any) : undefined,
  }));

  return (
    <IconActionSheet
      visible={visible}
      setVisible={setVisible}
      options={sortingOptions}
    />
  );
};

export default TimeSortActionSheet;
