import React, {useState} from "react";
import {Form, Label, Input, Button} from 'reactstrap';
import './SearchBar.css'

const SearchBar = ( { searchFor }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = evt => { 
    setSearchTerm(evt.target.value)
    };


    const submitSearch = evt => {
      evt.preventDefault();
      searchFor({query: encodeURIComponent(searchTerm.trim()) || undefined});
    };

    return (
      <div>
            <Form className="col-md searchBar" onSubmit={submitSearch}>
              <Label htmlFor="q"/>
              <Input
                  onChange={handleChange}
                  value={searchTerm}
                  type="text"
                  id="q"
                  name='search'
                  placeholder="search"
              >
              </Input>
              <Button>Submit</Button>
          </Form>
      </div>
    )

}

export default SearchBar;