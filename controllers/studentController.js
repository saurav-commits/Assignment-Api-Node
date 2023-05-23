// const Student = require("../model/studentModel");

// exports.createStudent = async (req, res, next) => {

//     //getting the id of the user and saving it before saving the product
//     req.body.course = req.course.id

//     const student = await Student.create(req.body);
//     console.log(req.body);
//     res.status(201).json({
//         success: true,
//         student,
//     });

// };

const Student = require("../model/studentModel");

exports.createStudent = async (req, res, next) => {
  try {
    const { name, email, course } = req.body;

    const studentData = {
      name,
      email,
      courses: Array.isArray(course) ? course : [course] // Convert to array if not already an array
    };

    const student = new Student(studentData);
    await student.save();

    console.log(student);

    res.status(201).json({
      success: true,
      student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};


exports.getAllStudents = async(req, res, next) => {
    try {
    
            const student = await Student.find().exec();
            const count = await Student.countDocuments().exec();
            console.log("Number of docs:", count);
            res.json({ student, count });
    
    }catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Server Error"
    });
}
}

exports.getStudentById = async(req, res, next) => {
    try{
        let student = await Student.findById(req.params.id);
        if(!student) res.status(404).json({msg: "Not found"});
        res.json(student);
    }catch(error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}

exports.updateStudentById = async (req, res, next) => {
    try {
      const { name, email, courses } = req.body;
  
      let student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ msg: "Not found" });
      }
  
      // Filter out duplicate course IDs
      const uniqueCourses = [...new Set([...student.courses, ...courses])];
  
      student.name = name;
      student.email = email;
      student.courses = uniqueCourses; // Update courses array with unique course IDs
  
      await student.save();
  
      res.json(student);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  };
  

  exports.deleteStudentById = async(req, res, next) => {
    try{
        const student = await Student.findById(req.params.id);
        if(!student) res.status(404).json({msg: "Could not delete"});
        await Student.deleteOne();
        res.status(200).json({msg: 'Student deleted successfully'});
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
  }