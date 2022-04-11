import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import {useState} from "react";

import SessionForm from './Session';
import ListView from "../../components/ListView";
import axios from '../../services/api';

const Session = () => { 
    
    const [lastSessionTimestamp, setLastSessionTimestamp] = useState();
    const modals = useModals();

    const onSubmit = (modalId) => async (form) => {
        try {
            //para fazer put e não post
            if(form.id) {
                await axios.put(`/session/${form.id}`, form);
            } else {
                await axios.post("/session", form);
            }
            
            showNotification({
                title: "Success",
                message: `Session ${form.id ? "Updated" : "Created"} with Success`,
                color: "green"
            });
            modals.closeModal(modalId);
            setLastSessionTimestamp(new Date().getTime());
        } catch (error) {
            showNotification({
                title: "Error",
                message: error.response.data.message,
                color: "red"
            });
        }
    }

    const openContentModal = (session) => {
        const id = modals.openModal({
          title: `${session?.id ? "Update" : "Create" } Session`,
          size: "xl",
          children: (
            <>
              <SessionForm session={session} onSubmit={(form) => onSubmit(id)(form)}/>
            </>
          ),
        });
      };

    return (
        <ListView
        columns={[
            {
                key:  "id",
                value: "Id",
            },
            {
                key:  "movieId",
                render: (movie) => movie.name,
                value: "Movie",
            },
            {
                key: "sessionDate",
                value: "Session Date",
            },
            {
                key:  "room",
                value: "Room",
            },
            // {
            //     key:  "SessionSeats",
            //     render: (sessionSeats) => {
            //         const availableSeats = sessionSeats.filter(
            //             ({state}) => state === "AVAILABLE"
            //         );
            //         return `${availableSeats.length}/${sessionSeats.length}`;
            //     },
            //     value: "Availability Seats",
            // },
            {
                key:  "price",
                render: (price) =>
                new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                }).format(price),
                value: "Price",
            },
        ]}
        endpoint="/session"
        title="Session"
        openContentModal={openContentModal}
        lastSessionTimestamp={lastSessionTimestamp}
        />
    );
};

export default Session;