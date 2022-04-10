import {Badge, Button, Table, Space, Title} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "tabler-icons-react";
import axios from "../../services/api";

//para não fazer tr por tr, a gente faz um map

const User = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        axios.get("/user").then((response) => setUsers(response.data));
        //fazendo um get no endpoint /user e a resposta esta sendo jogada no setUsers

        // fetch('http://localhost:3333/api/user')
        //     .then((response) => response.json())
        //     .then((data) => setUsers(data)) //ou .then(setUsers)
        //     .catch(console.error);
    }, []);

    const onRemoveUser = async (id) => {
        try {
            await axios.delete(`/user/${id}`);

            showNotification({
                title: "Success",
                message: "User Removed with Success",
            })

            setUsers(users.filter((user) => user.id !== id))
        } catch (error) {
            showNotification({
                title: "Error",
                message: error.response.data.message,
                color: "red"
            })
        }
    }

    return (
        <>
            <Title order={4}>Users ({users.length}) </Title>
            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>BirthDate</th>
                        <th>Reviewer</th>
                        <th>Actions</th>
                    </tr>
                </thead> 
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.birthDate}</td>
                            <td>
                                <Badge variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>
                                    {user.reviewer ? "Yes" : "No"}
                                </Badge>
                            </td>
                            <td>
                            <Button 
                                leftIcon={<Pencil />}
                                onClick={() => navigate(user.id)}
                                variant="white">
                                Edit User
                            </Button>
                            </td>
                            <td>
                            <Button
                                leftIcon={<Trash />}
                                onChange={() => onRemoveUser(user.id)}               
                                variant="white"
                                color="red">
                                Remove User
                            </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Space h="xl"/>
            <Button onClick={() => navigate("new")} 
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }} 
                    size="xs">
                Create User
            </Button>

        </>
    );
};

export default User;