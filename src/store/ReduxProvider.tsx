"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./reduxStore";
import SessionTimeout from "../app/components/auth/SessionTimeout";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionTimeout />
        {children}
      </PersistGate>
    </Provider>
  );
}
