export const FishType = {
  LARGEMOUTH_BASS: {
    id: '1',
    display: 'ラージマウスバス',
  },
  SMALLMOUTH_BASS: {
    id: '2',
    display: 'スモールマウスバス',
  },
  BLACK_BASS: {
    id: '3',
    display: 'ブラックバス',
  },
};

export const validateFishType = (responseText: string): boolean => {
  return Object.values(FishType).some(fish => {
    return typeof fish === 'object' && responseText.includes(fish.display);
  });
};
