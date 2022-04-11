import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import {useState} from "react";
import ListView from "../../components/ListView";
import axios from '../../services/api';
import MovieForm from "./Movie";


const Movie = () =>{ 

    const [lastMovieTimestamp, setLastMovieTimestamp] = useState();
    const modals = useModals();

    const onSubmit = (modalId) => async (form) => {
        try {
            //para fazer put e não post
            if(form.id) {
                delete form.Session;
                await axios.put(`/movie/${form.id}`, form);
            } else {
                await axios.post("/movie", form);
            }
            
            showNotification({
                title: "Success",
                message: `Movie ${form.id ? "Updated" : "Created"} with Success`,
                color: "green"
            });
            modals.closeModal(modalId);
            setLastMovieTimestamp(new Date().getTime());
        } catch (error) {
            showNotification({
                title: "Error",
                message: error.response.data.message,
                color: "red"
            });
        }
    }

    const openContentModal = (movie) => {
        const id = modals.openModal({
          title: `${movie?.id ? "Update" : "Create" } Movie`,
          size: "xl",
          children: (
            <>
              <MovieForm movie={movie} onSubmit={(form) => onSubmit(id)(form)}/>
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
                key:  "name",
                value: "Name",
            },
            {
                key:  "description",
                value: "Description",
            },
            {
                key:  "classification",
                value: "Classification",
            },
            {
                key:  "duration",
                value: "Duration",
            }
        ]}
        endpoint="/movie"
        title="Movie"
        openContentModal={openContentModal}
        refetchTimestamp={lastMovieTimestamp}
        />
    );
};

export default Movie;