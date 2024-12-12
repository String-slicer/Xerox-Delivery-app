
const sendNotification = (storeId, title, message) => {
  // Implement notification logic here (e.g., using a messaging service)
  console.log(`Notification sent to store ${storeId}: ${title} - ${message}`);
};

module.exports = { sendNotification };