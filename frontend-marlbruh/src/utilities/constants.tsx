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

export const profileColors = {
  red: "#E2181822",
  orange: "#FF6D2822",
  yellow: "#F7FB7622",
  green: "#367E1822",
  blue: "#40F8FF22",
  purple: "#A084E822",
  pink: "#FF78C422",
} as Record<string, string>;

export let profileColorsSolid = {} as Record<string, string>;
Object.keys(profileColors).forEach((key) => {
  profileColorsSolid[key] = profileColors[key].slice(0, 7);
});
