import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";

// let ScreenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  container: {
    backgroundColor: "#122222",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  inputlogin: {
    padding: 20,
    margin: 30,
    backgroundColor: "#2F3F4A",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 10,
    margin: 10,
    width: 275,
  },
  headerlogin: {
    alignSelf: "center",
    marginBottom: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
  inputtext: {
    fontSize: 17,
  },
  climbsite: {
    alignSelf: "center",
    marginTop: 140,
    fontSize: 35,
    fontWeight: "bold",
  },
});
