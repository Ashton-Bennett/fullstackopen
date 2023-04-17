import { useState, useEffect } from "react";
import { getAllDiaries, createEntry } from "./services/dairyService";
import { DiaryEntry, Weather, Visibility } from "./types";

function App() {
  const [dairyEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>();
  const [weather, setWeather] = useState<Weather>();
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((res) => {
      if (res === undefined) {
        return null;
      }
      setDiaryEntries(res);
    });
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(event.target);

    if (!visibility) {
      setErrorMessage("Must complete visibility field");
      setTimeout(() => setErrorMessage(null), 2000);
      throw new Error("Must complete the form");
    }

    if (!weather) {
      setErrorMessage("Must complete weather field");
      setTimeout(() => setErrorMessage(null), 2000);
      throw new Error("Must complete the form");
    }

    const submittedEntry: DiaryEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };
    // console.log("ADDED:", submittedEntry);

    const backendresponse = await createEntry(submittedEntry);
    console.log(backendresponse);
    if (typeof backendresponse === "string") {
      setErrorMessage(backendresponse);
      setTimeout(() => setErrorMessage(null), 2000);
      return;
    }

    setDiaryEntries(dairyEntries.concat(submittedEntry));
    setDate("");
    setComment("");
    setVisibility(undefined);
    setWeather(undefined);
  };

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // switch (e.target.value) {
    //   case 'great':
    //     setVisibility(e.target.value);
    //     break;

    //   default:
    //     break;
    // }
    setVisibility(e.target.value as Visibility);
  };

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(e.target.value as Weather);
  };

  return (
    <div>
      <h1>Ilari&apos;s Flight Diaries</h1>
      <br></br>
      <h2>Add new entry</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <div>
          <label>Visibility:</label>
          <label>Great</label>
          <input
            name="visibility"
            type="radio"
            value="great"
            onChange={handleVisibilityChange}
          />
          <label>Good</label>
          <input
            name="visibility"
            type="radio"
            value="good"
            onChange={handleVisibilityChange}
          />
          <label>Ok</label>
          <input
            name="visibility"
            type="radio"
            value="ok"
            onChange={handleVisibilityChange}
          />
          <label>Poor</label>
          <input
            name="visibility"
            type="radio"
            value="poor"
            onChange={handleVisibilityChange}
          />
        </div>
        <label>Weather:</label>
        <label>Sunny</label>
        <input
          name="weather"
          type="radio"
          value="sunny"
          onChange={handleWeatherChange}
        />
        <label>Rainy</label>
        <input
          name="weather"
          type="radio"
          value="rainy"
          onChange={handleWeatherChange}
        />
        <label>Cloudy</label>
        <input
          name="weather"
          type="radio"
          value="cloudy"
          onChange={handleWeatherChange}
        />
        <label>Stormy</label>
        <input
          name="weather"
          type="radio"
          value="stormy"
          onChange={handleWeatherChange}
        />
        <label>Windy</label>
        <input
          name="weather"
          type="radio"
          value="windy"
          onChange={handleWeatherChange}
        />
        <div>
          {" "}
          <label>Comment:</label>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button type="submit">Add</button>
      </form>

      <h3>Diary entries</h3>

      {dairyEntries &&
        dairyEntries.map((entry) => {
          return (
            <div key={entry.date}>
              <b>
                <h4>{entry.date}</h4>
              </b>
              <div>Weather: {entry.weather}</div>
              <div>Visibility: {entry.visibility}</div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
