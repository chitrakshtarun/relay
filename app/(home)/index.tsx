import { LegendList } from "@legendapp/list";
import { Text } from "react-native";

type Item = { id: string; title: string };

const items: Item[] = Array.from({ length: 1000 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Item ${i + 1}`,
}));

const HomePage = () => {
  return (
    <LegendList
      data={items}
      renderItem={({ item }: { item: Item }) => <Text className="px-6 text-xl">{item.title}</Text>}
      keyExtractor={(item: Item) => item.id}
      recycleItems
    />
  );
};

export default HomePage;
