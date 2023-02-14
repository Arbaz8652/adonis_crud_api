import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:null})
  public userId:number

  @column()
  public fullName:string

  @column()
  public email:string

  @column()
  public gender:string

  @column({serializeAs:null})
  public contactNumber: string

  @column()
  public dateOfBirth:DateTime

  @column.dateTime({ serializeAs:null,autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({serializeAs:null, autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>User,{
    localKey:'userId'
  })
  public user:BelongsTo<typeof User>
}
