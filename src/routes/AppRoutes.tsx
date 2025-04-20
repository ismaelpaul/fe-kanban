import { Route, Routes } from 'react-router-dom';

import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';
import { Dashboard } from '@/pages/Dashboard';
import { Invitation } from '@/pages/Invitation';

import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Layout>
							<Dashboard />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			<Route path="/invite/:token" element={<Invitation />} />

			<Route path="*" element={<div>Not found...</div>} />
		</Routes>
	);
};

export { AppRoutes };
