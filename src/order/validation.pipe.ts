import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}

export const newOrderValidation = new JoiValidationPipe(
  Joi.object({
    name: Joi.string()
      .regex(/^[\sa-zA-Z]+$/, 'alphabets')
      .required(),
    address: Joi.string().required(),
  }),
);

export const updateOrderValidation = new JoiValidationPipe(
  Joi.object({
    id: Joi.string().uuid(),
    address: Joi.string().required(),
  }),
);
