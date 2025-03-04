import { useState, useEffect } from "react";

const Personal = () => {
  const [quote, setQuote] = useState("");
  const [inspiration, setInspiration] = useState("Stay positive and keep going!");
  const [trailers, setTrailers] = useState([]); // Store trailer videos
  const [books, setBooks] = useState([]); // Store book objects

  // Fetch a random quote
  useEffect(() => {
    const getRandomQuote = () => {
      const quotes = [
        "Believe in yourself and all that you are.",
        "You are stronger than you think.",
        "Success is the sum of small efforts, repeated day in and day out.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Dream it. Wish it. Do it.",
        "Stay positive, work hard, and make it happen.",
        "The only way to do great work is to love what you do."
      ];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };
    getRandomQuote();

    // Fetch latest movie trailers from TMDB API
    const fetchLatestTrailers = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=0f80cf8eecbb0a44df2f0d18bb0fff35&language=en-US&page=1"
        );
        const data = await response.json();

        const trailersData = await Promise.all(
          data.results.slice(0, 4).map(async (movie) => {
            const videoResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=0f80cf8eecbb0a44df2f0d18bb0fff35`
            );
            const videoData = await videoResponse.json();
            const trailer = videoData.results.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");
            return {
              title: movie.title,
              trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
              poster: movie.poster_path,
              releaseDate: movie.release_date,
            };
          })
        );

        setTrailers(trailersData.filter((movie) => movie.trailerUrl !== null)); // Only keep movies with trailers
      } catch (error) {
        console.error("Error fetching latest trailers:", error);
      }
    };

    // Fetch recent books using Google Books API
    const fetchRecentBooks = async () => {
      try {
        const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=subject:travel&maxResults=4");
        const data = await response.json();
        setBooks(data.items);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };

    fetchLatestTrailers();
    fetchRecentBooks();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Personal Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Motivational Quote */}
        <div className="bg-stone-200 p-6 rounded-lg shadow-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Daily Motivational Quote</h2>
          <p className="text-gray-700">{quote ? quote : "Loading quote..."}</p>
        </div>

        {/* Inspiration Feed */}
        <div className="bg-rose-200 p-6 rounded-lg shadow-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Inspiration Feed</h2>
          <p className="text-gray-700">{inspiration}</p>
        </div>

        {/* Recent Trailers and Recent Books Side by Side */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Latest Trailers */}
          <div className="bg-cyan-200 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Latest Movie Trailers</h2>
            <div className="grid grid-cols-2 gap-6">
              {trailers.length > 0 ? (
                trailers.map((movie, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
                      <p className="text-gray-600 text-sm">{movie.releaseDate}</p>
                      {movie.trailerUrl ? (
                        <a
                          href={movie.trailerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm mt-2 inline-block"
                        >
                          Watch Trailer
                        </a>
                      ) : (
                        <p className="text-gray-700">No trailer available</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">Loading trailers...</p>
              )}
            </div>
          </div>

          {/* Recent Books */}
          <div className="bg-yellow-200 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Recent Books</h2>
            <div className="grid grid-cols-2 gap-6">
              {books.length > 0 ? (
                books.map((book) => (
                  <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt={book.volumeInfo.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{book.volumeInfo.title}</h3>
                      <p className="text-gray-600 text-sm">{book.volumeInfo.authors?.join(", ")}</p>
                      <p className="text-gray-700 text-sm mt-2">{book.volumeInfo.description?.substring(0, 100)}...</p>
                      <a
                        href={book.volumeInfo.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm mt-2 inline-block"
                      >
                        See Details
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">Loading books...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
