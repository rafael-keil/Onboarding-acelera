import {
  IsNumberOptions,
  ValidationOptions,
  IsEmail as _IsEmail,
  IsNotEmpty as _IsNotEmpty,
  IsNumber as _IsNumber,
  IsOptional as _IsOptional,
  IsString as _IsString,
  Matches as _Matches,
  MinLength as _MinLength,
} from 'class-validator'

import { VALIDATION_MESSAGE_BUILDER } from '@core/constants'

const IsNumber = (
  isNumberOptions?: IsNumberOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  const message = VALIDATION_MESSAGE_BUILDER.isNumber()
  return _IsNumber(isNumberOptions, { ...validationOptions, message })
}

const IsNotEmpty = (validationOptions?: ValidationOptions): PropertyDecorator => {
  const message = VALIDATION_MESSAGE_BUILDER.isNotEmpty()
  return _IsNotEmpty({ ...validationOptions, message })
}

const IsOptional = (validationOptions?: ValidationOptions): PropertyDecorator => {
  const message = VALIDATION_MESSAGE_BUILDER.isOptional()
  return _IsOptional({ ...validationOptions, message })
}

const IsString = (validationOptions?: ValidationOptions): PropertyDecorator => {
  const message = VALIDATION_MESSAGE_BUILDER.isString()
  return _IsString({ ...validationOptions, message })
}

const IsEmail = (validationOptions?: ValidationOptions): PropertyDecorator => {
  const message = VALIDATION_MESSAGE_BUILDER.isEmail()
  return _IsEmail(undefined, { ...validationOptions, message })
}

const MinLength = (min: number, validationOptions?: ValidationOptions): PropertyDecorator => {
  const message = VALIDATION_MESSAGE_BUILDER.minLength(min)
  return _MinLength(min, { ...validationOptions, message })
}

const Matches = (pattern: RegExp, validationOptions?: ValidationOptions): PropertyDecorator => {
  const message = VALIDATION_MESSAGE_BUILDER.matches()
  return _Matches(pattern, { ...validationOptions, message })
}

export { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength }
