import { Route, Routes } from 'react-router-dom';

import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
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

			<Route path="*" element={<div>Not found...</div>} />
		</Routes>
	);
};

export { AppRoutes };
