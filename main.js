const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

function Counter(props) {
    const { item: { id, Number }, hdlUpdate, hdlRemove } = props;

    return (
        <div className='counter'>
            <button className="btn" onClick={() => hdlUpdate(id, -1)}> - </button>
            <h3>{Number}</h3>
            <button className="btn" onClick={() => hdlUpdate(id, 1)}> + </button>
            <button className="btn" onClick={() => hdlUpdate(id, -Number)}> C </button>
            <button className="btn" onClick={() => hdlRemove(id)}>X</button>
        </div>
    )
}

function SumInfo({ counters }) {
    const sum = counters.reduce((acc, counter) => acc + counter.Number, 0);

    const styles = {
        color: "red",
        fontSize: "30px",
    };

    return (
        <div className='suminfo'>
            <h1 style={styles}>Sum = {sum}</h1>
        </div>
    )
}

function App() {
    const [counters, setCounters] = React.useState([{ id: 1, Number: 0 }])

    const hdleUpdate = (id, num) => {
        const clonedCounters = [...counters]
        let idx = clonedCounters.findIndex(el => el.id === id)
        if (clonedCounters[idx].Number + num < 0) {
            return
        }
        clonedCounters[idx].Number += num
        setCounters(clonedCounters)
    }

    const handleAddCounter = () => {
        let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1
        setCounters([...counters, { id: newId, Number: 0 }])
    }

    const hdlRemove = (id) => {
        const hdleUpdate = counters.filter(counter => counter.id !== id)
        setCounters(hdleUpdate)
    }

    return (
        <>
            <h1>Codecamp Academy 01</h1>
            <SumInfo counters={counters} />
            <button className="btn" onClick={handleAddCounter}>Add Counter</button>

            {counters.map(el => (<Counter key={el.id} item={el} hdlUpdate={hdleUpdate} hdlRemove={hdlRemove}/>))}
        </>
    )
}