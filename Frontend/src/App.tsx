// [FE/frontend.md > App Structure]: Main App component, routing, and state management
// [FE/designing.md > Colors]: UI foundation uses design system
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Movies from "./pages/screens/Movies";
import Events from "./pages/Events"; // [FE/frontend.md > App Flows > Event Browsing]: Updated to use new Events page
import EventDetail from "./pages/EventDetail"; // [FE/frontend.md > App Flows > Event Browsing]: Event detail page
import Sports from "./pages/screens/Sports";
import Concerts from "./pages/screens/Concerts";
import Traditional from "./pages/screens/Traditional";
import Standups from "./pages/screens/Standups";
import Streams from "./pages/screens/Streams";
import HealthandFitness from "./pages/screens/Health&Fitness";
import { store } from "./app/store";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Registration";
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'framer-motion';
import { useEffect, useRef } from 'react';

function App() {
  const lenisRef = useRef<LenisRef>(null);
  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])
  return (
    <>
    <Provider store={store}>
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
    <div className="bg-gradient-to-br from-[#0b0811] via-[#2a1b3d] to-[#44318d] ">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/event/:eventId" element={<EventDetail />} />
          <Route path="/Sports" element={<Sports />} />
          <Route path="/Concerts" element={<Concerts />} />
          <Route path="/Traditional" element={<Traditional />} />
          <Route path="/Standups" element={<Standups />} />
          <Route path="/Streams" element={<Streams />} />
          <Route path="/HealthandFitness" element={<HealthandFitness />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </div>
    </Provider>
    </>
  );
}

export default App;
