// [FE/frontend.md > Components]: EventCard component for event browsing
// [FE/designing.md > Colors]: UI uses design system color palette
import React from "react";
import { motion } from "motion/react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    bannerUrl?: string;
    organizer: {
      username: string;
      email: string;
    };
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCardClick = () => {
    navigate(`/event/${event._id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className={`cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        theme === "dark" 
          ? "bg-backgroundDarkAlt border border-gray-700" 
          : "bg-white border border-gray-200"
      } hover:shadow-xl`}
    >
      {/* Event Banner */}
      <div className="relative h-48 overflow-hidden">
        {event.bannerUrl ? (
          <img
            src={event.bannerUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            theme === "dark" ? "bg-backgroundDark" : "bg-gray-100"
          }`}>
            <span className={`text-4xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-400"
            }`}>
              {event.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            theme === "dark" 
              ? "bg-primary text-white" 
              : "bg-buttonPink text-white"
          }`}>
            Event
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${
          theme === "dark" ? "text-white" : "text-buttonBlack"
        }`}>
          {event.title}
        </h3>
        
        <p className={`text-sm mb-3 line-clamp-2 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}>
          {event.description}
        </p>

        {/* Event Meta */}
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span className={`mr-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              📅
            </span>
            <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
              {formatDate(event.date)}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className={`mr-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              📍
            </span>
            <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
              {event.location}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className={`mr-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              👤
            </span>
            <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
              {event.organizer.username}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors ${
            theme === "dark"
              ? "bg-primary text-white hover:bg-orange-600"
              : "bg-buttonBlack text-white hover:bg-gray-800"
          }`}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EventCard; 