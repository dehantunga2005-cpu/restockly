import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Product = {
  id: string;
  url: string;
  status: "checking" | "in" | "out" | "error";
};

const ZARA_FUNCTION_URL =
  "https://us-central1-restockly-444e2.cloudfunctions.net/checkZaraStock";

export default function HomeScreen() {
  const [url, setUrl] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const addProduct = async () => {
    if (!url.includes("zara.com")) {
      Alert.alert("Hata", "Lütfen geçerli bir Zara linki gir");
      return;
    }

    const id = Date.now().toString();
    const newItem: Product = {
      id,
      url,
      status: "checking",
    };

    setItems((prev) => [newItem, ...prev]);
    setUrl("");

    await checkProduct(id, url);
  };

  const checkProduct = async (id: string, productUrl: string) => {
    try {
      setItems((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "checking" } : p
        )
      );

      const res = await fetch(ZARA_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: productUrl }),
      });

      const data = await res.json();

      setItems((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                status: data.inStock ? "in" : "out",
              }
            : p
        )
      );
    } catch (e) {
      setItems((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "error" } : p
        )
      );
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Text style={styles.url} numberOfLines={2}>
        {item.url}
      </Text>

      <Text
        style={[
          styles.status,
          item.status === "in" && styles.in,
          item.status === "out" && styles.out,
          item.status === "checking" && styles.checking,
          item.status === "error" && styles.error,
        ]}
      >
        {item.status === "checking" && "Kontrol ediliyor..."}
        {item.status === "in" && "STOKTA"}
        {item.status === "out" && "STOKTA DEĞİL"}
        {item.status === "error" && "HATA"}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => checkProduct(item.id, item.url)}
      >
        <Text style={styles.buttonText}>Yeniden Kontrol</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZARA Stok Takibi</Text>

      <View style={styles.row}>
        <TextInput
          placeholder="Zara ürün linki"
          value={url}
          onChangeText={setUrl}
          style={styles.input}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.add} onPress={addProduct}>
          <Text style={styles.addText}>Ekle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  row: { flexDirection: "row", marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
  },
  add: {
    marginLeft: 8,
    backgroundColor: "#000",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 6,
  },
  addText: { color: "#fff", fontWeight: "bold" },
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  url: { fontSize: 12, color: "#333", marginBottom: 6 },
  status: { fontWeight: "bold", marginBottom: 8 },
  in: { color: "green" },
  out: { color: "red" },
  checking: { color: "orange" },
  error: { color: "gray" },
  button: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { fontSize: 12 },
});
