import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {

  }

  public schema = schema.create({
    email:schema.string({},[
      rules.email(),
      rules.unique({table:'users',column:'email'})
    ]),
    password:schema.string({},[
      rules.confirmed(),
      rules.regex(/^[a-zA-Z0-9!@#$%^&*]{8,16}$/)
    ])
  })
 
  public messages: CustomMessages = {
    "email.unique":"User already exists with this email",
    "password.regex":"Invalid Password"
  }
}
