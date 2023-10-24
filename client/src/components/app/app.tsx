import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main';

export const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};
