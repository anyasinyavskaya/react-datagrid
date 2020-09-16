import React from 'react';

export default ({person}) => (
    <div>
        <p>Выбран пользователь <b>{person.firstName + ' ' + person.lastName}</b></p>
        <p>
            Описание: <br/>
            <textarea value={person.description? person.description: ''}/>
        </p>
        <div>
            <p>Адрес проживания: <b>{person.address ? person.address.streetAddress : ''}</b></p>
            < p> Город: <b>{person.address ? person.address.city : ''}</b></p>
            <p>Провинция/штат: <b>{person.address ? person.address.state : ''}</b></p>
            <p>Индекс: <b>{person.address ? person.address.zip : ''}</b></p>
        </div>

    </div>
)