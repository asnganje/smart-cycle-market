import { FC, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../utils/colors";
import { s, vs } from "react-native-size-matters";
import { formatDate } from "../utils/date";

interface DatePickerProps {
  title: string;
  value: Date;
  onChange: (value: Date) => void;
}

const isIOS = Platform.OS === "ios";

const DatePicker: FC<DatePickerProps> = ({ title, value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false)
  const visible = isIOS ? true : showPicker

  const onPress = () => {
    if(isIOS) return;
    setShowPicker(true)
  }


  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.dateContainer}>
        <Text style={styles.title}>{title}</Text>
      {!isIOS && <Text style={styles.value}>{formatDate(value.toISOString(), "dd LLL yyyy")}</Text>}
      </View>
      { visible? (<DateTimePicker
        testID="dateTimePicker"
        display={Platform.OS === "ios"? "inline" : "default"}
        value={value}
        onChange={(_, date) => {
          if (date) onChange(date);
          if (!isIOS) setShowPicker(false)
        }}
      />): null}
    </TouchableOpacity>
  );
};
export default DatePicker;
const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    alignItems:"center",
    width:"100%",
    marginBottom:s(15)
  },
  title:{
    color:Colors.primary
  },
  value:{
    color:Colors.primary,
    paddingLeft:s(15)
  },
  dateContainer:{
    flexDirection:"row",
    marginBottom:vs(15),
    padding: isIOS ? 0 : s(8),
    borderWidth: isIOS ? 0 : 1,
    borderColor: isIOS ? "": Colors.deActive,
    borderRadius: s(5)
  }
});
