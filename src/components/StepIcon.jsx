import Check from '@material-ui/icons/Check';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStepIconStyles = makeStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.38)',
    '&$active': {
      color: '#fcd535',
    },
    '&$completed': {
      color: '#fcd535',
    },
  },
  active: {},
  completed: {},
});

function StepIcon(props) {
  const classes = useStepIconStyles();
  const { active, completed } = props;

  return (
    <div className={clsx(classes.root, {
      [classes.active]: active,
      [classes.completed]: completed,
    })}>
      {completed ? <Check /> : <div className="circle" />}
    </div>
  );
}

export default StepIcon;
