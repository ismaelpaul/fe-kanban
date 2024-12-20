import { Switch } from '@headlessui/react';
import { Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Boards from '../pages/Boards/Boards';

const Routes = () => {
	return (
		<Switch>
			<Route path="/dashboard" element={<Boards />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Switch>
	);
};

export { Routes };
