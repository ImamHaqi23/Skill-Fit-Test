import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Dashboard from './views/dashboard';
import Penghuni from './views/penghuni';
import Rumah from './views/rumah';
import Pembayaran from './views/pembayaran';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/penghuni" element={<Penghuni />} />
            <Route path="/rumah" element={<Rumah />} />
            <Route path="/pembayaran" element={<Pembayaran />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
