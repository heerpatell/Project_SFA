const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const port = 5000; // Use the same port for both HTTP and WebSocket

const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://heerpatel291:m5KyN7OLLpObqPvY@cluster0.h8ra2k6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

// Import and use routes
const generateLink = require('./routes/GenerateLink');
app.use('/generate', generateLink);

// Create HTTP server and attach WebSocket server
const server = http.createServer(app);

// Configure Socket.io server with proper CORS settings
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let participantsReachedScreen11 = 0;
const totalParticipants = 4; // Ensure this value matches your needs

// Maintain a set of connected clients to avoid counting duplicates
const participants = new Set();

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Add socket to the participants set
    participants.add(socket.id);
    socket.hasEmitted = false;

    // Listen for 'screen11-reached' event
    socket.on('screen11-reached', () => {
        console.log('screen11-reached event received');

        // Check if the participant is already counted
        console.log(64, socket.hasEmitted)
        if (!socket.hasEmitted) {
            participantsReachedScreen11++;
            // socket.hasEmitted = true; // Mark this socket as having emitted the event
            
            // console.log(69, participantsReachedScreen11)
            io.emit('update-count', participantsReachedScreen11);

            // Check if the threshold is reached
            if (participantsReachedScreen11 >= totalParticipants) {
                participantsReachedScreen11 = 0;
                io.emit('threshold-reached');
            }
        }
    });
    socket.on('nextto15normal', ({participant})=>{
        io.emit('moveto15',{participant}); 
    })
    socket.on('nextto15Pre', ()=>{
        io.emit('moveto12'); 
    })
    socket.on('nextto15post',(data)=>{
        const { currentPnumber } = data;
        socket.emit('movetoWaiting', { currentPnumber });
        socket.broadcast.emit('moveto15Post', { exceptPnumber: currentPnumber });
    })
    socket.on('nextto14', (data) => {
        const { currentPnumber } = data;
    
        // Emit event to move current participant to the waiting screen
        socket.emit('movetoWaiting', { currentPnumber });
    
        // Broadcast event to move all other participants to screen 14
        socket.broadcast.emit('moveto14', { exceptPnumber: currentPnumber });
    });

    socket.on('nextto13',()=>{
        if (!socket.hasEmitted) {
            io.emit('moveto13')
        }
    })
    socket.on('nextto17',()=>{
        io.emit('moveto17')
    })
    socket.on('nextto18',()=>{
        io.emit('moveto18')
    })
    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');

        // Remove socket from participants set and reset its flag
        participants.delete(socket.id);
        socket.hasEmitted = false; // Reset for future use
    });
});

// Start the server
server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
