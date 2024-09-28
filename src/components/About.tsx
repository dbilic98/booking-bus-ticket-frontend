import React from "react";
import Navbar from "./Navbar";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-screen p-4">
        <div className="bg-cream p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg rounded-md w-full h-full">
          <h2 className="text-xl font-bold mb-14">ABOUT US</h2>
          <p className="text-lg mb-4 text-gray-800">
            Welcome to the Application for booking bus tickets!
          </p>
          <p className="mb-6 text-gray-600">
            In today’s world, social media and online platforms have become an
            integral part of our everyday lives, including how we plan and book
            trips. With a growing number of users, many travel agencies have
            recognized the importance of having their own web applications. Our
            platform brings you the convenience of booking bus tickets with just
            a few clicks, allowing you to browse through a variety of travel
            options and easily reserve your trip.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="text-gray-700 mb-2">
              Efficient Backend: Built using Java Spring Boot, ensuring fast and
              reliable performance.
            </li>
            <li className="text-gray-700 mb-2">
              Modern Database: We use MySQL to manage travel, user, and booking
              data.
            </li>
            <li className="text-gray-700 mb-2">
              Responsive Frontend: React powers a sleek and dynamic user
              experience on any device.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Key Features:
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="text-gray-700 mb-2">
              Search for available bus routes
            </li>
            <li className="text-gray-700 mb-2">
              Buy tickets quickly and securely
            </li>
            <li className="text-gray-700 mb-2">
              View trip details and pricing options
            </li>
            <li className="text-gray-700 mb-2">Manage your bookings</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Technologies We Use:
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="text-gray-700 mb-2">Backend: Java Spring Boot</li>
            <li className="text-gray-700 mb-2">Database: MySQL</li>
            <li className="text-gray-700 mb-2">Frontend: React</li>
          </ul>

          <p className="text-center text-gray-500 mt-8">
            Contact us:{" "}
            <a
              href="mailto:contact@busticketapp.com"
              className="text-emerald-900"
            >
              contact@busticketapp.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
