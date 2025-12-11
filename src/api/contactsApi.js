const API_URL = process.env.REACT_APP_API_URL+"/api/contacts";

//Create
export async function createContact(data){
    const res = await fetch (API_URL,{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error while creating contact");
    return res.json();
};

//Read all
export async function getAllContacts(){
    const res = await fetch (API_URL);
    if (!res.ok) throw new Error("Error while geting all contacts");
    return res.json();
};

//Update
export async function updateContact(id, data) {
    const res = await fetch (`${API_URL}/${id}`,{
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error while updating contact");
    return res.json();  
};

//Delete
export async function deleteContact(id) {
    const res = await fetch (`${API_URL}/${id}`,{
        method: "DELETE"
    });
    if (!res.ok) throw new Error("Error while deleting contact");
    return res.json();
};
