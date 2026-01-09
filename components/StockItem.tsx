import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  brand: string;
  url: string;
  initialStatus: "IN" | "OUT";
  onRemove: () => void;
};

export default function StockItem({
  brand,
  url,
  initialStatus,
  onRemove,
}: Props) {
  const [status, setStatus] = useState<"IN" | "OUT">(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleRecheck = () => {
    if (loading) return;

    setLoading(true);

    // KULLANICIYA ANINDA GERİ BİLDİRİM
    Alert.alert("Kontrol Başladı", "Stok yeniden kontrol ediliyor…");

    // Day 5: GERÇEK DAVRANIŞ SİMÜLASYONU
    setTimeout(() => {
      const next = Math.random() > 0.5 ? "IN" : "OUT";
      setStatus(next);
      setLoading(false);

      Alert.alert(
        "Kontrol Tamamlandı",
        next === "IN" ? "Ürün stokta 🎉" : "Ürün stokta değil ❌"
      );
    }, 1500);
  };

  return (
    <View style={styles.card} pointerEvents="auto">
      <Text style={styles.brand}>{brand}</Text>
      <Text style={styles.url} numberOfLines={1}>{url}</Text>

      <Text style={[styles.status, status === "IN" ? styles.in : styles.out]}>
        {status === "IN" ? "STOKTA" : "STOKTA DEĞİL"}
      </Text>

      <View style={styles.row}>
        <Pressable
          onPress={handleRecheck}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            loading && styles.disabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Yeniden Kontrol</Text>
          )}
        </Pressable>

        <Pressable onPress={onRemove}>
          <Text style={styles.remove}>Sil</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  brand: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  url: {
    color: "#9aa",
    fontSize: 12,
    marginBottom: 6,
  },
  status: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },
  in: { color: "#22c55e" },
  out: { color: "#ef4444" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  remove: {
    color: "#f87171",
    fontWeight: "600",
  },
});
