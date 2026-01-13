import { View, Text, Pressable } from "react-native";

export default function App() {
  console.log("🔥 APP.JS ÇALIŞTI");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        onPress={() => {
          console.log("🔥 BUTON BASILDI");
          alert("BASILDIIII");
        }}
        style={{ backgroundColor: "black", padding: 20 }}
      >
        <Text style={{ color: "white" }}>TEST BUTON</Text>
      </Pressable>
    </View>
  );
}