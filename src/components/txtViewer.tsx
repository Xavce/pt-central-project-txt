const TxtViewer = ({ textString }) => {

    return (
        <div style={{whiteSpace: "pre-wrap", overflow:'scroll'}}>
            {textString}
        </div>
    );
};

export default TxtViewer;
