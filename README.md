# Mobile Flashcards - React Navtive

## Overview

This is a simple study application with flashcards.


## Contents

- [App Preview](#app-preview)
- [Implementation](#implementation)
- [Additional installed npm list](#additional-installed-npm-list)
- [Run the application](#run-the-application)
- [Create React Native App](#create-react-native-app)


## App Preview

Category List             |  Quiz View
:-------------------------:|:-------------------------:
<img src='http://drive.google.com/uc?export=view&id=1i6QTfZV1qY_wpBzqtdBU6YLYqiaIvsHO' width='100%' /><br> |  <img src='http://drive.google.com/uc?export=view&id=1nqormdz7Mn7S0jsH3OVx-HT8qHjhND5A' width='100%' />


## Run the application

To run the application:
* Install all dependencies with `yarn install`
  * Use yarn because Create React Native App does not currently work well with NPM v5, due to [bugs in NPM](https://github.com/expo/create-react-native-app/issues/233#issuecomment-305638103).
* Start the application on Expo with `expo start`

<hr/>

* If Expo environment is not set up, see this documetation. ([Setting up the development environment](https://reactnative.dev/docs/environment-setup))
  * Use your device
    * Install the CLI `yarn global add expo-cli`
    * Download the "Expo Go" app from the Play Store or App Store if you want to run the application on your device.
      * [Expo on Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)
      * [Expo on the App Store](https://apps.apple.com/us/app/expo-client/id982107779) (iOS)
    * Open the project:
      * Sign in to expo and the project will appear in the app.
      * Or point your phone's camera at the QR code in the terminal
    * Start the project with `expo start`

<hr/>

* [Expo Snack](https://snack.expo.io/@mushoot/github.com-reacthong-react-native-flashcards)


## Features

- Navigate app with `Tab Navigation` & `Stack Navigation` (v5)
- Manage data by `Redux`
- Load/Store data with `AsyncStorage`
  - `AsyncStorage` is deprecated. It should be changed!
- Everyday notification as reminder
- Implement flipping card animation


## Further TO DO LIST

- [ ] Replace `AsyncStorage`
- [ ] Splash Screen
- [ ] Sort card by time
- [ ] Add a feature about loading/saving image for the quiz
- [ ] Edit cards (update/delete)
- [ ] Use sliding pages for Quiz
- [ ] Loading indicator
- [ ] Integrate with back-end
- [ ] Fix a bug that 'Submit' button pops up on Android


## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/expo/create-react-native-app).


## Additional Dependencies
- redux
- react-redux
- styled-components
- react-native-vector-icons
- @react-navigation/native
- @react-navigation/bottom-tabs
- @react-navigation/stack
- expo-constants
- expo-image-picker
- expo-notifications
- expo-permissions
