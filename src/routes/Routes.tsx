import { Route, Routes } from 'react-router-dom';

import Boards from '../pages/Boards/Boards';
import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/boards" element={<Boards />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
};

export { AppRoutes };
