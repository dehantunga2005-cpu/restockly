import { Text, View } from "react-native";

export default function PlanInfo({ plan }: { plan: "FREE" | "PRO" }) {
  return (
    <View style={{ padding: 12, borderRadius: 10, backgroundColor: "#020617", marginTop: 12 }}>
      <Text style={{ color: "#cbd5e1", textAlign: "center" }}>
        {plan === "FREE"
          ? "Free plan: 1 ürün • Bildirimler gecikmeli"
          : "Pro plan: Sınırsız ürün • Öncelikli bildirim"}
      </Text>
    </View>
  );
}
