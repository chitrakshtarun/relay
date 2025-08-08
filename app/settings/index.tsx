import { Text } from "@/components/ui/text";
import { useColorScheme } from "nativewind";
import React from "react";
import { Button, ScrollView, View } from "react-native";

const SettingsPage = () => {
  const { setColorScheme } = useColorScheme();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="px-6">
      <Text>SettingsPage</Text>
      <View className="flex flex-row justify-between">
        <Button title="System" onPress={() => setColorScheme("system")} />
        <Button title="Light" onPress={() => setColorScheme("light")} />
        <Button title="Dark" onPress={() => setColorScheme("dark")} />
      </View>
    </ScrollView>
  );
};

export default SettingsPage;
