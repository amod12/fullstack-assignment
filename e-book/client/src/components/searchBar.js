import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faSearch,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../App.css"
import "./styles.css";

export default function Search() {
  const [value, setValue] = useState("");
  const [validItems, setvalidItems] = useState([])
  const navigate = useNavigate()


  const onChange = (event) => {
    setTimeout(() => {
      setValue(event.target.value);
    }, 2000);
   
  };

  const fetchAvailableItems = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/item?qSearch=${value}`, ).then((response) => {
      setvalidItems(response.data.validItemOptions)
    });
  }
  useEffect(() => {
    fetchAvailableItems()
  }, [value]) 
  

  return (
    <div className="App">
      <div className="search-container ">
      <div className='search' >
      <input type="search" className='search_box' placeholder='Search' style={{marginTop: -67}}
       onChange={onChange}
      />
      <FontAwesomeIcon icon={faSearch} className='search_icon' style={{marginTop: -67}} onClick={()=>navigate('/',{ state: { key: 'validItems', data: validItems }}) } />

    </div>
        { validItems.length !== 0 && value !== ''?
        <div class="dropdown1">
        <div class="dropdown-content">
        <div className="dropdown" >
          {validItems        
            .map((item) => (
              <div
                onClick={() =>{navigate('/itemPage',  { state:item }); }  
              }
                className="dropdown-row"
                key={item.title}
              >
                {item.title}
              </div>
            ))}
        </div>
        </div>
        </div>
        : null}
      </div>
    </div>
  );
}


