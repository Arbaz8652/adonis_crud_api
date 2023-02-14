import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileValidator {
  constructor(protected ctx: HttpContextContract) {

  }

  public schema = schema.create({
    full_name:schema.string({},[
      rules.maxLength(30),
      rules.minLength(3),
      rules.regex(/^[a-zA-Z ]{3,30}$/)
    ]),
    contact_number:schema.string([
      rules.regex(/^([+]\d{2})?\d{10}$/),
      rules.unique({ table: 'profiles', column: 'contact_number' }),
    ]),
    gender:schema.enum( ['MALE', 'FEMALE'] as const),
    date_of_birth:schema.date({
      format:'dd-MM-yyyy'
    })

  })

  public messages: CustomMessages = {
    'full_name.maxLength':"full_name cannot have more than 30 characters",
    'full_name.minLength':`{{field}} must contain atleast 3 characters`,
    'full_name.regex':"full_name cannot contain special characters or numbers",
    'contact_number.regex':"contact_number cannot contain special characters",
    'contact_number.unique':"This number is already registered!",
    'gender.enum':"Gender should be one of [MALE,FEMALE]",
    'date_of_birth.date':"date_of_birth should a valid date and format = DD-MM-YYYY",
  }
}
