import { useEffect, useState } from "react";
import { ref, onValue, Database } from "firebase/database";

function useRealtimeData<T>(db: Database, path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check if connected to Firebase
    const connectedRef = ref(db, ".info/connected");
    const connectionListener = onValue(connectedRef, (snap) => {
      setConnected(snap.val() === true);
      if (path.startsWith("monitor") && snap.val() === true) {
        setLoading(false); // Only set loading to false once connected
      }
    });

    const dataRef = ref(db, path);
    const dataListener = onValue(
      dataRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val() as T);
          setError(null);
        } else {
          setData(null);
          setError("No data available");
        }
        if (connected) setLoading(false);
      },
      (error) => {
        setData(null);
        setError(error.message);
        if (connected) setLoading(false);
      },
    );

    return () => {
      connectionListener(); // Clean up connection listener
      dataListener(); // Clean up data listener
    };
  }, [db, path, connected]);

  return { data, loading, error };
}

export default useRealtimeData;
