import React from "react";
import PropTypes from "prop-types";
import CountUp from "react-countup";
import Paper from "@material-ui/core/Paper";
import { grey, red } from "@material-ui/core/colors";

class InfoBox extends React.Component {
  render() {
    const { color, title, value, Icon } = this.props;
    const styles = {
      content: {
        padding: "10px 10px",
        marginLeft: 50,
        height: 80
      },
      number: {
        display: "block",
        fontWeight: 400,
        fontSize: 40,
        paddingLeft: '38%',
        paddingTop: 8,
        color: red[800]
      },
      text: {
        fontSize: 30,
        fontWeight: 300,
        paddingTop: 500,
        paddingLeft: '5%',
        color: grey[800],
        textAlign: "right",
      },
      iconSpan: {
        float: "left",
        height: '25%',
        width: '100%',
        textAlign: "center",
        backgroundColor: color
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 0,
        maxWidth: "100%"
      }
    };

    return (
      <Paper style={{height:'200px'}}>
        <span style={styles.iconSpan}>
          <div style={{ color: "white" }}>
            <Icon style={styles.icon} />
          </div>
        </span>
        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
          <div style={styles.number}>
            <CountUp end={value} separator="," duration={3} />
          </div>
        </div>
      </Paper>
    );
  }
}

InfoBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
};

export default InfoBox;
