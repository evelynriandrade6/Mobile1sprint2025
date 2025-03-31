import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/SENAI.png")} style={styles.imagem} />
      <Text style={styles.title}> Bem-vindos a Agenda!</Text>

      <View style={styles.linha}>
        <TouchableOpacity>
          <Ionicons
            style={styles.icone}
            name="calendar"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.texto}>Reserva de salas</Text>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity>
          <FontAwesome5
            style={styles.icone}
            name="user-circle"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.texto}> Área do usuário</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 9,
  },
  imagem: {
    height: 60,
    width: 300,
  },
  linha: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icone: {
    marginRight: 10,
    fontSize: 40,
    marginBottom: 150,
  },
  texto: {
    fontSize: 20,
    marginBottom: 150,
  },
});
