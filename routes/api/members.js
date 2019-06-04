const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')



//! gets all members
router.get('/', (req, res) => res.json(members))

//! get single member

router.get('/:id', (req,res)=> {

  const found = members.some(member => member.id === parseInt(req.params.id))
  if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`})
  }
  })

//! create member 
router.post('/', (req, res)=> {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
    status: "active"
  }

  if(!newMember.name || !newMember.age){
    return res.status(400).json({msg: "Please include name and age"})
  } 

  members.push(newMember);
  //* for pure jason
  // res.json(members);
  //*or to render
  res.redirect('/')

});

//! update a member

router.put('/:id', (req,res)=> {

  const found = members.some(member => member.id === parseInt(req.params.id))


  if(found){
    const updMember = req.body;
    members.forEach(member => {
      if(member.id === parseInt(req.params.id)){
        member.name = updMember.name ? updMember.name: member.name;
        member.age = updMember.age ? updMember.age: member.age;

        res.json({msg: "Member has been update", member: member})
      }
    })
  } else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`})
  }
  })

  //! delete member 
  router.delete('/:id', (req,res)=> {

    const found = members.some(member => member.id === parseInt(req.params.id))


    if(found){
      res.json({
        msg: "member Deleted", 
        members: members.filter(member => member.id !== parseInt(req.params.id))})
    } else {
      res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
    })
  module.exports = router