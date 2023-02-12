import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  
}
