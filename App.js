import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const track = async () => {
    try {
      setResult(null);

      const r = await fetch("http://192.168.1.104:3001/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: "ZARA",
          url,
        }),
      });

      const data = await r.json();
      setResult(data);
    } catch (e) {
      Alert.alert("Hata", "Servera ulaşılamadı");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restockly</Text>

      <TextInput
        style={styles.input}
        placeholder="Zara ürün linki"
        value={url}
        onChangeText={setUrl}
      />

      <TouchableOpacity style={styles.btn} onPress={track}>
        <Text style={styles.btnText}>Takibe Al</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.result}>
          <Text>Product ID: {result.productId}</Text>
          <Text>Toplam Stok: {result.totalStock}</Text>
          <Text>
            Durum: {result.inStock ? "STOKTA VAR" : "STOK YOK"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
  },
  btn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 6,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  result: {
    marginTop: 20,
  },
});