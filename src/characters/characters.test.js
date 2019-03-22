import React from 'react';
import {create} from "react-test-renderer";
import * as characters from './characters.json'
import {MemoryRouter} from 'react-router';
import {Characters} from "./characters";

describe("Characters component", () => {

    const location = {
        pathname: "/characters",
        search: "?url=https://swapi.co/api/films/1/",
    };

    test("should have loading div with characters are loading", () => {
        const component = create(
            <MemoryRouter>
                <Characters location={location}/>
            </MemoryRouter>
        );
        expect(component.toJSON().children[0]).toMatchSnapshot();
    });


    test("should have carousel when data is loaded", () => {
        const component = create(
            <MemoryRouter>
                <Characters location={location} items={characters} active={0}/>
            </MemoryRouter>
        );
        expect(component.toJSON().children[0]).toMatchSnapshot();
    });
});

