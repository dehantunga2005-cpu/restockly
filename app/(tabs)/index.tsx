import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* =====================
   TYPES
===================== */
type Plan = "FREE" | "PRO" | "FOUNDER";

type Brand =
  | "ZARA"
  | "BERSHKA"
  | "PULL&BEAR"
  | "STRADIVARIUS"
  | "OYSHO";

type TrackedItem = {
  brand: Brand;
  link: string;
};

/* =====================
   CONSTANTS
===================== */
const STORAGE_KEY = "RESTOCKLY_V1";

const PLAN_LIMIT: Record<Plan, number> = {
  FREE: 1,
  PRO: 999,
  FOUNDER: 999,
};

const PLAN_FREQUENCY: Record<Plan, string> = {
  FREE: "60 dk",
  PRO: "10 dk",
  FOUNDER: "5 dk",
};

/* =====================
   HELPERS
===================== */
function detectBrand(link: string): Brand | null {
  const url = link.toLowerCase();

  if (url.includes("bershka.com")) return "BERSHKA";
  if (url.includes("pullandbear.com")) return "PULL&BEAR";
  if (url.includes("stradivarius.com")) return "STRADIVARIUS";
  if (url.includes("oysho.com")) return "OYSHO";
  if (url.includes("zara.com")) return "ZARA";

  return null;
}

/* =====================
   SCREEN
===================== */
export default function HomeScreen() {
  const [plan, setPlan] = useState<Plan>("FREE");
  const [link, setLink] = useState("");
  const [items, setItems] = useState<TrackedItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* LOAD */
  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setPlan(parsed.plan ?? "FREE");
        setItems(parsed.items ?? []);
      }
      setLoaded(true);
    })();
  }, []);

  /* SAVE */
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ plan, items })
    );
  }, [plan, items, loaded]);

  /* ADD ITEM */
  const addItem = () => {
    if (!link.trim()) {
      Alert.alert("Hata", "Link boş olamaz");
      return;
    }

    const brand = detectBrand(link);
    if (!brand) {
      Alert.alert(
        "Desteklenmeyen link",
        "Sadece Zara, Bershka, Pull&Bear, Stradivarius ve Oysho desteklenir."
      );
      return;
    }

    if (items.length >= PLAN_LIMIT[plan]) {
      Alert.alert(
        "Plan Limiti",
        "Free planda sadece 1 ürün takip edebilirsin."
      );
      return;
    }

    setItems([...items, { brand, link }]);
    setLink("");
  };

  /* REMOVE ITEM */
  const removeItem = (index: number) => {
    Alert.alert("Kaldır", "Bu ürünü kaldırmak istiyor musun?", [
      { text: "İptal", style: "cancel" },
      {
        text: "Kaldır",
        style: "destructive",
        onPress: () => {
          const copy = [...items];
          copy.splice(index, 1);
          setItems(copy);
        },
      },
    ]);
  };

  /* CHANGE PLAN (UI ONLY) */
  const changePlan = (p: Plan) => {
    if (p !== "FREE") {
      Alert.alert(
        "Yakında",
        "Bu paket yakında aktif edilecek."
      );
      return;
    }
    setPlan(p);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Restockly</Text>
      <Text style={styles.subtitle}>
        Plan: {plan} • Kontrol: {PLAN_FREQUENCY[plan]}
      </Text>

      {/* PLAN CARDS */}
      <View style={styles.planRow}>
        {(["FREE", "PRO", "FOUNDER"] as Plan[]).map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.planCard,
              plan === p && styles.planActive,
            ]}
            onPress={() => changePlan(p)}
          >
            <Text style={styles.planTitle}>{p}</Text>
            <Text style={styles.planDesc}>
              {p === "FREE" && "1 ürün • Geç bildirim"}
              {p === "PRO" && "Sınırsız • 10 dk"}
              {p === "FOUNDER" &&
                "Ömür boyu • 5 dk • 2500 kişi"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Ürün linkini yapıştır"
        placeholderTextColor="#9ca3af"
        value={link}
        onChangeText={setLink}
      />

      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>Takibe Al</Text>
      </TouchableOpacity>

      {/* ITEMS */}
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onLongPress={() => removeItem(index)}
        >
          <Text style={styles.cardTitle}>{item.brand}</Text>
          <Text style={styles.cardLink}>{item.link}</Text>
          <Text style={styles.hint}>Basılı tut → kaldır</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

/* =====================
   STYLES
===================== */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#0f172a",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: 16,
  },
  planRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  planCard: {
    flex: 1,
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 10,
    marginRight: 6,
  },
  planActive: {
    backgroundColor: "#22c55e",
  },
  planTitle: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 4,
  },
  planDesc: {
    color: "#cbd5f5",
    fontSize: 12,
  },
  input: {
    backgroundColor: "#020617",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#12263f",
    padding: 12,
    borderRadius: 10,
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
  hint: {
    color: "#9ca3af",
    fontSize: 11,
    marginTop: 6,
    textAlign: "right",
  },
});
