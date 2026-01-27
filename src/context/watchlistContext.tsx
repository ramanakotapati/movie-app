import React, { useContext, useState, useEffect, useCallback } from "react";
import { saveWatchlist, getWatchlist } from "@/utils/helper";
import { IMovie, IWatchlistItem } from "@/types";

interface WatchlistContextType {
  watchlist: IWatchlistItem[];
  addToWatchlist: (movie: IMovie, category: string) => void;
  removeFromWatchlist: (id: string | number) => void;
  isInWatchlist: (id: string | number) => boolean;
  clearWatchlist: () => void;
}

const context = React.createContext<WatchlistContextType>({
  watchlist: [],
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  isInWatchlist: () => false,
  clearWatchlist: () => {},
});

interface Props {
  children: React.ReactNode;
}

const initialWatchlist = getWatchlist();

const WatchlistProvider = ({ children }: Props) => {
  const [watchlist, setWatchlist] = useState<IWatchlistItem[]>(initialWatchlist);

  useEffect(() => {
    saveWatchlist(watchlist);
  }, [watchlist]);

  const addToWatchlist = useCallback((movie: IMovie, category: string) => {
    const movieId = String(movie.id);
    setWatchlist((prev) => {
      if (prev.some((item) => String(item.id) === movieId)) {
        return prev;
      }
      return [...prev, { ...movie, id: movieId, category: category as 'movie' | 'tv', addedAt: Date.now() }];
    });
  }, []);

  const removeFromWatchlist = useCallback((id: string | number) => {
    const targetId = String(id);
    setWatchlist((prev) => prev.filter((item) => String(item.id) !== targetId));
  }, []);

  const isInWatchlist = useCallback((id: string | number) => {
    const targetId = String(id);
    return watchlist.some((item) => String(item.id) === targetId);
  }, [watchlist]);

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
  }, []);

  return (
    <context.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        clearWatchlist,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default WatchlistProvider;

export const useWatchlist = () => {
  return useContext(context);
};
