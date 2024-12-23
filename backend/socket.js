const socketIo = require('socket.io');
const userModel = require('./models/User');
const captainModel = require('./models/Captain');
const storeModel = require('./models/Store');
const orderModel = require('./models/Orders');
let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
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
            } else if (userType === 'store') {
                await storeModel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log("Store connected");
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            console.log("captain location updated");

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
            const orders = await orderModel.find({
                deliveryPartnerId: userId,
                status: { $in: ["Accepted", "In Progress", "Out for Delivery"] }
            }).populate('userId');

            orders.forEach(order => {
                console.log("captain location updated to customer");
                if (order.userId && order.userId.socketId) {
                    io.to(order.userId.socketId).emit('captainLocationUpdate', { location });
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
                console.log("store not found");
                return socket.emit('error', { message: 'Store location not found' });
            }

            const { ltd, lng } = store.location;
            const order = await orderModel.findByIdAndUpdate(orderId, { status: 'Pending', storeId: payload.userId }, { new: true });
            const orderdetails = await order.populate('userId');
            const orderdetailswithstore = await orderdetails.populate('storeId');

            const captains = await captainModel.find({});
            if (captains.length > 0) {
                // Send a message to each captain's socket ID
                console.log(captains);
                captains.forEach(captain => {
                    if (captain.socketId) {
                        io.to(captain.socketId).emit('newOrder', { orderdetailswithstore });
                    }
                });

                // Notify the store that captains have been found
                socket.emit('captainsFound', { orderId, captains });
            } else {
                // Notify the store that no captains were found
                console.log("no captain");
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
            console.log(order);

            // Notify the captain and store about the acceptance
            socket.emit('orderAccepted', { orderId });
            console.log("hello");
            if (order.storeId) {
                console.log("store id" + order.storeId);
                const store = await storeModel.findById(order.storeId);
                if (store && store.socketId) {
                    console.log("store id" + store.socketId);
                    io.to(store.socketId).emit('orderStatusUpdate', { orderId, status: 'Accepted' });
                }
            }
            // notify user about the order status
            const user = await userModel.findById(order.userId);
            if (user && user.socketId) {
                io.to(user.socketId).emit('orderStatusUpdate', { orderId, status: 'Accepted' });
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

const sendNewOrderToStores = async (order) => {
    const stores = await storeModel.find({});
    stores.forEach(store => {
        if (store.socketId) {
            console.log(stores);
            sendMessageToSocketId(store.socketId, {
                event: 'newOrder',
                data: order
            });
        }
    });
}

module.exports = { initializeSocket, sendMessageToSocketId, sendNewOrderToStores };