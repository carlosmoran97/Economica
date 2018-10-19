import React from 'react';
import t from 'tcomb-form-native';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
const Form = t.form.Form;

const FactorConversion = t.enums({
  AP: "(A/P,i,n)",
  AF: "(A/F,i,n)",
  AG: "(A/G,i,n)",
  PA: "(P/A,i,n)",
  PF: "(P/F,i,n)",
  FA: "(F/A,i,n)",
  FP: "(F/P,i,n)"
});

const Factor = t.struct({
  factor: FactorConversion,
  i: t.Number,
  n: t.Number
});

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      result: 0,
      value: {}
    };
    this.onPress = this.onPress.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.ecoContainer}>

            <Text style={styles.getStartedText}>
              Ingenieria Economica - IEC115
            </Text>
            <Form
              type={Factor}
              onChange={this.onChange}
              ref={c => this._form = c}
            />
            <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableHighlight>
            <Text>Resultado: {this.state.result}</Text>
          </View>

          <View>

          </View>
        </ScrollView>


      </View>
    );
  }
  onPress(){
    const value = this._form.getValue(); // use that ref to get the form value
    const {i,n} = value;
    let result = 0;
    switch(value.factor){

      case "AP":
        result = (i * Math.pow(1 + i, n))/(Math.pow(1 + i, n)-1);
        this.setState({
          result: result.toFixed(5)
        });
        break;
      case "AF":
          result = (i)/(Math.pow(1 + i, n)-1);
          this.setState({
            result: result.toFixed(5)
          });
        break;
      case "AG":
          result = (1/i)-(n/(Math.pow(1 + i, n)-1));
          this.setState({
            result: result.toFixed(5)
          });
        break;
      case "PA":
          result = (Math.pow(1 + i, n) - 1)/(i * Math.pow(1 + i, n));
          this.setState({
            result: result.toFixed(5)
          });
        break;
      case "PF":
          result = (1/(Math.pow(1 + i, n)));
          this.setState({
            result: result.toFixed(5)
          });
        break;
      case "FA":
          result = (Math.pow(1 + i, n)-1)/(i);
          this.setState({
            result: result.toFixed(5)
          });
        break;
      case "FP":
          result = Math.pow(1 + i, n);
          this.setState({
            result: result.toFixed(5)
          });
        break;
    }
  }
  onChange(){

  }
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ecoContainer: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
