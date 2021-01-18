import React from 'react';
const Styles = {
    container:{
        padding:'0rem 3rem 1rem 3rem'
    },
    totalAttendance:{
        fontFamily:'"Roboto", "Helvetica", "Arial", "sans-serif"',
        fontWeight:'400'
    },
    redSquare:{
        height: '3rem',
        width: '3rem',
        backgroundColor: '#FE7346'
    },
    greenSquare:{
        height: '3rem',
        width: '3rem',
        backgroundColor: '#9CCC65'
    },
    blueSquare:{
        height: '3rem',
        width: '3rem',
        backgroundColor: '#54B1EF'
    },
    keys:{
        display:'flex',
        flexDisplay:'column',
        justifyContent:'space-between',
    },
    key:{
        display:'flex',
        flexDisplay:'column',
    },
    attendance:{
        paddingLeft:'1rem'
    }
}

function keys(props) {
    return (
        <div style={Styles.container}>
            <h3 style={Styles.totalAttendance}> {props.totalAttendance}  Learning Days </h3>
            <div style={Styles.keys}>
            <div style={Styles.key}>
                    <div style={Styles.blueSquare}></div>
                    <p style={Styles.attendance}>Present: {props.Present}</p>  
                </div>


                <div style={Styles.key}>
                    <div style={Styles.redSquare}></div>
                    <p style={Styles.attendance}>Absent: {props.Absent}</p> 
                </div>

                <div style={Styles.key}>
                    <div style={Styles.greenSquare}></div>
                    <p style={Styles.attendance}>Late: {props.Late} </p>  
                </div>
                

            </div>
        </div>
    )   
}   

export default keys;