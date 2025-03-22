import {
  Dimensions, 
  ImageBackground, 
  PixelRatio, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import React, { useRef, useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';

const { width, height } = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

const slides = [
  {
    id: '1',
    title: 'Your Adventure Starts Here',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image: require('../assets/onboardimage/imgone.png'),
  },
  {
    id: '2',
    title: 'Discover New Places',
    text: "Explore breathtaking destinations and unique experiences tailored just for you!",
    image: require('../assets/onboardimage/imgtwo.png'),
  },
  {
    id: '3',
    title: 'Start Your Journey',
    text: "Join our community and make unforgettable memories!",
    image: require('../assets/onboardimage/imgthree.png'),
  },
];

export default function Onboard({ navigation }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      sliderRef.current.goToSlide(currentIndex + 1);
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("Onboarding Finished");
      navigation.navigate("GoogleLoginScreen");
    }
  };

  const handleSkip = () => {
    sliderRef.current.goToSlide(slides.length - 1);
    setCurrentIndex(slides.length - 1);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <ImageBackground source={item.image} style={styles.image}>
            {currentIndex < slides.length - 1 && (
            <View style={styles.skipbtncontainer}>
              <TouchableOpacity onPress={handleSkip}>
                <Text style={styles.skipbtn}>Skip</Text>
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
        <View style={styles.txtcontainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={renderItem}
        onSlideChange={(index) => setCurrentIndex(index)}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        showNextButton={false}
        showDoneButton={false}
      />

      
      
        <TouchableOpacity onPress={handleNext}>
        <View style={styles.btncontainer}>
          <Text style={styles.btn}>{currentIndex === slides.length - 1 ? "Get Started" : "next"}</Text>
          </View>
        </TouchableOpacity>

     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 1,
    height: height * 0.55,
    resizeMode: 'contain',
  },
  title: {
    fontSize: fontSize(32),
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'urbanbold',
    fontWeight: '700',
  },
  txtcontainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  text: {
    fontSize: fontSize(18),
    textAlign: 'center',
    marginTop: height * 0.02,
    color: '#8790A9',
    lineHeight: 25,
    fontFamily: 'urbannormal',
  },
  dotStyle: {
    backgroundColor: '#FFFFFF',
    width: 5,
    height: 5,
    borderRadius: 4,
  },
  activeDotStyle: {
    backgroundColor: '#326BDF',
    width: 25,
    height: 5,
    borderRadius: 4,
  },
  btncontainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#235DFF',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.05,
  },
  btn: {
    color: '#FFFFFF',
    fontSize: fontSize(16),
    fontFamily: 'urbanbold',
    fontWeight: '600',
  },
  skipbtncontainer: {
    width: '15%',
    borderRadius: 10,
    paddingHorizontal: width * 0.01,
    paddingVertical: height * 0.015,
    backgroundColor: '#5E91F8',
    marginLeft: width * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  skipbtn: {
    color: '#FFFFFF',
    fontSize: fontSize(16),
    fontFamily: 'urbanbold',
    fontWeight: '600',
  },
});
