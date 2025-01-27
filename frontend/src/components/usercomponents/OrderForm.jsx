import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { PDFDocument } from 'pdf-lib';

function OrderForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    documents: [
      {
        name: '',
        file: null,
        fileHash: '',
        folderType: 'None',
        folderColor: 'Black',
        copies: 1,
        size: 'A4',
        color: 'Black & White',
        binding: 'None',
        lamination: 'None',
        paperQuality: 'Standard',
        pageCount: 0,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = useSelector((state) => state.user.user?._id);

  const countPdfPages = async (file) => {
    try {
      // Read the uploaded file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Load the PDF using pdf-lib
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Get the total number of pages
      return pdfDoc.getPageCount();
    } catch (error) {
      console.error('Error counting PDF pages:', error);
      return 0;
    }
  };

  const handleDocumentChange = async (index, e) => {
    const { name, value, type, files } = e.target;
    const updatedDocuments = [...formData.documents];

    if (type === 'file') {
      const file = files[0];
      if (!file) return;

      setIsLoading(true);

      let pageCount = 0;
      if (file.type.toLowerCase() === 'application/pdf') {
        pageCount = await countPdfPages(file);
      }

      updatedDocuments[index] = {
        ...updatedDocuments[index],
        file,
        pageCount,
        name: file.name,
      };
      setIsLoading(false);
    } else {
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        [name]: value,
      };
    }

    setFormData({ documents: updatedDocuments });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = [];

      await Promise.all(
        formData.documents.map(async (doc) => {
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

      const response = await fetch('http://localhost:4000/Order/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          documents: formDataToSend,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      onSubmit();
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      formData.documents.forEach((doc) => {
        if (doc.file) URL.revokeObjectURL(doc.file);
      });
    };
  }, [formData.documents]);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-[#1D2A36] text-[#F8F9FB] rounded-xl shadow-2xl relative mt-12">
      <button onClick={onClose} className="absolute top-4 right-4 text-[#F8F9FB] hover:text-[#F4C753] transition-colors">
        <FaTimes size={24} />
      </button>
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#F4C753]">Create New Order</h2>
        <p className="text-[#A0AEC0] mt-2">Fill in the details for your printing order</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {formData.documents.map((doc, index) => (
          <div key={index} className="bg-[#131C24] p-6 rounded-xl border border-[#32415D]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#F4C753]">Document {index + 1}</h3>
                  {index > 0 && (
                    <button type="button" className="text-red-400 hover:text-red-300">
                      Remove
                    </button>
                  )}
                </div>

                {/* File Upload Section */}
                <div className="bg-[#29374C] p-4 rounded-lg mb-6">
                  <div className="space-y-4">
                    <input
                      type="file"
                      name="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleDocumentChange(index, e)}
                      className="w-full p-2 border border-[#32415D] rounded bg-[#1D2A36] text-[#F8F9FB] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#F4C753] file:text-[#141C24] hover:file:bg-[#f3bc3a]"
                      required
                    />
                    {/* Page count display */}
                    <div className="flex items-center space-x-2">
                      <span className="text-[#A0AEC0]">Pages:</span>
                      <span className="font-mono bg-[#1D2A36] px-3 py-1 rounded">
                        {isLoading ? "Counting..." : doc.pageCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Document Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="mb-4">
                    <label className="block text-[#F8F9FB] mb-1">Document Name</label>
                    <input
                      type="text"
                      name="name"
                      value={doc.name}
                      onChange={(e) => handleDocumentChange(index, e)}
                      className="w-full px-3 py-2 border border-[#32415D] rounded bg-[#29374C] text-[#F8F9FB]"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#F8F9FB] mb-1">Folder Type</label>
                    <select
                      name="folderType"
                      value={doc.folderType}
                      onChange={(e) => handleDocumentChange(index, e)}
                      className="w-full px-3 py-2 border border-[#32415D] rounded bg-[#29374C] text-[#F8F9FB]"
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
                    <label className="block text-[#F8F9FB] mb-1">Folder Color</label>
                    <select
                      name="folderColor"
                      value={doc.folderColor}
                      onChange={(e) => handleDocumentChange(index, e)}
                      className="w-full px-3 py-2 border border-[#32415D] rounded bg-[#29374C] text-[#F8F9FB]"
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
                    <label className="block text-[#F8F9FB] mb-1">Copies</label>
                    <input
                      type="number"
                      name="copies"
                      value={doc.copies}
                      onChange={(e) => handleDocumentChange(index, e)}
                      className="w-full px-3 py-2 border border-[#32415D] rounded bg-[#29374C] text-[#F8F9FB]"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#F8F9FB] mb-1">Size</label>
                    <select
                      name="size"
                      value={doc.size}
                      onChange={(e) => handleDocumentChange(index, e)}
                      className="w-full px-3 py-2 border border-[#32415D] rounded bg-[#29374C] text-[#F8F9FB]"
                    >
                      <option value="A4">A4</option>
                      <option value="A3">A3</option>
                      <option value="Letter">Letter</option>
                      <option value="Legal">Legal</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#F8F9FB] mb-1">Color</label>
                    <select
                      name="color"
                      value={doc.color}
                      onChange={(e) => handleDocumentChange(index, e)}
                      className="w-full px-3 py-2 border border-[#32415D] rounded bg-[#29374C] text-[#F8F9FB]"
                    >
                      <option value="Color">Color</option>
                      <option value="Black & White">Black & White</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#F8F9FB] mb-1">Binding</label>
                    <select
                      name="binding"
                      value={doc.binding}
                      onChange={(e) => handleDocumentChange(index, e)}
                      className="w-full px-3 py-2 border border-[#32415D] rounded bg-[#29374C] text-[#F8F9FB]"
                    >
                      <option value="None">None</option>
                      <option value="Spiral">Spiral</option>
                      <option value="Hardcover">Hardcover</option>
                      <option value="Softcover">Softcover</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#F8F9FB] mb-1">Lamination</label>
                    <select
                      name="lamination"
                      value={doc.lamination}
                      onChange={(e) => handleDocumentChange(index, e)}
                      className="w-full px-3 py-2 border border-[#32415D] rounded bg-[#29374C] text-[#F8F9FB]"
                    >
                      <option value="None">None</option>
                      <option value="Glossy">Glossy</option>
                      <option value="Matte">Matte</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#F8F9FB] mb-1">Paper Quality</label>
                    <select
                      name="paperQuality"
                      value={doc.paperQuality}
                      onChange={(e) => handleDocumentChange(index, e)}
                      className="w-full px-3 py-2 border border-[#32415D] rounded bg-[#29374C] text-[#F8F9FB]"
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
              </div>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className={`px-6 py-3 bg-[#29374C] text-[#F8F9FB] rounded-lg transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#32415D]'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-[#F4C753] text-[#141C24] rounded-lg font-semibold transition-colors flex items-center ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#f3bc3a]'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#141C24]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Order'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;

