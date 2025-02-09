import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import './WorkoutDropdown.css';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';

function WorkoutDropdown() {
  const state = sessionStorage.getItem('item_key');

  console.log(`State passed in Workout Dropdown ${state}`);

  const [listOfExercises, setExercise] = useState([]);
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        console.log('list of exercises');
        const response = await axios.get('http://localhost:3001/exercises', {
          params: { user: state },
        });
        return setExercise(response.data);
      } catch (error) {
        return console.log('Could not get list of exercises.', error.message);
      }
    };
    handleSubmit();
  }, []);

  const names = listOfExercises.map((x) => x.name);
  const uniqueNames = [...new Set(names)];
  const category = listOfExercises.map((x) => x.category);
  const uniqueCategory = [...new Set(category)];
  console.log(uniqueNames);

  console.log(listOfExercises);

  const [selectExercise, setSelectExercise] = useState({
    date: '',
    name: '',
    duration: '',
    category: '',
    username: state,
  });

  const handleChange = (newValue) => {
    if (typeof newValue.target === 'undefined') {
      setSelectExercise({
        ...selectExercise,
        date: newValue,
      });
    } else {
      setSelectExercise({
        ...selectExercise,
        [newValue.target.name]: newValue.target.value,
      });
    }
  };

  const handleSubmitSelectExercise = async () => {
    try {
      await axios.post('http://localhost:3001/workouts', selectExercise);
    } catch (error) {
      console.log('Exercise could not be saved.', error.message);
    }
  };

  const notify = () => {
    toast.success('Workout successfully scheduled!', {
      // position: 'top-left',
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      padding: 10,
      icon: '🔥',
    });
  };

  // Change the colour for the date and time selection ball

  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: '#e65100',
      },
    },
  });

  return (
    <div>
      <div className="Select-container">
        <div className="schedule-container">
          <div>
            <h2>Select Exercise</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitSelectExercise();
                notify();
              }}
            >
              <ThemeProvider theme={theme}>
                <div className="calendar" sx={{ minWidth: 120 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DateTimePicker
                        disablePast
                        name="date"
                        label="Select Date & Time"
                        value={selectExercise.date}
                        onChange={handleChange}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </ThemeProvider>
              <div>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="name-label">Exercise</InputLabel>
                    <Select
                      className="name"
                      labelId="name-label"
                      name="name"
                      label="Name"
                      value={selectExercise.name}
                      onChange={handleChange}
                    >
                      {uniqueNames.map((ex) => (
                        <MenuItem value={ex}>{ex}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    {/* <option>Category</option> */}
                    <Select
                      className="category"
                      labelId="category-label"
                      name="category"
                      label="category"
                      value={selectExercise.category}
                      onChange={handleChange}
                    >
                      {uniqueCategory.map((ex) => (
                        <MenuItem value={ex}>{ex}</MenuItem>
                      ))}
                      {/* <MenuItem value='Cardio'>Cardio</MenuItem>
                      <MenuItem value='Interval'>Interval</MenuItem>
                      <MenuItem value='Strength'>Strength</MenuItem>
                      <MenuItem value='Stretching'>Stretching</MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="duration-label">Duration</InputLabel>
                    <Select
                      className="duration"
                      labelId="duration-label"
                      name="duration"
                      label="Duration"
                      value={selectExercise.duration}
                      onChange={handleChange}
                    >
                      <MenuItem value="5 min">5 min</MenuItem>
                      <MenuItem value="10 min">10 min</MenuItem>
                      <MenuItem value="15 min">15 min</MenuItem>
                      <MenuItem value="20 min">20 min</MenuItem>
                      <MenuItem value="30 min">30 min</MenuItem>
                      <MenuItem value="40 min">40 min</MenuItem>
                      <MenuItem value="45 min">45 min</MenuItem>
                      <MenuItem value="60 min">60 min</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <ToastContainer />
              </div>
              <input className="submit" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutDropdown;
