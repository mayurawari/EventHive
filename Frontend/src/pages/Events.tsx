// [FE/frontend.md > App Flows > Event Browsing]: Events page with search and filtering
// [FE/designing.md > Colors]: UI uses design system color palette
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchEvents, setSearchTerm, setFilters, clearFilters } from "../features/events/eventSlice";
import EventCard from "../components/EventCard";
import Navbar from "./main/Navbar";
import Footer from "./main/footer";

const Events: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: any) => state.theme.theme);
  const { events, isLoading, error, searchTerm, filters } = useAppSelector((state: any) => state.events);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    console.log("Events component mounted, fetching events..."); // Debug log
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchTerm(localSearchTerm));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setLocalSearchTerm("");
  };

  // Filter events based on search term and filters
  const filteredEvents = events.filter((event: any) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = !filters.location ||
                           event.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesDate = !filters.date ||
                       new Date(event.date).toDateString().includes(filters.date);

    return matchesSearch && matchesLocation && matchesDate;
  });

  console.log("Current events state:", { events, isLoading, error, filteredEvents }); // Debug log

  return (
    <div className={`min-h-screen ${
      theme === "dark" ? "bg-backgroundDark" : "bg-backgroundLight"
    }`}>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-buttonBlack"
          }`}>
            Discover Events
          </h1>
          <p className={`text-lg ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Find amazing events happening around you
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mb-8 p-6 rounded-xl ${
            theme === "dark" ? "bg-backgroundDarkAlt" : "bg-white"
          } shadow-lg`}
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={localSearchTerm}
                onChange={handleSearchChange}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                  theme === "dark"
                    ? "bg-backgroundDark border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-buttonBlack placeholder-gray-500"
                }`}
              />
              <span className="absolute right-3 top-3 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Location
              </label>
              <input
                type="text"
                placeholder="Filter by location..."
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === "dark"
                    ? "bg-backgroundDark border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-buttonBlack placeholder-gray-500"
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Date
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === "dark"
                    ? "bg-backgroundDark border-gray-600 text-white"
                    : "bg-white border-gray-300 text-buttonBlack"
                }`}
              />
            </div>

            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearFilters}
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Clear Filters
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className={`text-lg ${
              theme === "dark" ? "text-white" : "text-buttonBlack"
            }`}>
              Loading events...
            </div>
            <div className="mt-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-red-500 text-lg mb-4">
              {error}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(fetchEvents())}
              className={`px-6 py-3 rounded-lg font-medium ${
                theme === "dark"
                  ? "bg-primary text-white hover:bg-orange-600"
                  : "bg-buttonBlack text-white hover:bg-gray-800"
              }`}
            >
              Try Again
            </motion.button>
          </motion.div>
        )}

        {/* Events Grid */}
        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className={`text-6xl mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-300"
                }`}>
                  📅
                </div>
                <div className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-buttonBlack"
                }`}>
                  {events.length === 0 ? "No events available yet" : "No events match your search"}
                </div>
                <div className={`text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>
                  {events.length === 0
                    ? "Be the first to create an amazing event!"
                    : "Try adjusting your search or filters to find events."
                  }
                </div>
                {events.length === 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-6 px-6 py-3 rounded-lg font-medium ${
                      theme === "dark"
                        ? "bg-primary text-white hover:bg-orange-600"
                        : "bg-buttonBlack text-white hover:bg-gray-800"
                    }`}
                  >
                    Create Your First Event
                  </motion.button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event: any) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Events; 