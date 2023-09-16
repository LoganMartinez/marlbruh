import { ActionIcon, ColorSwatch, Group } from "@mantine/core";
import { profileColorsSolid } from "../../utilities/constants";

type Props = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ProfileColorSwatches = ({ selectedColor, setSelectedColor }: Props) => {
  return (
    <>
      <Group position="left" spacing="xs">
        {Object.keys(profileColorsSolid).map((color) => (
          <ActionIcon key={color} onClick={() => setSelectedColor(color)}>
            <ColorSwatch
              color={profileColorsSolid[color]}
              style={
                color === selectedColor ? { border: "2px solid white" } : {}
              }
            />
          </ActionIcon>
        ))}
      </Group>
    </>
  );
};

export default ProfileColorSwatches;
