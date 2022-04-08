import React from "react";
import {
  GitPullRequest,
  AlertCircle,
  Messages,
  Database,
} from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";

function MainLink({ icon, color, label }) {
  return (
    <UnstyledButton
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
    {icon: <GitPullRequest size={16} />, color: "blue", label: "Home" },
    {icon: <AlertCircle size={16} />, color: "teal", label: "Movie" },
    {icon: <Messages size={16} />, color: "violet", label: "Session" },
    {icon: <Database size={16} />, color: "grape", label: "Databases" },
    
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