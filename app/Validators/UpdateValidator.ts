import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    full_name:schema.string.nullableAndOptional({},[
      rules.maxLength(30),
      rules.minLength(3),
      rules.regex(/^[a-zA-Z ]{3,30}$/),
    ]),
    contact_number:schema.string.nullableAndOptional([
      rules.regex(/^([+]\d{2})?\d{10}$/),
      rules.unique({ table: 'profiles', column: 'contact_number' }),
    ]),
    gender:schema.enum.nullableAndOptional( ['MALE', 'FEMALE'] as const),
    date_of_birth:schema.date.nullableAndOptional({format:'dd-MM-yyyy'})
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
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
