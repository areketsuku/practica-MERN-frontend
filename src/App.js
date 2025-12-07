import React, {useEffect, useState } from "react";
import {createContact, getAllContacts, /*getContact, updateContact,*/ deleteContact} from "./api/contacts.js";

function App (){
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({name: "",phone1: ""});

  //Carreguem info
  useEffect(()=>{
    loadContacts();
  },[]);

  async function loadContacts() {
    const data = await getAllContacts();
    setContacts(data);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await createContact(form);
    setForm({name:"",phone1:""});
    loadContacts();
  }

  async function handledelete(id) {
    await deleteContact(id);
    loadContacts();
  }

  return (
    <div>
      <h1>Llibreta de Contactes</h1>
      
      <h2>Gestiónar Contactes</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom"
          value={form.name}
          onChange={e =>setForm({...form, name: e.target.value})}
        />
        <br/>
        <input
          placeholder="Telefon 1"
          value={form.phone1}
          onChange={e =>setForm({...form, phone1: e.target.value})}
        />
        <br />
        <button type="submit">Crear</button>
      </form>

      <h2>Llista de Contactes</h2>
      <ul>
        {contacts.map(contact =>(
          <li key={contact.id}>
            **{contact.name}** — {contact.email} — {contact.phone1}
            <button onClick={()=>handledelete(contact.id)}>Esborrar</button>
          </li>
        ))};
      </ul>
    </div>
  );
};

export default App;