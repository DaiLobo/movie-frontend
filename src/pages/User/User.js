import { InputWrapper, Input , Select} from "@mantine/core";

const User = () => { //vai ser responsavel por trazer o formulário do usuário
    return (
        <div>
            <InputWrapper
            id="name"
            required
            label="Name"
            description="Your full name"
            >
            <Input id="name"/>
            </InputWrapper>

            <InputWrapper
            id="email"
            required
            label="E-mail"
            description="Company email"
            >
            <Input id="email"/>
            </InputWrapper>

           
            <Select
                label="User Role"
                placeholder="Pick one"
                data={[
                    { value: 'ADMINISTRATOR', label: 'Administrator' },
                    { value: 'USER', label: 'User' },
                ]}
            />
          
        </div>
      );
};

export default User;