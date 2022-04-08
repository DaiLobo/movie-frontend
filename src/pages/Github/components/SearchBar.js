import {Button, FormControl, Row, Col} from "react-bootstrap";
import {useState} from "react";
import useDebounced from "../../../hooks/useDebounce";


export const RECENT_USER_KEY = "recent_user";

async function customFetch(url) {
    const response = await fetch(url)
    const data = await response.json()
  
    return data;
}

const SearchBar = ({setRecentUsers, setLoading, setUser}) => {
    const [username, setUsername] = useState('');
    useDebounced(username, 2000);

    const onChange = (event) => { //evento -> informaçoes do input (formcontrol)
      setUsername(event.target.value)
    }

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
    }

    return (

      <Row className="mb-4">
          <Col>
              <FormControl placeholder="Type a Github Username" onChange={onChange} value={username}></FormControl>
          </Col>
          <Col>
              <Button onClick={onSearchUser} variant="primary">Search User</Button>
          </Col>
      </Row>

    )
}

export default SearchBar;