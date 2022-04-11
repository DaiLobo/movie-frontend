import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { useModals } from '@mantine/modals';
import { Button, Space, Title, Text } from "@mantine/core";
import { Pencil, Trash } from "tabler-icons-react";
import axios from "../../services/api";
import Table from "../Table";

const ListView = ({columns, endpoint, title, openContentModal, refetchTimestamp}) => {

    const modals = useModals();

    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const titleLowerCase = title.toLowerCase();

    const onRemove = async ({id}) => {
        
        const onRemoveAction = async () => {
            try {
                await axios.delete(`${endpoint}/${id}`);

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
                });
            }
        };

        modals.openConfirmModal({
            title: `Delete your ${titleLowerCase}`,
            centered: true,
            children: (
              <Text size="sm">
                Are you sure you want to delete your {titleLowerCase}? This action is destructive and you will have
                to contact support to restore your data.
              </Text>
            ),
            labels: { confirm: `Delete ${titleLowerCase}`, cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: onRemoveAction,
          });

    }

    useEffect(() => {
        axios.get(endpoint).then((response) => setRows(response.data));

    }, [endpoint, refetchTimestamp]);

    const isContentModalFunction = typeof openContentModal === "function";

    return (
        <>
        
            <Title order={4}>{`${title} (${rows.length})`}</Title>
            <Table
                actions={[
                {
                    icon: <Pencil/>,
                    name: "Edit",
                    color: "white",
                    onClick: (data) => {
                        if (isContentModalFunction) {
                          return openContentModal(data);
                        }
          
                        navigate(`${data.id}`);
                    },
                },
                {
                    icon: <Trash/>,
                    name: "Remove",
                    color: "red",
                    onClick: onRemove,
                },
                ]}
                rows={rows}
                columns={columns}
            />
            <Space h="xl"/>
            <Button 
                onClick={() => {
                    if (isContentModalFunction) {
                        return openContentModal();
                    }
                    navigate("new")}
                }
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }} 
                    size="xs">
                Create {title}
            </Button>

        </>
 
    )
}
export default ListView;