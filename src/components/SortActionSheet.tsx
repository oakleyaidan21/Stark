import { sortOptions, SortType } from '../hooks/useListingSort';
import IconActionSheet from './IconActionSheet';

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
    label: type.label,
    iconName: type.icon,
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

export default SortActionSheet;
