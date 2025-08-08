// [FE/frontend.md > State Management]: Event slice for event browsing and management
// [BE/backend.md > Event CRUD]: Integration with backend event endpoints
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  bannerUrl?: string;
  organizer: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  filters: {
    category: string;
    date: string;
    location: string;
  };
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,
  searchTerm: "",
  filters: {
    category: "",
    date: "",
    location: "",
  },
};

// [BE/backend.md > Event CRUD]: Fetch all events from backend
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, thunkApi) => {
    try {
      const res = await axios.get("http://localhost:9090/api/events");
      console.log("API Response:", res.data); // Debug log
      // Handle both empty array and proper response structure
      if (res.data && res.data.events) {
        return res.data.events;
      } else if (Array.isArray(res.data)) {
        return res.data;
      } else {
        return [];
      }
    } catch (error: any) {
      console.error("Fetch events error:", error); // Debug log
      const errorMessage = error.response?.data?.error || "Failed to fetch events.";
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

// [BE/backend.md > Event CRUD]: Fetch single event by ID
export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (eventId: string, thunkApi) => {
    try {
      const res = await axios.get(`http://localhost:9090/api/events/${eventId}`);
      console.log("Single Event Response:", res.data); // Debug log
      if (res.data && res.data.event) {
        return res.data.event;
      } else {
        return res.data;
      }
    } catch (error: any) {
      console.error("Fetch single event error:", error); // Debug log
      const errorMessage = error.response?.data?.error || "Failed to fetch event.";
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

// [BE/backend.md > Event CRUD]: Create new event (requires authentication)
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData: { title: string; description: string; date: string; location: string; bannerUrl?: string }, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:9090/api/events", eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Create Event Response:", res.data); // Debug log
      if (res.data && res.data.event) {
        return res.data.event;
      } else {
        return res.data;
      }
    } catch (error: any) {
      console.error("Create event error:", error); // Debug log
      const errorMessage = error.response?.data?.error || "Failed to create event.";
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        date: "",
        location: "",
      };
      state.searchTerm = "";
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // [FE/frontend.md > State Management]: Fetch events states
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload || [];
        state.error = null;
        console.log("Events loaded:", action.payload); // Debug log
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.error("Events fetch rejected:", action.payload); // Debug log
      })
      // [FE/frontend.md > State Management]: Fetch single event states
      .addCase(fetchEventById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentEvent = action.payload;
        state.error = null;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // [FE/frontend.md > State Management]: Create event states
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events.unshift(action.payload);
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm, setFilters, clearFilters, clearError } = eventSlice.actions;
export default eventSlice.reducer; 