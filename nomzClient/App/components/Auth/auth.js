"use strict";
 
var React = require("react-native");
var api = require('../utils/api');
var Button = require('../react-native-button');
var Home = require('../home-screen');
var Colors = require('../colors')

var {
    Component,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    AsyncStorage,
    Image
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');
  
class LoginView extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoading: false,
            error: false
        };
    }

 
   onSubmitPressed() {
        this.setState({
            isLoading: true
        })
        // Make api post request and login user
        let userId;
        api.login({
            email: this.state.email.trim().toLowerCase(),
            password: this.state.password.trim()
        }).then( (res) => {
            userId = res.user._id
            // If successful response from login, store userId in AsyncStorage
            return AsyncStorage.setItem('userId', res.user._id)
        }).then( (res) => {
            // navigate to homepage once userId is stored
            this.props.navigator.replace({
                component: Home,
                passProps: { userId: userId }
            })
        }).catch( (err) => {
            console.log(err)
            this.setState({
                error: err.message
            })

        }).done()
    }


    render() {
        var showErr = (
          this.state.error ? <Text style={styles.error}> {this.state.error} </Text> : <View></View>
        );

        var userIcon = (<Icon name="user" size={20} style={styles.icon} />)
        var passIcon = (<Icon name="lock" size={20} style={styles.icon} />)
        return (
            <View style={styles.container}>
                <Image source={{ uri: "nomz" , isStatic: true }} style={styles.bgImg} />
                <View style={styles.form}>
                    <View style={styles.input}>
                        <View style={styles.inputHolder}>
                            {userIcon}
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor='white'
                                onChange={(event) => this.setState({email: event.nativeEvent.text})}
                                style={styles.formInput}
                                value={this.state.email} />
                        </View>
                        <View style={styles.inputHolder}>
                            {passIcon}
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor='white'
                                secureTextEntry={true}
                                onChange={(event) => this.setState({password: event.nativeEvent.text})}
                                style={styles.formInput}
                                value={this.state.password} />
                        </View>
                    </View>
                    { showErr }
                    <Button
                        style={styles.btn}
                        onPress={this.onSubmitPressed.bind(this)} >
                        {"Login"}
                    </Button>
                    <View style={styles.subTextContainer}>
                        <Text style={styles.subText}> Not a member? <Text style={styles.link}>Sign Up!</Text> </Text>
                    </View>
                </View>
            </View>
        );
    }
 
 
};
 
var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        flex: 1,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        backgroundColor: 'transparant',
        color: 'white'
    },
    form: {
        backgroundColor: 'transparant',
        marginTop: 300

    },
    inputHolder: {
        flex: 1,
        flexDirection: 'row'
    },
    formInput: {
        height: 36,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        flex: 1,
        fontSize: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
    },
    icon: {
        color: 'white',
        height: 36,
        paddingLeft: 10,
        paddingTop: 7,
        marginTop: 5,
        backgroundColor: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    btn: {
      flexDirection: 'row',
      width: 310,
      fontSize: 20,
      color: 'white',
      padding: 10,
      marginBottom: 10,
      marginTop: 20,
      borderColor: '#df6260',
      backgroundColor: Colors.red
    },
    button: {
        height: 36,
        flex: 1,
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
    bgImg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.9
    },
        subTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
        subText: {
        color: 'white',
    },
        link: {
        color: Colors.pink
    },
        error: {
        color: 'red'
    }
});

module.exports = LoginView;