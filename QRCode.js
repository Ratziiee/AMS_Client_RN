import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import QR from 'react-native-qrcode-svg';
import axios from 'axios';

import QRC from 'react-native-qrcode-generator';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput , Button} from 'react-native-paper';
import MaterialButtonShare from "./components/MaterialButtonShare";
import MaterialStackedLabelTextbox5 from "./components/MaterialStackedLabelTextbox5";
import MaterialStackedLabelTextbox6 from "./components/MaterialStackedLabelTextbox6";

export default class QRCode extends Component {

    constructor()
    {
        super();
        this.state={
            userId:'admin@nhai.org',
            QRCodeData : '',
            CheckInTime : '9.59',
            CheckOutTime : '7.10',
            currentDate : '00/00/0000'
        }
    }

    componentDidMount()
    {
        this.getData();
        axios.get(`https://ams-api.herokuapp.com/getQrCodeDetails?userid=${this.state.userId}`).then((data) =>{
        console.log(data.data.data[0])

        let QRDATA = JSON.stringify(data.data.data[0])
        this.setState({QRCodeData : QRDATA,currentDate : this.formatDate(new Date())})
        }).catch((error) => {
          console.log(error)
        })
        
    }
     formatDate(date) {
      console.log("format date :",date);
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  // console.log("day",day)
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
          console.log([day, month, year].join('/'))
      return [day, month, year].join('/');
  }

    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('user_data')
          if(value !== null) {
            // value previously stored
            console.log("QRCode")
            console.log(value);

          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      }
      
      handleClickProfile = () => {
        console.log("Profile Calledd")
       this.goToPage();
      }
      goToPage = () => {
          
        this.props.navigation.navigate('Profile');
    }

    render() {
        return (

          <View style={styles.container}>
          <View style={styles.rect}>
          <QRC
          value={this.state.QRCodeData}
          size={330}
          bgColor='black'
          fgColor='white'/>
          </View>
          <View style={styles.currentDateRow}>
        <Text style={styles.currentDate}>{this.state.currentDate}</Text>
            <MaterialButtonShare
            handleChangeProfile={this.handleClickProfile}
              iconName="share-variant"
              style={styles.materialButtonShare}
            ></MaterialButtonShare>
          </View>
          <MaterialStackedLabelTextbox5
            style={styles.materialStackedLabelTextbox5}
          ></MaterialStackedLabelTextbox5>
          <MaterialStackedLabelTextbox6
            style={styles.materialStackedLabelTextbox6}
          ></MaterialStackedLabelTextbox6>
        </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    width: 331,
    height: 343,
    marginTop: 125,
    marginLeft: 43
  },
  currentDate: {
    color: "#121212",
    height: 30,
    width: 216,
    marginTop: 15
  },
  materialButtonShare: {
    height: 32,
    width: 32,
    marginLeft: 83
  },
  currentDateRow: {
    height: 45,
    flexDirection: "row",
    marginTop: -430,
    marginLeft: 60,
    marginRight: 16
  },
  materialStackedLabelTextbox5: {
    height: 65,
    width: 346,
    marginTop: 385,
    marginLeft: 15
  },
  materialStackedLabelTextbox6: {
    height: 65,
    width: 346,
    marginTop: 26,
    marginLeft: 15
  }
});


 //       <View>
      //           <Text>ksjdhflkjsd</Text>
      //           <Text>ksjdhflkjsd</Text>
      //           <Text>ksjdhflkjsd</Text>
       
      //   <QRC
      //     value={this.state.QRCodeData}
      //     size={400}
      //     bgColor='black'
      //     fgColor='white'/>

      //   <Button icon="account" mode="contained" onPress={this.handleClickProfile}>
      //                   Go To Profile
      //   </Button>
      // </View>
            // <QR
            //   value="http://awesome.link.qr"
            // />