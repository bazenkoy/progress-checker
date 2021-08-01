import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    CircularProgress,
    CssBaseline
} from '@material-ui/core';
import {composeClasses} from '../../helpers';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    fullScreen: {
        height: '100vh',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backdropFilter: 'blur(2px)'
    }
}));

const Loader = ({fullScreen}) => {
    const classes = useStyles();

    return (
        <div className={composeClasses(classes.root, {[classes.fullScreen]: fullScreen})}>
            <CssBaseline/>
            <CircularProgress/>
        </div>
    );
}

export default Loader;
