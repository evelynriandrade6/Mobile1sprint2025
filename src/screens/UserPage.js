import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';

export default function UserPage() {
  const route = useRoute();
  const { name, email, Password } = route.params;

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="black" style={styles.iconePerfil} />

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{name}</Text>
          <Octicons name="pencil" size={24} color="black" />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
          <Octicons name="pencil" size={24} color="black" />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Senha:</Text>
          <Text style={styles.value}>{Password}</Text>
          <Octicons name="pencil" size={24} color="black" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  iconePerfil: {
    alignSelf: "center",
    marginBottom: 30,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 18,
    color: "#555",
  },
  value: {
    flex: 2,
    fontSize: 18,
    color: "#333",
  },
});
