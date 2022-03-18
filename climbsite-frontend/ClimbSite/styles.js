import { StyleSheet } from "react-native";

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

  inputLogin: {
    padding: 20,
    margin: 30,
    backgroundColor: "#2F3F4A",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 75,
  },
  inputRegister: {
    padding: 20,
    margin: 30,
    backgroundColor: "#2F3F4A",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 10,
    margin: 10,
    width: 275,
  },
  headerinput: {
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
  signupHeader: {
    alignSelf: "center",
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
  },
});
