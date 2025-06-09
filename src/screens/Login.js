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
import * as SecureStorage from 'expo-secure-store';

export default function Login() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    cpf: "",
    password: "",
    showPassword: false,
  });


  async function handleLogin() {
    try {
      const response = await api.postLogin({
        cpf: form.cpf,
        password: form.password,
      });
      
      const usuarioLogado = response.data.user;
      const token = response.data.token; // ou como o back envia

      console.log("Usuario Logado: ", usuarioLogado);
      console.log("Token: ", response.data.token);


      await SecureStorage.setItemAsync("token", token);
      await SecureStorage.setItemAsync("CPF", usuarioLogado.cpf);

      Alert.alert(response.data.message);
      navigation.navigate("Home", { user: usuarioLogado });
    } catch (error) {
      console.log(error.response?.data?.error || error.message);
      Alert.alert("Erro", error.response?.data?.error || "Erro ao logar.");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/SENAI.png")} style={styles.imagem} />
      <Text style={styles.title}>Faça Login</Text>

      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="black"
        value={form.cpf}
        onChangeText={(value) => setForm({ ...form, cpf: value })}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="black"
          value={form.password}
          secureTextEntry={!form.showPassword}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <TouchableOpacity
          onPress={() => setForm({ ...form, showPassword: !form.showPassword })}
        >
          <Ionicons
            name={form.showPassword ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.navigate}>
        <Text>Não possui conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.textnav}>Clique aqui</Text>
        </TouchableOpacity>
      </View>
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
  title: { fontSize: 28, fontWeight: "bold", color: "black", marginTop: 20 },
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
  navigate: { marginTop: 20, flexDirection: "row" },
  textnav: { color: "#215299", marginLeft: 5 },
  imagem: { height: 60, width: 240 },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 130,
    marginBottom: 20,
    justifyContent: "space-between",
  },
});
