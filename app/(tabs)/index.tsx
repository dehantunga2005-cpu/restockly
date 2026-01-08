import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type PlanType = "FREE" | "PRO" | "FOUNDER";

export default function HomeScreen() {
  const [link, setLink] = useState("");
  const [plan, setPlan] = useState<PlanType>("FREE");
  const [products, setProducts] = useState<string[]>([]);

  const handleTrack = () => {
    if (!link.trim()) {
      Alert.alert("Hata", "Lütfen ürün linki gir");
      return;
    }

    if (plan === "FREE" && products.length >= 1) {
      Alert.alert(
        "Limit Doldu",
        "Free planda sadece 1 ürün takip edebilirsin."
      );
      return;
    }

    setProducts([...products, link]);
    setLink("");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Restockly</Text>

      <Text style={styles.subtitle}>
        {plan === "FREE" &&
          "Free Plan · 1 ürün · Kontrol: 60 dk · Bildirim gecikmeli"}
        {plan === "PRO" &&
          "PRO Plan · Sınırsız ürün · Kontrol: 5 dk · Anında bildirim"}
        {plan === "FOUNDER" &&
          "Kurucu Plan · Ömür boyu · Öncelikli sistem"}
      </Text>

      {/* PLAN SEÇİMİ */}
      <View style={styles.planRow}>
        <TouchableOpacity
          style={[
            styles.planButton,
            plan === "FREE" && styles.activePlan,
          ]}
          onPress={() => setPlan("FREE")}
        >
          <Text style={styles.planText}>FREE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.planButton,
            plan === "PRO" && styles.activePlan,
          ]}
          onPress={() => setPlan("PRO")}
        >
          <Text style={styles.planText}>PRO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.planButton,
            plan === "FOUNDER" && styles.activePlan,
          ]}
          onPress={() => setPlan("FOUNDER")}
        >
          <Text style={styles.planText}>KURUCU</Text>
        </TouchableOpacity>
      </View>

      {/* LINK INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Ürün linkini buraya yapıştır"
        placeholderTextColor="#9ca3af"
        value={link}
        onChangeText={setLink}
      />

      <TouchableOpacity style={styles.trackButton} onPress={handleTrack}>
        <Text style={styles.trackText}>Takibe Al</Text>
      </TouchableOpacity>

      {/* TAKİP EDİLENLER */}
      {products.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>Takip Edilen Ürün</Text>
          <Text style={styles.cardLink}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 6,
  },
  subtitle: {
    color: "#cbd5f5",
    marginBottom: 16,
  },
  planRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  planButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#1e293b",
    marginRight: 6,
    alignItems: "center",
  },
  activePlan: {
    backgroundColor: "#22c55e",
  },
  planText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#020617",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  trackButton: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  trackText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#020617",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    color: "#60a5fa",
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardLink: {
    color: "#e5e7eb",
    fontSize: 12,
  },
});









