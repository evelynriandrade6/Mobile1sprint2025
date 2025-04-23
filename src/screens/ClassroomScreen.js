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
  const [ingressos, setIngressos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ClassroomSelecionado, setClassroomSelecionado] = useState('');

  useEffect(() => {
    getClassrooom();
  },[]);

  async function getClassroom() {
    try {
      const response = await api.getClassroom();
      console.log(response.data);
      setClassroom(response.data.events);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  async function abrirModalComTeladeReserva(classroom){
    setClassroomSelecionado(classroom)
    setModalVisible(true);
    try{
      const response = await api.getIngressosPorEvento(evento.id_evento);
      setIngressos(response.data.schedule);
      
    }catch (error) {
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
              style={styles.eventCard}
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
          <Text>Ingressos para:{ClassroomSelecionado.nome}</Text>
          {ingressos.length === 0 ? (
            <Text>Nenhum ingresso encontrado</Text>
          ) : (
            <FlatList
              data={ingressos}
              keyExtractor={(item) => item.id_ingresso.toString()}
              renderItem={({ item }) =>( 
              <View style={styles.ingressoItem}> 
                <Text>Tipo: {item.tipo}</Text>
                <Text>Preço: R$ {item.preco}</Text>
              </View>
          )}
            />
          )}
          <TouchableOpacity style={styles.closeButton}
          onPress={()=> setModalVisible(false)}>
            <Text style={{ color: "white"}}>Fechar</Text>
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
  eventCard: {
    padding: 15,
    backgroundColor: "#f1f1f1",
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
