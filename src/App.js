import React, {useEffect, useState } from "react";
import {createContact, getAllContacts, deleteContact, updateContact} from "./api/contactsApi.js";

function App (){
  const [allContacts, setAllContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({name: "",email:"",phone1: ""});
  const [editingId, setEditingId] = useState(null);

  useEffect(()=>{
    loadContacts();
  },[]);

  async function loadContacts() {
    const data = await getAllContacts();
    setAllContacts(data);
    setContacts(data);
  };

  function filterContacts(formData) {

    const isEmpty = !formData.name && !formData.email && !formData.phone1;
    
    if (isEmpty) {
      setContacts(allContacts);
      return;
    }

    const filtered = allContacts.filter(contact => {
      const matchesName = contact.name?.toLowerCase().includes(formData.name.toLowerCase());
      const matchesEmail = contact.email?.toLowerCase().includes(formData.email.toLowerCase());
      const matchesPhone1 = contact.phone1?.toString().includes(formData.phone1.toString());

      return (
        (formData.name ? matchesName : true) &&
        (formData.email ? matchesEmail : true) &&
        (formData.phone1 ? matchesPhone1 : true)
      );
    });
    setContacts(filtered);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingId){
      await updateContact(editingId,form);
      setEditingId(null);
    } else {
      await createContact(form);
    }
    setForm({name:"",email:"",phone1:""});
    loadContacts();
  }

  async function handleDelete(id) {
    await deleteContact(id);
    loadContacts();
  }

  function handleEdit(contact) {
    setEditingId(contact._id);
    setForm({
      name: contact.name,
      email: contact.email,
      phone1: contact.phone1
    });
  }

  return (
    <div>
      <h1>Llibreta de Contactes</h1>
      
      <h2>Gestiónar Contactes</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom"
          value={form.name}
          onChange={e => {
            const updated = {...form, name: e.target.value};
            setForm(updated);
            filterContacts(updated);
            }}
        />
        <br/>
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => {
            const updated = {...form, email: e.target.value};
            setForm(updated);
            filterContacts(updated);
            }}
        />
        <br />
        <input
          placeholder="Telefon 1"
          value={form.phone1}
          onChange={e => {
            const updated = {...form, phone1: e.target.value};
            setForm(updated);
            filterContacts(updated);
            }}
        />
        <br />
        <button type="submit">{editingId?"Guardar":"Crear"}</button>
      </form>

      <h2>Llista de Contactes</h2>
      <ul>
        {contacts.map(contact =>(
          <li key={contact._id}>
            <b>{contact.name}</b> - {contact.email} - {contact.phone1} - <em />
            <button onClick={()=>handleDelete(contact._id)}>Esborrar</button>
            <button onClick={()=>handleEdit(contact)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;