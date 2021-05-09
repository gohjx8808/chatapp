import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const RegisterSchema = yup.object().shape({
  displayName: yup.string().required('Display name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.{8,})(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      'Password is not strong enough',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const UpdateProfileSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  dob: yup.string().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
});

export const AddFriendSchema = yup.object().shape({
  addBy: yup.string().required('Add by is required'),
  frenID: yup.string().required("Friend's ID is required"),
});

export const ChangePasswordSchema = yup.object().shape({
  currentPass: yup.string().required('Current password is required'),
  newPass: yup
    .string()
    .required('New password is required')
    .matches(
      /^(?=.{8,})(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      'Password is not strong enough',
    ),
  confirmNewPass: yup
    .string()
    .required('Confirm new password is required')
    .oneOf([yup.ref('newPass'), null], 'New passwords must match'),
});
