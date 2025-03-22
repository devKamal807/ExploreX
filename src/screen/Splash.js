import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default function Splash() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapcontainer}>
        <ImageBackground
          source={require('../assets/Images/map.png')}
          style={styles.mapimg}>
          <View style={styles.logocontainer}>
            <Image source={require('../assets/Images/Logox.png')} />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#235DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logocontainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  mapimg: {
    width: width * 1,
    height: height * 0.4,
  },
});
