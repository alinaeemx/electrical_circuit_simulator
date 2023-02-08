/* eslint-disable react/jsx-no-comment-textnodes */

export const DSwitchIco = (props) => (
    <svg style={{ height: '100%', width: '100%' }} >
        <circle cx={'30%'} cy={'50%'} r={2} fill="black" />
        <circle cx={'70%'} cy={'75%'} r={2} fill="black" />
        <circle cx={'70%'} cy={'25%'} r={2} fill="black" />
        <line x1={0} y1={'50%'} x2={'30%'} y2={'50%'} style={{ stroke: 'black', strokeWidth: 1 }} />
        <line x1={'30%'} y1={'50%'} x2={'70%'} y2={props.switchState === 2 ? '75%' : '25%'} style={{ stroke: 'black', strokeWidth: 1 }} />
        <line x1={'70%'} y1={'25%'} x2={'100%'} y2={'25%'} style={{ stroke: 'black', strokeWidth: 1 }} />
        <line x1={'70%'} y1={'75%'} x2={'100%'} y2={'75%'} style={{ stroke: 'black', strokeWidth: 1 }} />
    </svg>
)

export const CapacitorIco = (props) => (
    <svg style={{ height: '100%', width: '100%' }} >
        <line x1={0} y1={'50%'} x2={'30%'} y2={'50%'} style={{ stroke: 'black', strokeWidth: 1 }} />
        <line x1={'30%'} y1={'10%'} x2={'30%'} y2={'90%'} style={{ stroke: 'black', strokeWidth: 2 }} />
        {
            props.insulator ? props.insulator > 1 ? (
                <line x1={'50%'} y1={'10%'} x2={'50%'} y2={'90%'} style={{ stroke: 'rgb(180,180,180)', strokeWidth: 10 }} />
            ) : null : null
        }
        <line x1={'70%'} y1={'50%'} x2={'100%'} y2={'50%'} style={{ stroke: 'black', strokeWidth: 1 }} />
        <line x1={'70%'} y1={'10%'} x2={'70%'} y2={'90%'} style={{ stroke: 'black', strokeWidth: 2 }} />
    </svg>
)

export const DCSourceIco = (props) => (
    <svg style={{ height: '100%', width: '100%' }} >
        <line x1={0} y1={'50%'} x2={'30%'} y2={'50%'} style={{ stroke: 'black', strokeWidth: 1 }} />
        <line x1={'30%'} y1={'10%'} x2={'30%'} y2={'90%'} style={{ stroke: 'black', strokeWidth: 2 }} />
        <line x1={'70%'} y1={'50%'} x2={'100%'} y2={'50%'} style={{ stroke: 'black', strokeWidth: 1 }} />
        <line x1={'70%'} y1={'25%'} x2={'70%'} y2={'75%'} style={{ stroke: 'black', strokeWidth: 2 }} />
    </svg>
)

export const LampIco = (props) => (
    <svg style={{ height: '100%', width: '100%' }} >
        <circle cx={'50%'} cy={'50%'} r={15} stroke={'black'} strokeWidth={0.5} fill="rgb(230,230,230)" />
    </svg>
)


export const GalvanometerIco = ({ direction }) => {
    
    const Middle = () => (<line x1={'50%'} y1={'35%'} x2={'50%'} y2={'50%'} markerStart="url(#arrow)" style={{ stroke: 'red', strokeWidth: 1.3 }} />)

    const Right = () => (<line x1="65%" y1="44%" x2="38%" y2="60%" markerStart="url(#arrow)" style={{ stroke: 'red', strokeWidth: 1.3 }} ></line>)

    const Left = () => (<line x1="35%" y1="44%" x2="62%" y2="60%" markerStart="url(#arrow)" style={{ stroke: 'red', strokeWidth: 1.3 }} ></line>)

    return (
        <svg style={{ height: '100%', width: '100%' }} >
            <defs>
                <marker id="arrow" markerWidth="5" markerHeight="7"
                    refX="5" refY="3.5" orient="auto">
                    <polygon points="10 0, 10 7, 0 3.5" fill="red" />
                </marker>
            </defs>
            //x1 + 5 , y1+3 for rotate right
            //x1 - 5 , y1+3 for rotate left
            <circle cx={'50%'} cy={'50%'} r={'40%'} fill="#CFD8DC" />

            {direction === 0 && <Middle />}
            {direction === 1 && <Right />}
            {direction === -1 && <Left />}

            <circle cx={'50%'} cy={'53%'} r={3} fill="#cfd8dc" strokeWidth={1.7} stroke="#263238" />
        </svg>
    )
}