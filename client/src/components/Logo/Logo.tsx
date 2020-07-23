import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

interface Props {
  size: number;
  dark?: boolean;
}

const Logo: React.FC<Props> = props => {
  const { size, dark = false } = props;
  return (
    <Grid container justify="center">
      <Box pt={1}>
        <img
          src={dark ? '/static/book.png' : '/static/book-white.png'}
          width={size}
          height={size}
          alt=""
        />
      </Box>
      <Box pl={2} fontSize={size} color={dark ? '#000' : '#fff'}>
        Abybyo
      </Box>
    </Grid>
  );
};

export default Logo;
