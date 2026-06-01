const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Root route - information about the server
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello! I am your server, ready to receive tasks.',
    instructions: 'Send a POST request to /task with a JSON body to give me a task.'
  });
});

// Task handling route
app.post('/task', (req, res) => {
  const task = req.body;

  if (Object.keys(task).length === 0) {
    return res.status(400).json({
      error: 'No task provided. Please send a JSON body with your task.'
    });
  }

  console.log('Received a task:', task);

  // In a real application, you would process the task here.
  // For this demonstration, we'll just acknowledge and echo it back.
  res.status(200).json({
    message: 'Task received and acknowledged!',
    receivedTask: task,
    status: 'pending_processing' // Or 'completed', 'failed', etc. based on actual processing
  });
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested URL ${req.originalUrl} was not found on this server.`
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Try accessing http://localhost:${PORT} in your browser.`);
  console.log(`To send a task, use a POST request to http://localhost:${PORT}/task with a JSON body.`);
});
