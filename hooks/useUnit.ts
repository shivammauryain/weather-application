import { useAppSelector } from '@/store/hooks';

export default function useUnit() {
  const unit = useAppSelector((s) => s.settings.unit);
  return unit;
}
