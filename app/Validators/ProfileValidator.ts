import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileValidator {
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
    full_name:schema.string.optional({},[
      rules.maxLength(30),
      rules.minLength(3),
      rules.regex(/^[a-zA-Z ]{3,30}$/)

    ]),
    contact_number:schema.string.optional([
      rules.regex(/^([+]\d{2})?\d{10}$/),
      rules.unique({ table: 'profiles', column: 'contact_number' }),

    ]),
    gender:schema.enum.optional( ['MALE', 'FEMALE'] as const),
    date_of_birth:schema.date.optional({
      format:'dd-MM-yyyy'
    })

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

  }
}
