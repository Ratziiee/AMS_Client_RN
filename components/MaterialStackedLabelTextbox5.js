import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function MaterialStackedLabelTextbox5(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text  style={styles.checkInDetail}>Check-In Detail</Text>
      <TextInput value = "09:43" placeholder="Check In Date" style={styles.inputStyle}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent"
  },
  checkInDetail: {
    fontSize: 12,
    textAlign: "left",
    color: "#000",
    opacity: 0.6,
    paddingTop: 16
  },
  inputStyle: {
    color: "#000",
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 8,
    paddingBottom: 8
  }
});

export default MaterialStackedLabelTextbox5;
