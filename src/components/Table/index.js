import {Button, Table as TableMantine} from "@mantine/core";

//mapeando os valores de forma dinamica
const Table = ({actions = [], rows = [], columns = []}) => {

    return (
        <TableMantine highlightOnHover>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.value}</th>
                        ))}
                    </tr>
                </thead> 
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column, index) => (
                            <td key={index}>{row[column.key]}</td>
                        ))}

                        {Boolean(actions.length) &&
                            <td>
                                {actions.map((action) => (
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