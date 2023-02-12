import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import ProfileValidator from 'App/Validators/ProfileValidator'

export default class ProfilesController {


  public async createUser({request, response,auth}:HttpContextContract){

    const userId = auth.use('api').user!.id
    const email = auth.use('api').user!.email
    const payload = await request.validate(ProfileValidator)

    try{
      const newProfile = await Profile.create({
        userId:userId,
        fullName:payload.full_name,
        email:email,
        gender:payload.gender,
        contactNumber:payload.contact_number,
        dateOfBirth: payload.date_of_birth
      })
      response.created(newProfile)

    }catch(e){
      response.status(409).send({
        message:"For one user only one profile can be made",
        error:e
      })
    }
  }


}
