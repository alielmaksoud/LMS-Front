import logo from "../../../logo.png"

const styles = {
    container : {
        backgroundColor : '#bffac8',
        height : '73.5vh',
        paddingTop: '5%'
    },
    logo : {
        
        display : 'flex',
        flexDisplay: 'column',
        justifyContent: 'center',

    },
    img :{
        width : '200px',
        height : '200px',
    },
    text : {
        fontWeight: '300',
        textAlign: 'center'
    }


}


const NotFound = () => {

    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                <img style={styles.img} src={logo} alt="logo" />
            </div>
            <h1 style={styles.text}>404, Page Not Found.</h1>
        </div>
    )
}


export default NotFound;