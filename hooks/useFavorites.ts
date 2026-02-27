"use client";

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';

export default function useFavorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.favorites.cities);

  function add(city: string) {
    dispatch(addFavorite(city));
  }
  function remove(city: string) {
    dispatch(removeFavorite(city));
  }

  return { favorites, add, remove };
}
