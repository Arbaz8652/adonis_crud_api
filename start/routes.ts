import Route from '@ioc:Adonis/Core/Route'

Route.post('/register','AuthController.register' )
Route.post('/login','AuthController.login')

Route.group(()=>{

  Route.group(()=>{
    Route.post('/profile','ProfilesController.createUserProfile')
    Route.get('/profile','ProfilesController.getUser')
    Route.patch('/profile','ProfilesController.updateProfile')
    Route.delete('/profile/:mobile','ProfilesController.deleteUserAndProfile')
  }).prefix('/user')

  Route.post('/logout','AuthController.logout')
}).middleware('auth')
