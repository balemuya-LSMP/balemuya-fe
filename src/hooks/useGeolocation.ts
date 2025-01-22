import { useState, useCallback } from "react";

type Position = {
  lat: number;
  lng: number;
} | null;

type UseGeolocationReturn = {
  isLoading: boolean;
  position: Position;
  error: string | null;
  getPosition: () => void;
};

export const useGeolocation = (defaultPosition: Position = null): UseGeolocationReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  const getPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  }, []); 

  return { isLoading, position, error, getPosition };
};
