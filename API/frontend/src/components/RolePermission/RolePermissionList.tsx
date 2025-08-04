// import { useEffect, useState } from 'react';
// import api from '../../api/api';

// export default function RolePermissionList() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     api.get('/RolePermission/${roleName}')
//       .then(res => setData(res.data))
//       .catch(console.error);
//   }, []);

//   return (
//     <div>
//       <h2>Danh sách RolePermission</h2>
//       <ul>
//         {data.map((item: any, idx) => (
//           <li key={idx}>{item.roleName} - {item.permissionName}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
