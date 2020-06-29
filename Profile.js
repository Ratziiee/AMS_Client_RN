import React, { Component } from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialUnderlineTextbox from "./components/MaterialUnderlineTextbox";
import MaterialButtonViolet3 from "./components/MaterialButtonViolet3";
import { Button } from 'react-native-paper';

export default class Profile extends Component {
    constructor()
    {
        super();
        this.state={
            id : 0,
            userid:'',
            type:'',
            isLoggedIn:'',
            password:'',
            isChangePasswordCalled : false,
            newPwd : '',
            department : '',
            designation : '',
            emp_id : '',
            mobile : '',
            name : ''


        }
    }

    componentDidMount()
    {
      
        this.getData();
       
    }

   

    changePassword = () => {
        console.log("Change Password")
       this.setState({isChangePasswordCalled : true})
    }

    handleChangeNewPassword = (text) => {
      console.log(text)
      this.setState({newPwd : text})
    }

    btn_changePassword = () => {

      console.log(this.state.userid)
      console.log(this.state.newPwd)
      
      console.log(`https://ams-api.herokuapp.com/updatePassword?username=${this.state.userid}&newPwd=${this.state.newPwd}&type=mobile`)
      axios.post(`https://ams-api.herokuapp.com/updatePassword?username=${this.state.userid}&newPwd=${this.state.newPwd}&type=mobile`).then((data) => {

        console.log(data.data)
        this.setState({isChangePasswordCalled : false})
      }).catch((error) => {

      })
    }

    logout = () => {
      
      let status = this.removeItemValue('user_data');
      console.log("logout",status)

      this.props.navigation.navigate('Login');
      // this.getData();
      // if(status === true)
      // {
      //   this.props.navigation.navigate('Login');
      // }
      
    }

    async removeItemValue(key) {
      try {
          await AsyncStorage.removeItem(key);
          return true;
      }
      catch(exception) {
          return false;
      }
  }

    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('user_data')
          if(value !== null) {
            // value previously stored
            console.log("async ::",value)
            let data= JSON.parse(value)
            
            this.setState({id : data.id,
                userid : data.userid,
                type : data.type,
                password : data.password,
                isLoggedIn : data.isLoggedIn},() => {
                  console.log(`https://ams-api.herokuapp.com/getSingleEmployeesDetails?email=${this.state.userid}`)
                  axios.get(`https://ams-api.herokuapp.com/getSingleEmployeesDetails?email=${this.state.userid}`).then((data) => {
          
                  console.log(data.data.data[0])
                  this.stateState({department : data.data.data[0].department , 
                    designation :  data.data.data[0].designation,
                    emp_id :  data.data.data[0].emp_id,
                    mobile :  data.data.data[0].mobile,
                    name :  data.data.data[0].name})
                  
                }).catch((error) => {
          
                })
            })

            

          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      }
    render() {
        return (
            <View style={styles.container}>
              <Button onPress={this.logout}>Logout</Button>
            <View style={styles.iconRow}>
              <MaterialCommunityIconsIcon
                name="account"
                style={styles.icon}
              ></MaterialCommunityIconsIcon>
              <Text style={styles.rajatUpadhyay}>{this.state.name}</Text>
            </View>
            <View style={styles.icon2Row}>
              <EntypoIcon name="mail" style={styles.icon2}></EntypoIcon>
        <Text style={styles.rajatNhaiOrg}>{this.state.userid}</Text>
            </View>
            <View style={styles.icon3Row}>
              <FontAwesomeIcon name="phone" style={styles.icon3}></FontAwesomeIcon>
            <Text style={styles.loremIpsum}>{this.state.mobile}</Text>
            </View>
            <View style={styles.icon4Row}>
              <FontAwesomeIcon
                name="drivers-license-o"
                style={styles.icon4}
              ></FontAwesomeIcon>
              <Text style={styles.cgm}>{this.state.designation}</Text>
            </View>
            <View style={styles.icon5Row}>
              <FontAwesomeIcon
                name="drivers-license-o"
                style={styles.icon5}
              ></FontAwesomeIcon>
              <Text style={styles.it}>{this.state.department}</Text>
            </View>
            <View style={styles.icon6Row}>
              <MaterialCommunityIconsIcon
                name="clipboard-text-outline"
                style={styles.icon6}
              ></MaterialCommunityIconsIcon>
              <Text style={styles.emp1234}>{this.state.emp_id}</Text>
            </View>
            <Text onPress={this.changePassword} style={styles.changePassword}>Change Password ?</Text>
            {this.state.isChangePasswordCalled && <View>
              <MaterialUnderlineTextbox
              handleChangePassword = {this.handleChangeNewPassword}
                style={styles.materialUnderlineTextbox}
              ></MaterialUnderlineTextbox>
              <MaterialButtonViolet3
              handleChangeClick = {this.btn_changePassword}
                style={styles.materialButtonViolet3}
              ></MaterialButtonViolet3>

              
            </View>}
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    icon: {
      color: "rgba(128,128,128,1)",
      fontSize: 30
    },
    rajatUpadhyay: {
      
      color: "#121212",
      height: 41,
      width: 300,
      fontSize: 25,
      marginLeft: 14,
      marginTop: 2
    },
    iconRow: {
      height: 43,
      flexDirection: "row",
      marginTop: 135,
      marginLeft: 9,
      marginRight: 7
    },
    icon2: {
      color: "rgba(128,128,128,1)",
      fontSize: 22,
      marginTop: 1
    },
    rajatNhaiOrg: {
      
      color: "#121212",
      fontSize: 20,
      width: 285,
      height: 48,
      marginLeft: 18
    },
    icon2Row: {
      height: 48,
      flexDirection: "row",
      marginTop: 14,
      marginLeft: 13,
      marginRight: 22
    },
    icon3: {
      color: "rgba(128,128,128,1)",
      fontSize: 22
    },
    loremIpsum: {
      
      color: "#121212",
      fontSize: 20,
      width: 285,
      height: 48,
      marginLeft: 19
    },
    icon3Row: {
      height: 48,
      flexDirection: "row",
      marginTop: 3,
      marginLeft: 17,
      marginRight: 22
    },
    icon4: {
      color: "rgba(128,128,128,1)",
      fontSize: 22
    },
    cgm: {
      
      color: "#121212",
      fontSize: 20,
      width: 285,
      height: 48,
      marginLeft: 13
    },
    icon4Row: {
      height: 48,
      flexDirection: "row",
      marginTop: 5,
      marginLeft: 15,
      marginRight: 22
    },
    icon5: {
      color: "rgba(128,128,128,1)",
      fontSize: 22
    },
    it: {
      
      color: "#121212",
      fontSize: 20,
      width: 259,
      height: 48,
      marginLeft: 14
    },
    icon5Row: {
      height: 48,
      flexDirection: "row",
      marginTop: 14,
      marginLeft: 14,
      marginRight: 48
    },
    icon6: {
      color: "rgba(128,128,128,1)",
      fontSize: 25
    },
    emp1234: {
      
      color: "#121212",
      fontSize: 20,
      width: 285,
      height: 48,
      marginLeft: 14,
      marginTop: 2
    },
    icon6Row: {
      height: 50,
      flexDirection: "row",
      marginTop: 10,
      marginLeft: 14,
      marginRight: 22
    },
    changePassword: {
      
      color: "rgba(255,0,0,1)",
      width: 123,
      height: 20,
      marginTop: 9,
      marginLeft: 214
    },
    materialUnderlineTextbox: {
      height: 43,
      width: 323,
      marginTop: 28,
      marginLeft: 14
    },
    materialButtonViolet3: {
      height: 36,
      width: 100,
      backgroundColor: "rgba(13,58,146,1)",
      borderWidth: 0,
      borderColor: "#000000",
      borderRadius: 10,
      marginTop: 32,
      marginLeft: 19
    }
  });
