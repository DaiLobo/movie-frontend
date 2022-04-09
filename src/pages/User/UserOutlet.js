import { Title } from "@mantine/core";
import { Outlet } from "react-router-dom";

const UserOutlet = () => (
    <div>
        <Title order={4}>Users</Title>
        <Outlet/>
    </div>
)
export default UserOutlet;