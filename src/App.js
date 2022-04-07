import {Button, Card, FormControl, Row, Col, Spinner} from "react-bootstrap";
import React, {useState} from "react";
//import './App.css';

const CardWrapper = ({children, title}) => ( //wrapper quer dizer que agrega outros elementos (componente que agrega outros componentes)
  <Card>
  <Card.Header>
    <Card.Title>
      {title}
    </Card.Title>
  </Card.Header>

  <Card.Body>
    {children}
  </Card.Body>
  </Card>
)

//em react é mais comum arrow function dq function
const RecentUser = ({login, name}) => (
  <>
    <img
      width={50}
      height={50}
      src={`https://github.com/${login}.png`}
      alt="" />
    <span> {name} </span>
  </>
)

async function customFetch(url) {
  const response = await fetch(url)
  const data = await response.json()

  return data;
}

const RECENT_USER_KEY = "recent_user";

const App = () => {

  const [recentUsers, setRecentUsers] = useState(() => {
    const recentUsers = localStorage.getItem(RECENT_USER_KEY)

    if(recentUsers) {
      return JSON.parse(recentUsers)
    }
    
    return [];
  });
  const [username, setUsername] = useState(''); //valor padrão está sendo uma string vazia
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);

  const saveRecentUser = (user) => {
    
    const recentSearches = localStorage.getItem(RECENT_USER_KEY);

    if(!recentSearches) {
      setRecentUsers([user]);
      return localStorage.setItem(RECENT_USER_KEY, JSON.stringify([user]))
    }

    const recentSearchesArray = JSON.parse(recentSearches);

    if(!recentSearchesArray.includes(user)){
      localStorage.setItem(RECENT_USER_KEY, JSON.stringify([...recentSearchesArray, user]));
      setRecentUsers([...recentSearchesArray, user]);
    }
  }
  
  const onSearchUser = async () => {

    setLoading(true);

    const [user, repos] = await Promise.all( //executa todas as promises ao mesmo tempo
      [
        customFetch(`https://api.github.com/users/${username}`),
        customFetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      ]
    )

    setLoading(false);

    saveRecentUser(username);

    setUser({
      ...user, //usando spread p pegar todos os valores e colocar na raiz do objeto
      repos
    })

    // setUsername({
    //   ...user,
    //   repos
    // })
  }

  const onChange = (event) => { //evento -> informaçoes do input (formcontrol)
    setUsername(event.target.value)
  }
  return(
    <div className="container mt-4">
      <Row className="mb-4">
        <Col>
          <FormControl placeholder="Type a Github Username" onChange={onChange}></FormControl>
        </Col>
        <Col>
          <Button onClick={onSearchUser} variant="primary">Search User</Button>
        </Col>
      </Row>

      <CardWrapper title="Recent Users">
        {recentUsers.map((user) =>
            <RecentUser 
              key={user} //é usado qndo esta percorrendo uma lista
              name={user} 
              login={user}
            />
        )}
      </CardWrapper>

      {isLoading ? 

        <div className="d-flex justify-content-center mt-4">
        <Spinner animation="grow" variant="primary" />
        </div> : user && <CardWrapper title="GitHub User">

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
      }

      {/* card do recent users */}
       
      {/* <Card>
        <Card.Header>
          <Card.Title>
            Recent Users
          </Card.Title>
        </Card.Header>

        <Card.Body>
          {users.map((user) =>
            <RecentUser 
              key={user.login} //é usado qndo esta percorrendo uma lista
              name={user.name} 
              login={user.login}
              bio={user.bio}
            />
          )}
        </Card.Body>
      </Card> */}

      {/* card do user 
        fazendo a condição pq n pode usar if dentro do return
        se user for true, entao executa o card */}

      {/* {user && <CardWrapper title="GitHub User">
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
      } */}

      {/* {user && <Card className="mt-4">
        <Card.Header>
          <Card.Title>
            GitHub User
          </Card.Title>
        </Card.Header>
        
        <Card.Body>
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

        </Card.Body>
      </Card>
      } */}
      

    </div>
  )

}

export default App;