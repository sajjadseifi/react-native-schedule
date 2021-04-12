import React from "react";
import { StyleSheet, View } from "react-native";
import DeleteChangerSchudle from "./DeleteChangerSchudle";
import UpdateChangerSchudle from "./UpdateChangerSchudle";
import * as actionssType from "../../../store/actions/actionsType";
const ChangerSchedule = ({ noteId, onPress = () => {} }) => {
  
  const deleteNoteHandler = () => onPress(noteId, actionssType.DELETE_SECHUDLE);
  
  const updateNodeHandler = () => onPress(noteId, actionssType.UPDATE_SECHUDLE);
  
  return (
    <View style={styles.editContainer}>
      <UpdateChangerSchudle handler={updateNodeHandler} />
      <View style={styles.space}></View>
      <DeleteChangerSchudle handler={deleteNoteHandler} />
    </View>
  );
};

export default ChangerSchedule;
const styles = StyleSheet.create({
  editContainer: {
    flexDirection: "row-reverse",
  },
  space: {
    width: 8,
  },
});
