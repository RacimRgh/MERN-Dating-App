import React, { useState } from 'react';
import Icon from 'react-native-dynamic-vector-icons';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { isAndroid, isIPhoneXFamily } from '@freakycoder/react-native-helpers';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateHourPicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState({ mode: 'date', show: false });

  const { onChangeDate } = props;
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setMode({ ...mode, show: !mode.show });
    setDate(currentDate);
    onChangeDate(currentDate);
  };

  const showDatepicker = () => {
    setMode({ mode: 'date', show: !mode.show });
  };

  const showTimepicker = () => {
    setMode({ mode: 'time', show: !mode.show });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={showDatepicker}>
          <View style={styles.containerGlue}>
            <View style={{ width: 35, justifyContent: 'center' }}>
              <Icon
                size={25}
                name="calendar"
                color="black"
                type="SimpleLineIcons"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>Date of birth</Text>
              <Text style={styles.textTime}>
                {date.toISOString().slice(0, 10)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {mode.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode.mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={showTimepicker}>
          <View style={styles.containerGlue}>
            <View style={{ width: 35, justifyContent: 'center' }}>
              <Icon
                size={25}
                name="clock"
                color="black"
                type="SimpleLineIcons"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>Hour of birth</Text>
              <Text style={styles.textTime}>
                {date.toISOString().slice(11, 16)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {mode.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode.mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  showContainer: {
    marginHorizontal: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  showButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 10,
    bottom: isAndroid ? 24 : isIPhoneXFamily() ? 24 : 12,
  },
  textInputStyle: {
    fontSize: 14,
    fontWeight: '800',
    right: isAndroid ? 5 : 0,
    marginTop: isAndroid ? 0 : 3,
    height: isAndroid ? 35 : null,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '700',
  },
  container: {
    margin: 8,
    height: 75,
    width: '95%',
    marginTop: 0,
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  containerGlue: {
    marginLeft: 24,
    marginRight: 24,
    flexDirection: 'row',
  },
  textContainer: {
    width: '90%',
    marginLeft: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: isAndroid ? 10 : null,
  },
  textTime: {
    marginVertical: 7,
    color: 'grey',
  },
});

export default DateHourPicker;
