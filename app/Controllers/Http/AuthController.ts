import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"
import RegisterValidator from "App/Validators/RegisterValidator"

export default class AuthController {
  public async register({request,response}:HttpContextContract){
    
    const data =await request.validate(RegisterValidator)
    try{
      const user = await User.create(data)
      return response.created(user)
    }catch(error){
      return response.status(503).send({
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


  public async logout({response,auth}:HttpContextContract){
    try{
      await auth.use('api').logout()
      return response.status(200).send({
        message:"Logged Out!"
      })
    }catch(error){
      return response.conflict({
        Message:'Request could not be completed due to a conflict with the current state of the target resource.'
      })
    }
  }

}
