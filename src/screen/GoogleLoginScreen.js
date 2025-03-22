import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  PixelRatio,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

export default function GoogleLoginScreen() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '301154506915-vb2u094d6c98emef0kp10peprqtrsf2h.apps.googleusercontent.com',
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      await GoogleSignin.signOut();
      const idToken = await GoogleSignin.signIn();
      console.log('Google Sign-In Success, idToken:', idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken.data.idToken,
      );
      await auth().signInWithCredential(googleCredential);
      console.log('User signed in with Google!');
      setModalVisible(true);
    } catch (err) {
      console.log('sign in failed', err);
      if (err.code) {
        console.log('Error code:', err.code);
      }
      if (err.message) {
        console.log('Error message:', err.message);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logocontainer}>
        <Image source={require('../assets/Images/bluelogo.png')} />
      </View>
      <View style={styles.txtcontainer}>
        <Text style={styles.txt}>Let’s Get You Started With ExploreX</Text>
      </View>

      <View style={styles.logbtncontainer}>
        <TouchableOpacity style={styles.google} onPress={signInWithGoogle}>
          <Image
            source={require('../assets/Images/google.png')}
            style={styles.icon}
          />
          <Text style={styles.lgnTxtDark}>Sign In Using Google Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebook}>
          <Image
            source={require('../assets/Images/facebook.png')}
            style={styles.icon}
          />
          <Text style={styles.lgnTxtDark}>Sign In Using Facebook Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.apple}>
          <Image
            source={require('../assets/Images/apple.png')}
            style={styles.icon}
          />
          <Text style={styles.lgnTxtDark}>Sign In Using Apple Account</Text>
        </TouchableOpacity>
      </View>

      
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SigninScreen');
          }} style={styles.pwdbtncontainer}>
           
          <Text style={styles.pwdbtn}>Sign in Using Password</Text>
        
        </TouchableOpacity>
      

      <View style={styles.registercontainer}>
        <Text style={styles.lnktxt}>
          New To ExploreX?
          <TouchableOpacity style={styles.tlnk}>
            <Text style={styles.lnk}>Register Now</Text>
          </TouchableOpacity>
        </Text>
      </View>

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalcontainer}>
            <View style={styles.modallogocontainer}>
              <Image
                source={require('../assets/Images/modallogo.png')}
                style={styles.img}
              />
            </View>
            <View style={styles.sucesstxtcontainer}>
              <Text style={styles.sucesstxt}>Sign In Successfull</Text>
            </View>
            <View style={styles.msgtxtcontainer}>
              <Text style={styles.msgtxt}>Please wait..</Text>
              <Text style={styles.msgtxt}>
                You will be directed to the homepage soon
              </Text>
            </View>
            <View style={styles.indcontainer}>
              <ActivityIndicator size="large" color="#235DFF" />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  logocontainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  txtcontainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  txt: {
    color: '#FFFFFF',
    fontFamily: 'urbannormal',
    fontWeight: '500',
    fontSize: fontSize(18),
  },
  logbtncontainer: {
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.03,
  },
  facebook: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.85,
    height: height * 0.07,
    backgroundColor: '#1F222A',
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: height * 0.01,
    borderWidth: 1,
    borderColor: '#DADADA17',
  },
  apple: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.85,
    height: height * 0.07,
    backgroundColor: '#1F222A',
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: height * 0.01,
    borderWidth: 1,
    borderColor: '#DADADA17',
  },
  google: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.85,
    height: height * 0.07,
    backgroundColor: '#1F222A',
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: height * 0.01,
    borderWidth: 1,
    borderColor: '#DADADA17',
  },
  icon: {
    width: width * 0.09,
    height: width * 0.09,
    resizeMode: 'contain',
    marginRight: width * 0.05,
  },
  lgnTxtDark: {
    fontFamily: 'urbanbold',
    fontWeight: '500',
    fontSize: fontSize(16),
    color: '#8790A9',
  },
  pwdbtn: {
    color: '#FFFFFF',
    fontSize: fontSize(16),
    fontFamily: 'urbanbold',
    fontWeight: '600',
  },
  pwdbtncontainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
    borderRadius: 10,
    width: width * 0.85,
    height: height * 0.06,
    backgroundColor: '#235DFF',
    justifyContent: 'center',
  },
  registercontainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  lnk: {
    color: '#235DFF',
    fontSize: fontSize(14),
    fontFamily: 'urbanbold',
    textDecorationLine: 'underline',
    textDecorationColor: '#235DFF',
  },
  lnktxt: {
    color: '#8790A9',
    fontSize: fontSize(14),
    fontFamily: 'urbanbold',
  },
  tlnk: {
    marginTop: height * 0.008,
    marginLeft: width * 0.004,
  },
  modalcontainer: {
    // flex:1,
    // justifyContent:'center',
    // alignItems:'center',
    width: '85%',
    alignSelf: 'center',
    height: '50%',
    backgroundColor: '#181A20',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 60,
    marginTop: height * 0.2,
  },
  modallogocontainer: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  img: {
    width: width * 0.4,
    height: height * 0.193,
  },
  sucesstxt: {
    fontSize: fontSize(24),
    color: '#326BDF',
    fontFamily: 'urbanbold',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 35,
  },
  sucesstxtcontainer: {
    width: '40%',
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  msgtxt: {
    textAlign: 'center',
    color: '#8790A9',
    fontSize: fontSize(14),
    fontFamily: 'urbannormal',
  },
  msgtxtcontainer: {
    marginTop: height * 0.03,
  },
  indcontainer: {
    marginTop: height * 0.02,
  },
});
