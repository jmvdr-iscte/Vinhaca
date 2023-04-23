import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {useState, useEffect} from 'react';
import {MyEnum} from '../enums/Enums.js';

const Alerts = () => {
  let enumInput = MyEnum.DANGER;
  let dialogType = null;
  let dialogTitle = null;
  let dialogText = null;
  let dialogButton = null;

  if (enumInput === MyEnum.DANGER) {
    dialogType = ALERT_TYPE.DANGER;
    dialogTitle = 'Wrongggggg';
    dialogText = 'Querias querias';
    dialogButton = 'close';
  }

  useEffect(() => {
    Dialog.show({
      type: dialogType,
      title: dialogTitle,
      textBody: dialogText,
      button: dialogButton,
    });
  }, []);

  return <AlertNotificationRoot></AlertNotificationRoot>;
};

export default Alerts;
