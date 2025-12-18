import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

interface Message {
  id: string;
  sender: 'client' | 'lawyer';
  text: string;
}

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'client', text: trimmed },
    ]);
    setInput('');
    // TODO: קריאת API לשליחת ההודעה לעו״ד
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>צ׳אט עם עורך דין</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === 'client' ? styles.client : styles.lawyer,
            ]}
          >
            <Text>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>עדיין אין הודעות. כתבי הודעה ראשונה.</Text>
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="הקלדי הודעה..."
        />
        <Button title="שלח" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '80%',
  },
  client: { backgroundColor: '#D1E8FF', alignSelf: 'flex-end' },
  lawyer: { backgroundColor: '#E5E5E5', alignSelf: 'flex-start' },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

