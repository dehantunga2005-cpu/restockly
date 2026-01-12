import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";

const SERVER_URL = "http://192.168.1.104:3001";

const BRANDS = ["Zara", "Bershka", "Pull&Bear", "Stradivarius", "Oysho"];

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState("Zara");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [trackingList, setTrackingList] = useState([]);
  const [loading, setLoading] = useState(false);

  const followProduct = async () => {
    if (!url) {
      setStatus("❌ Link girilmedi");
      return;
    }

    setLoading(true);
    setStatus("⏳ Takip ediliyor...");

    try {
      const res = await fetch(`${SERVER_URL}/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: selectedBrand,
          url,
        }),
      });

      const data = await res.json();

      setTrackingList((prev) => [
        ...prev,
        {
          brand: selectedBrand,
          url,
          time: new Date().toLocaleTimeString(),
        },
      ]);

      setStatus("✅ Takibe alındı");
      setUrl("");
    } catch (err) {
      setStatus("❌ Server erişilemedi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restockly</Text>

      <Pressable style={styles.loadBtn}>
        <Text style={styles.btnText}>Markaları Yükle</Text>
      </Pressable>

      {BRANDS.map((brand) => (
        <Pressable
          key={brand}
          style={[
            styles.brandBtn,
            selectedBrand === brand && styles.brandSelected,
          ]}
          onPress={() => setSelectedBrand(brand)}
        >
          <Text
            style={[
              styles.brandText,
              selectedBrand === brand && { color: "white" },
            ]}
          >
            {brand}
          </Text>
        </Pressable>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Ürün linkini yapıştır"
        value={url}
        onChangeText={setUrl}
      />

      <Pressable
        style={styles.followBtn}
        onPress={followProduct}
        disabled={loading}
      >
        <Text style={styles.followText}>
          {loading ? "Takip ediliyor..." : "Takibe Al"}
        </Text>
      </Pressable>

      {status ? <Text style={styles.status}>{status}</Text> : null}

      {trackingList.length > 0 && (
        <>
          <Text style={styles.listTitle}>Takip Edilenler</Text>
          <FlatList
            data={trackingList}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.listText}>
                  {item.brand} • {item.time}
                </Text>
                <Text style={styles.listUrl} numberOfLines={1}>
                  {item.url}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  loadBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  brandBtn: {
    backgroundColor: "#e5e7eb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  brandSelected: {
    backgroundColor: "#2563eb",
  },
  brandText: {
    textAlign: "center",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    marginBottom: 10,
  },
  followBtn: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 8,
  },
  followText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  status: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  listTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "700",
  },
  listItem: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  listText: {
    fontWeight: "600",
  },
  listUrl: {
    fontSize: 12,
    color: "#374151",
  },
});