import { createBrowserRouter } from "react-router-dom";
import { App } from "../pages/App";
import { Sets } from "../pages/sets";
import { Set } from "../pages/sets/_id";
import { Card } from "../pages/card";
import { Deck } from "../pages/deck";
import { ErrorPage } from '../pages/ErrorPage';

export const router = createBrowserRouter([
    {
        path: "/Pokemon-TCG-Pokedex",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "sets",
                element: <Sets />,
            }, {
                path: "set/:id",
                element: <Set />,
            }, {
                path: "card/:id",
                element: <Card />,
            },
            {
                path: "deck",
                element: <Deck />,
            }
        ]
    },
]);