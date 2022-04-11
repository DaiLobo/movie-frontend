import {Button, Table as TableMantine} from "@mantine/core";

//mapeando os valores de forma dinamica
const Table = ({actions = [], rows = [], columns = []}) => {

    //para conseguir fazer aparecer dinamicamente as actions
    const hasActions = Boolean(actions.length);

    return (
        <TableMantine highlightOnHover>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.value}</th>
                        ))}

                        {
                            hasActions && <th>Actions</th>
                        }

                    </tr>
                </thead> 
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column, index) => {
                                const value = row[column.key];
                                return ( 
                                    <td key={index}>
                                        {typeof column.render === "function"
                                            ? column.render(value)
                                            : value
                                        } 
                                    </td>
                                );
                            })}

                        {hasActions &&
                            <td>
                                {actions.map((action, index) => (
                                    <Button 
                                        mr={10}
                                        key={index}
                                        leftIcon={action.icon}
                                        onClick={() => action.onClick(row)}
                                        variant="white"
                                        color={action.color}
                                    >
                                        {action.name}
                                    </Button>
                                ))
                                }
                            </td>
                        }

                        </tr>
                    ))}
                </tbody>
        </TableMantine>

    );
};

export default Table;