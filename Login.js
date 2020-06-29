import React, { Component } from 'react'
import { Alert,Text, View , StyleSheet, Image,StatusBar } from 'react-native'
import { TextInput , Button} from 'react-native-paper';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage';
import MaterialStackedLabelTextbox3 from "./components/MaterialStackedLabelTextbox3";
import MaterialStackedLabelTextbox4 from "./components/MaterialStackedLabelTextbox4";
import MaterialButtonViolet2 from "./components/MaterialButtonViolet2";


export default class Login extends Component {
    constructor()
    {
        super();
        this.state={
            username: 'admin@nhai.org',
            password:'nhai@1234'
        }
    }

    componentDidMount()
    {
        this.getData();
    }

    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('user_data')
          if(value !== null) {
            // value previously stored
            console.log("QRCode Login... ")
            let data = JSON.parse(value)
            console.log(data.isLoggedIn);

            if(data.isLoggedIn === true)
            {
                this.goToPage();
            }

          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      }

    handleChangeUsername = (text) => {
        console.log(text)
        this.setState({username : text})
    }

    handleChangePassword = (text) => {
        console.log(text)
        this.setState({password : text})
    }

    handleClickAuthenticate = () => {

        axios.get(`https://ams-api.herokuapp.com/login?userid=${this.state.username}&password=${this.state.password}&type=mobile`).
        then((result) => {
            
            

            if(result.data.statusCode === 200)
            {
                console.log(result.data.message)
                let obj = {};
                obj.id = result.data.data[0].id;
                obj.userid = result.data.data[0].userid;
                obj.password = result.data.data[0].password;
                obj.type = result.data.data[0].type;
                obj.isLoggedIn = true

                this.storeData(obj);
                
                this.goToPage();

                     
            }
            else if(result.data.statusCode === 404)
            {
                console.log(result.data.message)
                Alert.alert(
                    result.data.message
                 )
                
            }
            else
            {
                console.log("Fail")
            }
        //     console.log(result.data.data[0])
        //    console.log(result.data.message)
        //    console.log(result.data.statusCode)
        }).catch((error) => {

        });
        // Alert.alert(
        //     'You need to...'
        //  )
    }
    
    goToPage = () => {
        this.props.navigation.navigate('QrPage');
    }

     storeData = async (value) => {
        try {

          const jsonValue = JSON.stringify(value)
          console.log(jsonValue)
          await AsyncStorage.setItem('user_data', jsonValue)
        } catch (e) {
          // saving error
          console.log(e)
        }
      }

      handleChangeForgotPassword = () => {
        console.log("Forgot Password")
      }

    
    render() {
        return (

            
      <KeyboardAwareScrollView>
             <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("./assets/nhai_logo.jpg")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={styles.heading}>Attendance Management {"\n"}System</Text>
      <MaterialStackedLabelTextbox3
        username = {this.handleChangeUsername}
        style={styles.username}
      ></MaterialStackedLabelTextbox3>
      <MaterialStackedLabelTextbox4
        password = {this.handleChangePassword}
        style={styles.password}
      ></MaterialStackedLabelTextbox4>
      <Text onPress= {this.handleChangeForgotPassword} style={styles.forgotPassword}>Forgot Password ?</Text>
      <MaterialButtonViolet2 btn_login = {this.handleClickAuthenticate} style={styles.button}></MaterialButtonViolet2>
    </View>
  </KeyboardAwareScrollView>
  
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 110,
    height: 66,
    marginTop: 51,
    marginLeft: 119
  },
  heading: {
    
    color: "#121212",
    textAlign: "center",
    fontSize: 20,
    width: 242,
    height: 61,
    marginTop: 11,
    marginLeft: 63
  },
  username: {
    height: 90,
    width: 340,
    marginTop: 3,
    marginLeft: 19
  },
  password: {
    height: 90,
    width: 340,
    marginTop: 14,
    marginLeft: 19
  },
  forgotPassword: {
    
    color: "rgba(13,58,146,1)",
    width: 175,
    height: 20,
    textAlign: "right",
    marginTop: 33,
    marginLeft: 184
  },
  button: {
    height: 46,
    width: 104,
    backgroundColor: "rgba(13,58,146,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 10,
    marginTop: 58,
    marginLeft: 137
  }
});
  

   // <View>
            // <TextInput
            //     label="Username"
            //     value={this.state.username}
            //     onChangeText={this.handleChangeUsername}
            // />

            // <TextInput
            //     label="Password"
            //     value={this.state.password}
            //     onChangeText={this.handleChangePassword}
            //     secureTextEntry={true}
            // />

            // <Button icon="account" mode="contained" onPress={this.handleClickAuthenticate}>
            //     AUTHENTICATE
            // </Button>
            // </View>