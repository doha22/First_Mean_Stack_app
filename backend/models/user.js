const mongoos = require('mongoose');
// create the schema for user 
const Schema = mongoos.Schema ;


const employeeSchema = new Schema({

  username: { type: String, required: true },
  department : { type: String }   ,
  position :  { type: String  }, 
  mobile :  { type: Number }, 
  
 date: { type: Date , default: Date.now },

}, {
  timestamps: true,

});




const employee = mongoos.model('employee', employeeSchema);



module.exports = employee ;

