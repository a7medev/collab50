import * as Yup from 'yup';

const loginSchema = Yup.object({
  username: Yup.string().label('Username').trim().lowercase().required(),
  password: Yup.string().label('Password').required(),
}).required();

export default loginSchema;
