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
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para carregar reservas do usuário via API
  async function getReservas() {
    try {
      setLoading(true);
      const response = await api.getSchedulesByUser(user.cpf); // supondo esse método na api
      setReservas(response.data.reservas || []);
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

  // Função para excluir reserva
  async function excluirReserva(id) {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja excluir esta reserva?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await api.deleteSchedule(id); // supondo método delete na api
              setReservas((prev) => prev.filter((r) => r.id !== id));
            } catch (error) {
              Alert.alert(
                "Erro",
                error.response?.data?.error || "Não foi possível excluir"
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.reservaItem}>
      <View>
        <Text style={styles.sala}>Sala: {item.classroom}</Text>
        <Text>Data: {item.dateStart} até {item.dateEnd}</Text>
        <Text>Horário: {item.timeStart} - {item.timeEnd}</Text>
        <Text>Dias: {item.days.join(", ")}</Text>
      </View>
      <TouchableOpacity
        style={styles.btnExcluir}
        onPress={() => excluirReserva(item.id)}
      >
        <Text style={styles.textBtn}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Reservas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : reservas.length === 0 ? (
        <Text style={styles.empty}>Nenhuma reserva encontrada.</Text>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.textBtn}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  reservaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  sala: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  btnExcluir: {
    backgroundColor: "#f44336",
    justifyContent: "center",
    borderRadius: 6,
    paddingHorizontal: 15,
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
