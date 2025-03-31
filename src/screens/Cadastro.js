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

export default function Cadastro() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
    showPassword: false,
  });
  async function handleCadastro() {
    await api.postCadastro(user).then(
      (response) => {
        console.log(response.data.message);
        Alert.alert(response.data.message);
      },
      (error) => {
        console.log(error);
        Alert.alert(error.response.data.error);
      }
    );
  }

  return (
    // View Principal
    <View style={styles.container}>
      {/* Imagem */}
      <Image source={require("../../assets/SENAI.png")} style={styles.imagem} />
      {/* Título */}
      <Text style={styles.title}> Cadastra-se </Text>

      <Text style={styles.subtitulo}> Nome </Text>
      {/* Input Nome */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="black"
        value={user.name}
        onChangeText={(value) => {
          setUser({ ...user, name: value });
        }}
      />
      <Text style={styles.subtitulo}> CPF </Text>
      {/* Input CPF */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        placeholderTextColor="black"
        value={user.cpf}
        onChangeText={(value) => {
          setUser({ ...user, cpf: value });
        }}
      />
      <Text style={styles.subtitulo}> Email </Text>
      {/* Input Email */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="black"
        value={user.email}
        onChangeText={(value) => {
          setUser({ ...user, email: value });
        }}
      />
      <Text style={styles.subtitulo}> Senha </Text>
      {/* View Input senha */}
      <View style={styles.passwordContainer}>
        {/* Input senha */}
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="black"
          value={user.password}
          secureTextEntry={user.showPassword}
          onChangeText={(value) => {
            setUser({ ...user, password: value });
          }}
        />
        {/* Botão do Ícone */}
        <TouchableOpacity
          onPress={() => setUser({ ...user, showPassword: !user.showPassword })}
        >
          <Ionicons
            name={user.showPassword ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
        {/* Fecha View Input senha */}
      </View>

      {/* Botão Final */}
      <TouchableOpacity onPress={handleCadastro} style={styles.button}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
      <View style={styles.navigate}>
        <Text style={styles.text}> Já possui conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.textnav}> Clique aqui</Text>
        </TouchableOpacity>
      </View>

      {/* Fecha View Principal */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 130,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  imagem: {
    height: 60,
    width: 250,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center"
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
  textnav: {
    color: "#215299",
    marginTop: 6,
  },
  text: {
    marginTop: 10,
  },
  navigate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  subtitulo: {
    alignSelf:"flex-start",
    marginBottom: 4,
    fontSize: 18
  }
});
