import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsPage = () => {
  return (
    <SafeAreaView className="flex flex-1 px-6">
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>SettingsPage</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsPage;
