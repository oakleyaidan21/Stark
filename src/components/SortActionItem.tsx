import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sortOptions } from '../hooks/useListingSort';

export interface SortActionItemProps {
  label: string;
  index: number;
  onOptionPress: any;
  iconName?: string;
}

export const icons = [
  { name: 'Relevance', icon: 'circle-double' },
  { name: 'Hot', icon: 'fire' },
  { name: 'Top', icon: 'format-vertical-align-top' },
  { name: 'New', icon: 'new-box' },
  { name: 'Comments', icon: 'comment' },
  { name: 'Rising', icon: 'trending-up' },
];

const SortActionItem = ({
  label,
  index,
  onOptionPress,
}: SortActionItemProps) => {
  const getIconName = () => {
    return icons.find(options => options.name === label)?.icon;
  };

  const iconName = getIconName() ?? undefined;

  console.log(iconName, label);

  return (
    <TouchableNativeFeedback onPress={() => onOptionPress(index)}>
      <View centerV height={40} paddingL-10>
        <View row centerV>
          <View width={40} center>
            {iconName && (
              <Icon name={iconName} size={20} color={Colors.oBgColor} />
            )}
          </View>
          <Text flex bold>
            {label}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SortActionItem;
