import { InputWrapper, Select, Button, Autocomplete } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "../../services/api";

const initialState = {
    category: "",
    seatId: "",
    sessionId: "",
};

const Ticket = ({session = initialState, onSubmit}) =>{ 

    const [sessions, setSessions] = useState([]);
    const [seats, setSeats] = useState([]);
    const [form, setForm] = useState(session);

    useEffect(() => {
        axios.get('/session').then((response) => setSessions(response.data));
    }, [])

    useEffect(() => {
        if (form.sessionId) {
            axios.get(`/seat?sessionId=${form.sessionId}`).then((response) => setSeats(response.data));
        }
    }, [form.sessionId]);
    
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
        mb={8}
        required
        label="Movie"
        >
        <Autocomplete
            value={form.sessionId}
            onChange={(value) => onChange({target: {name: "sessionId", value}})}
            data={
               sessions.map((session) => (
                {value: session.id, 
                label: `${session.movie.name} - ${session.name}`}
               ))
            }
        />
        <Autocomplete
            label="Seat"
            value={form.seatId}
            onChange={(value) => onChange({target: {name: "seatId", value}})}
            data={
               seats.map((seat) => (
                {value: seat.id, 
                label: `${seat.name} - ${seat.type} - ${seat.state}`}
               ))
            }
        />
        </InputWrapper>
        <Select
            mb={8}
            required
            label="Ticket Category"
            placeholder="Pick one"
            value={form.category}
            onChange={(value) => onChange({target: {name: "category", value}})}
            data={[
                {
                    value: "FREE",
                    label: "FREE"
                },
                {
                    value: "HALF_PRICE",
                    label: "HALF_PRICE",
                },
                {   value: "PROMO",
                    label: "PROMO"
                },
                {   value: "STANDARD",
                    label: "STANDARD"
                },
            ]}
        />
       
        <Button fullWidth onClick={() => onSubmit(form)}>
            Submit
        </Button>
    </>
    )
}
export default Ticket;