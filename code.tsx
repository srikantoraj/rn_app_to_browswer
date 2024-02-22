Android Configuration:
Modify AndroidManifest.xml: Open your Android app’s AndroidManifest.xml file located in android/app/src/main. You need to declare your custom URL scheme within an <intent-filter> for the relevant <activity> (usually your MainActivity).
xml
1. Check Package Name
Ensure that the package name specified in the intent (com.gxc) matches the package name defined in your AndroidManifest.xml file. The package name is declared at the top of the AndroidManifest.xml file:

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.gxc">

  
<activity android:name=".MainActivity">
    <!-- Add this intent filter within the <activity> tag -->
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Accepts URIs starting with "gxc://" -->
        <data android:scheme="gxc" />
    </intent-filter>
</activity>
This configuration tells the Android system that your app can handle intents to open URLs with the scheme gxc://.





import React, { useEffect } from 'react';
import { Button, Linking, View, Text } from 'react-native';

const ProfileScreen = () => {
  let token = ''
  const linkingUri = 'gxc://'; 

  useEffect(() => {
    const handleOpenURL = ({ url }) => {
      console.log("Opened via URL: ", url);
      
      // Here, you can parse the URL to determine the action
      // For example, navigate to a specific part of your app or display a message
    };
    const handleDeepLink = (event) => {
      console.log("Incoming URL:", event.url);
      // Parse the URL and extract the token parameter
      const url = new URL(event.url);
      console.log(url)
      if (token) {
        console.log("Extracted Token:", token);
        // Here you can set the token in your app's state or do other actions
      }
    };

    // Listen for incoming links
    Linking.addEventListener('url', handleOpenURL);
    Linking.addEventListener('url', handleDeepLink);

    // Check if the app was opened by a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({ url });
      }
    });

    // Cleanup
    return () => {
      Linking.removeAllListeners('url')
    };
  }, []);

  const handlePress = () => {
    const url = `url/?token=${encodeURIComponent(token)}&linkingUri=${encodeURIComponent(linkingUri)}&others=`;
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Test App</Text>
      <Button title="Open Payment Gateway" onPress={handlePress} />
    </View>
  );
};

export default ProfileScreen;
