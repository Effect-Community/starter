import * as App from "@org/app/program"
import { expect } from "vitest"

describe("no obstacle planet", () => {
  it("move forward", () => {
    const planet: App.Planet = {
      size: { width: 10, height: 10 },
      obstacles: []
    }

    const initialRoverState: App.RoverState = {
      position: { x: 0, y: 0 },
      direction: "N"
    }

    const newRoverState = App.processCommand(initialRoverState, planet, "f").unsafeRunSync()

    expect(newRoverState).toEqual({
      position: { x: 0, y: 1 },
      direction: "N"
    })
  })
})

describe("some obstacle planet", () => {
  it("move forward", () => {
    const planet: App.Planet = {
      size: { width: 10, height: 10 },
      obstacles: [{ x: 0, y: 1 }]
    }

    const initialRoverState: App.RoverState = {
      position: { x: 0, y: 0 },
      direction: "N"
    }

    const newRoverState = App.processCommand(initialRoverState, planet, "f").unsafeRunSyncExit()

    expect(newRoverState).toEqual(Exit.fail("mayday"))
  })
})
