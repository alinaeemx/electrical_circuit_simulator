
export const DSwitchIco = (props) => (
    <svg style={{ height: '100%', width: '100%' }} >
        <circle cx={'30%'} cy={'50%'} r={2} fill="black" />
        <circle cx={'70%'} cy={'75%'} r={2} fill="black" />
        <circle cx={'70%'} cy={'25%'} r={2} fill="black" />
        <line x1={0} y1={'50%'} x2={'30%'} y2={'50%'} style={{ stroke: 'black', strokeWidth: 1 }} />
        <line x1={'30%'} y1={'50%'} x2={'70%'} y2={props.switchState == 2 ? '75%' : '25%'} style={{ stroke: 'black', strokeWidth: 1 }} />
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

