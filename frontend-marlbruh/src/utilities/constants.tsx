import {
  IconBed,
  IconBone,
  IconBong,
  IconBook,
  IconCar,
  IconHome,
  IconPlant,
  IconToiletPaper,
  IconToolsKitchen,
} from "@tabler/icons-react";

export const API_URL = import.meta.env.VITE_API_URL;
export const stringToIconObject = {
  home: <IconHome />,
  kitchen: <IconToolsKitchen />,
  bathroom: <IconToiletPaper />,
  bedroom: <IconBed />,
  dog: <IconBone />,
  weed: <IconBong />,
  book: <IconBook />,
  car: <IconCar />,
  plant: <IconPlant />,
} as Record<string, any>;
