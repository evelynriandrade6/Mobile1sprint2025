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
  const [modalDisponibilidade, setModalDisponibilidade] = useState(false);
  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");
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
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  async function createSchedule() {
    try {
      console.log("Criando reserva com os dados:", {
        dateStart: novaReserva.dateStart,
        dateEnd: novaReserva.dateEnd,
        days: novaReserva.days,
        user: novaReserva.user,
        classroom: ClassroomSelecionado.number,
        timeStart: novaReserva.timeStart,
        timeEnd: novaReserva.timeEnd,
      });

      const response = await api.createSchedule({
        dateStart: novaReserva.dateStart,
        dateEnd: novaReserva.dateEnd,
        days: novaReserva.days,
        user: novaReserva.user,
        classroom: ClassroomSelecionado.number,
        timeStart: novaReserva.timeStart,
        timeEnd: novaReserva.timeEnd,
      });

      console.log("Resposta da criação da reserva:", response.data);
      Alert.alert(response.data.message);

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
      console.log(
        "Erro ao criar reserva",
        error.response?.data || error.message
      );
      Alert.alert(error.response?.data?.error || error.message);
    }
  }

  useEffect(() => {
    getAllClassrooms();
  }, []);

  async function getAllClassrooms() {
    try {
      const response = await api.getAllClassrooms();
      console.log("Resposta das salas:", response.data);
      setClassroom(response.data.classrooms);
      setLoading(false);
    } catch (error) {
      console.log(
        "Erro ao buscar salas:",
        error.response?.data?.error || error.message
      );
    }
  }

  async function abrirModalComTeladeReserva(classroom) {
    console.log("Abrindo modal para a sala:", classroom.number);
    setClassroomSelecionado(classroom);
    setModalVisible(true);
    setFiltroDataInicio("");
    setFiltroDataFim("");
  }

  async function buscarDisponibilidadeFiltrada(classroom) {
    setClassroomSelecionado(classroom);
    setHorariosDisponiveis([]);
    setModalDisponibilidade(true);

    console.log(
      "Filtrando disponibilidade com datas:",
      filtroDataInicio,
      "-",
      filtroDataFim
    ); // LOG DAS DATAS DO FILTRO

    try {
      console.log(
        "Buscando disponibilidade para a sala:",
        classroom.number,
        "com filtro:",
        filtroDataInicio,
        "-",
        filtroDataFim
      );

      const response = await api.getSchedulesByIdClassroomRanges(
        classroom.number,
        filtroDataInicio,
        filtroDataFim
      );

      console.log(
        "Resposta completa da disponibilidade:",
        JSON.stringify(response.data, null, 2)
      );

      const horariosLivres = [];

      const diasDaSemana = Object.keys(
        response.data.schedulesByDayAndTimeRange
      );

      diasDaSemana.forEach((dia) => {
        const horarios = response.data.schedulesByDayAndTimeRange[dia];
        Object.entries(horarios).forEach(([intervalo, reservas]) => {
          if (!reservas || reservas.length === 0) {
            const [inicio, fim] = intervalo.split(" - ");
            horariosLivres.push({
              day: dia,
              timeStart: inicio.trim(),
              timeEnd: fim.trim(),
            });
          }
        });
      });

      setHorariosDisponiveis(horariosLivres);
    } catch (error) {
      console.error(
        "Erro ao verificar disponibilidade:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Erro ao buscar disponibilidade",
        error.response?.data?.error || error.message
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salas Disponíveis</Text>

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
          <Text>Efetuar reserva para : {ClassroomSelecionado.number}</Text>

          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: "blue" }]}
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
                style={[styles.closeButton, { backgroundColor: "green" }]}
                onPress={createSchedule}
              >
                <Text style={{ color: "white" }}>Salvar reserva</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: "blue" }]}
            onPress={() => setModalDisponibilidade(true)}
          >
            <Text style={{ color: "white" }}>Ver disponibilidade</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.closeButton, {backgroundColor: "#810000"}]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "white" }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={modalDisponibilidade}
        onRequestClose={() => setModalDisponibilidade(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text>
            Disponibilidade para a sala {ClassroomSelecionado.number}:
          </Text>

          <Text style={{ marginTop: 20 }}>Filtrar por data:</Text>
          <TextInput
            style={styles.input}
            placeholder="Data de Início (YYYY-MM-DD)"
            value={filtroDataInicio}
            onChangeText={setFiltroDataInicio}
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Fim (YYYY-MM-DD)"
            value={filtroDataFim}
            onChangeText={setFiltroDataFim}
          />
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: "green" }]}
            onPress={() => buscarDisponibilidadeFiltrada(ClassroomSelecionado)}
          >
            <Text style={{ color: "white" }}>Buscar disponibilidade</Text>
          </TouchableOpacity>

          {horariosDisponiveis.length > 0 ? (
            <FlatList
              data={horariosDisponiveis}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.availabilityItem}>
                  <Text>
                    {item.day}: {item.timeStart} - {item.timeEnd}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text>
              Sem disponibilidade de horários para o período selecionado.
            </Text>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalDisponibilidade(false)}
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
    backgroundColor: "#A4A4A4",
    marginBottom: 10,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
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
  availabilityItem: {
    padding: 10,
    backgroundColor: "#e6e6e6",
    marginBottom: 10,
    borderRadius: 6,
  },
});
