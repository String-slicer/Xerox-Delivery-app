import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import {useSelector} from "react-redux";

function OrderForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    documents: [
      {
        name: '',
        file: null,
        fileHash:'',
        folderType: 'None',
        folderColor: 'Black',
        copies: 1,
        size: 'A4',
        color: 'Black & White',
        binding: 'None',
        lamination: 'None',
        paperQuality: 'Standard',
      },
    ],
  });

  const handleDocumentChange = (index, e) => {
    const { name, value, type, files } = e.target;
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index] = {
      ...updatedDocuments[index],
      [name]: type === 'file' ? files[0] : value,
    };
    setFormData({ documents: updatedDocuments });
  };
  
  const userId = useSelector((state) => state.user.user?._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = [];
      await Promise.all(
        formData.documents.map(async (doc, index) => {
          const documentData = { ...doc };
          if (doc.file) {
            const fileData = new FormData();
            fileData.append('file', doc.file);
  
            const fileSend = await axios({
              method: 'post',
              url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
              data: fileData,
              headers: {
                pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
                'Content-Type': 'multipart/form-data',
              },
            });
  
            documentData.fileHash = fileSend.data.IpfsHash;
            delete documentData.file; 
          }
          formDataToSend.push(documentData);
        })
      );
  
      const response = await fetch("http://localhost:4000/Order/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          documents: formDataToSend,
        }),
      });
  
      const result = await response.json();
      console.log(result);
      onSubmit();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  


  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-white rounded-lg shadow-md relative mt-12">
      <button onClick={onClose} className="absolute top-2 right-2 text-white">
        <FaTimes size={24} />
      </button>
      <h2 className="text-3xl font-bold mb-6">Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Documents</label>
          {formData.documents.map((doc, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-700 rounded">
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Document Name</label>
                <input
                  type="text"
                  name="name"
                  value={doc.name}
                  onChange={(e) => handleDocumentChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">File</label>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => handleDocumentChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Folder Type</label>
                <select
                  name="folderType"
                  value={doc.folderType}
                  onChange={(e) => handleDocumentChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                >
                  <option value="None">None</option>
                  <option value="Folder with Pocket">Folder with Pocket</option>
                  <option value="Clip Folder">Clip Folder</option>
                  <option value="Folder with Elastic">Folder with Elastic</option>
                  <option value="Ring Binder">Ring Binder</option>
                  <option value="Presentation Folder">Presentation Folder</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Folder Color</label>
                <select
                  name="folderColor"
                  value={doc.folderColor}
                  onChange={(e) => handleDocumentChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                >
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Pink">Pink</option>
                  <option value="Gray">Gray</option>
                  <option value="Purple">Purple</option>
                  <option value="Brown">Brown</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Copies</label>
                <input
                  type="number"
                  name="copies"
                  value={doc.copies}
                  onChange={(e) => handleDocumentChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Size</label>
                <select
                  name="size"
                  value={doc.size}
                  onChange={(e) => handleDocumentChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                >
                  <option value="A4">A4</option>
                  <option value="A3">A3</option>
                  <option value="Letter">Letter</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Color</label>
                <select
                  name="color"
                  value={doc.color}
                  onChange={(e) => handleDocumentChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                >
                  <option value="Color">Color</option>
                  <option value="Black & White">Black & White</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Binding</label>
                <select
                  name="binding"
                  value={doc.binding}
                  onChange={(e) => handleDocumentChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                >
                  <option value="None">None</option>
                  <option value="Spiral">Spiral</option>
                  <option value="Hardcover">Hardcover</option>
                  <option value="Softcover">Softcover</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Lamination</label>
                <select
                  name="lamination"
                  value={doc.lamination}
                  onChange={(e) => handleDocumentChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                >
                  <option value="None">None</option>
                  <option value="Glossy">Glossy</option>
                  <option value="Matte">Matte</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Paper Quality</label>
                <select
                  name="paperQuality"
                  value={doc.paperQuality}
                  onChange={(e) => handleDocumentChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                >
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Recycled">Recycled</option>
                  <option value="Bond Paper">Bond Paper</option>
                  <option value="Cardstock">Cardstock</option>
                  <option value="Parchment">Parchment</option>
                  <option value="Glossy Paper">Glossy Paper</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300">
          Submit
        </button>
      </form>
    </div>
  );
}

export default OrderForm;

