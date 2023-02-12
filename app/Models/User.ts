import { DateTime } from 'luxon'
import { BaseModel, column ,HasOne,hasOne} from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public email:string

  //Should not return password
  @column({serializeAs:null})
  public password:string


  @column.dateTime({ autoCreate: true ,serialize:(value:DateTime)=>value.toFormat('dd LLL yyyy')})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true,serialize:(value:DateTime)=>value.toFormat('dd LLL yyyy') })
  public updatedAt: DateTime

  @hasOne(() => Profile, {
    foreignKey: 'userId',
  })
  public profile: HasOne<typeof Profile>

  
}
