// import { useEffect, useState } from 'react';
// import api from '../../api/api';

// export default function UserRoleList() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     api.get('/UserRole')
//       .then(res => setData(res.data))
//       .catch(console.error);
//   }, []);

//   return (
//     <div>
//       <h2>Danh sách UserRole</h2>
//       <ul>
//         {data.map((item: any, idx) => (
//           <li key={idx}>{item.userId} - {item.role}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
