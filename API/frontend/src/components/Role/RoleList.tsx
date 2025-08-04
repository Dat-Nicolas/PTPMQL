// import { useEffect, useState } from 'react';
// import api from '../../api/api';

// export default function RoleList() {
//   const [roles, setRoles] = useState([]);

//   useEffect(() => {
//     api.get('/roles')
//       .then(res => setRoles(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>Danh sách Role</h2>
//       <ul>
//         {roles.map((role: any) => (
//           <li key={role.id}>{role.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
