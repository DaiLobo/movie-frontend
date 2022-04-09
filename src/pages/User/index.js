import {Badge, Table} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/api";

//para não fazer tr por tr, a gente faz um map

const User = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        axios.get("/user").then((response) => setUsers(response.data));
        //fazendo um get no endpoint /user e a resposta esta sendo jogada no setUsers

        // fetch('http://localhost:3333/api/user')
        //     .then((response) => response.json())
        //     .then((data) => setUsers(data)) //ou .then(setUsers)
        //     .catch(console.error);
    }, []);

    return (
        <>
            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>BirthDate</th>
                        <th>Reviewer</th>
                    </tr>
                </thead> 
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`${user.id}`}>
                                    {user.id}
                                </Link>
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.birthDate}</td>
                            <td>
                                <Badge variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>
                                    {user.reviewer ? "Yes" : "No"}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default User;