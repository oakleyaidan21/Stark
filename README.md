# Stark

A cross-platform mobile application for browsing reddit, written with React Native.

**NOTE**: As of 06/30/2023, Reddit charges for usage of their API. Because of this, instances of this application require their own reddit client ID, e.g., an ID per install, or else be subject to fees.

## Screenshots

<img width="443" alt="Screenshot 2024-04-12 at 3 40 30 PM" src="https://github.com/oakleyaidan21/Stark/assets/36863200/66b66693-a997-4a41-9e7f-2fe7e246f64e">
<img width="453" alt="Screenshot 2024-04-12 at 3 42 47 PM" src="https://github.com/oakleyaidan21/Stark/assets/36863200/bb31db03-58b1-4a4d-be2e-5a7a2e0dc9b5">
<img width="452" alt="Screenshot 2024-04-12 at 3 43 15 PM" src="https://github.com/oakleyaidan21/Stark/assets/36863200/163eacce-4480-40a1-9d6b-3805cf7885c2">
<img width="447" alt="Screenshot 2024-04-12 at 3 58 36 PM" src="https://github.com/oakleyaidan21/Stark/assets/36863200/d88056e1-7cda-4157-bc38-57316a9c3165">

## Setup

`npm install`

### iOS

`cd ios && pod install`

In order for react-native-reanimated to work, change its `CLANG_CXX_LANGUAGE_STANDARD` value in node modules:

`node_modules/react-native-reanimated/RNReanimated.podspec`
`"CLANG_CXX_LANGUAGE_STANDARD" => "c++17",`

This may have been fixed in later versions of the package, but for the version this repo uses, it's required.

### Secrets

Replace instances of `<YOUR_USER_AGENT>` and `<YOUR_CLIENT_ID>` with your Reddit app's user agent and client ID, respectfully.

## Running

`npm run android` or `npx run ios`
