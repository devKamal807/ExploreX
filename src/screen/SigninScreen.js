import {
  Dimensions,
  Image,
  ImageBackground,
  PixelRatio,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

export default function SigninScreen() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (!mail || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        mail,
        password,
      );
      console.log('User signed in:', userCredential.user);
      setModalVisible(true);
    } catch (error) {
      console.error('Sign-in error:', error);
      Alert.alert('Sign-in failed', error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: height * 0.05}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.mapcontainer}>
            <ImageBackground
              source={require('../assets/Images/map.png')}
              style={styles.mapimg}>
              <View style={styles.backcontainer}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <Image
                    source={require('../assets/Images/backarrow.png')}
                    style={styles.backimg}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.txtcontainer}>
                <View style={styles.wlcmcontainer}>
                  <Text style={styles.wlcmtxt}>Welcome</Text>
                  <Image source={require('../assets/Images/hand.png')} />
                </View>
                <Text style={styles.subtxt}>
                  Let’s Get You Started With ExploreX
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.mailcontainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.mailtxtinputcontainer}>
              <Image
                source={require('../assets/Images/mail.png')}
                style={styles.inputicon}
              />
              <TextInput
                style={styles.mailinput}
                value={mail}
                onChangeText={setMail}
                placeholder="Enter Email Address"
                placeholderTextColor="#8F959E"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.mailcontainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.mailtxtinputcontainer}>
              <Image
                source={require('../assets/Images/lock.png')}
                style={styles.inputicon}
              />
              <TextInput
                style={styles.mailinput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                placeholderTextColor="#8F959E"
                secureTextEntry={secureText}
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Image source={require('../assets/Images/passeye.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rememberForgotContainer}>
            <TouchableOpacity
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
              onPress={() => setRememberMe(!rememberMe)}>
              {rememberMe && (
                <Image
                  source={require('../assets/Images/tick.png')}
                  style={styles.checkmark}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.rememberText}>Remember Password</Text>

            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.regcontainer}>
            <Text style={styles.nmtxt}>
              Don't have an account?
              <TouchableOpacity
                style={styles.regtxtcontainer}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.regtxt}>Register Now</Text>
              </TouchableOpacity>
            </Text>
          </View>

          
            <TouchableOpacity onPress={handleSignIn}>
            <View style={styles.pwdbtncontainer}>
              <Text style={styles.pwdbtn}>Sign in</Text>
              </View>
            </TouchableOpacity>
          
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  mapcontainer: {
    width: '100%',
    height: height * 0.3,
    backgroundColor: '#235DFF',
  },
  mapimg: {
    width: width,
    height: height * 0.29,
  },
  backcontainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.05,
  },
  backimg: {
    height: height * 0.02,
    width: width * 0.07,
  },
  txtcontainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.12,
  },
  wlcmcontainer: {
    flexDirection: 'row',
    gap: 10,
  },
  wlcmtxt: {
    fontSize: fontSize(30),
    fontFamily: 'urbanbold',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  subtxt: {
    color: '#D1D1D1',
    fontSize: fontSize(16),
    fontFamily: 'urbannormal',
    fontWeight: '500',
  },
  mailcontainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  label: {
    color: '#FFFFFF',
    fontSize: fontSize(24),
    fontFamily: 'urbanbold',
    fontWeight: '600',
  },
  mailtxtinputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F222A',
    borderRadius: 15,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.01,
    borderWidth: 1,
    borderColor: '#CDCDCD17',
    marginTop: height * 0.01,
  },
  inputicon: {
    width: width * 0.042,
    height: height * 0.02,
  },
  mailinput: {
    flex: 1,
    marginLeft: width * 0.02,
    fontSize: fontSize(16),
    fontFamily: 'urbannormal',
    color: '#FFFFFF',
  },

  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.03,
  },
  checkbox: {
    width: width * 0.05,
    height: height * 0.025,
    borderWidth: 1,
    borderColor: '#CDCDCD17',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkmark: {
    color: '#34C358',
    height: height * 0.01,
  },
  rememberText: {
    color: '#8790A9',
    fontSize: fontSize(14),
    marginRight: width * 0.15,
    fontFamily: 'urbannormal',
  },
  forgotPasswordText: {
    color: '#235DFF',
    fontSize: fontSize(14),
    fontFamily: 'urbannormal',
  },
  line: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#323232',
    marginTop: height * 0.03,
  },
  regcontainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  nmtxt: {
    color: '#8790A9',
    fontSize: fontSize(14),
    fontFamily: 'urbannormal',
  },
  regtxt: {
    fontSize: fontSize(14),
    fontFamily: 'urbannormal',
    color: '#235DFF',
  },
  regtxtcontainer: {
    marginTop: height * 0.009,
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
