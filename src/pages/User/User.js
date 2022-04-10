import { Button, InputWrapper, Input , Select, Checkbox, PasswordInput, Title, Space } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../services/api";


const UserForm = ({setForm, form}) => {

    //função para manipular os input's
    //estruturando o event para pegar direto os valores
    const onChange = ({target: {name, type, checked, value}}) => {
        setForm({
            ...form, //spread operator - copia todos os valores do objeto, para não ficar substituindo
            [name]: type === "checkbox" ? checked : value,
        });
    };
        
    return (
    <>
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
    </>
    )
}

const User = () => { //vai ser responsavel por trazer o formulário do usuário
    const navigate = useNavigate(); //para poder mandar o usuário para alguma página
    const {userId} = useParams();
    const [form, setForm] = useState({
       name: '',
       email: '',
       password: '',
    //    role: '',
       birthDate: new Date(),
       reviewer: false,
    });

    const isNewUser = userId === "new";

    useEffect(() => {
        if(!isNewUser) {
            axios.get(`/user/${userId}`).then((response) =>
                setForm({
                    ...response.data,
                    birthDate: new Date(response.data.birthDate)
                })
            );
        }
    }, [isNewUser, userId]);

    const onSubmit = async () => {
        const user = {
            ...form,
            birthDate: form.birthDate.toISOString(),
        };
        try {

            if (isNewUser){
                //requisição é o post, passa o endpoint e a informação que quer passar no body da requisição
                await axios.post("/user", user);
    
            } else {
                await axios.put(`/user/${userId}`, user);
            }

            showNotification({
                title: "Success",
                message: `User ${isNewUser ? "created" : "updated"} with success`,
                color: 'indigo',
            })

            navigate("/user");
        } catch (error) {
            console.log(error)
        }

    };

    const pageTitle = `${isNewUser ? "Create" : "Update"} User`;

    return (
        <div>

            <Title order={4}>{pageTitle}</Title>
            <Space h="xl"/> 

            <UserForm setForm={setForm} form={form} />
            
            <Button onClick={onSubmit}
                    fullWidth
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    mt={16}>
                {pageTitle}
            </Button>

        </div>
      );
};

export default User;