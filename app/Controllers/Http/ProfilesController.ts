import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import ProfileValidator from 'App/Validators/ProfileValidator'

export default class ProfilesController {


  public async createUserProfile({request, response,auth}:HttpContextContract){

    const userId = auth.use('api').user!.id
    const email = auth.use('api').user!.email

    const payload = await request.validate(ProfileValidator)

    try{
      //becouse userId must be unique user cannot create his profile twice
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
      response.send({
        message:"Profile Already Existed !",
        error:e
      })
    }
  }


  public async getUser({response,auth}:HttpContextContract){

    const userId = auth.use('api').user!.id
    try{
      const profile = await Profile.findByOrFail('user_id', userId)
      return response.status(200).send(profile)
    }catch(e){
      return response.notFound({
        Message:"Profile Not Found!"
      })
    }
  }



  public async updateProfile({request,response,params}:HttpContextContract){

    const payload = await request.validate(ProfileValidator)

    try{
      const profile = await  Profile.findByOrFail("contact_number",params.id)

      profile.fullName=request.input('full_name')
      profile.gender=payload.gender
      profile.contactNumber=payload.contact_number
      profile.dateOfBirth=payload.date_of_birth
      profile.save()

      return response.send(profile) 


    }catch(error){
      response.notFound({
        Message:"Profile Not Found!"
      })
    }

  }

}
