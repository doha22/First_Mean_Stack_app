const router = require('express').Router();
let user = require('../models/user');


// list all employee
router.route('/').get((req, res) => {
  user.find()

    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});



// adding employee

// router.route('/create').post((req, res) => {


//  const username = req.body.username ;
//  const department = req.body.department ;
//  const position = req.body.position ;
//  const date = req.body.date ;
//  const mobile = req.body.mobile ;


 
//  const newuser = new user({
//      username,
//      department,
//      position ,
//      mobile ,
//      date,
   

//     })


// // save the user to db
//     newuser.save()
//       .then(users => res.json('user added successfuly'))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });


// Add Employee
router.route('/create').post((req, res, next) => {
  user.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

////////////////////////////////////////////////////////////////

// Get single employee
router.route('/read/:id').get((req, res) => {
  user.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update employee
router.route('/update/:id').put((req, res, next) => {
  user.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
     
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete employee
router.route('/delete/:id').delete((req, res, next) => {
  user.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})




module.exports = router;