import { useState } from "react";

export const NewEventForm = () => {
  const [events, setEvents] = useState([
    {
      event:
        "My biggest fear is that people will attribute fake quotes to me and millions of morons on the internet will believe it.",
      user: "Albert Einstein",
    },
  ]);
  const [event, setEvent] = useState("");
  const [user, setUser] = useState("");

  const addEvent = (event) => {
    event.preventDefault();
    setEvents((events) => [{ event, user }, ...events]);
    setEvent("");
    setUser("");
  };

  return (
    <div className="NewEventForm">
      <h1>Add New Event</h1>
      <form onSubmit={addEvent}>
        <textarea
          onChange={(e) => setEvent(e.target.value)}
          value={event}
          rows={4}
        />
        <input
          placeholder="Your name"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};
