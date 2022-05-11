const Workout = require('../models/workoutModel');
const User = require('../models/userModel');

const scheduleWorkouts = async (req, res) => {
  const userId = await User.findOne({ email: req.body.username });

  console.log(req.body);

  const mongooseObject = {
    workoutScheduledDate: req.body.workoutDate,
    user: userId.id,
    duration: parseInt(req.body.duration, 10),
    workoutName: req.body.exerciseName,
    category: req.body.category,
  };

  const workout = new Workout(mongooseObject);

  try {
    await workout.save();
    res.status(201);
  } catch (error) {
    console.log(error);
    res.send(`Workout could not be scheduled! Try again. ${error.message}`);
  }
};

const upcomingWorkouts = async (req, res) => {
  const workouts = await Workout.find();

  console.log(workouts);
  res.send(workouts);
};

module.exports = {
  scheduleWorkouts,
  upcomingWorkouts,
};
