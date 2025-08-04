// import { useState } from 'react';
// import api from '../../api/api';

// export default function RolePermissionForm() {
//   const [roleName, setRoleName] = useState('');
//   const [permissionName, setPermissionName] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.post('/RolePermission/assign', { roleName, permissionName });
//       alert('Thêm quyền thành công!');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={roleName} onChange={e => setRoleName(e.target.value)} placeholder="Role" />
//       <input value={permissionName} onChange={e => setPermissionName(e.target.value)} placeholder="Permission" />
//       <button type="submit">Thêm quyền</button>
//     </form>
//   );
// }
