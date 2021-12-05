import { appLogger } from 'nightingale-app-console';

type CommandDirection = 'forward' | 'down' | 'up';
type CommandValue = number;
type CourseCommand = [CommandDirection, CommandValue];

interface Position {
  horizontal: number;
  depth: number;
}
type Aim = number;

export const parseCourseCommands = (input: string): CourseCommand[] => {
  return input
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s !== '')
    .map((s) => {
      const [command, value] = s.split(' ', 2);
      return [command, parseInt(value, 10)] as CourseCommand;
    });
};

const applyCommand = (
  [commandDirection, commandValue]: CourseCommand,
  position: Position,
  aim: Aim,
): [Position, Aim] => {
  switch (commandDirection) {
    case 'down': {
      return [position, aim + commandValue];
    }
    case 'up': {
      return [position, aim - commandValue];
    }
    case 'forward': {
      return [
        {
          horizontal: position.horizontal + commandValue,
          depth: position.depth + aim * commandValue,
        },
        aim,
      ];
    }
    default:
      throw new Error(`Invalid command: ${commandDirection} ${commandValue}`);
  }
};

export const processPlannedCourse = (courseCommandsInput: string): Position => {
  const commands = parseCourseCommands(courseCommandsInput);
  let position: Position = { horizontal: 0, depth: 0 };
  let aim = 0;

  commands.forEach((command) => {
    const [newPosition, newAim] = applyCommand(command, position, aim);
    appLogger.log('apply command', { command, newPosition, newAim });
    position = newPosition;
    aim = newAim;
  });

  return position;
};
