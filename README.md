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


## Features

- Navigate app with `Tab Navigation` & `Stack Navigation` (v5)
- Manage data by `Redux`
- Load/Store data with `AsyncStorage`
  - `AsyncStorage` is deprecated. It should be changed!
- Everyday notification as reminder
- Implement flipping card animation


## Run the application

To run the application:
* Install all dependencies with `yarn install`
  * Create React Native App does not currently work well with NPM v5, due to [bugs in NPM](https://github.com/expo/create-react-native-app/issues/233#issuecomment-305638103).
* Start the application on Expo with `expo start`
  * You need to set up with Expo CLI. ([Setting up the development environment](https://reactnative.dev/docs/environment-setup))
  * You need to install the Expo mobile app if you want to run the application on your device.
    * [Expo on Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)
    * [Expo on the App Store](https://apps.apple.com/us/app/expo-client/id982107779) (iOS)
* [Expo Snack]()

## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/expo/create-react-native-app).


## Additional installed npm list
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
