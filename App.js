import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import io from 'socket.io-client';

const App = () => {
  let socket;
  const [message, setMessage] = useState('')
  

  useEffect(() => {
    socket = io('http://192.168.1.184:5001');

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('message', (msg) => {
      console.log('Received message:', msg.data);
      setMessage(msg.data)
    });


    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      console.log('sending message')
      socket.emit('message', 'Hello from React Native!');
    } else {
      console.log('No socket')
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{socket ? 'Socket connected' : 'Socket not connected'}</Text>
      <Text>There is a message for you: {message}</Text>
      <Text style={{color: 'red'}} onPress={sendMessage}>Send Message</Text>
    </View>
  );
};

export default App;

