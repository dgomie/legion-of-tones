import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage.jsx';
import SignUpPage from './pages/signUpPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LegionsPage from './pages/LegionsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import { ContactPage } from '@mui/icons-material';
import PageNotFound from './pages/404Page.jsx';
import CreateLegionPage from './pages/CreateLegionPage.jsx';
import LegionDashboardPage from './pages/LegionDashboardPage.jsx';
import LegionRoundPage from './pages/LegionRoundPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import MasqueradePage from './pages/MasqueradePage.jsx';
import VotePage from './pages/VotePage.jsx';
import PlaylistPage from './pages/PlaylistPage.jsx';
import StandingsPage from './pages/StandingsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signUp',
        element: <SignUpPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'legions',
        element: <LegionsPage />,
      },
      {
        path: 'legions/:legionId',
        element: <LegionDashboardPage />,
      },
      {
        path: 'legions/:legionId/:roundId',
        element: <LegionRoundPage />,
      },
      {
        path: 'legions/:legionId/:roundId/vote',
        element: <VotePage />,
      },
      {
        path: 'legions/:legionId/:roundId/playlist',
        element: <PlaylistPage />,
      },
      {
        path: 'legions/:legionId/:roundId/results',
        element: <ResultsPage />,
      },
      {
        path: 'legions/:legionId/standings',
        element: <StandingsPage />,
      },
      {
        path: 'legions/create-legion',
        element: <CreateLegionPage />,
      },
      {
        path: 'profile/:usernameParam',
        element: <ProfilePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'melodymasquerade',
        element: <MasqueradePage />,
      },
      {
        path: '404',
        element: <PageNotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
