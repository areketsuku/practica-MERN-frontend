import React, {useEffect, useState } from "react";
import {createContact, getAllContacts, deleteContact, updateContact} from "./api/contactsApi.js";

function App (){
  const [allContacts, setAllContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({name:"",surname1:"",surname2:"",email:"",phone1:"",phone2:""});
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

    const isEmpty = !formData.name && !formData.surname1 && !formData.surname2 && !formData.email && !formData.phone1 && !formData.phone2 ;
    
    if (isEmpty) {
      setContacts(allContacts);
      return;
    }

    const filtered = allContacts.filter(contact => {
      const matchesName = contact.name?.toLowerCase().includes(formData.name.toLowerCase());
      const matchesSurname1 = contact.surname1?.toLowerCase().includes(formData.surname1.toLowerCase());
      const matchesSurname2 = contact.surname2?.toLowerCase().includes(formData.surname2.toLowerCase());
      const matchesEmail = contact.email?.toLowerCase().includes(formData.email.toLowerCase());
      const matchesPhone1 = contact.phone1?.toString().includes(formData.phone1.toString());
      const matchesPhone2 = contact.phone2?.toString().includes(formData.phone2.toString());

      return (
        (formData.name ? matchesName : true) &&
        (formData.surname1 ? matchesSurname1 : true) &&
        (formData.surname2 ? matchesSurname2 : true) &&
        (formData.email ? matchesEmail : true) &&
        (formData.phone1 ? matchesPhone1 : true) &&
        (formData.phone2 ? matchesPhone2 : true)
      );
    });
    setContacts(filtered);
  }

  function handleReset (e) {
    e.preventDefault();
    setContacts(allContacts);
    setForm({name:"",surname1:"",surname2:"",email:"",phone1:"",phone2:""});
    setEditingId(null);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingId){
      await updateContact(editingId,form);
      setEditingId(null);
    } else {
      await createContact(form);
    }
    setForm({name:"",surname1:"",surname2:"",email:"",phone1:"",phone2:""});
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
      surname1: contact.surname1,
      surname2: contact.surname2,
      email: contact.email,
      phone1: contact.phone1,
      phone2: contact.phone2
    });
  }

  return (
    <div>
      <h1>Llibreta de Contactes</h1>
      
      <h2>Gestiónar Contactes</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
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
          placeholder="Primer Cognom"
          value={form.surname1}
          onChange={e => {
            const updated = {...form, surname1: e.target.value};
            setForm(updated);
            filterContacts(updated);
            }}
        />
        <br/>
                <input
          placeholder="Segon Cognom"
          value={form.surname2}
          onChange={e => {
            const updated = {...form, surname2: e.target.value};
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
        <input
          placeholder="Telefon 2"
          value={form.phone2}
          onChange={e => {
            const updated = {...form, phone2: e.target.value};
            setForm(updated);
            filterContacts(updated);
            }}
        />
        <br />
        <button type="submit">{editingId?"Guardar":"Crear"}</button>
        <button type="reset">Buida</button>

      </form>

      <h2>Llista de Contactes</h2>
      <ul>
        {contacts.map(contact =>(
          <li key={contact._id}>
            <b>{contact.name} {contact.surname1} {contact.surname2}</b> - {contact.email} - {contact.phone1} / {contact.phone2} <em />
            <button onClick={()=>handleDelete(contact._id)}>Esborrar</button>
            <button onClick={()=>handleEdit(contact)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;