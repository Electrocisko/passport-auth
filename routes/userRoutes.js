import {Router} from 'express';

const router = Router();


router.post('/login/password',(req,res) => {
    const {username, password} = req.body;
    if(username!= "zuchi" || password != "qwerty") {
      return res.redirect('/');
    }
    req.session.user = username;
    return res.redirect('/')
  })

  router.get('/logout', (req,res) => {
    req.session.destroy( (error) => {
      if (error) return res.json({
        status:'error',
        message: 'Logout Error'
      })
      return res.redirect('/')
    })
  })

 router.post('/signup', (req,res) => {
    const {username, password} = req.body;
    return res.json({
      status: "success",
      message: "Aca va el registro",
      username,
      password
    })
  })


  export default router;