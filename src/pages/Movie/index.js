import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import ListView from "../../components/ListView";
import axios from '../../services/api';
import MovieForm from "./Movie";


const Movie = () =>{ 

    const modals = useModals();

    const onSubmit = (modalId) => async (form) => {
        try {
            await axios.post("/movie", form);
            
            showNotification({
                title: "Success",
                message: "Movie Created with Success",
                color: "green"
            });
            modals.closeModal(modalId);

        } catch (error) {
            showNotification({
                title: "Error",
                message: error.response.data.message,
                color: "red"
            });
        }
    }

    const openContentModal = () => {
        const id = modals.openModal({
          title: 'Create Movie',
          size: "xl",
          children: (
            <>
              <MovieForm onSubmit={(form) => onSubmit(id)(form)}/>
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
        onClickNew={openContentModal}
        />
    );
};

export default Movie;