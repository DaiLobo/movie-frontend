import { InputWrapper, Select, NumberInput, Button, Autocomplete } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import axios from "../../services/api";

const initialState = {
    movieId: "",
    sessionDate: new Date(),
    room: "",
    price: "",
};

const Session = ({session = initialState, onSubmit}) =>{ 

    const [movies, setMovies] = useState([]);
    const [form, setForm] = useState(session);

    useEffect(() => {
        axios.get('/movie').then((response) => setMovies(response.data))
    }, [])

    const onChange = (event) => {
        const {
        target: { name, value },
        } = event;

        setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
        }));
    };
    
    return (
    <>
        <InputWrapper
        id="movieId"
        mb={8}
        required
        label="Movie"
        >
        <Autocomplete
            value={form.movieId}
            onChange={(value) => onChange({target: {name: "movieId", value}})}
            data={
               movies.map((movie) => (
                {value: movie.id, label: movie.name}
               ))
            }
        />
        </InputWrapper>
        <DatePicker
            value={form.sessionDate}
            label="Session Date"
            onChange={(value) => onChange({target: {name: "room", value}})}
        />
        <Select
            mb={8}
            required
            label="Room"
            placeholder="Pick one"
            value={form.room}
            onChange={(value) => onChange({target: {name: "room", value}})}
            data={[
                {
                    value: "COMMON",
                    label: "COMMON"
                },
                {
                    value: "DLUX",
                    label: "DLUX",
                },
                {   value: "IMAX",
                    label: "IMAX"
                },
            ]}
        />
        <NumberInput
            id="price"
            mb={8}
            required
            label="Price"
            value={form.price}
            onChange={(value) => onChange({target: {name: "price", value}})}
        />
        <Button fullWidth onClick={() => onSubmit(form)}>
            Submit
        </Button>
    </>
    )
}
export default Session;