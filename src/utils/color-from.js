import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import deepPurple from '@material-ui/core/colors/deepPurple';
import cyan from '@material-ui/core/colors/cyan';
import lightBlue from '@material-ui/core/colors/lightBlue';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lime from '@material-ui/core/colors/lime';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';

const colors = [
  purple,
  red,
  deepPurple,
  cyan,
  lightBlue,
  teal,
  green,
  lime,
  amber,
  orange,
  deepOrange,
  grey,
  blueGrey,
];

export default function colorFrom(string) {
  try {
    const index = string
      .toString()
      .split('')
      .map(char => char.charCodeAt())
      .reduce((sum, num) => sum + num, 0);

    const colorIndex = index % colors.length;

    return colors[colorIndex][500];
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
    return blueGrey[500];
  }
}
