import { Text, View, Button, Alert } from "react-native";
import { API_BASE_URL } from "./src/config/api";

export default function App() {
  const testBackend = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      const data = await res.text();
      Alert.alert("Backend cevap verdi", data);
    } catch (err) {
      Alert.alert("Hata", err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Restockly</Text>
      <Button title="Backend Test Et" onPress={testBackend} />
    </View>
  );
}