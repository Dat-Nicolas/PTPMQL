// import { useState } from 'react';
// import api from '../../api/api';

// export default function UserRoleForm() {
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.post('/UserRole/AddRolesToUser', { email, role });
//       alert('Thêm UserRole thành công!');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email người dùng" />
//       <input value={role} onChange={e => setRole(e.target.value)} placeholder="Tên Role" />
//       <button type="submit">Gán Role</button>
//     </form>
//   );
// }
