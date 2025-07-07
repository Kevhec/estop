import { BrowserRouter, Route, Routes } from 'react-router';
import { UiContext } from '@estop/ui';
import MainLayout from './layouts/MainLayout';
import Home from './routes/public/Home';

function App() {
  return (
    <UiContext>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UiContext>
  );
}

export default App;
