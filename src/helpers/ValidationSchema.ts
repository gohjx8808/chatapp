import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const RegisterSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.{8,})(?=.+[!@#$%^&*()\-_=+{};:,<.>])(?=.+\d)(?=.+[a-z])(?=.+[A-Z]).*$/,
      'Password is not strong enough',
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
