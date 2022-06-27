import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SaleData } from "../sales/sale.type";
import Dashboard from "./Dashboard.component";

const DashboardContainer = () => {
  const URL = process.env.REACT_APP_WS_SERVER_URL ?? "ws://localhost:8080";
  const [messageHistory, setMessageHistory] = useState<SaleData[]>([]);
  const [salesByStore, setSalesByStore] = useState<Record<string, SaleData[]>>(
    {}
  );
  const [salesByModel, setSalesByModel] = useState<Record<string, SaleData[]>>(
    {}
  );

  const { lastJsonMessage, readyState } = useWebSocket<SaleData>(URL);

  useEffect(() => {
    if (!lastJsonMessage) return;
    const messageWithDate = {
      ...lastJsonMessage,
      date: new Date().toLocaleDateString(),
    };
    setMessageHistory((prev) => [...prev, messageWithDate]);
    const { store, model } = lastJsonMessage;
    setSalesByStore((prev) => ({
      ...prev,
      [store]: [...(prev[store] || []), messageWithDate],
    }));
    setSalesByModel((prev) => ({
      ...prev,
      [model]: [...(prev[model] || []), messageWithDate],
    }));
  }, [lastJsonMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <Dashboard
      allSales={messageHistory}
      connectionStatus={connectionStatus}
      lastSale={lastJsonMessage}
      salesByModel={salesByModel}
      salesByStore={salesByStore}
    />
  );
};
export default DashboardContainer;
