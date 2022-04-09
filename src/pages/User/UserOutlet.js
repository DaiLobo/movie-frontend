import { Space, Title } from "@mantine/core";
import { Outlet } from "react-router-dom";

const UserOutlet = () => (
    <div>
        <Title order={4}>Users</Title>
        <Space h="xl"/>
        <Outlet/>
    </div>
)
export default UserOutlet;