import { GestureResponderEvent, TouchableWithoutFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface ConfigHeaderProps {
  title?: string;
  subtitle?: string;
  onTitlePress: (event: GestureResponderEvent) => void;
  leftIconBehavior?: 'back' | 'other';
}

const ConfigHeader = ({
  title,
  subtitle,
  onTitlePress,
  leftIconBehavior = 'other',
}: ConfigHeaderProps) => {
  return (
    <View flex center spread row paddingH-10 paddingV-5 bg-bgColor>
      <View width={50}>
        <Icon
          name={leftIconBehavior === 'back' ? 'arrow-left' : 'menu'}
          color={Colors.oBgColor}
          size={20}
        />
      </View>
      <TouchableWithoutFeedback onPress={onTitlePress}>
        <View flex-2>
          <Text bold>{title}</Text>
          <Text color={Colors.tertiaryText}>{subtitle}</Text>
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
