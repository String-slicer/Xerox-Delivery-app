const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      default: null, // Assigned later
    },
    deliveryPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
      default: null, // Assigned later
    },
    documents: [
      {
        name: { type: String, required: true }, // Document name
        fileHash: { 
          type: String, 
          required: true 
        }, // File URL or path
        folderType: {
          type: String,
          enum: [
            "None",           // No folder
            "Folder with Pocket",  // Folder with pocket
            "Clip Folder",    // Simple clip folder
            "Folder with Elastic", // Folder with elastic closure
            "Ring Binder",    // A folder with ring binder
            "Presentation Folder" // A professional presentation folder
          ],
          default: "None", // Default is no folder
        },
        folderColor: {
          type: String,
          enum: [
            "Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Gray", "Purple", "Brown"
          ],
          default: "Black", // Default color is Black
        },
        copies: { type: Number, required: true }, // Number of copies
        size: { 
          type: String, 
          enum: ["A4", "A3", "Letter", "Legal"], // Add more sizes if required
          required: true 
        },
        color: { type: String
            , 
            enum: ["Color", "Black & White"],
            default: "black & white",
            required:true,
        }, // Color or B/W for printing
        binding: {
          type: String,
          enum: ["None", "Spiral", "Hardcover", "Softcover"],
          default: "None",
        },
        lamination: {
          type: String,
          enum: ["None", "Glossy", "Matte"],
          default: "None",
        },
        paperQuality: {
          type: String,
          enum: [
            "Standard",    // Basic quality
            "Premium",     // High-quality paper
            "Recycled",    // Eco-friendly recycled paper
            "Bond Paper",  // Smooth and durable
            "Cardstock",   // Thicker, ideal for covers
            "Parchment",   // Textured and elegant
            "Glossy Paper" // Shiny finish, ideal for photos
          ],
          default: "Standard",
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "In Progress", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Pending",
    },
    deliveryAddress: {
      type: String,
      required: false,
    },
    deliverylocation: {
      ltd: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
    deliveredAt: {
      type: Date,
      default: null, // Updated upon delivery
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    paymentId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
