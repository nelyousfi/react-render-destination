import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {RenderTo, RenderDestination} from 'react-render-destination';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const Toast = ({onHide}: {onHide: () => void}) => {
  return (
    <RenderTo destination={'toast'}>
      <Text
        style={{
          color: 'black',
          fontSize: 16,
          flex: 1,
        }}>
        Hello I am a toast 👋 and I am rendered in the root App component from
        HomeScreen
      </Text>
      <Button title={'Hide'} onPress={onHide} />
    </RenderTo>
  );
};

const HomeScreen = () => {
  const [visible, toggleVisibility] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <Button
        title={visible ? 'Hide Toast' : 'Show Toast'}
        onPress={() => toggleVisibility(v => !v)}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      {visible ? <Toast onHide={() => toggleVisibility(false)} /> : null}
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
};

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
    <RenderDestination
      name="toast"
      renderer={container => (
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            top: 36,
            left: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 20,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            padding: 12,
            borderLeftWidth: 4,
            borderLeftColor: 'orange',
            flex: 1,
          }}>
          {container}
        </View>
      )}
    />
  </NavigationContainer>
);

export default App;
