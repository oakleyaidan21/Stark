import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { GestureResponderEvent, TouchableWithoutFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SortType, TimeSortType } from '../../hooks/useListingSort';
import ScreenProps from '../../types/ScreenProps';
import SortActionSheet from '../SortActionSheet';
import TimeSortActionSheet from '../TimeSortActionSheet';

export interface ConfigHeaderProps {
  title?: string;
  subtitle?: string;
  onTitlePress?: (event: GestureResponderEvent) => void;
  onSortOptionPress?: (sort: SortType) => void;
  onTimeOptionPress?: (time: TimeSortType) => void;
  leftIconBehavior?: 'back' | 'other';
  backgroundColor?: string;
}

const ConfigHeader = ({
  title,
  subtitle,
  onTitlePress,
  leftIconBehavior = 'other',
  onSortOptionPress,
  onTimeOptionPress,
  backgroundColor = Colors.bgColor,
}: ConfigHeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  const onLeftButtonPress = () => {
    leftIconBehavior === 'back'
      ? navigation.goBack()
      : console.log('other pressed');
  };

  const [sortListVisible, setSortListVisible] = useState(false);
  const [timeListVisible, setTimeListVisible] = useState(false);

  return (
    <View
      flex
      center
      spread
      row
      paddingH-10
      paddingV-5
      backgroundColor={backgroundColor}>
      <View width={50}>
        <TouchableWithoutFeedback onPress={onLeftButtonPress}>
          <Icon
            name={leftIconBehavior === 'back' ? 'arrow-left' : 'menu'}
            color={Colors.oBgColor}
            size={20}
          />
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={onTitlePress}>
        <View flex-2 paddingR-10>
          {!!title && (
            <>
              <Text bold numberOfLines={1}>
                {title}
              </Text>
              {subtitle && <Text color={Colors.tertiaryText}>{subtitle}</Text>}
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View row flex spread>
        <Icon name="magnify" color={Colors.oBgColor} size={20} />
        <TouchableWithoutFeedback onPress={() => setSortListVisible(true)}>
          <Icon name="filter-variant" color={Colors.oBgColor} size={20} />
        </TouchableWithoutFeedback>
        <Icon name="dots-vertical" color={Colors.oBgColor} size={20} />
      </View>
      <SortActionSheet
        visible={sortListVisible}
        setVisible={setSortListVisible}
        onSortOptionPress={(option: any) => {
          if (onSortOptionPress) {
            if (option.label == 'Top') {
              setSortListVisible(false);
              setTimeout(() => setTimeListVisible(true), 500);
            } else {
              setSortListVisible(false);
              onSortOptionPress(option.label);
            }
          }
        }}
      />
      <TimeSortActionSheet
        visible={timeListVisible}
        setVisible={setTimeListVisible}
        onSortOptionPress={onTimeOptionPress}
      />
    </View>
  );
};

export default ConfigHeader;
