import {startupProgress} from './mock';

export const pipe = (value, ...fn) => fn.reduce((acc, val) => val(acc), value);

const setDataToLocalStorage = data => localStorage.setItem('startupProgress', JSON.stringify(data));

const getPhase = phase => data => data.find(el => el.text === phase);

const validateData = data => {
    try {
        return JSON.parse(data)
    } catch (e) {
        return null
    }
}

export const getData = () => localStorage.getItem('startupProgress');

export const getParsedData = pipe(
    getData(),
    validateData
)

export const init = () => new Promise((res) => {
    const data = getParsedData;
    if (data) {
        return res(data)
    }
    setDataToLocalStorage(startupProgress);
    return res(startupProgress)
})

export const setPhase = newPhase => data => data.map(el => el.text === newPhase.text ? newPhase : el)

export const isPhasesCompleted = data => data ? data.every(el => el.completed) : false;

export const getPhaseByKey = (phase, data) => pipe(
    data,
    getPhase(phase)
)

export const getActivePhase = (phase, data) => pipe(
    data,
    data => data.find(el => !el.completed) || {text: ''},
    active => active.text === phase
)

export const isCompetedPhase = phase => phase.steps.every(el => el.completed);

export const setPhaseByKey = (newPhase, data) => pipe(
    data,
    setPhase(newPhase),
    setDataToLocalStorage
)

export const updatePhasesSteps = (text, completed, data) =>
    pipe(
        data,
        data => data.steps.map(el => el.text === text ? {...el, completed: completed} : el),
        newSteps => ({...data, steps: newSteps}),
    )

export const clearProgress = () => {
    setDataToLocalStorage(startupProgress)
    return startupProgress
}

export const composeClasses = (...classes) =>
    classes
        .reduce((acc, val) => {
            if (typeof val === 'object') {
                acc +=
                    Object.keys(val)
                        .map((el) => (val[el] ? el : ''))
                        .join(' ') + ' ';
            } else {
                acc += val + ' ';
            }
            return acc;
        }, '')
        .trim();
