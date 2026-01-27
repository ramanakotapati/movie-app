import { m } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import { MovieCard } from "@/common";
import { useWatchlist } from "@/context/watchlistContext";
import { useMotion } from "@/hooks/useMotion";
import { mainHeading } from "@/styles";

const Watchlist = () => {
  const { watchlist, clearWatchlist } = useWatchlist();
  const { fadeDown, staggerContainer } = useMotion();

  return (
    <section className="pt-28 pb-12">
      <m.div
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        animate="show"
        className="lg:max-w-[1080px] md:max-w-[920px] sm:max-w-[680px] xs:max-w-[480px] max-w-[360px] mx-auto px-4"
      >
        <m.div variants={fadeDown} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaHeart className="text-[#ff0000] text-2xl" />
            <h1 className={mainHeading}>My Watchlist</h1>
          </div>
          {watchlist.length > 0 && (
            <button
              onClick={clearWatchlist}
              className="text-sm dark:text-gray-400 text-gray-500 hover:text-[#ff0000] transition-colors"
            >
              Clear All
            </button>
          )}
        </m.div>

        {watchlist.length === 0 ? (
          <m.div variants={fadeDown} className="text-center py-20">
            <FaHeart className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold dark:text-gray-300 text-gray-600 mb-2">
              Your watchlist is empty
            </h2>
            <p className="dark:text-gray-400 text-gray-500 mb-6">
              Start adding movies and TV shows to keep track of what you want to watch
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-2 bg-[#ff0000] text-white rounded-full hover:-translate-y-1 transition-all duration-300"
            >
              Browse Content
            </Link>
          </m.div>
        ) : (
          <m.div
            variants={fadeDown}
            className="flex flex-wrap xs:gap-4 gap-[14px] justify-center"
          >
            {watchlist
              .sort((a, b) => b.addedAt - a.addedAt)
              .map((movie) => (
                <div
                  key={movie.id}
                  className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
                >
                  <MovieCard movie={movie} category={movie.category} />
                </div>
              ))}
          </m.div>
        )}

        {watchlist.length > 0 && (
          <m.p variants={fadeDown} className="text-center mt-8 dark:text-gray-400 text-gray-500 text-sm">
            {watchlist.length} {watchlist.length === 1 ? "item" : "items"} in your watchlist
          </m.p>
        )}
      </m.div>
    </section>
  );
};

export default Watchlist;
