const Course = require('../model/courseModel');

exports.createCourse = async(req,res) => {
    const course = new Course({
        name: req.body.name,
        teacher: req.body.teacher
    });
    try{
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch(err){
        res.status(400).json({msg: err.message});
    }
}

exports.getAllCourse = async(req, res) => {
//   try{
//     const course = await Course.find();
//     if(!course) return res.status(401).json({msg: 'Course not found'});
//     res.status(200).json(course);
//   } catch(err) {
//     res.status(500).json({msg: err.message});
//   }


// to count the number of documents in course and getting all the documents in the course 
try {
    const course = await Course.find().exec();
    const count = await Course.countDocuments().exec();
    console.log("Number of docs:", count);
    res.json({ course, count });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "An error occurred" });
  }
}


exports.getCourse = async(req, res) => {
    try{
        const course =  await Course.findOne();
        res.json(course);
    }catch(err) {
        res.status(400).json({ error: err.message});
    }
}


exports.updateCourse = async(req, res) => {
    try{
        let course = await Course.findById(req.params.id);
        if(!course) res.status(404).json({msg: "Not found"});
        course = await Course.findById(req.params.id, req.body);
        res.status(200).json(course);
    }catch(err){
        res.status(404).json({ error: err.message});
    }
} 


exports.deleteCourse = async(req,res)=> {
    try{
        const course = await Course.findById(req.params.id);
        if(!course) res.status(404).json({msg: "Could not delete"});
        await Course.deleteOne();
        res.status(200).json({msg: 'Course deleted successfully'});
    } catch (err) {
        res.status(404).json({msg: err.message});
    }
}

