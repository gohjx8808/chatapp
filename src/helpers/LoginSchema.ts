import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  Email: yup.string().email().required('Email is required'),
  Password: yup.string().required('Password is required'),
});
