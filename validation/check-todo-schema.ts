import * as Yup from 'yup';

const checkTodoSchema = Yup.object({
  completed: Yup.bool().label('Completed').required(),
}).required();

export default checkTodoSchema;
