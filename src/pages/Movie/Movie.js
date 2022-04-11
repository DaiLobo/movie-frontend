import { InputWrapper, Input , Select, NumberInput, Textarea, Button } from "@mantine/core";
import { useState } from "react";

const initialState = {
    name: "",
    description: "",
    classification: "",
    duration: 0,
};

const Movie = ({movie = initialState, onSubmit}) =>{ 

    const [form, setForm] = useState(movie);

    const onChange = (event) => {
        const {
        target: { name, type, checked, value },
        } = event;

        setForm((prevForm) => ({
        ...prevForm,
        [name]: type === "checkbox" ? checked : value,
        }));
    };
    
    return (
    <>
        <InputWrapper
        id="name"
        mb={8}
        required
        label="Movie Name"
        >
        <Input
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
        />
        </InputWrapper>

        <InputWrapper
        id="description"
        mb={8}
        required
        label="Description"
        >
        <Textarea
            id="description"
            name="description"
            value={form.description}
            onChange={onChange}
        />
        </InputWrapper>
        <Select
            mb={8}
            required
            label="Classification"
            placeholder="Pick one"
            value={form.classification}
            onChange={(value) => onChange({target: {name: "classification", value}})}
            data={[
                {
                    value: "GENERAL_AUDIENCE",
                    label: "GENERAL_AUDIENCE"
                },
                {
                    value: "PARENT_GUIDANCE_SUGGESTED",
                    label: "PARENT_GUIDANCE_SUGGESTED",
                },
                {   value: "RESTRICTED", label: "RESTRICTED" },
            ]}
        />
        <NumberInput
            id="duration"
            mb={8}
            required
            label="Duration"
            value={form.duration}
            onChange={(value) => onChange({target: {name: "duration", value}})}
        />
        <Button fullWidth onClick={() => onSubmit(form)}>
            Submit
        </Button>
    </>
    )
}
export default Movie;