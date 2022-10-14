import AsyncStorage from '@react-native-async-storage/async-storage';

export const getJSON = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : {};
  } catch (e) {
    console.log(`error getting value for key ${key} error:${e}`);
    return null;
  }
};

export const setJSON = async (key: string, value: JSON) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(`error setting value for key ${key} error:${e}`);
  }
};
