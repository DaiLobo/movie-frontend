import { Button, InputWrapper, Input , Select, Checkbox, PasswordInput, Title, Space } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";

const User = () => { //vai ser responsavel por trazer o formulário do usuário
    const [form, setForm] = useState({
       name: '',
       email: '',
       password: '',
       role: '',
       birthDate: '',
       reviewer: ''
    });

    //função para manipular os input's
    //estruturando o event para pegar direto os valores
    const onChange = ({target: {name, type, checked, value}}) => {
        setForm({
            ...form, //spread operator - copia todos os valores do objeto, para não ficar substituindo
            [name]: value,
        })
    }

    const onSubmit = () => {}

    return (
        <div>

            <Title order={4}>Create User</Title>
            <Space h="xl"/> 

            <InputWrapper
            id="name"
            mb={8}
            required
            label="Name"
            description="Your full name"
            >
            <Input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
            />
            </InputWrapper>

            <InputWrapper
            id="email"
            mb={8}
            required
            label="E-mail"
            description="Company email"
            >
            <Input
                id="email"
                name="email"
                value={form.email}
                onChange={onChange}
            />
            </InputWrapper>

            <PasswordInput
                mb={8}
                name="password"
                value={form.password}
                placeholder="Password"
                label="Password"
                description="Password must include at least one letter, number and special character"
                required
            />
           
            <Select
                mb={8}
                name="role"
                value={form.role}
                required
                label="User Role"
                placeholder="Pick one"
                data={[
                    { value: 'ADMINISTRATOR', label: 'Administrator' },
                    { value: 'USER', label: 'User' },
                ]}
            />

            <DatePicker name="birthDate" mb={8} value={form.birthDate} placeholder="Select Birthdate" label="Birthdate" />

            <Checkbox name="reviewer" mt={20} value={form.reviewer} label="Reviewer" color="indigo"/>
            
            <Button onClick={onSubmit}
                    fullWidth
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    mt={16}>
                Create User
            </Button>

        </div>
      );
};

export default User;