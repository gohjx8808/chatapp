import auth from '@react-native-firebase/auth';

export const postSubmitRegister = (
  data: registration.authPayload,
) => {
  return auth().createUserWithEmailAndPassword(data.email, data.password);
};

export const validatingRequirements = (
  passValue: string,
  passwordRequirement: registration.requirementData[],
  confirmPassword: string,
) => {
  let updatedCheckList = [...passwordRequirement];
  const min8index = passwordRequirement.findIndex(
    data => data.key === 'atLeast8Length',
  );
  const min1SpecialIndex = passwordRequirement.findIndex(
    data => data.key === 'atLeast1Special',
  );
  const min1NumIndex = passwordRequirement.findIndex(
    data => data.key === 'atLeast1Num',
  );
  const min1LowerIndex = passwordRequirement.findIndex(
    data => data.key === 'atLeast1Lower',
  );
  const min1UpperIndex = passwordRequirement.findIndex(
    data => data.key === 'atLeast1Cap',
  );
  const matchIndex = passwordRequirement.findIndex(
    data => data.key === 'match',
  );
  updatedCheckList[min8index].achieved = !!passValue.match(/^(?=.{8,}).*$/);
  updatedCheckList[min1SpecialIndex].achieved = !!passValue.match(
    /^(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/,
  );
  updatedCheckList[min1NumIndex].achieved = !!passValue.match(/^(?=.*\d).*$/);
  updatedCheckList[min1LowerIndex].achieved = !!passValue.match(
    /^(?=.*[a-z]).*$/,
  );
  updatedCheckList[min1UpperIndex].achieved = !!passValue.match(
    /^(?=.*[A-Z]).*$/,
  );
  updatedCheckList[matchIndex].achieved =
    passValue === confirmPassword && passValue !== '';
  return updatedCheckList;
};
