import React, { Component } from "react";
import { nanoid } from "nanoid";
import Contacts from "components/Contacts";
import UserAddForm from "components/UserAddForm";
import Filter from "components/Filter";
import { Container, Title } from "components/Phonebook/Phonebook.styled"

class Phonebook extends Component {
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
        ],
        filter: '',
    }

    inputValueHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addContactHandler = (values, { resetForm }) => {
        const normilizedName = values.name.toLowerCase();
        const sameName = this.state.contacts.filter(contact => contact.name.toLowerCase() === normilizedName);
        if (sameName.length > 0) {
            alert(`${sameName[0].name} is already in contacts`);
            return;
        }
        this.setState({
            contacts: [
                ...this.state.contacts,
                {
                    id: nanoid(),
                    ...values
                }
            ]
        });
        resetForm();
    }

    deleteContact = (id) => {
        const updatedContacts = this.state.contacts.filter(contact => contact.id !== id);
        this.setState({
            contacts: updatedContacts
        });
    }

    render() {
        const { contacts, filter } = this.state;
        const normilizedFilter = filter.toLowerCase();
        const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normilizedFilter));
        return (
            <Container>
                <Title>Phonebook</Title>
                <UserAddForm
                    addContact={this.addContactHandler}
                />
                <Filter filter={filter} onChange={this.inputValueHandler}/>
                <Contacts contacts={visibleContacts} onClick={ this.deleteContact}/>
            </Container>
        );
    };
}

export default Phonebook;