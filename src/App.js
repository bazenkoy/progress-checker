import React, {useEffect, useState} from 'react';
import {
    Typography,
    Container,
    Button,
    CssBaseline
} from '@material-ui/core';
import {
    init,
    getActivePhase,
    isPhasesCompleted,
    isCompetedPhase,
    setPhaseByKey,
    setPhase,
    clearProgress,
    pipe,
} from './helpers';
import Loader from './components/Loader';
import Phase from './components/Phase';
import AlertDialog from './components/AlertDialog';

const App = () => {
    const [isReady, setReady] = useState(false);
    const [data, setData] = useState(null);
    const [fact, setFact] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const isCompleted = isPhasesCompleted(data);

    useEffect(() => {
        init()
            .then(setData)
            .then(() => setReady(true))
    }, []);

    useEffect(() => {
        if (isCompleted) {
            setLoading(true);
            fetch('https://uselessfacts.jsph.pl/random.json')
                .then((response) => response.json())
                .then(setFact)
                .then(() => setLoading(false))
        }
    }, [isCompleted]);

    const updatePhaseData = (newPhase, data) => pipe(
        data,
        setPhase(newPhase),
        setData
    )

    const setPhaseCompleted = phase => {
        if (isCompetedPhase(phase)) {
            const newPhase = {...phase, completed: true};
            setPhaseByKey(newPhase, data);
            updatePhaseData(newPhase, data);
        }
    }

    if (!isReady) {
        return <Loader fullScreen />
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                {isLoading && <Loader fullScreen />}
                <Typography variant="h3">
                    My startup progress
                </Typography>
                {data.map((el, i) =>
                    <Phase
                        data={data}
                        phase={el}
                        isActive={getActivePhase(el.text, data)}
                        key={i}
                        index={i + 1}
                        setPhaseCompleted={setPhaseCompleted}
                    />)
                }
                {fact && !isLoading && <AlertDialog message={fact.text}/>}
                <Button variant="contained" color="primary" onClick={() => setData(clearProgress())}>
                    Clear progress
                </Button>
            </Container>
        </React.Fragment>
    );
}

export default App;
