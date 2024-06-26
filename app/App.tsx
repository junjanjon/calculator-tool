import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <>
      <ExpoStatusBar style='auto' />
      <SafeAreaView style={{flex: 1}}>
        <WebView
          source={{ uri: 'https://junjanjon.github.io/calculator-tool/' }}
        />
      </SafeAreaView>
    </>
  );
}
