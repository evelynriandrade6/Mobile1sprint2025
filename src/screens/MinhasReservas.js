import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import api from "../axios/axios";

export default function MinhasReservas({ navigation, route }) {
  const { user } = route.params;
  const [reservas, setReservas] = useState({
    Seg: [],
    Ter: [],
    Qua: [],
    Qui: [],
    Sex: [],
    Sab: [],
  });
  const [loading, setLoading] = useState(true);

  async function getReservas() {
    try {
      setLoading(true);
      const response = await api.getSchedulesByUser(user.cpf);
      console.log("Reservas do usuário:", response.data.schedule);
      setReservas(response.data.schedule);
    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.error || "Não foi possível carregar reservas"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getReservas();
  }, []);

  async function excluirReserva(id) {
  try {
    console.log("Excluir reserva ID:", id);
    // Se quiser garantir, checa se id é número e positivo
    if (!id || typeof id !== "number" || id <= 0) {
      Alert.alert("Erro", "ID inválido para exclusão.");
      return;
    }
    await api.deleteSchedule(id);
    Alert.alert("Sucesso", "Reserva excluída com sucesso!");
    await getReservas();
  } catch (error) {
    console.error("Erro ao excluir reserva:", error);
    Alert.alert(
      "Erro",
      error.response?.data?.error ||
        `Erro ao excluir reserva (ID: ${id})`
    );
  }
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Reservas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : Object.values(reservas).every((dia) => dia.length === 0) ? (
        <Text style={styles.empty}>Nenhuma reserva encontrada.</Text>
      ) : (
        Object.entries(reservas).map(
          ([dia, lista]) =>
            lista.length > 0 && (
              <View key={dia}>
                <Text style={styles.diaTitulo}>{dia}</Text>
                <FlatList
                  data={lista}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.reservaItem}>
                      <Text style={styles.sala}>
                        Sala: {item.classroomName}
                      </Text>
                      <Text>
                        Horário: {item.horaInicio} - {item.horaFim}
                      </Text>
                      <TouchableOpacity
                        style={styles.btnExcluir}
                        onPress={() => excluirReserva(item.id)}
                      >
                        <Text style={styles.textBtn}>Excluir</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  contentContainerStyle={{ paddingBottom: 20 }}
                />
              </View>
            )
        )
      )}

      <TouchableOpacity
        style={styles.btnVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textBtn}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  reservaItem: {
    flex: 1,
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  sala: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  btnExcluir: {
    backgroundColor: "#f44336",
    justifyContent: "center",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  textBtn: { color: "white", fontWeight: "bold" },
  empty: { fontStyle: "italic", textAlign: "center", marginTop: 40 },
  btnVoltar: {
    marginTop: "auto",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});
