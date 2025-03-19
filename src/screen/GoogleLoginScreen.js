import {
  Dimensions,
  Image,
  PixelRatio,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

export default function GoogleLoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logocontainer}>
        <Image source={require('../assets/Images/bluelogo.png')} />
      </View>
      <View style={styles.txtcontainer}>
        <Text style={styles.txt}>Let’s Get You Started With ExploreX</Text>
      </View>

      <View style={styles.logbtncontainer}>

      <TouchableOpacity style={styles.google}>
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

      <View style={styles.pwdbtncontainer}>
        <TouchableOpacity>
          <Text style={styles.pwdbtn}>Sign in Using Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registercontainer}>
        <Text style={styles.lnktxt}>New To ExploreX?<TouchableOpacity style={styles.tlnk}><Text style={styles.lnk}>Register Now</Text></TouchableOpacity></Text>
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
    borderWidth:1,
    borderColor:'#DADADA17',
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
    borderWidth:1,
    borderColor:'#DADADA17',
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
    borderWidth:1,
    borderColor:'#DADADA17'
   
  },
  icon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: 'contain',
    marginRight: width * 0.03,
  },
  lgnTxtDark:{
    fontFamily: 'urbannormal',
    fontWeight: '500',
    fontSize: fontSize(16),
    color:'#8790A9',
  },
  pwdbtn:{
    color: '#FFFFFF',
    fontSize: fontSize(16),
    fontFamily: 'urbanbold',
    fontWeight: '600',

  },
  pwdbtncontainer:{
    
    alignSelf:'center',
    alignItems:'center',
    marginTop: height * 0.05,
    borderRadius: 10,
    width: width * 0.85,
    height: height * 0.06,
    backgroundColor: '#235DFF',
    justifyContent:'center',
  },
  registercontainer:{
    width:'90%',
    alignSelf:'center',
    alignItems:'center',
    marginTop: height * 0.02,
  },
  lnk:{
    color:'#235DFF',
    fontSize: fontSize(14),
    fontFamily: 'urbanbold',
    textDecorationLine:'underline',
    textDecorationColor:'#235DFF',
  },
  lnktxt:{
    color:'#8790A9',
    fontSize: fontSize(14),
    fontFamily: 'urbanbold',
  },
  tlnk:{
    marginTop: height * 0.008,
    marginLeft:width * 0.004,
  },
});
