import * as Yup from 'yup';

const newTodoSchema = Yup.object({
  title: Yup.string().label('Title').trim().required(),
}).required();

export default newTodoSchema;
