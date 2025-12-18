import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

interface DocumentItem {
  id: string;
  name: string;
}

const mockDocuments: DocumentItem[] = [
  { id: '1', name: 'מכתב עבודה.pdf' },
  { id: '2', name: 'חוזה שכירות.docx' },
  { id: '3', name: 'הסכם מסירה.pdf' },
];

const DocumentsScreen: React.FC = () => {
  const handleOpen = (name: string) => {
    // TODO: חיבור ל-API / קבצים אמיתיים
    // eslint-disable-next-line no-alert
    alert(`פותח ${name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>המסמכים שלי</Text>
      <FlatList
        data={mockDocuments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Button title="פתח" onPress={() => handleOpen(item.name)} />
          </View>
        )}
      />
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});


