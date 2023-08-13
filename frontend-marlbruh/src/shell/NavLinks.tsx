import { Flex, Tooltip, UnstyledButton, createStyles, rem } from "@mantine/core";
import { IconBook, IconDog, IconTool } from "@tabler/icons-react";
import { FunctionComponent, useState } from "react";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: JSX.Element;
  label: string;
  // color: string,
  active?: boolean;
  onClick?(): void;
}

const NavBarLink = ({ icon, label, active, onClick }: NavbarLinkProps) => {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        {icon}
      </UnstyledButton>
    </Tooltip>
  );
}

type NavLinksProps = {
  direction: "row" | "column"
}


const NavLinks: FunctionComponent<NavLinksProps> = ({direction}) => {
  const [active, setActive] = useState(0)
  
  const data = [
    {
      icon: <IconTool size="1.2rem" stroke={1.5}/>, 
      label: "chores" 
    },
    {
      icon: <IconBook size="1.2rem" stroke={1.5}/>, 
      label: "bookclub" 
    },
    {
      icon: <IconDog size="1.2rem" stroke={1.5}/>, 
      label: "pickle" 
    }
  ]

  const links = data.map((link, index) => 
    <NavBarLink 
      {...link} 
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  )
  
  return (
    <Flex direction={direction} align="center">
      {links}
    </Flex>
  );
}
 
export default NavLinks;