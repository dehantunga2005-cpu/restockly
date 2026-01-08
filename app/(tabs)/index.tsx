import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Plan = "FREE" | "PRO" | "FOUNDER";

export default function HomeScreen() {
  const [activePlan, setActivePlan] = useState<Plan>("FREE");
  const [productLink, setProductLink] = useState("");
  const [products, setProducts] = useState<string[]>([]);

  const isUnlimited = activePlan === "PRO" || activePlan === "FOUNDER";
  const freeLimit = 1;

  const addProduct = () => {
    if (!productLink.trim()) {
      Alert.alert("Hata", "Ürün linki boş olamaz");
      return;
    }

    if (!isUnlimited && products.length >= freeLimit) {
      Alert.alert(
        "Limit Doldu",
        "Free plan sadece 1 ürün ekleyebilir. Pro veya Founder’a geç."
      );
      return;
    }

    setProducts((prev) => [...prev, productLink.trim()]);
    setProductLink("");
  };

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const activatePlan = (plan: Plan) => {
    setActivePlan(plan);
    Alert.alert(
      "Satın Alma (Test)",
      `${plan} planı test olarak aktif edildi`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restockly</Text>
      <Text style={styles.subtitle}>Aktif Plan: {activePlan}</Text>

      {/* PLANLAR */}
      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Free</Text>
        <Text style={styles.planText}>• 1 ürün takibi</Text>
        <Text style={styles.planText}>• Bildirim geç gelebilir</Text>
        {activePlan === "FREE" ? (
          <Text style={styles.active}>AKTİF</Text>
        ) : (
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => activatePlan("FREE")}>
            <Text style={styles.btnTextDark}>Free’e Geç</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Pro</Text>
        <Text style={styles.planText}>• Sınırsız ürün</Text>
        <Text style={styles.planText}>• Hızlı bildirim</Text>
        {activePlan === "PRO" ? (
          <Text style={styles.active}>AKTİF</Text>
        ) : (
          <TouchableOpacity style={styles.primaryBtn} onPress={() => activatePlan("PRO")}>
            <Text style={styles.btnTextLight}>Pro’ya Geç</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Founder</Text>
        <Text style={styles.planText}>• Ömür boyu erişim</Text>
        <Text style={styles.planText}>• En yüksek öncelik</Text>
        {activePlan === "FOUNDER" ? (
          <Text style={styles.active}>AKTİF</Text>
        ) : (
          <TouchableOpacity style={styles.primaryBtn} onPress={() => activatePlan("FOUNDER")}>
            <Text style={styles.btnTextLight}>Founder Ol</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ÜRÜN EKLEME */}
      <View style={styles.addBox}>
        <Text style={styles.sectionTitle}>Ürün Ekle</Text>
        <TextInput
          placeholder="Ürün linkini yapıştır"
          value={productLink}
          onChangeText={setProductLink}
          style={styles.input}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.primaryBtn} onPress={addProduct}>
          <Text style={styles.btnTextLight}>Takibe Ekle</Text>
        </TouchableOpacity>

        {!isUnlimited && (
          <Text style={styles.limitInfo}>
            Free plan: {products.length}/{freeLimit} ürün
          </Text>
        )}
      </View>

      {/* ÜRÜN LİSTESİ */}
      <View style={styles.listBox}>
        <Text style={styles.sectionTitle}>Takip Edilen Ürünler</Text>

        {products.length === 0 ? (
          <Text style={styles.empty}>Henüz ürün eklenmedi</Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.productItem}>
                <Text style={styles.productText} numberOfLines={1}>
                  {item}
                </Text>
                <TouchableOpacity onPress={() => removeProduct(index)}>
                  <Text style={styles.remove}>Sil</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 4 },
  subtitle: { marginBottom: 12, color: "#555" },

  planCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  planTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  planText: { fontSize: 14, marginBottom: 2 },
  active: { marginTop: 8, color: "green", fontWeight: "bold" },

  primaryBtn: {
    marginTop: 8,
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
  },
  secondaryBtn: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
    borderRadius: 8,
  },
  btnTextLight: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  btnTextDark: { textAlign: "center", fontWeight: "bold" },

  addBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  limitInfo: { marginTop: 6, color: "#888" },

  listBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
  },
  empty: { color: "#777" },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productText: { flex: 1, marginRight: 8 },
  remove: { color: "red", fontWeight: "bold" },
});
