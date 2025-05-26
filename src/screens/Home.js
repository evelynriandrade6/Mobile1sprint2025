import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Home({ navigation, route }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/SENAI.png")} style={styles.imagem} />
      <Text style={styles.title}>Bem-vindo {user.name} à Agenda!</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.linha}
          onPress={() => navigation.navigate("ClassroomScreen", { user })}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Ionicons
            name="calendar"
            size={30}
            color="black"
            style={styles.icone}
          />
          <Text style={styles.texto}>Reserva de salas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linha}
          onPress={() => navigation.navigate("UserPage", { user })}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <FontAwesome5
            name="user-circle"
            size={30}
            color="black"
            style={styles.icone}
          />
          <Text style={styles.texto}>Área do usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linha}
          onPress={() => navigation.navigate("MinhasReservas", { user })}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <FontAwesome
            name="list-alt"
            size={30}
            color="black"
            style={styles.icone}
          />
          <Text style={styles.texto}>Minhas Reservas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  imagem: {
    height: 60,
    width: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  menuContainer: {
    marginTop: 20,
    width: "80%",
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 30, // para espaçamento entre botões
  },
  icone: {
    marginRight: 15,
  },
  texto: {
    fontSize: 18,
  },
});
