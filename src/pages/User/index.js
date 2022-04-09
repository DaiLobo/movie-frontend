import {Table} from "@mantine/core"

const User = () => 
    <Table highlightOnHover>
       <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead> 
        <tbody>
            <tr>
                <td>Diana Rose</td>
                <td>diana.rose@hotmail.com</td>
            </tr>
        </tbody>
    </Table>;

export default User;