import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
  Image
} from "react-native";
import api from "../axios/axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  async function handleLogin() {
    await api.postLogin(user).then(
        (response)=>{
            console.log(response.data.message);
            Alert.alert(response.data.message);
        }, (error)=>{
            console.log(error)
        }
    );
  }
  return (
    <View style={styles.container}> 
        <Image source={require('../../assets/SENAI.png')} style={styles.imagem}/>
      <Text style={styles.title}> Faça Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="black"
        value={user.email}
        onChangeText={(value) => {
          setUser({ ...user, email: value });
        }}
      />
     <View style={styles.passwordContainer}>
      <TextInput 
      style={styles.passwordInput}
        placeholder="Senha"
        placeholderTextColor="black"
        value={user.password}
        secureTextEntry={user.showPassword}
        onChangeText={(value) => {
          setUser({ ...user, password: value });
        }}
      />
      <TouchableOpacity
      onPress={() => setUser({ ...user, showPassword: !user.showPassword })}
      >
      <Ionicons name={user.showPassword?"eye":"eye-off"} size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text>Entrar</Text>
      </TouchableOpacity>
    <View style={styles.navigate}>
    <Text> Não possui conta? </Text>
    <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
    <Text style={styles.textnav}> Clique aqui</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: 'black',
    marginTop: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth:1,
    paddingLeft: 20,
    borderRadius: 100,
    marginBottom: 20,
    
  },
  button: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  navigate: {
    display: 'flex',
    marginTop: 20,
  },
  textnav:{
    color: '#215299',
    marginLeft: 20,
    marginTop: 5
  },
  imagem:{
    height: 60,
    width: 240,
  }
});
