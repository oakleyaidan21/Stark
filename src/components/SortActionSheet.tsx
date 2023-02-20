import { ActionSheet, Colors } from 'react-native-ui-lib';
import { sortOptions, SortType } from '../hooks/useListingSort';

export interface SortActionSheetProps {
  visible: boolean;
  setVisible: any;
  onSortOptionPress?: (sort: SortType) => void;
}

const SortActionSheet = ({
  visible,
  setVisible,
  onSortOptionPress,
}: SortActionSheetProps) => {
  const sortingOptions = sortOptions.map(type => ({
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

export default SortActionSheet;
