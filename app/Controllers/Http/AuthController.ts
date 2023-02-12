import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"
import RegisterValidator from "App/Validators/RegisterValidator"

export default class AuthController {
  public async register({request,response}:HttpContextContract){
    
    const data =await request.validate(RegisterValidator)
    try{
      const user = await User.create(data)
      response.created(user)
    }catch(error){
      response.status(503).send({
        Message:"Service Unavailable"
      })
    }
  }


  public async login({request,response,auth}:HttpContextContract){
    const email=request.input('email')
    const password=request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return response.send(token.toJSON())
    } catch {
      return response.unauthorized('Invalid credentials')
    }  
  }

}
