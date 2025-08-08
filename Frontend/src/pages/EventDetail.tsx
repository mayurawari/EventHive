// [FE/frontend.md > App Flows > Event Browsing]: Event detail page for viewing individual events
// [FE/designing.md > Colors]: UI uses design system color palette
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchEventById } from "../features/events/eventSlice";
import Navbar from "./main/Navbar";
import Footer from "./main/footer";

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: any) => state.theme.theme);
  const { currentEvent, isLoading, error } = useAppSelector((state: any) => state.events);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId));
    }
  }, [eventId, dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${
        theme === "dark" ? "bg-backgroundDark" : "bg-backgroundLight"
      }`}>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className={`text-lg ${
              theme === "dark" ? "text-white" : "text-buttonBlack"
            }`}>
              Loading event details...
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !currentEvent) {
    return (
      <div className={`min-h-screen ${
        theme === "dark" ? "bg-backgroundDark" : "bg-backgroundLight"
      }`}>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">
              {error || "Event not found"}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/Events")}
              className={`px-6 py-3 rounded-lg font-medium ${
                theme === "dark"
                  ? "bg-primary text-white hover:bg-orange-600"
                  : "bg-buttonBlack text-white hover:bg-gray-800"
              }`}
            >
              Back to Events
            </motion.button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      theme === "dark" ? "bg-backgroundDark" : "bg-backgroundLight"
    }`}>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/Events")}
            className={`mb-6 px-4 py-2 rounded-lg font-medium ${
              theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ← Back to Events
          </motion.button>

          {/* Event Banner */}
          <div className="mb-8">
            {currentEvent.bannerUrl ? (
              <img
                src={currentEvent.bannerUrl}
                alt={currentEvent.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            ) : (
              <div className={`w-full h-64 md:h-96 rounded-xl flex items-center justify-center ${
                theme === "dark" ? "bg-backgroundDarkAlt" : "bg-gray-100"
              }`}>
                <span className={`text-6xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-400"
                }`}>
                  {currentEvent.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className={`p-6 rounded-xl ${
            theme === "dark" ? "bg-backgroundDarkAlt" : "bg-white"
          } shadow-lg`}>
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-buttonBlack"
            }`}>
              {currentEvent.title}
            </h1>
            
            <p className={`text-lg mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              {currentEvent.description}
            </p>

            {/* Event Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📅</span>
                  <div>
                    <div className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-buttonBlack"
                    }`}>
                      Date & Time
                    </div>
                    <div className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                      {formatDate(currentEvent.date)} at {formatTime(currentEvent.date)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-2xl mr-3">📍</span>
                  <div>
                    <div className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-buttonBlack"
                    }`}>
                      Location
                    </div>
                    <div className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                      {currentEvent.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">👤</span>
                  <div>
                    <div className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-buttonBlack"
                    }`}>
                      Organizer
                    </div>
                    <div className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                      {currentEvent.organizer.username}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <div className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-buttonBlack"
                    }`}>
                      Contact
                    </div>
                    <div className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                      {currentEvent.organizer.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-3 px-6 rounded-lg font-medium ${
                  theme === "dark"
                    ? "bg-primary text-white hover:bg-orange-600"
                    : "bg-buttonBlack text-white hover:bg-gray-800"
                }`}
              >
                Book Tickets
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-3 px-6 rounded-lg font-medium border-2 ${
                  theme === "dark"
                    ? "border-primary text-primary hover:bg-primary hover:text-white"
                    : "border-buttonBlack text-buttonBlack hover:bg-buttonBlack hover:text-white"
                }`}
              >
                Share Event
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetail; 