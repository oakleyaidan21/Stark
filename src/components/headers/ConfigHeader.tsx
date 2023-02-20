import { useNavigation } from '@react-navigation/native';
import { GestureResponderEvent, TouchableWithoutFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface ConfigHeaderProps {
  title?: string;
  subtitle?: string;
  onTitlePress?: (event: GestureResponderEvent) => void;
  leftIconBehavior?: 'back' | 'other';
}

const ConfigHeader = ({
  title,
  subtitle,
  onTitlePress,
  leftIconBehavior = 'other',
}: ConfigHeaderProps) => {
  const navigation = useNavigation();

  const onLeftButtonPress = () => {
    leftIconBehavior === 'back'
      ? navigation.goBack()
      : console.log('other pressed');
  };

  return (
    <View flex center spread row paddingH-10 paddingV-5 bg-bgColor>
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
        <Icon name="filter-variant" color={Colors.oBgColor} size={20} />
        <Icon name="dots-vertical" color={Colors.oBgColor} size={20} />
      </View>
    </View>
  );
};

export default ConfigHeader;
