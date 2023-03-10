import { ActionSheet, Colors } from 'react-native-ui-lib';
import { timeOptions, TimeSortType } from '../hooks/useListingSort';

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
    <ActionSheet
      bg-bgColor
      containerStyle={{ backgroundColor: Colors.bgColor }}
      dialogStyle={{ backgroundColor: Colors.bgColor, paddingBottom: 10 }}
      migrateDialog
      optionsStyle={{ backgroundColor: Colors.bgColor }}
      options={sortingOptions}
      visible={visible}
      onDismiss={() => setVisible(false)}
    />
  );
};

export default TimeSortActionSheet;
