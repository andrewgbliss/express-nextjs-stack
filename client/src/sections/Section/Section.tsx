import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '100vw',
    minHeight: '100vh',
  },
  container: {
    minHeight: '100vh',
  },
}));

interface Props {
  children: React.ReactElement;
  id: string;
  backgroundColor?: string;
  backgroundImage?: string;
}

const useStylesFixedBackground = makeStyles(() => ({
  root: {
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundColor: (props: Props) =>
      props.backgroundColor ? props.backgroundColor : '#fff',
    backgroundImage: (props: Props) =>
      props.backgroundImage ? `url(${props.backgroundImage})` : '',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {
    minHeight: '100vh',
  },
}));

const Section: React.FC<Props> = props => {
  const { id, backgroundImage } = props;
  const classesFixedBackground = useStylesFixedBackground(props);
  const classesDefault = useStyles();
  const classes = backgroundImage ? classesFixedBackground : classesDefault;
  return (
      <Box id={id} className={classes.root}
      px={{ xs: 1, sm: 1, md: 5, lg: 10, xl: 15 }}
      py={{ xs: 10, sm: 5, md: 5, lg: 10, xl: 15 }}
      >
        <Container className={classes.container}>{props.children}</Container>
      </Box>
  );
};

export default Section;
