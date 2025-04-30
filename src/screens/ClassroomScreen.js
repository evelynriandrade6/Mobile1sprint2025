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
  TextInput,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function ClassroomScreen({ navigation, route }) {
  const [classroom, setClassroom] = useState([]);
  const [schedules, setSchedule] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ClassroomSelecionado, setClassroomSelecionado] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [novaReserva, setnovaReserva] = useState({
    dateStart: "",
    dateEnd: "",
    days: [],
    user: route.params.user,
    classroom: "",
    timeStart: "",
    timeEnd: "",
  });
  const [dias, setDias] = useState([
    { label: "Seg", value: "Seg" },
    { label: "Ter", value: "Ter" },
    { label: "Qua", value: "Qua" },
    { label: "Qui", value: "Qui" },
    { label: "Sex", value: "Sex" },
  ]);

  async function createSchedule() {
    try {
      const response = await api.createSchedule({
        dateStart: novaReserva.dateStart,
        dateEnd: novaReserva.dateEnd,
        days: novaReserva.days,
        user: novaReserva.user,
        classroom: ClassroomSelecionado.number,
        timeStart: novaReserva.timeStart,
        timeEnd: novaReserva.timeEnd,
      });
      Alert.alert(response.data.message);

      // Atualiza lista
      // const responseAtualizado = await api.getSchedulesByIdClassroom(
      //   ClassroomSelecionado.number
      // );
      // setIngressos(responseAtualizado.data.ingressos);

      // Limpa e esconde o formulário
      setnovaReserva({
        dateStart: "",
        dateEnd: "",
        days: [],
        user: "",
        classroom: "",
        timeStart: "",
        timeEnd: "",
      });
      setMostrarForm(false);
    } catch (error) {
      console.log("Erro ao criar reserva", error.response.data);
      Alert.alert(error.response.data.error);
    }
  }

  useEffect(() => {
    getAllClassrooms();
  }, []);

  async function getAllClassrooms() {
    try {
      const response = await api.getAllClassrooms();
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
            style={[styles.closeButton, { backgroundColor: "green" }]}
            onPress={() => setMostrarForm(!mostrarForm)}
          >
            <Text style={{ color: "white" }}>
              {mostrarForm ? "Cancelar" : "Criar nova reserva"}
            </Text>
          </TouchableOpacity>

          {mostrarForm && (
            <View style={{ marginTop: 20 }}>
              <Text>Data da reserva:</Text>
              <TextInput
                value={novaReserva.dateStart}
                onChangeText={(date) =>
                  setnovaReserva({ ...novaReserva, dateStart: date })
                }
                style={styles.input}
                placeholder="Ex: 2025-04-30"
              />

              <Text>Data do fim da reserva:</Text>
              <TextInput
                value={novaReserva.dateEnd}
                onChangeText={(date) =>
                  setnovaReserva({ ...novaReserva, dateEnd: date })
                }
                style={styles.input}
                placeholder="Ex: 2025-04-30"
              />
              <Text>dias:</Text>
              <DropDownPicker
                multiple={true}
                min={0}
                max={7}
                open={openDropDown}
                value={novaReserva.days}
                items={dias}
                setOpen={setOpenDropDown}
                setValue={(callback) =>
                  setnovaReserva((prev) => ({
                    ...prev,
                    days: callback(prev.days),
                  }))
                }
                setItems={setDias}
                placeholder="Selecione os dias"
                mode="BADGE"
              />

              <Text>Horário de Inicio:</Text>
              <TextInput
                value={novaReserva.timeStart}
                onChangeText={(time) =>
                  setnovaReserva({ ...novaReserva, timeStart: time })
                }
                style={styles.input}
                placeholder="Ex: 11:00:00"
              />
              <Text>Horario do fim da reserva:</Text>
              <TextInput
                value={novaReserva.timeEnd}
                onChangeText={(time) =>
                  setnovaReserva({ ...novaReserva, timeEnd: time })
                }
                style={styles.input}
                placeholder="Ex:11:00:00"
              />
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: "purple" }]}
                onPress={createSchedule}
              >
                <Text style={{ color: "white" }}>Salvar reserva</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "white" }}>Fechar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.classroomCard}
          onPress={() => abrirModalComTeladeReserva(item)}
        ></TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
});
