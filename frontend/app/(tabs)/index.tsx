import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

const BRANDS = ["Zara", "Bershka", "Pull&Bear", "Stradivarius", "Oysho"];

export default function HomeScreen() {
  const [selectedBrand, setSelectedBrand] = useState("Zara");
  const [link, setLink] = useState("");
  const [tracked, setTracked] = useState<
    { brand: string; link: string; time: string }[]
  >([]);

  const follow = () => {
    if (!link) {
      Alert.alert("Hata", "Ürün linki gir");
      return;
    }

    const time = new Date().toLocaleTimeString("tr-TR");
    setTracked([
      ...tracked,
      { brand: selectedBrand, link, time },
    ]);

    setLink("");
    Alert.alert("✅ Takibe alındı");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Restockly</Text>

      <TouchableOpacity style={styles.loadBtn}>
        <Text style={styles.loadText}>Markaları Yükle</Text>
      </TouchableOpacity>

      {BRANDS.map((b) => (
        <TouchableOpacity
          key={b}
          style={[
            styles.brandBtn,
            selectedBrand === b && styles.brandActive,
          ]}
          onPress={() => setSelectedBrand(b)}
        >
          <Text style={styles.brandText}>{b}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        placeholder="Ürün linkini yapıştır"
        style={styles.input}
        value={link}
        onChangeText={setLink}
      />

      <TouchableOpacity style={styles.followBtn} onPress={follow}>
        <Text style={styles.followText}>Takibe Al</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Takip Edilenler</Text>

      {tracked.map((t, i) => (
        <View key={i} style={styles.trackItem}>
          <Text>
            {t.brand} · {t.time}
          </Text>
          <Text style={styles.link}>{t.link}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  loadBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  loadText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  brandBtn: {
    backgroundColor: "#e5e7eb",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  brandActive: {
    backgroundColor: "#2563eb",
  },
  brandText: {
    textAlign: "center",
    color: "#000",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  followBtn: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  followText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    marginTop: 24,
    fontWeight: "bold",
    fontSize: 16,
  },
  trackItem: {
    marginTop: 8,
  },
  link: {
    fontSize: 12,
    color: "#374151",
  },
});