const socketIo = require('socket.io');
const userModel = require('./models/User');
const captainModel = require('./models/Captain');
const storeModel=require('./models/Store');
const orderModel = require('./models/Orders');
let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            else if(userType==='store'){ 
                await storeModel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log("Store connected")
            }
        });


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            console.log("captain location updated")

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });
        socket.on('update-location-store', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await storeModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
            console.log("store location updated");
        });
        socket.on('find-captain', async (payload) => {
            console.log("Received 'find-captain' message:", payload);
            const { orderId, range } = payload;

            // Find the store's location
            const store = await storeModel.findById(payload.userId);
            if (!store || !store.location) {
                console.log("store not found")
                return socket.emit('error', { message: 'Store location not found' });
            }

            const { ltd, lng } = store.location;
            orderModel.findByIdAndUpdate(orderId, { status: 'Pending' , storeId: store._id});

            // Find captains within the specified range
            // const captains = await captainModel.find({
            //     location: {
            //         $geoWithin: {
            //             $centerSphere: [ [ lng, ltd ], 10/ 6371 ] // Convert km to radians
            //         }
            //     }
            // });
            
            const captains= await captainModel.find({});
            if (captains.length > 0) {
                // Send a message to each captain's socket ID
                console.log(captains)
                captains.forEach(captain => {
                    if (captain.socketId) {
                        io.to(captain.socketId).emit('newOrder', { orderId, storeId: store._id });
                    }
                });

                // Notify the store that captains have been found
                socket.emit('captainsFound', { orderId, captains });
            } else {
                // Notify the store that no captains were found
                console.log("no captain")
                socket.emit('noCaptainsFound', { orderId });
            }
        });

        socket.on('order-accepted-captain', async (data) => {
            const { orderId, captainId } = data;
            console.log(`Order ${orderId} accepted by captain ${captainId}`);
        
            // Find the order
            const order = await orderModel.findById(orderId);
            if (!order) {
                return socket.emit('error', { message: 'Order not found' });
            }
        
            // Check if the order is already accepted by another captain
            if (order.deliveryPartnerId && order.deliveryPartnerId.toString() !== captainId) {
                return io.to(captainId).emit('error', { message: 'Order already accepted by another captain' });
            }
            // Update the order with the captain's ID and set status to 'Accepted'
            order.deliveryPartnerId = captainId;
            order.status = 'Accepted';
            await order.save();
        
            // Notify the captain and store about the acceptance
            socket.emit('orderAccepted', { orderId });
            if (order.storeId) {
                const store = await storeModel.findById(order.storeId);
                if (store && store.socketId) {
                    io.to(store.socketId).emit('orderStatusUpdate', { orderId, status: 'Accepted' });
                }
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject);
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };