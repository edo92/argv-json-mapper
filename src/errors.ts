/**
 *
 * Error Message Types
 */
type MessageTypes = "genericError" | "emptyParam" | "emptyJson" | undefined;

/**
 *
 * Error Messages
 */
export class Message {
  static genericError = "Error Occurred";
  static emptyParam = "Param index is undefined";
  static emptyJson = "File is not valid json format";
}

/**
 *
 * Error Handler Factory
 */
export class ErrHandler {
  constructor(errorType?: MessageTypes) {
    switch (errorType) {
      case "emptyParam": {
        return new Error(Message.emptyParam);
      }

      case "emptyJson": {
        return new Error(Message.emptyJson);
      }

      default:
        return new Error(Message.genericError);
    }
  }
}
