import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Item = {
  id: string;
  brand: string;
  url: string;
  status: "IN" | "OUT";
};

const STORAGE_KEY = "@restockly_items";

export default function Index() {
  const [url, setUrl] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // 🔹 Load saved items
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setItems(JSON.parse(saved));
      } catch {}
      setHydrated(true);
    })();
  }, []);

  // 🔹 Save on every change
  useEffect(() => {
    if (hydrated) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const detectBrand = (link: string) => {
    if (link.includes("zara")) return "Zara";
    if (link.includes("bershka")) return "Bershka";
    if (link.includes("pullandbear")) return "Pull&Bear";
    if (link.includes("stradivarius")) return "Stradivarius";
    if (link.includes("oysho")) return "Oysho";
    return null;
  };

  const addItem = () => {
    const brand = detectBrand(url.toLowerCase());
    if (!brand) {
      Alert.alert("Hata", "Desteklenmeyen marka");
      return;
    }

    setItems((prev) => [
      {
        id: Date.now().toString(),
        brand,
        url,
        status: Math.random() > 0.5 ? "IN" : "OUT",
      },
      ...prev,
    ]);

    setUrl("");
  };

  const recheck = (id: string) => {
    setLoadingId(id);
    Alert.alert("Kontrol", "Stok yeniden kontrol ediliyor");

    setTimeout(() => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, status: Math.random() > 0.5 ? "IN" : "OUT" }
            : i
        )
      );
      setLoadingId(null);
      Alert.alert("Bitti", "Stok durumu güncellendi");
    }, 1500);
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (!hydrated) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stok Takibi</Text>

      <View style={styles.row}>
        <TextInput
          value={url}
          onChangeText={setUrl}
          placeholder="Ürün linki"
          placeholderTextColor="#777"
          style={styles.input}
        />
        <Pressable style={styles.addBtn} onPress={addItem}>
          <Text style={styles.addText}>Ekle</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.url}>{item.url}</Text>

            <Text
              style={[
                styles.status,
                item.status === "IN" ? styles.in : styles.out,
              ]}
            >
              {item.status === "IN" ? "STOKTA" : "STOKTA DEĞİL"}
            </Text>

            <View style={styles.actions}>
              <Pressable
                style={styles.btn}
                onPress={() => recheck(item.id)}
              >
                {loadingId === item.id ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Yeniden Kontrol</Text>
                )}
              </Pressable>

              <Pressable onPress={() => remove(item.id)}>
                <Text style={styles.remove}>Sil</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, padding: 16, backgroundColor: "#0f0f0f" },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", marginBottom: 12 },
  input: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  addBtn: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: 8,
  },
  addText: { color: "#fff", fontWeight: "700" },
  card: {
    backgroundColor: "#1b1b1b",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  brand: { color: "#fff", fontWeight: "700" },
  url: { color: "#aaa", fontSize: 12 },
  status: { marginVertical: 6, fontWeight: "700" },
  in: { color: "#22c55e" },
  out: { color: "#ef4444" },
  actions: { flexDirection: "row", gap: 14, alignItems: "center" },
  btn: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "700" },
  remove: { color: "#f87171" },
});
