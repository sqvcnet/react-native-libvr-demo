# react-native-libvr-demo

## How to run this demo
#### git clone https://github.com/sqvcnet/react-native-libvr-demo.git

#### cd react-native-libvr-demo

#### npm install --save

#### react-native run-ios

If you want to run this demo on your iOS device, open the ios/ReactNativeLibvrDemo.xcodeproj and config the iOS Developer Program options (check the "Automatically manage signing" and select your Team in the Xcode project General page may be the easiest way), then press Command+R 

## Generate a brand new react-native project
If you want to generate a brand new react-native project, run the following command
#### react-native init ReactNativeLibVRDemo --version 0.44.0
Normally, you should run 
#### react-native init ReactNativeLibVRDemo
to generate a react-native project, but above command will init a react-native-0.45.0 project at the moment I write this doc, unfortunately react-native-0.45.0 has a bug and cannot build.
