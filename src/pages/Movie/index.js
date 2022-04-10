import ListView from "../../components/ListView"

const Movie = () => (
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
    />
);

export default Movie;