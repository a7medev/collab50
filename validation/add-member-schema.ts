import { Role } from '.prisma/client';
import * as Yup from 'yup';

const addMemberSchema = Yup.object({
  username: Yup.string()
    .label('Username')
    .trim()
    .lowercase()
    .min(3)
    .max(30)
    .required(),
  role: Yup.string()
    .label('Role')
    .oneOf([Role.OWNER, Role.EDITOR, Role.VIEWER])
    .required(),
}).required();

export default addMemberSchema;
