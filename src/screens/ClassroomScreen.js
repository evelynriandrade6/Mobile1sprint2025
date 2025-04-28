import { useEffect, useState } from "react";
import api from "../axios/axios";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function ClassroomScreen({ navigation }) {
  const [classroom, setClassroom] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ClassroomSelecionado, setClassroomSelecionado] = useState("");
  

  useEffect(() => {
    getAllClassrooms();
  }, []);

  async function getAllClassrooms() {
    try {
      const response = await api.getAllClassrooms();
      console.log(response.data);
      setClassroom(response.data.classrooms);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  async function abrirModalComTeladeReserva(classroom) {
    setClassroomSelecionado(classroom);
    setModalVisible(true);
    try {
      const response = await api.createSchedule(classroom.number);
      setSchedule(response.data.schedule);
    } catch (error) {
      console.log("Erro ao entrar na sala", error.response);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salas Disponiveis</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={classroom}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.classroomCard}
              onPress={() => abrirModalComTeladeReserva(item)}
            >
              <Text>{item.number}</Text>
              <Text>{item.description}</Text>
              <Text>{item.capacity}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text>Efetuar reserva para :{ClassroomSelecionado.number}</Text>
          

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "white" }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  classroomCard: {
    padding: 15,
    backgroundColor: "#green",
    marginBottom: 10,
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  ingressoItem: {
    padding: 10,
    backgroundColor: "#e6e6e6",
    marginBottom: 10,
    borderRadius: 6,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
});
