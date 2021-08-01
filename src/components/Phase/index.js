import React, {useEffect, useState} from 'react';
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    Box
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import {getPhaseByKey, updatePhasesSteps} from '../../helpers';
import DoneIcon from '@material-ui/icons/Done'
import {setPhaseByKey} from '../../helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    labelWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    pointer: {
        borderRadius: '50%',
        textAlign: 'center',
        backgroundColor: '#000000',
        color: '#ffffff',
        width: '25px',
    },
    phaseTitle: {
        fontWeight: 800,
        fontSize: '22px',
        color: '#000000',
        padding: '0 8px',
    }
}));

const Phase = ({phase, isActive, index, data, setPhaseCompleted}) => {
    const classes = useStyles();
    const [phaseData, setPhaseData] = useState({});

    useEffect(() => {
        setPhaseData(getPhaseByKey(phase.text, data))
    }, [data, phase.text])

    const handleChange = (text) => (event) => {
        if (event.target.checked) {
            const newPhase = updatePhasesSteps(text, event.target.checked, phaseData)
            setPhaseData(newPhase)
            setPhaseByKey(newPhase, data)
            setPhaseCompleted(newPhase)
        }
    };

    return (
        <div className={classes.root}>
            <FormControl
                component="fieldset"
                className={classes.formControl}>
                <Box className={classes.labelWrapper}>
                    <Box className={classes.pointer}>
                        <Typography>{index}</Typography>
                    </Box>
                    <Typography className={classes.phaseTitle}>
                        {phaseData.text}
                    </Typography>
                    {phaseData.completed && <DoneIcon/>}
                </Box>
                <FormGroup>
                    {phaseData.steps && phaseData.steps.map((el, i) =>
                        <FormControlLabel
                            key={i}
                            control={
                                <Checkbox
                                    checked={el.completed}
                                    color='primary'
                                    disableRipple
                                    onChange={handleChange(el.text)}
                                    disabled={!isActive}
                                />
                            }
                            label={el.text}
                        />)}
                </FormGroup>
            </FormControl>
        </div>
    );
}

export default Phase;
