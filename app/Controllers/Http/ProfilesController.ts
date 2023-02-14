import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import ProfileValidator from 'App/Validators/ProfileValidator'
import UpdateValidator from 'App/Validators/UpdateValidator'

export default class ProfilesController {
  public async createUserProfile({request, response,auth}:HttpContextContract){
    const userId = auth.use('api').user?.id 
    const email = auth.use('api').user?.email
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
    const payload = await request.validate(UpdateValidator)
    try{
      const profile = await  Profile.findByOrFail("contact_number",params.id) 
      if(payload.full_name){
        profile.fullName=payload.full_name
      }
      if(payload.gender){
        profile.gender=payload.gender
      }
      if(payload.contact_number){
        profile.contactNumber=payload.contact_number
      }
      if(payload.date_of_birth){
        profile.dateOfBirth=payload.date_of_birth
      }
      profile.save()
      return response.send(profile) 
    }catch(error){
      response.notFound({
        Message:"Profile Not Found!"
      })
    }
  }

  public async deleteUserAndProfile({response,params,auth}:HttpContextContract){
    const userId = auth.use('api').user!.id
    try{
      const profile = await Profile.findByOrFail('contact_number',params.mobile)
      const user = await User.findOrFail(userId)
      await auth.logout()
      await profile.delete()
      await user.delete()
      return response.status(200).send({message:"Profile and User has been deleted..!",...profile.$original})
    }catch(error){
      return response.notFound({
        Message:"Profile Not Found!"
      })
    }
  }
  
}
