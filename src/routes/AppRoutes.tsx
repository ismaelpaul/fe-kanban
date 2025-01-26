import { Route, Routes } from 'react-router-dom';

import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/dashboard"
				element={
					<Layout>
						<Dashboard />
					</Layout>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
};

export { AppRoutes };
