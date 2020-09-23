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
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
// Local imports
import images from '../services/Images';
import deviceStorage from '../services/deviceStorage';
import useChat from '../components/useChat';

const ChatRoom = ({ route }) => {
  const { currentId, otherId, name, photo, gender } = route.params;
  const roomId = currentId + otherId;
  const roomId1 = otherId + currentId;
  const [loading, setLoading] = useState(true);
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent
  const [allMessages, setallMessages] = useState(messages);
  const handleNewMessageChange = (value) => {
    setNewMessage(value);
  };
  const handleSendMessage = () => {
    sendMessage({
      room: roomId,
      body: newMessage,
      senderId: currentId,
      receiverId: otherId,
    });
    setNewMessage('');
  };

  useEffect(() => {
    deviceStorage.loadJWT().then((user_token) => {
      axios({
        method: 'POST',
        url: 'http://10.0.2.2:3000/lire',
        headers: {
          Authorization: 'Bearer ' + user_token,
        },
        data: { id1: roomId, id2: roomId1 },
      }).then((result) => {
        setallMessages(result.data);
        setTimeout(() => {
          setLoading(false);
          console.log('\n\nMessages: ', result.data);
        }, 1500);
      });
    });
  }, [messages]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#D2CBCB',
          width: width,
          alignSelf: 'center',
          padding: 10,
          alignItems: 'flex-end',
        }}>
        <Image
          source={
            photo === undefined || photo.length == 0
              ? gender == 'Homme'
                ? images.userPic3
                : images.userPic4
              : photo
          }
          style={{ height: 50, width: 50, borderRadius: 50 }}
        />
        <Text style={styles.text}>{name}</Text>
      </View>
      {allMessages.length == 0 ? (
        <View style={styles.emptyConvContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.textInfo}>Aucun message</Text>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.convContainer}>
          {allMessages.map((message) => {
            console.log(
              '\n***\nmessage: ',
              message.message.sender,
              ' |||',
              currentId,
            );
            return message.message.sender == currentId ? (
              <View style={styles.receiverMessageContainer}>
                <Text>Moi</Text>
                <Text style={styles.textInfo}>{message.message.body}</Text>
              </View>
            ) : (
              <View style={styles.senderMessageContainer}>
                <Text>{name}</Text>
                <Text style={styles.textInfo}>{message.message.body}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
      <View style={styles.bottomContainer}>
        <TextInput
          value={newMessage}
          placeholder="Envoyez un message"
          onChangeText={handleNewMessageChange}
          style={styles.textInputStyle}
        />
        <TouchableOpacity
          title="envoyer"
          style={styles.sendButton}
          onPress={() => handleSendMessage()}>
          <Text style={styles.textInfo}>Envoyer</Text>
          <Icon type="Feather" name="send" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingBottom: 30,
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
  senderMessageContainer: {
    justifyContent: 'center',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: '#D2CBCB',
    padding: 10,
    marginVertical: 5,
    width: '45%',
  },
  receiverMessageContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
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
    backgroundColor: 'white',
    width: '70%',
    marginRight: 15,
  },
  sendButton: {
    width: '28%',
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: '#D2CBCB',
    width: width,
    alignSelf: 'center',
    padding: 10,
    alignItems: 'center',
  },
});

export default ChatRoom;
