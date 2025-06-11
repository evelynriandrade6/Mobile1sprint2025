import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimePickerz = ({ type, buttonTitle, dateKey, setValue }) => {
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const showDatePicker = () => setPickerVisibility(true);
  const hideDatePicker = () => setPickerVisibility(false);

  const formatarDataParaBackend = (data) => {
    const d = new Date(data);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const handleConfirm = (date) => {
    if (type === "time") {
      const hour = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hour}:${minutes}`;
      setValue((prevState) => ({
        ...prevState,
        [dateKey]: formattedTime,
      }));
    } else {
      const formattedDate = formatarDataParaBackend(date);
      setValue((prevState) => ({
        ...prevState,
        [dateKey]: formattedDate,
      }));
    }
    hideDatePicker();
  };

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);
    if (Platform.OS === "android") {
      handleConfirm(currentDate); // iOS precisa de botão OK, Android confirma direto
    }
  };

  return (
    <View>
      <Button title={buttonTitle} onPress={showDatePicker} color="black" />
      {isPickerVisible && (
        <DateTimePicker
          value={tempDate}
          mode={type}
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default DateTimePickerz;
