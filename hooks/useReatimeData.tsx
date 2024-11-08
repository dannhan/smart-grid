import { useEffect, useState } from "react";
import { ref, onValue, Database } from "firebase/database";

function useRealtimeData<T>(db: Database, path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = ref(db, path);
    const unsubscribe = onValue(
      query,
      (snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val() as T); // Cast snapshot value to generic type T
          setError(null);
        } else {
          setData(null);
          setError("No data available");
        }
        setLoading(false);
      },
      (error) => {
        setData(null);
        setError(error.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [db, path]);

  return { data, loading, error };
}

export default useRealtimeData;
