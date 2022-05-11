const Workout = require('../models/workoutModel');
const User = require('../models/userModel');

const scheduleWorkouts = async (req, res) => {
  const userId = await User.findOne({ email: req.body.username });

  const mongooseObject = {
    workoutScheduledDate: req.body.workoutDate,
    user: userId.id,
    duration: parseInt(req.body.duration, 10),
    workoutName: req.body.exerciseName,
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

const deleteWorkouts = async (req, res) => {
  const workout = await Workout.find();
  console.log(workout);
  res.send('hello');
};

module.exports = {
  scheduleWorkouts,
  upcomingWorkouts,
  deleteWorkouts,
};
