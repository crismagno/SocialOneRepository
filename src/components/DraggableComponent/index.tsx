import React, {useState} from 'react';
import Draggable from 'react-native-draggable';

export interface IDraggableComponentProps {
    value: {
        x: number;
        y: number;
    },
    shouldReverse?: boolean;
}

export const DraggableComonent: React.FC<IDraggableComponentProps> = (props): JSX.Element => {
  const [value, setValue] = useState(props.value);
  return (
    <Draggable
      shouldReverse={props.shouldReverse}
      x={value.x} 
      y={value.y}>
      {props.children}
    </Draggable>
  );
};

export default DraggableComonent;
// setValue(val => ({ ...val, x: props.value.x, y: props.value.y }))