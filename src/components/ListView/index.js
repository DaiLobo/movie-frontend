import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { Button, Space, Title } from "@mantine/core";
import { Pencil, Trash } from "tabler-icons-react";
import axios from "../../services/api";
import Table from "../Table";

const ListView = ({columns, endpoint, title}) => {

    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    const onRemove = async ({id}) => {
        try {
            await axios.delete(`/${endpoint}/${id}`);

            showNotification({
                title: "Success",
                message: `${title} Removed with Success`,
            })

            setRows(rows.filter((row) => row.id !== id))
        } catch (error) {
            showNotification({
                title: "Error",
                message: error.response.data.message,
                color: "red"
            })
        }
    }

    useEffect(() => {
        axios.get(endpoint).then((response) => setRows(response.data));

    }, [endpoint]);

    return (
        <>
        
            <Title order={4}>{title}</Title>
            <Table
                actions={[
                {
                    icon: <Pencil/>,
                    onClick: ({id}) => navigate(`${id}`),
                    color: "white",
                    name: "Edit",
                },
                {
                    icon: <Trash/>,
                    onClick: onRemove,
                    color: "red",
                    name: "Remove",
                },
                ]}
                rows={rows}
                columns={columns}
            />
            <Space h="xl"/>
            <Button onClick={() => navigate("new")} 
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }} 
                    size="xs">
                Create {title}
            </Button>

        </>
 
    )
}
export default ListView;