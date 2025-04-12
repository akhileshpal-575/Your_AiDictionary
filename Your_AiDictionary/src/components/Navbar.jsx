import React, { useState, useEffect } from "react";
import { Book, History, Bookmark, Moon, Search } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import FadeLoader from "react-spinners/FadeLoader";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Navbar = () => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const changeBgColor = () => {
    let inputBox = document.querySelector(".inputBox");
    inputBox.style.borderColor = "#9333ea";
  };

  const resetColor = () => {
    let inputBox = document.querySelector(".inputBox");
    inputBox.style.borderColor = "#374151";
  };

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
  });

  async function getResult() {
    if (!word.trim()) return;
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are a smart and user-friendly dictionary AI. I will provide you with a word. Your task is to return a detailed and structured response containing all the dictionary-related information about that word, including:
  
  - Part of speech (noun, verb, adjective, etc.)
  - Definitions (with multiple senses, if any)
  - Example sentences for each definition
  - Synonyms and Antonyms
  - Phonetic transcription (with pronunciation if possible)
  - Word origin or etymology
  - Usage notes or common phrases (if applicable)
  - Related forms or derived words
  
  Please format the response clearly and concisely using markdown. The word is: **${word}**`,
      });
      setResult(response.text);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      getResult();
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleBookmark = () => {
    if (word && result) {
      const exists = bookmarks.find((item) => item.word === word);
      if (!exists) {
        setBookmarks((prev) => [{ word, output: result }, ...prev]);
      }
    }
  };

  return (
    <>
      <div className="navbar-container">
        <div className="navbar px-[250px] flex items-center justify-between h-[100px] border-b-[1px] border-[#374151]">
          <div className="logo flex items-center gap-[5px]">
            <Book size={"40px"} color="#9333ea" />
            <h3 className="text-[25px] font-[600]">
              Lexonary<span className="text-purple-600">AI</span>
            </h3>
          </div>

          <div className="search-bar flex-1 mx-8">
            <div className="inputBox flex items-center bg-[#1F2937] rounded-lg border border-[#374151] transition-all">
              <Search
                color="gray"
                className="ml-3 cursor-pointer"
                onClick={getResult}
              />
              <input
                onKeyUp={handleKeyUp}
                onChange={(e) => setWord(e.target.value)}
                value={word}
                type="text"
                onBlur={resetColor}
                onFocus={changeBgColor}
                placeholder="Search a word..."
                className="w-full bg-transparent border-none outline-none py-2 px-3 text-white"
              />
            </div>
          </div>

          <div className="icons flex items-center gap-[20px]">
            <History
              size={"35px"}
              onClick={() => {
                setShowHistory((prev) => !prev);
                setShowBookmarks(false);
              }}
              className="cursor-pointer p-[5px] rounded-[50%] transition-all hover:bg-[#1F2937]"
            />

            <Bookmark
              size={"35px"}
              onClick={() => {
                handleBookmark();
                setShowBookmarks((prev) => !prev);
                setShowHistory(false);
              }}
              className="cursor-pointer p-[5px] rounded-[50%] transition-all hover:bg-[#1F2937]"
            />

            <Moon
              size={"35px"}
              onClick={toggleTheme}
              className="cursor-pointer p-[5px] rounded-[50%] transition-all hover:bg-[#1F2937]"
            />
          </div>
        </div>

        <div
          className="resultContainer py-[20px] min-h-[40vh] mx-[250px]"
          style={{ borderBottom: "1px solid #374151" }}
        >
          {loading ? (
            <FadeLoader color="#9333ea" className="mt-5" />
          ) : result ? (
            <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
          ) : (
            <p className="text-gray-400 text-2xl text-center mt-10">
              Start by typing a word above to explore its meaning with{" "}
              <span className="text-purple-500 font-medium">LexonaryAI</span>{" "}
              🧠📚
            </p>
          )}
          {showHistory && (
            <div className="p-4 rounded-md bg-white text-gray-800 dark:bg-[#1F2937] dark:text-gray-200 shadow">
              <h4 className="text-lg font-semibold mb-2">Search History</h4>
              {history.length ? (
                history.map((item, index) => (
                  <div key={index} className="mb-2 p-3  rounded">
                    <strong>{item.word}</strong>
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {item.output}
                    </Markdown>
                  </div>
                ))
              ) : (
                <p>No history found.</p>
              )}
            </div>
          )}

          {showBookmarks && (
            <div className="p-4 rounded-md bg-white text-gray-800 dark:bg-[#1F2937] dark:text-gray-200 shadow">
              <h2 className="text-xl font-semibold mb-2">Bookmarked Words</h2>
              {bookmarks.length > 0 ? (
                bookmarks.map((item, i) => (
                  <div key={i} className="mb-4 p-3">
                    <h3 className="font-medium text-purple-600">{item.word}</h3>
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {item.output}
                    </Markdown>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No bookmarks yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
