import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface LabeledHeaderProps {
  title: string;
  subtitle: string;
}

const LabeledHeader = ({ title, subtitle }: LabeledHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View flex center row spread paddingH-10 paddingV-5>
      <View width={50}>
        <TouchableWithoutFeedback onPress={navigation.goBack}>
          <Icon name={'arrow-left'} color={Colors.oBgColor} size={20} />
        </TouchableWithoutFeedback>
      </View>
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
    </View>
  );
};

export default LabeledHeader;
