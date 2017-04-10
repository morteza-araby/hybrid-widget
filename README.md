# Hybrid Widget

This is the project which make a hybrid application using C3 Widgets.

# Step to build on iOS

1 - install modules
> npm install

2 - Add ios/Android platform
> cordova platform add ios

This should add the platform and add the plugins needed. Check the config.xml.
There is a special cordova-plugin-iosrtc, which has been cloned in my github account.

3 - Open the project in "platforms/ios/C3Widget.xcworkspace" in xcode

4 - Apply the default swift conversion in xcode.

5 - Choose the C3Widget project in xcode and in "General" properties, in "signing" part fix it to
some valid Signing Certificate, Widget uses Video so it should be running on real device.

6 - Under "Resources/C3Widget-info.plist", add two rows and add permission for Camera and Microphone.
"Privacy - Camer Usage ..." and "Privacy - Microphone Usage ..."

7 - Build the project and choose a proper target, it should build and install the package on the device.