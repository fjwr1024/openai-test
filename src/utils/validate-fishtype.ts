import { FishType } from '../types/fishtype';

export const validateFishType = (responseText: string): boolean => {
  return Object.values(FishType).some(fish => {
    return typeof fish === 'object' && responseText.includes(fish.display);
  });
};
