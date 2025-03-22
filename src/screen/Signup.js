import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  PixelRatio,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

export default function Signup() {
  const navigation = useNavigation();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const registerUser = async () => {
    try {
      await auth().createUserWithEmailAndPassword(mail, password);
      console.log('✅ User account created');
      Alert.alert('Success', 'Your account has been created!');
      navigation.navigate('SigninScreen');
    } catch (error) {
      console.error(' Registration Error:', error);

      let errorMessage = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already in use!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters!';
      }

      Alert.alert('Registration Error', errorMessage);
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
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

          
            <TouchableOpacity onPress={() => registerUser(mail, password)} style={styles.pwdbtncontainer}>
            
              <Text style={styles.pwdbtn}>Create</Text>
          
            </TouchableOpacity>
          
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
  pwdbtn: {
    color: '#FFFFFF',
    fontSize: fontSize(16),
    fontFamily: 'urbanbold',
    fontWeight: '600',
  },
  pwdbtncontainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.2,
    borderRadius: 10,
    width: width * 0.85,
    height: height * 0.06,
    backgroundColor: '#235DFF',
    justifyContent: 'center',
  },
});
