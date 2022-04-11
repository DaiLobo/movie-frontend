import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useState } from "react";

import TicketForm from './Ticket';
import ListView from "../../components/ListView";
import axios from '../../services/api';

const Ticket = () => { 
    
    const [lastTicketTimestamp, setLastTicketTimestamp] = useState();
    const modals = useModals();

    const onSubmit = (modalId) => async (form) => {
        try {
            //para fazer put e não post
            if(form.id) {
                await axios.put(`/ticket/${form.id}`, form);
            } else {
                await axios.post("/ticket", form);
            }
            
            showNotification({
                title: "Success",
                message: `Ticket ${form.id ? "Updated" : "Created"} with Success`,
                color: "green"
            });

            modals.closeModal(modalId);
            setLastTicketTimestamp(new Date().getTime());
            
        } catch (error) {
            showNotification({
                title: "Error",
                message: error.response.data.message,
                color: "red"
            });
        }
    }

    const openContentModal = (ticket) => {

    
        const id = modals.openModal({
          title: `${ticket?.id ? "Update" : "Create" } Ticket`,
          size: "xl",
          children: (
            <>
              <TicketForm ticket={ticket} onSubmit={(form) => onSubmit(id)(form)}/>
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
                key:  "session",
                render: (session) => session.movie.name,
                value: "Movie",
            },
            {
                key:  "category",
                value: "Category",
            },
            {
                key: "paymentStatus",
                render: (paymentStatus) => String (paymentStatus),
                value: "Payment Status",
            },
            {
                key:  "session",
                render: (session) => session.room,
                value: "Session Room",
            },
            {
                key:  "seat",
                render: (seat) => seat.room,
                value: "Seat",
            },
            {
                key:  "session",
                render: (session) => session.user.name,
                value: "User",
            },
        ]}
        endpoint="/ticket"
        title="Ticket"
        openContentModal={openContentModal}
        lastSessionTimestamp={lastTicketTimestamp}
        />
    );
};

export default Ticket;