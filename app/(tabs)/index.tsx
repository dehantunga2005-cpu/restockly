import { View, Text, Pressable } from "react-native";

export default function Home() {
  const handlePress = () => {
    console.log("🔥 BUTONA BASILDI");
    alert("Butona basıldı");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>RESTOCKLY TEST</Text>

      <Pressable
        onPress={handlePress}
        style={{
          backgroundColor: "#000",
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>
          TAKİBE AL (TEST)
        </Text>
      </Pressable>
    </View>
  );
}