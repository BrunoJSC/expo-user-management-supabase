import "react-native-url-polyfill/auto";

import { Session } from "@supabase/supabase-js";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { supabse } from "./src/lib/supabase";
import { Account } from "./src/components/Account";
import { Login } from "./src/components/Login";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabse.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabse.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      <StatusBar style="auto" />
      
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Login />
      )}
    </View>
  );
}
