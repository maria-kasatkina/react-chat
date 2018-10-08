import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from  './components/Sidebar'
import ChatHeader from './components/ChatHeader';
import Chat from './components/Chat';
import {chatList, messageList} from './mock-data';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  }
});

class PermanentDrawer extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <ChatHeader/>
          <Sidebar chatList={chatList} />
          <Chat messageList={messageList}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PermanentDrawer);
