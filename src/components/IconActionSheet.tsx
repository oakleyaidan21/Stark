import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { ActionSheet, Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface IconActionSheetProps {
  visible: boolean;
  setVisible: any;
  options: Array<IconActionSheetOption>;
}

export interface IconActionSheetOption {
  label: string;
  iconName?: string;
  onPress: any;
}

const IconActionSheet = ({
  options,
  visible,
  setVisible,
}: IconActionSheetProps) => {
  const renderOptions = options.map((option, index) => ({
    ...option,
    index: index,
  }));

  const _renderAction = ({ onPress, index, label, iconName }: any) => {
    return (
      <TouchableNativeFeedback
        key={index + label}
        onPress={() => onPress(index)}>
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

  return (
    <ActionSheet
      bg-bgColor
      containerStyle={{ backgroundColor: Colors.bgColor }}
      dialogStyle={{ backgroundColor: Colors.bgColor, paddingBottom: 10 }}
      migrateDialog
      optionsStyle={{ backgroundColor: Colors.bgColor }}
      options={renderOptions}
      visible={visible}
      onDismiss={() => setVisible(false)}
      renderAction={_renderAction}
    />
  );
};

export default IconActionSheet;
