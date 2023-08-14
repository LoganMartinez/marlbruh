import {
  Flex,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconBook,
  IconDog,
  IconFish,
  IconHome2,
  IconTool,
} from "@tabler/icons-react";
import { FunctionComponent, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: JSX.Element;
  label: string;
  link: string;
  active?: boolean;
  onClick?(): void;
}

const NavBarLink = ({
  icon,
  link,
  label,
  active,
  onClick,
}: NavbarLinkProps) => {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
        component="a"
        href={`#${link}`}
      >
        {icon}
      </UnstyledButton>
    </Tooltip>
  );
};

type NavLinksProps = {
  direction: "row" | "column";
};

const NavLinks: FunctionComponent<NavLinksProps> = ({ direction }) => {
  const [active, setActive] = useState(0);
  const iconProps = { size: "1.2rem", stroke: 1.5 };

  const data = [
    {
      icon: <IconHome2 {...iconProps} />,
      label: "home",
      link: "/",
    },
    {
      icon: <IconTool {...iconProps} />,
      label: "chores",
      link: "/chores",
    },
    {
      icon: <IconBook {...iconProps} />,
      label: "bookclub",
      link: "/bookclub",
    },
    {
      icon: <IconDog {...iconProps} />,
      label: "pickle",
      link: "/pickle",
    },
    {
      icon: <IconFish {...iconProps} />,
      label: "fish",
      link: "/fish",
    },
  ];

  const links = data.map((link, index) => (
    <NavBarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Flex direction={direction} align="center">
      {links}
    </Flex>
  );
};

export default NavLinks;
