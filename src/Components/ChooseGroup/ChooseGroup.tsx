import { StyleSheet, TextInput } from 'react-native';

import styles from './Style';
import React, { ChangeEvent, useState } from "react";
import { TouchableOpacity, Text } from 'react-native';



type AuthInputProps = {
  placeholder: string,
  onchange: () => void,
  selected: boolean,
  
};

export default function ChooseGroup({
    placeholder,
    onchange,
    selected,

}: AuthInputProps
) {

  return (
    <TouchableOpacity onPress={onchange} style={[styles.chooseOpacity, selected && styles.groupChoose]}>
        <Text style={[styles.textChooseOpacity, selected && styles.textGroupChoose]}>{placeholder}</Text>
    </TouchableOpacity>
  );
}