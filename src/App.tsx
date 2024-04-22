import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Boards from './pages/Boards/Boards';
import Register from './pages/Auth/Register';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/boards" element={<Boards />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
