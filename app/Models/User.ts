import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column ,HasOne,hasOne} from '@ioc:Adonis/Lucid/Orm'
import  Hash  from '@ioc:Adonis/Core/Hash'
import Profile from './Profile'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public email:string

  //Should not return password
  @column({serializeAs:null})
  public password:string


  @column.dateTime({serializeAs:null, autoCreate: true ,serialize:(value:DateTime)=>value.toFormat('dd LLL yyyy')})
  public createdAt: DateTime

  @column.dateTime({serializeAs:null, autoCreate: true, autoUpdate: true,serialize:(value:DateTime)=>value.toFormat('dd LLL yyyy') })
  public updatedAt: DateTime

  @hasOne(() => Profile, {
    foreignKey: 'userId',
  })
  public profile: HasOne<typeof Profile>

  @beforeSave()
  public static async hashPassword(user:User){
    if(user.$dirty.password){
      user.password = await Hash.make(user.password)
    }
  }
}
