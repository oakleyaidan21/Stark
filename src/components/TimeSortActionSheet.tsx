import { ActionSheet, ButtonProps, Colors } from 'react-native-ui-lib';
import { timeOptions, TimeSortType } from '../hooks/useListingSort';
import SortActionItem from './SortActionItem';

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

  const _renderAction = (
    { label }: ButtonProps,
    index: number,
    onOptionPress: any,
  ) => {
    return (
      <SortActionItem
        label={label ?? ''}
        index={index}
        onOptionPress={onOptionPress}
      />
    );
  };

  return (
    <ActionSheet
      bg-bgColor
      containerStyle={{ backgroundColor: Colors.bgColor }}
      dialogStyle={{ backgroundColor: Colors.bgColor, paddingBottom: 10 }}
      migrateDialog
      optionsStyle={{ backgroundColor: Colors.bgColor }}
      renderAction={_renderAction}
      options={sortingOptions}
      visible={visible}
      onDismiss={() => setVisible(false)}
    />
  );
};

export default TimeSortActionSheet;
