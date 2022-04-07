import CardWrapper from "./CardWrapper";

const Profile = ({user}) => {

    if(!user){
        return null;
    }
    
    return (
        <CardWrapper title="GitHub User">

          <img
            className="rounded-circle"
            width={240}
            height={240}
            src={`https://github.com/${user.login}.png`}
            alt=""/>

          <h1>{user.name}</h1>
          <strong>{user.login}</strong>
          <p>{user.bio}</p>

          <ul>
            {user.repos.map((repo) => (
              <li key={repo.id}>
                {repo.name}
              </li>
            ))}
          </ul>
       </CardWrapper>
    )
}

export default Profile;