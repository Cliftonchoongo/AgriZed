import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:7070/")
        .then(res => setMessage(res.data))
        .catch(err => setMessage("Backend not connected"));
  }, []);

  return (
      <div style={{ padding: "20px" }}>
        <h1>AgriZed System</h1>
        <p>{message}</p>
      </div>
  );
}

export default App;