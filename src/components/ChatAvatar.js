import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import titleInitials from '../utils/title-initials';
import getColor from '../utils/color-from';

const ChatAvatar = ({ colorFrom, children, ...rest }) => (
  <Avatar style={{ backgroundColor: getColor(colorFrom) }} {...rest}>
    {titleInitials(children)}
  </Avatar>
);

export default ChatAvatar;
