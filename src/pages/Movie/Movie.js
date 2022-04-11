import { InputWrapper, Input , Select, NumberInput, Textarea } from "@mantine/core";

const Movie = ({form}) => (
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
            {...form.getInputProps('name')}
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
            {...form.getInputProps('description')}
        />
        </InputWrapper>
        <Select
            mb={8}
            required
            label="Classification"
            placeholder="Pick one"
            value={form.classification}
            {...form.getInputProps('classification')}
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
            {...form.getInputProps('duration')}
        />
    </>
)

export default Movie;