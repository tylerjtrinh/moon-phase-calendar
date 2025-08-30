import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from './pages/HomePage';
import CalendarPage from './pages/MoonCalendarPage';
import MoonDescPage from './pages/MoonDescPage';
import NotFoundPage from './pages/NotFoundPage'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/calendar/:year/:month" element={<CalendarPage />} />
        <Route path="moon/:year/:month/:day" element={<MoonDescPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />; 
}

export default App
