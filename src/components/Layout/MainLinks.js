import React from "react";
import {
  Ticket,
  PlayerPlay,
  User,
  Section,
  Home,
} from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function MainLink({ icon, color, label, path }) {

    const navigate = useNavigate(); //faz com que a página seja alterada, sem fazer reload

    return (
        <UnstyledButton
            onClick={() => navigate(path)}
            sx={(theme) => ({
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
                theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

            "&:hover": {
                backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
            },
            })}
        >
            <Group>
            <ThemeIcon color={color} variant="light">
                {icon}
            </ThemeIcon>

            <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    );
}

const routes = [
    {icon: <Home size={16} />, color: "blue", label: "Home", path: "/" },
    {icon: <PlayerPlay size={16} />, color: "teal", label: "Movie", path: "/movie"},
    {icon: <Section size={16} />, color: "violet", label: "Session", path: "/session"},
    {icon: <Ticket size={16} />, color: "yellow", label: "Ticket", path: "/ticket"},
    {icon: <User size={16} />, color: "red", label: "Users", path: "/user"},
    
]

export default function MainLinks() {
    return (
        <div>
            {routes.map((route) => (
                <MainLink {...route} key={route.label} />
            ))}
        </div>
    );
}