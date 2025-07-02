

import { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client"

function App() {
   const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [results, setResults] = useState([]);

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId.trim() || !fullName.trim() || !address.trim()) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return; 
  }
    try {
      const res = await axios.post("http://localhost:5000/api/sendinfo", {
        studentId,
        fullName,
        address,
      });
      setResults((prev) => [...prev, res.data]);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi gửi");
    }
    setStudentId("")
    setFullName("")
    setAddress("")
  };
  
  
   return (
    <div style={{ padding: "20px" }}>
      <h1>Student Info Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{marginRight:10}} htmlFor="">Student ID</label>
          <input
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div>
          <label style={{marginRight:10}} htmlFor="">Full Name</label>
          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label style={{marginRight:10}} htmlFor="">Address</label>
          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Send</button>
      </form>
      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Kết quả trả về từ API:</h2>
          {results.map((result, index) => (
            <div
              key={index}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <pre>{JSON.stringify(result, null, 2)}</pre>
              <h1>{result.data.studentId}</h1>
              <h1>{result.data.fullName}</h1>
              <h1>{result.data.address}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

