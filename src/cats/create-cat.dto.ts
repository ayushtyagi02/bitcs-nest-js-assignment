import * as Joi from 'joi';

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

export const CreateCatSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  age: Joi.number().integer().min(0).required(),
  breed: Joi.string().min(2).max(30).required(),
});
