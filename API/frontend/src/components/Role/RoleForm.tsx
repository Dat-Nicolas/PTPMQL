// import { useState } from 'react';
// import api from '../../api/api';

// export default function RoleForm() {
//   const [roleName, setRoleName] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.post('/roles', { name: roleName });
//       alert('Tạo role thành công!');
//     } catch (err) {
//       console.error(err);
//       alert('Tạo role thất bại');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         value={roleName}
//         onChange={e => setRoleName(e.target.value)}
//         placeholder="Tên Role"
//       />
//       <button type="submit">Tạo Role</button>
//     </form>
//   );
// }
