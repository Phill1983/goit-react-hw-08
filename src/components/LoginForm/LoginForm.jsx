import { useDispatch } from 'react-redux';
import { login } from '@/redux/auth/operations';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import css from './LoginForm.module.css';

export default function LoginForm() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(login(values)).unwrap();
        toast.success('Login successful');
        resetForm();
      } catch (_) {
        toast.custom(t => (
          <div className={css.toastBox}>
            <p className={css.toastTitle}>Wrong email or password </p>
            <p className={css.toastText}>
              Don&apos;t have an account?{' '}
              <Link to="/register" onClick={() => toast.dismiss(t.id)} className={css.toastLink}>
                Registrate now
              </Link>
            </p>
          </div>
        ));
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <Toaster position="top-center" />
      
      <label className={css.label}>
        Email
        <input
          type="email"
          name="email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Password
        <input
          type="password"
          name="password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          className={css.input}
        />
      </label>

      <button type="submit" className={css.button}>
        Login
      </button>
    </form>
  );
}

