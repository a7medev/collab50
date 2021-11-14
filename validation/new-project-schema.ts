import * as Yup from 'yup';

const newProjectSchema = Yup.object({
  name: Yup.string().label('Name').trim().required(),
}).required();

export default newProjectSchema;
