import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import axios from 'axios';
// Local imports
import images from '../services/Images';
import deviceStorage from '../services/deviceStorage';
import useChat from '../components/useChat';

const ChatRoom = ({ route }) => {
  const { id, name, photo } = route.params;
  console.log('\n\nroute', id);
  const roomId = 'ABC';
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent

  const handleNewMessageChange = (value) => {
    setNewMessage(value);
  };
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={
            photo === undefined || photo.length == 0 ? images.userPic3 : photo
          }
          style={{ height: 50, width: 50, borderRadius: 50 }}
        />
        <Text style={styles.text}>{name}</Text>
      </View>
      {messages.length == 0 ? (
        <View style={styles.emptyConvContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.textInfo}>Aucun message</Text>
          </View>
        </View>
      ) : (
        <View style={styles.convContainer}>
          {messages.map((message) => {
            return (
              <View style={styles.messageContainer}>
                <Text>{message.senderId}</Text>
                <Text style={styles.textInfo}>{message.body}</Text>
              </View>
            );
          })}
        </View>
      )}
      <View>
        <TextInput
          value={newMessage}
          placeholder="Envoyez un message"
          onChangeText={handleNewMessageChange}
          style={styles.textInputStyle}
        />
        <Button title="envoyer" onPress={() => handleSendMessage()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 20,
  },
  convContainer: {
    borderColor: 'black',
    borderWidth: 1,
    height: '80%',
    backgroundColor: '#F9E7E7',
  },
  emptyConvContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: '80%',
    backgroundColor: '#F9E7E7',
  },
  userContainer: {
    padding: 10,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9E7E7',
  },
  messageContainer: {
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 10,
    width: '45%',
  },
  text: {
    fontFamily: 'DancingScript-Bold',
    fontSize: 30,
    marginHorizontal: 5,
  },
  textInfo: {
    fontFamily: 'monospace',
    color: 'black',
    fontSize: 17,
    marginHorizontal: 10,
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textInputStyle: {
    fontSize: 14,
    fontWeight: '800',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default ChatRoom;
