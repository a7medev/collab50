import * as Yup from 'yup';

const registerSchema = Yup.object({
  name: Yup.string().label('Name').trim().min(2).max(50).required(),
  username: Yup.string()
    .label('Username')
    .trim()
    .lowercase()
    .min(3)
    .max(30)
    .required(),
  password: Yup.string().label('Password').min(8).required(),
}).required();

export default registerSchema;
