import React from "react";
import { uiState } from "react-redux-ui-state";

const text = [
    "Skate ipsum dolor sit amet, bone air Andy Levy masonite coffin tail. Darkslide JFA slam hurricane hang-up. Primo slide speed wobbles locals face plant. Sick boardslide fakie out Madonna hurricane. Alley oop kingpin slide darkslide Bam Margera. Death box gap pressure flip concave. Camel back bank 360 opposite footed. Shorty's crail slide axle set lip skate key. Pressure flip skate key Rector crail slide boned out.",
    "Skate ipsum dolor sit amet, hang ten goofy footed Ed Templeton gap nollie. Shinner nose blunt kick-nose switch. Rock and roll hardware Gullwing death box nose slide. Lip ollie north g-turn Baker regular footed. Ledge ollie north half-flip rock and roll. G-turn 1080 manual darkslide. Soul skate John Lucero tuna-flip stalefish nosegrind. Neil Blender powerslide feeble berm speed wobbles. Baseplate pool hang ten disaster. Helipop bearings camel back 360.",
];

function Text({ setUiState, uiText }) {
    return (
        <div>
            <button onClick={() => setUiState({ uiText: !uiText })}>
                Toggle `uiText`
            </button>
            <p>
                <span>{text[Number(uiText)]}</span>
            </p>
        </div>
    );
}

const uiStateConfig = {
    name: "Text",
    state: () => ({
        uiText: 0,
    }),
};

export default uiState(uiStateConfig)(Text);
