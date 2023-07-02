import { ActionSheet, ButtonProps, Colors } from 'react-native-ui-lib';
import { sortOptions, SortType } from '../hooks/useListingSort';
import SortActionItem from './SortActionItem';

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
      options={sortingOptions}
      visible={visible}
      onDismiss={() => setVisible(false)}
      renderAction={_renderAction}
    />
  );
};

export default SortActionSheet;
