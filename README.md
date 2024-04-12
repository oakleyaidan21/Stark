# Stark

A cross-platform mobile application for browsing reddit, written with React Native.

**NOTE**: As of 06/30/2023, Reddit charges for usage of their API. Because of this, instances this application require their own reddit client ID, e.g., an ID per install, or else be subject to fees.

## Screenshots

(screenshots)

## Setup

`npm install`

### iOS

`cd ios && pod install`

In order for react-native-reanimated to work, change its `CLANG_CXX_LANGUAGE_STANDARD` value in node modules:

`node_modules/react-native-reanimated/RNReanimated.podspec`
`"CLANG_CXX_LANGUAGE_STANDARD" => "c++17",`

This may have been fixed in later versions of the package, but for the version this repo uses, it's required.

## Running

`npm run android` or `npx run ios`
