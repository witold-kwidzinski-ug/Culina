import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications"
import { useEffect } from "react";


async function setupDB(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      amount INTEGER NOT NULL,
      addedDate TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS shopping (
      id INTEGER PRIMARY KEY,
      amount INTEGER NOT NULL
    )
  `);
}


export default function Layout() {

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="app.db" onInit={setupDB}>
        <Stack screenOptions={{headerShown: false}} />
      </SQLiteProvider>
    </SafeAreaProvider>
  )
}