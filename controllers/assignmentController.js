const Assignment = require('../model/assignmentModel');

exports.createAssignment = async(req, res, next) => {
    try{
        const { courseId, studentId, title, description, score } = req.body;

        const assignmentData = {
            courseId:[courseId],
            studentId:[studentId],
            title, 
            description,
            score
        };

        const assignment = new Assignment(assignmentData);
        await assignment.save();

        console.log(assignment);

        res.status(201).json({
            success: true,
            assignment
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
};

exports.getAllAssignments = async (req, res) => {
    try {
      const assignments = await Assignment.find({
        course_id: { $ne: [] },
        student_id: { $ne: [] },
      }).populate("courseId") // Populate the course_id field with Course objects
      .exec();
      const count = assignments.length;
      console.log("Number of docs:", count);
      res.json({ assignments, count });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  };
  

exports.getAssignment = async(req,res) => {
    try{
        let assignment = await Assignment.findById(req.params.id);
        res.json(assignment);
    }catch(err) {
        res.status(400).json({ error: err.message });
    }
}

exports.updateAssignmentById = async (req, res, next) => {
    try {
      const { title, description, courseId, studentId, score } = req.body;
      const assignmentId = req.params.id;
  
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        assignmentId,
        { title, description, courseId, studentId, score },
        { new: true }
      );
  
      if (!updatedAssignment) {
        return res.status(404).json({ msg: 'Assignment not found' });
      }
  
      res.json(updatedAssignment);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  };
  

  exports.deleteAssignment = async (req, res) => {
    try {
      const assignment = await Assignment.findById(req.params.id);
    
      await assignment.deleteOne();
      res.status(200).json({ msg: 'Assignment deleted successfully' });
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  };
  


