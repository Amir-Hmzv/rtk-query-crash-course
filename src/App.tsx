import React from "react";
import {
  useAddContactMutation,
  useGetContactQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useGetContactsQuery
  ,
} from "./services/contactsApi";
import "./App.css";
import { json } from "stream/consumers";
import { ContactDetail } from "./ContactDetail";
const App = () => {
  const { error, isFetching, isLoading, isSuccess, data } = useGetContactsQuery();
    
  return (
    <div className="App">
      <h1>Redux Toolkit</h1>
      {isLoading && <p>isLoading</p>}
      {isFetching && <p>isFetching</p>}
      {error && <p>error</p>}
      {isSuccess && (
        <div>
          {data?.map((contact) => (
            <div className="data" key={contact.id}>
              <span>{contact.name}</span>
              <ContactDetail id={contact.id} />
            </div>
          ))}
        </div>
      )}
      <div>
        <AddContact />
      </div>
    </div>
  );
};

export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const { error, isFetching, isLoading, isSuccess, data,refetch } =
  useGetContactsQuery();
  const contact = {
    id: 7,
    name: "11tttt",
    email: "ttttt@gmail.com",
  };
  const updatecontact = {
    id: 7,
    name: "11tttt update",
    email: "ttttt@gmail.com",
  };

  const addHandler = async () => {
    await addContact(contact);
  
  };
  const updateHandler = async () => {
    await updateContact(updatecontact);
    
  };
  const delteHandler = async () => {
    await deleteContact(contact.id);
   
  };

  return (
    <>
      <button onClick={addHandler}>add contact</button>
      <button onClick={updateHandler}>update contact</button>
      <button onClick={delteHandler}>delete contact</button>
    </>
  );
};

export default App;
