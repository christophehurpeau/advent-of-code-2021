type CommandDirection = 'forward' | 'down' | 'up';
type CommandValue = number;
type CourseCommand = [CommandDirection, CommandValue];

interface Position {
  horizontal: number;
  depth: number;
}

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
): Position => {
  switch (commandDirection) {
    case 'down': {
      return {
        horizontal: position.horizontal,
        depth: position.depth + commandValue,
      };
    }
    case 'forward': {
      return {
        horizontal: position.horizontal + commandValue,
        depth: position.depth,
      };
    }
    case 'up': {
      return {
        horizontal: position.horizontal,
        depth: position.depth - commandValue,
      };
    }
    default:
      throw new Error(`Invalid command: ${commandDirection} ${commandValue}`);
  }
};

export const processPlannedCourse = (courseCommandsInput: string): Position => {
  const commands = parseCourseCommands(courseCommandsInput);
  let position: Position = { horizontal: 0, depth: 0 };

  commands.forEach((command) => {
    position = applyCommand(command, position);
  });

  return position;
};
