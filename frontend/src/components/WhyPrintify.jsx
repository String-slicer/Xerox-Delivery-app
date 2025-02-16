import { FaShieldAlt, FaClock, FaUserCheck, FaFileAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt size={40} className="text-blue-500" />,
    title: "Tamper-Proof Documents",
    description: "Your documents are securely stored using blockchain and IPFS, ensuring data integrity and security.",
  },
  {
    icon: <FaClock size={40} className="text-green-500" />,
    title: "Fast & Reliable Delivery",
    description: "Automated order management and real-time tracking help ensure quick and hassle-free document deliveries.",
  },
  {
    icon: <FaUserCheck size={40} className="text-purple-500" />,
    title: "User-Friendly Experience",
    description: "Seamless and intuitive UI for customers, stores, and delivery partners with an easy-to-navigate design.",
  },
  {
    icon: <FaFileAlt size={40} className="text-red-500" />,
    title: "Blockchain-Powered Security",
    description: "Eliminate risks of forgery and unauthorized access with decentralized and immutable document storage.",
  },
];

const WhyPrintify = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Why Choose <span className="text-blue-600">Printify?</span>
        </h2>
        <p className="text-gray-600 mb-10">
          Printify ensures a secure, fast, and hassle-free document printing and delivery experience powered by blockchain.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPrintify;
