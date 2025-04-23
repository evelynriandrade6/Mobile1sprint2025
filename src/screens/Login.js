import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import api from "../axios/axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    cpf: "",
    password: "",
    showPassword: false,
  });

  async function handleLogin() {
    await api.postLogin(user).then(
      (response) => {
        console.log(response);
        Alert.alert(response.data.message);
        navigation.navigate("Home");
      },
      (error) => {
        console.log(error.response.data.error);
        Alert.alert(error.response.data.error);
      }
    );
  }
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/SENAI.png")} style={styles.imagem} />
      <Text style={styles.title}> Faça Login</Text>
      {/* Input CPF */}
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="black"
        value={user.cpf}
        onChangeText={(value) => {
          setUser({ ...user, cpf: value });
        }}
      />
      {/* View Input senha */}
      <View style={styles.passwordContainer}>
        {/* Input senha */}
        <TextInput
          placeholder="Senha"
          placeholderTextColor="black"
          value={user.password}
          secureTextEntry={!user.showPassword}
          onChangeText={(value) => {
            setUser({ ...user, password: value });
          }}
        />
        <TouchableOpacity
          onPress={() => setUser({ ...user, showPassword: !user.showPassword })}
        >
          {/* Botão do Ícone */}
          <Ionicons
            name={user.showPassword ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
        {/* Fecha View Input senha */}
      </View>

      {/* Botão Final */}
      <TouchableOpacity onPress={()=>navigation.navigate("ClassroomScreen")} style={styles.button}>
        <Text>Entrar</Text>
      </TouchableOpacity>
      <View style={styles.navigate}>
        <Text> Não possui conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.textnav}> Clique aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  {/* Estilização do login */}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 130,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  navigate: {
    display: "flex",
    marginTop: 20,
  },
  textnav: {
    color: "#215299",
    marginLeft: 25,
    marginTop: 5,
  },
  imagem: {
    height: 60,
    width: 240,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingRight: 10,
    width: "100%",
    height: 50,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 130,
    marginBottom: 20,
    justifyContent: "space-between",
  },
});
