const router = require("express").Router();
const Student = require("../models/Student");
let student = require("../models/Student");


// create of the CRUD
router.route("/add").post((req, res)=> {
    const name = req.body.name
    const age = Number(req.body.age); 
    const gender = req.body.gender;

    const newStudent = new Student({
        name,age,gender
    })

    newStudent.save().then(() => {
        res.json("Student Added");
    }).catch((err) => {
        console.log(err);
    })
});

// REAd of the CRUD
router.route("/").get((req, res) => {
    //body
    Student.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err)
    })
})

//Update Of the CRUD
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    //easy method
    //by destructuing
    const { name, age, gender } = req.body;
    
    const updateStudent = {
        name,
        age,
        gender
    }
    //async wiats till promise to wait
    const update = await Student.findByIdAndUpdate(userId, updateStudent).then(() => {
        res.status(200).send({ status: "User Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ ststus: "Error With Updating" , error:err.message});
    });
   
})

//Delete Of The CRUD
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    const deletes = await Student.findByIdAndRemove(userId).then(() => {
        res.status(200).send({ status: "User Deleted" })
    }).catch((err) => {
        res.status(500).send({ status: "Error with Deleting ", errro: err.message });
    });
})

//Fetch Student by ID
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const fetch = await Student.findById(userId).then((nts) => {
        res.status(200).send({ stus: "User Fetched",nts})
    }).catch((err) => {
        res.status(500).send({ stat: "Error fetching", err: err.message });
    });
})


module.exports = router;