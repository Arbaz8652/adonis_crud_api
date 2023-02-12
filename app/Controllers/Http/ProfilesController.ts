import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class ProfilesController {


  public async createUser({request, response}:HttpContextContract){

    const user = await Profile.create({
      email:request.input('email'),
      dateOfBirth:request.input('password')  
    })

    return response.status(200).send(user)    
  }


  public async create({request, response}:HttpContextContract){

    const newProfile = await Profile.create({
      userId:1,
      fullName:request.input('full_name'),
      email:"asrv@gmail.com",
      gender:request.input("gender"),
      contactNumber:request.input('contact_number'),
      dateOfBirth:request.input('dop')  
    })

    return response.status(200).send(newProfile)    
  }

}
