import { Button, InputWrapper, Input , Select, Checkbox, PasswordInput, Title, Space } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";

const User = () => { //vai ser responsavel por trazer o formulário do usuário
    const navigate = useNavigate(); //para poder mandar o usuário para alguma página
    const [form, setForm] = useState({
       name: '',
       email: '',
       password: '',
       role: '',
       birthDate: new Date(),
       reviewer: false,
    });

    //função para manipular os input's
    //estruturando o event para pegar direto os valores
    const onChange = ({target: {name, type, checked, value}}) => {
        setForm({
            ...form, //spread operator - copia todos os valores do objeto, para não ficar substituindo
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const onSubmit = async () => {
        const user = {
            ...form,
            birthDate: form.birthDate.toISOString(),
        };
        try {
            //requisição é o post, passa o endpoint e a informação que quer passar no body da requisição
            await axios.post("/user", user);

            showNotification({
                title: "Success",
                message: "User created with success",
                color: 'indigo',
            })
            navigate("/user");
        } catch (error) {
            console.log(error)
        }

    };

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
                onChange={onChange}
                placeholder="Password"
                label="Password"
                description="Password must include at least one letter, number and special character"
                required
            />
           
            <Select
                mb={8}
                required
                label="User Role"
                placeholder="Pick one"
                value={form.role}
                onChange={(value) => onChange({ target: { name: "role", value } })}
                data={[
                  { value: "ADMINISTRATOR", label: "Administrador" },
                  { value: "USER", label: "User" },
                ]}
            />

            <DatePicker 
                onChange={(value) => onChange({target: {name: "birthDate", value}})}
                mb={8}
                value={form.birthDate}
                placeholder="Select Birthdate"
                label="Birthdate" />

            <Checkbox
                name="reviewer"
                mt={20}
                onChange={onChange}
                checked={form.reviewer}
                label="Reviewer"
                color="indigo"/>
            
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