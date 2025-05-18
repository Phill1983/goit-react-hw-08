import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { refreshUser } from './redux/auth/operations';
import { fetchContacts } from './redux/contacts/operations';

import {
  selectIsRefreshing,
  selectIsLoggedIn,
  selectToken,
} from './redux/auth/selectors';

import Layout from './components/Layout/Layout';
import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';

import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import FullPageLoader from './components/FullPageLoader/FullPageLoader';

const App = () => {
  const dispatch = useDispatch();

  const token = useSelector(selectToken); 
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Оновлення користувача лише якщо токен є
  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  // Завантаження контактів після підтвердження логіну
  useEffect(() => {
    if (isLoggedIn && !isRefreshing) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn, isRefreshing]);

  // Loader під час refreshUser
  if (isRefreshing) {
    return <FullPageLoader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<LoginPage />}
            />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute
              redirectTo="/login"
              component={<ContactsPage />}
            />
          }
        />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
