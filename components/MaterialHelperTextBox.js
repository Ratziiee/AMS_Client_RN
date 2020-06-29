import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function MaterialHelperTextBox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.userId}>User - ID</Text>
      <TextInput placeholder="Input" style={styles.inputStyle}></TextInput>
      <Text style={styles.helper}>Please Enter your User id here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent"
  },
  userId: {
    fontSize: 12,
    textAlign: "left",
    color: "#000",
    opacity: 0.6,
    paddingTop: 16
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    color: "#000",
    fontSize: 16,
    alignSelf: "stretch",
    lineHeight: 16,
    paddingTop: 8,
    flex: 1,
    paddingBottom: 8,
    width: 0
  },
  helper: {
    fontSize: 12,
    textAlign: "left",
    color: "#000",
    opacity: 0.6,
    paddingTop: 8
  }
});

export default MaterialHelperTextBox;
