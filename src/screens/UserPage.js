import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";

export default function UserPage({ route }) {
  const { user } = route.params;
  const { name: initialName = "", email: initialEmail = "", password: initialPassword = "", cpf = "" } = user || {};

  const [userData, setUserData] = useState({
    name: initialName,
    email: initialEmail,
    password: initialPassword,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [confirmCpf, setConfirmCpf] = useState("");

  const senhaMascara = userData.password ? "*".repeat(userData.password.length) : "";

  function handleOpenModal() {
    setEditData(userData);
    setConfirmCpf("");
    setModalVisible(true);
  }

  async function handleSalvarDados() {
    if (confirmCpf !== cpf) {
      Alert.alert("Erro", "CPF de confirmação incorreto.");
      return;
    }

    // Monta só os campos esperados para enviar
    const payload = {
      name: editData.name,
      email: editData.email,
      password: editData.password,
    };

    try {
      const response = await axios.put(`http://10.89.240.67:5000/api/reservas/v1/user/${cpf}`, payload);
      console.log("Resposta do servidor:", response.data);

      setUserData(editData);
      setModalVisible(false);
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    } catch (error) {
      // Mostra erro detalhado no console e no alert
      console.error("Erro ao atualizar:", error.response?.data || error.message);
      Alert.alert(
        "Erro",
        `Não foi possível atualizar os dados: ${error.response?.data?.error || error.message}`
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconHeader}>
        <FontAwesome5 name="user-circle" size={40} color="#333" />
        <Text style={styles.title}>Área do Usuário</Text>
      </View>

      {["name", "email", "password", "cpf"].map((field) => (
        <View key={field} style={styles.infoRow}>
          <Text style={styles.label}>
            {field === "password" ? "Senha:" : field.toUpperCase() + ":"}
          </Text>
          <Text style={styles.value}>
            {field === "password"
              ? senhaMascara
              : field === "cpf"
              ? cpf
              : userData[field]}
          </Text>
        </View>
      ))}

      <TouchableOpacity style={styles.btnEdit} onPress={handleOpenModal}>
        <Text style={styles.textBtn}>Editar Dados</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Dados</Text>

            <Text>Nome:</Text>
            <TextInput
              style={styles.input}
              value={editData.name}
              onChangeText={(text) => setEditData((prev) => ({ ...prev, name: text }))}
              placeholder="Nome"
            />

            <Text>Email:</Text>
            <TextInput
              style={styles.input}
              value={editData.email}
              onChangeText={(text) => setEditData((prev) => ({ ...prev, email: text }))}
              keyboardType="email-address"
              placeholder="Email"
            />

            <Text>Senha:</Text>
            <TextInput
              style={styles.input}
              value={editData.password}
              onChangeText={(text) => setEditData((prev) => ({ ...prev, password: text }))}
              secureTextEntry
              placeholder="Senha"
            />

            <Text>Confirme seu CPF:</Text>
            <TextInput
              style={styles.input}
              value={confirmCpf}
              onChangeText={setConfirmCpf}
              placeholder="Digite seu CPF"
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.btnModal, { backgroundColor: "gray" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textBtn}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btnModal, { backgroundColor: "green" }]}
                onPress={handleSalvarDados}
              >
                <Text style={styles.textBtn}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  iconHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  infoRow: { flexDirection: "row", marginBottom: 15 },
  label: { fontWeight: "bold", width: 80 },
  value: { flex: 1 },
  btnEdit: {
    marginTop: 30,
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  textBtn: { color: "white", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 15,
    borderRadius: 6,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnModal: {
    padding: 12,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },
});
