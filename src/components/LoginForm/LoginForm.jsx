import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import css from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Required'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Email
          <Field type="email" name="email" autoComplete="email" className={css.input} />
          <ErrorMessage name="email" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Password
          <Field type="password" name="password" autoComplete="current-password" className={css.input} />
          <ErrorMessage name="password" component="div" className={css.error} />
        </label>

        <button type="submit" className={css.button}>
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;

