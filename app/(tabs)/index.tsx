import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Plan = "FREE" | "PRO_MONTHLY" | "PRO_YEARLY" | "FOUNDER";

export default function HomeScreen() {
  const [plan, setPlan] = useState<Plan>("FREE");
  const [productLink, setProductLink] = useState("");
  const [products, setProducts] = useState<string[]>([]);

  const maxProducts =
    plan === "FREE" ? 1 : Infinity;

  const canAddProduct = products.length < maxProducts;

  const addProduct = () => {
    if (!productLink.trim()) return;
    if (!canAddProduct) return;

    setProducts((prev) => [...prev, productLink.trim()]);
    setProductLink("");
  };

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const PlanCard = ({
    title,
    description,
    price,
    active,
    buttonText,
    onPress,
  }: {
    title: string;
    description: string[];
    price?: string;
    active?: boolean;
    buttonText?: string;
    onPress?: () => void;
  }) => (
    <View style={styles.card}>
      <Text style={styles.planTitle}>{title}</Text>
      {description.map((d, i) => (
        <Text key={i} style={styles.text}>• {d}</Text>
      ))}
      {price && <Text style={styles.price}>{price}</Text>}

      {active ? (
        <Text style={styles.active}>AKTİF</Text>
      ) : (
        buttonText && onPress && (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Restockly</Text>

      {/* FREE */}
      <PlanCard
        title="Free"
        description={[
          "1 ürün takibi",
          "Bildirim geç gelebilir",
        ]}
        active={plan === "FREE"}
        buttonText="Free’ye Geç"
        onPress={() => setPlan("FREE")}
      />

      {/* PRO MONTHLY */}
      <PlanCard
        title="Pro Aylık"
        description={[
          "Sınırsız ürün",
          "Hızlı bildirim",
        ]}
        price="79 TL / ay"
        active={plan === "PRO_MONTHLY"}
        buttonText="Pro Aylık’a Geç"
        onPress={() => setPlan("PRO_MONTHLY")}
      />

      {/* PRO YEARLY */}
      <PlanCard
        title="Pro Yıllık"
        description={[
          "Sınırsız ürün",
          "Hızlı bildirim",
        ]}
        price="399 TL / yıl"
        active={plan === "PRO_YEARLY"}
        buttonText="Pro Yıllık’a Geç"
        onPress={() => setPlan("PRO_YEARLY")}
      />

      {/* FOUNDER */}
      <PlanCard
        title="Founder"
        description={[
          "Ömür boyu erişim",
          "En hızlı bildirim",
          "2500 kişiyle sınırlı",
        ]}
        price="400 TL (tek seferlik)"
        active={plan === "FOUNDER"}
        buttonText="Founder Ol"
        onPress={() => setPlan("FOUNDER")}
      />

      {/* PRODUCT INPUT */}
      <View style={styles.card}>
        <Text style={styles.planTitle}>Ürün Ekle</Text>
        <TextInput
          value={productLink}
          onChangeText={setProductLink}
          placeholder="Ürün linkini yapıştır"
          style={styles.input}
        />
        <TouchableOpacity
          style={[
            styles.button,
            !canAddProduct && { backgroundColor: "#aaa" },
          ]}
          disabled={!canAddProduct}
          onPress={addProduct}
        >
          <Text style={styles.buttonText}>Takibe Ekle</Text>
        </TouchableOpacity>

        <Text style={styles.muted}>
          {products.length}/{maxProducts === Infinity ? "∞" : maxProducts} ürün
        </Text>
      </View>

      {/* PRODUCT LIST */}
      <View style={styles.card}>
        <Text style={styles.planTitle}>Takip Edilen Ürünler</Text>
        {products.length === 0 ? (
          <Text style={styles.muted}>Henüz ürün eklenmedi</Text>
        ) : (
          products.map((p, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.link}>{p}</Text>
              <TouchableOpacity onPress={() => removeProduct(i)}>
                <Text style={styles.remove}>Kaldır</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  planTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  text: { fontSize: 14 },
  price: { fontSize: 16, fontWeight: "bold", marginTop: 4 },
  active: { color: "green", fontWeight: "bold", marginTop: 8 },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
  },
  muted: { color: "#666", marginTop: 6 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  link: { fontSize: 12, flex: 1 },
  remove: { color: "red", marginLeft: 8 },
});

