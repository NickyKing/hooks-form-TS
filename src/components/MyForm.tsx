import React, { useState } from "react";
import uuidv4 from "uuid/v4";

interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

const MyForm = () => {
  const [people, setPeople] = useState<Person[]>([
    { id: uuidv4(), firstName: "Seb", lastName: "Masters TS?" }
  ]);

  const peopleChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    person: Person
  ) => {
    const event = e;
    event.persist();
    setPeople(currentPeople =>
      currentPeople.map(p =>
        p.id === person.id
          ? { ...p, [event.target.name]: event.target.value }
          : p
      )
    );
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <button
        onClick={() => {
          setPeople(currentPeople => [
            ...currentPeople,
            {
              id: uuidv4(),
              firstName: "",
              lastName: ""
            }
          ]);
        }}
      >
        Add Person
      </button>
      {people.map(person => (
        <div key={person.id}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={person.firstName}
            onChange={e => {
              peopleChangeHandler(e, person);
            }}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={person.lastName}
            onChange={e => {
              peopleChangeHandler(e, person);
            }}
          />
          <button
            onClick={() => {
              setPeople(currentPeople =>
                currentPeople.filter(p => p.id !== person.id)
              );
            }}
          >
            X
          </button>
        </div>
      ))}
      {/* use <pre> for nice JSON formatting */}
      <pre>{JSON.stringify(people, null, 2)}</pre>
    </div>
  );
};

export default MyForm;
