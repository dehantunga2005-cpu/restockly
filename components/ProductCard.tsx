import { Text, View } from "react-native";

export default function ProductCard({ brand, url }: { brand: string; url: string }) {
  return (
    <View style={{ backgroundColor: "#1e293b", padding: 12, borderRadius: 10 }}>
      <Text style={{ color: "#38bdf8", fontWeight: "bold", marginBottom: 4 }}>
        {brand}
      </Text>
      <Text style={{ color: "#e5e7eb" }} numberOfLines={2}>
        {url}
      </Text>
    </View>
  );
}
