import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MyLayout({ children }) {
  return (
    <View style={{ flex: 1 }}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Botão clicado!")}>
          <Icon name="person" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo Centralizado */}
      <View style={styles.container}>{children}</View>

      {/* Rodapé */}
      <View style={styles.footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#D52D2D",
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footer: {
    backgroundColor: "#D52D2D",
    width: "100%",
    height: 30,
  },
});