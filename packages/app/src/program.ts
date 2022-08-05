export const program = Effect.sync(console.log("hello world"))

export type Direction = "N" | "E" | "S" | "W"

export type Position = { x: number; y: number }

export interface RoverState {
  position: Position
  direction: Direction
}

export type Command = "f" | "b" | "l" | "r"

export type Size = { width: number; height: number }

// NOTE position (0, 0) means bottom left = south-west most point
// North = pointing up
export interface Planet {
  size: Size
  obstacles: Position[]
}

export const processCommands = (roverState: Ref<RoverState>, planet: Planet, commands: Command[]) =>
  Effect.gen(function*($) {
    let currentState = yield* $(roverState.get)
    for (const command of commands) {
      currentState = yield* $(processCommand(currentState, planet, command))
      yield* $(roverState.set(currentState))
    }

    return currentState
  })

export const processCommand = (
  { direction, position }: RoverState,
  planet: Planet,
  command: Command
): Effect<never, string, RoverState> => {
  switch (command) {
    case "f": {
      const newPosition: Position = { x: position.x, y: position.y + 1 }
      const hasCollision = planet.obstacles.some(obstacle =>
        obstacle.x === newPosition.x && obstacle.y === newPosition.y
      )
      if (hasCollision) {
        return Effect.fail("mayday")
      }

      return Effect.succeed({ direction, position: newPosition })
    }
  }

  return Effect.succeed({ position, direction })
}
