import { StyleSheet, TextInput } from 'react-native';

import styles from './styles';

import React, { ChangeEvent } from "react";

type TextContentType = 
'none'|
'addressCity'|
'addressCityAndState'|
'addressState'|
'countryName'|
'creditCardNumber'|
'creditCardExpiration'| 
'creditCardExpirationMonth'| 
'creditCardExpirationYear' |
'creditCardSecurityCode' |
'creditCardType' |
'creditCardName' |
'creditCardGivenName'| 
'creditCardMiddleName'| 
'creditCardFamilyName' |
'emailAddress'|
'familyName'|
'fullStreetAddress'|
'givenName'|
'jobTitle'|
'location'|
'middleName'|
'name'|
'namePrefix'|
'nameSuffix'|
'nickname'|
'organizationName'|
'postalCode'|
'streetAddressLine1'|
'streetAddressLine2'|
'sublocality'|
'telephoneNumber'|
'username'|
'password'|
'newPassword'|
'oneTimeCode'|
'birthdate' |
'birthdateDay'| 
'birthdateMonth'| 
'birthdateYear';

type booleanType = true | false;

type AuthInputProps = {
  type: TextContentType;
  placeholder: string;
  value: string;
  onchange: (text: string) => void;
  Secure: booleanType;
  reject?: booleanType;
  Variant: "register" | "login"
};

export default function Input({
    type,
    placeholder,
    value,
    onchange,
    Secure,
    reject,
    Variant
}: AuthInputProps
) {

  return (
    <TextInput textContentType={type} placeholder={placeholder} value={value} onChangeText={onchange} secureTextEntry={Secure} style={reject?(Variant === 'login'?styles.inputRejected: styles.inputRejectedRegister): (Variant === "login"? styles.inputStyle: styles.inputRegister)}></TextInput>
  );
}