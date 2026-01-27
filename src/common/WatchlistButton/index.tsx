import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWatchlist } from "@/context/watchlistContext";
import { IMovie } from "@/types";
import { cn } from "@/utils/helper";

interface WatchlistButtonProps {
  movie: IMovie;
  category: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const WatchlistButton = ({ movie, category, className, size = "md" }: WatchlistButtonProps) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const sizeClasses = {
    sm: "text-[16px]",
    md: "text-[20px]",
    lg: "text-[26px]",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie, category);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "transition-all duration-300 hover:scale-110 drop-shadow-md",
        inWatchlist ? "text-[#ff0000]" : "text-white hover:text-[#ff0000]",
        sizeClasses[size],
        className
      )}
      aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
    >
      {inWatchlist ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default WatchlistButton;
