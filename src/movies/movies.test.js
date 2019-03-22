import React from 'react';
import {create} from "react-test-renderer";
import * as films from './films.json'
import {MemoryRouter} from 'react-router';
import {Movies} from './movies'

describe("Movies component", () => {

    test("should have loading div with data is loading", () => {
        const component = create(
            <MemoryRouter>
                <Movies/>
            </MemoryRouter>
        );
        expect(component.toJSON().children[0]).toMatchSnapshot();
    });


    test("should have carousel when data is loaded", () => {
        const component = create(
            <MemoryRouter>
                <Movies items={films} active={0}/>
            </MemoryRouter>
        );
        expect(component.toJSON().children[0]).toMatchSnapshot();
    });
});

